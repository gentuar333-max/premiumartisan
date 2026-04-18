 
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
  );
}

export async function POST(req: Request) {
  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifie" }, { status: 401 });

    const { company_name, artisan_name, metier, phone, horaires } = await req.json();

    // 1. Ruan ne Supabase
    const { error: dbError } = await supabase
      .from("artisan_settings")
      .upsert({
        artisan_id: user.id,
        company_name,
        artisan_name,
        metier,
        phone,
        horaires,
        updated_at: new Date().toISOString(),
      }, { onConflict: "artisan_id" });

    if (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 2. Update Vapi Assistant
    const vapiKey = process.env.VAPI_PRIVATE_KEY;
    const vapiAssistantId = process.env.VAPI_ASSISTANT_ID;

    if (vapiKey && vapiAssistantId) {
      const metiersStr = Array.isArray(metier) ? metier.join(", ") : metier;
      const horairesStr = horaires ?? "du lundi au vendredi de 8h à 18h";

      const firstMessage = `Bonjour, vous êtes bien chez ${company_name}. Que puis-je faire pour vous ?`;

      const systemPrompt = `## Règles vocales absolues
- Réponses TRÈS COURTES — maximum 2 phrases
- Réponds IMMÉDIATEMENT sans introduction
- Pas de listes, pas de bullet points
- Langage naturel — comme une vraie personne
- Une seule question à la fois, jamais deux
- Pas de "Bien sûr !", "Absolument !", "Avec plaisir !"

## Identité & Rôle
Tu es l'assistante vocale de ${company_name}, une entreprise spécialisée en ${metiersStr} en Côte-d'Or, France.
L'artisan s'appelle ${artisan_name}.
Tu réponds quand ${artisan_name} est occupé. Tu parles uniquement en français.
Horaires de l'entreprise : ${horairesStr}.

## Personnalité
- Ton chaleureux, patient et professionnel
- Langage clair et naturel
- Si le client est âgé ou confus — reformule simplement

## Déroulement de l'appel
Collecte dans cet ordre, une question à la fois :
1. Prénom et nom du client
2. Adresse complète — rue, ville, code postal
3. Nature du problème ou travaux souhaités
4. Urgent ou non
5. Disponibilités — jours et horaires

Avant de clôturer, confirme :
"J'ai bien noté : [nom], [adresse], pour [problème], disponible [disponibilité]. C'est correct ?"

Puis clôture :
"Parfait, ${artisan_name} vous rappellera dès que possible. Bonne journée !"

## Situations spéciales

### Urgent
Si "urgent", "fuite", "panne", "coupure", "inondation", "gaz", "feu" →
"Je comprends, c'est urgent. Votre nom et adresse s'il vous plaît ?"

### Client demande à parler à l'artisan
"${artisan_name} est occupé. Je note votre demande et il vous rappelle dès que possible."

### Client en colère
"Je comprends votre frustration. Je transmets votre demande immédiatement."

### Silence de plus de 5 secondes
"Vous êtes toujours là ?"

### Prix
"${artisan_name} vous fera un devis lors de sa visite."

### Délai
"Cela dépend du planning de ${artisan_name}. Il vous contactera dès que possible."

### Répondeur détecté
"Bonjour, assistante de ${company_name}. Merci de rappeler. Au revoir." — puis raccroche.

## Règles absolues
- Toujours en français
- Jamais de prix ni de délai précis
- Une seule question à la fois
- Toujours confirmer avant de clôturer`;

      const vapiRes = await fetch(`https://api.vapi.ai/assistant/${vapiAssistantId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${vapiKey}`,
        },
        body: JSON.stringify({
          firstMessage,
          model: {
            provider: "anthropic",
            model: "claude-3-5-haiku-20241022",
            systemPrompt,
          },
        }),
      });

      if (!vapiRes.ok) {
        const vapiError = await vapiRes.text();
        console.error("Vapi error:", vapiError);
      } else {
        console.log("Vapi assistant updated successfully");
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Setup error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifie" }, { status: 401 });

    const { data, error } = await supabase
      .from("artisan_settings")
      .select("*")
      .eq("artisan_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, settings: data ?? null });
  } catch (err) {
    console.error("GET settings error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}