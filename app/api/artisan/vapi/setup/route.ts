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

    // 2. Krijo ose update Vapi Assistant per kete artisan
    const vapiKey = process.env.VAPI_PRIVATE_KEY;

    // Merr vapi_assistant_id ekzistues per kete artisan
    const { data: existingSettings } = await supabase
      .from("artisan_settings")
      .select("vapi_assistant_id")
      .eq("artisan_id", user.id)
      .maybeSingle()

    const existingVapiId = existingSettings?.vapi_assistant_id ?? null

    if (vapiKey) {
      const vapiAssistantId = existingVapiId
      const metiersStr = Array.isArray(metier) ? metier.join(", ") : metier;
      const horairesStr = horaires ?? "du lundi au vendredi de 8h à 18h";

      const firstMessage = `Bonjour, vous êtes bien chez ${company_name}. Comment puis-je vous aider ?`;

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
- Langage clair et naturel, jamais robotique
- Si le client est âgé ou confus — reformule simplement
- Varie les accusés de réception : "Bien noté.", "D'accord.", "Entendu.", "Très bien.", "Je note."
- Ne répète JAMAIS deux fois le même accusé de réception consécutivement

## Contexte métier
Tu connais le vocabulaire du bâtiment et des artisans :
- Plomberie : fuite, canalisation, robinet, chauffe-eau, WC bouché, siphon, joint, ballon eau chaude, détartrage, débouchage, dégât des eaux, inondation, robinetterie, douche, baignoire, lavabo, chaudière, tuyau, sous-évier
- Électricité : panne, disjoncteur, prise, interrupteur, tableau électrique, court-circuit, câblage, mise aux normes
- Peinture : murs, plafonds, enduit, lessivage, sous-couche, ravalement, façade
- Maçonnerie : fissure, crépi, carrelage, dallage, chape, béton
- Menuiserie : porte, fenêtre, volet, parquet, escalier, placard
Si le client utilise un terme technique — utilise-le aussi dans ta réponse.

## Demandes fréquentes en plomberie
Urgences :
- Fuite d'eau (robinet, tuyau, joint, sous-évier)
- Dégât des eaux
- WC bouché / débordement
- Chauffe-eau / ballon en panne
- Coupure d'eau
- Inondation sous-sol
- Odeur de gaz

Travaux courants :
- Installation chauffe-eau ou ballon d'eau chaude
- Remplacement robinetterie
- Installation douche / baignoire / WC / lavabo
- Débouchage canalisation
- Détartrage
- Réparation fuite sous évier

Rénovation :
- Salle de bain complète
- Plomberie cuisine
- Déplacement de tuyaux
- Mise aux normes

Entretien :
- Contrat entretien chaudière
- Détartrage chauffe-eau annuel
- Vérification installation

## Types de demandes courantes pour ${metiersStr}
Les clients appellent généralement pour :
- Demande de devis (travaux neufs ou rénovation)
- Panne ou urgence à réparer rapidement
- Problème récurrent ou entretien régulier
- Suite d'un chantier en cours
- Première prise de contact

Adapte ton ton selon le type de demande :
- Urgence → direct, rapide, prioritaire
- Devis → recueille les détails du projet
- Entretien → note la fréquence et le type
- Suite chantier → demande le nom du chantier en cours

## Déroulement de l'appel

### Étape 1 — Écoute d'abord
TAIS-TOI complètement et laisse le client expliquer son problème jusqu'au bout. N'interromps JAMAIS.
Pendant qu'il parle, tu peux dire uniquement : "Oui...", "Je vois...", "Tout à fait..." — rien d'autre.
Quand il s'arrête : "D'accord, je comprends bien. C'est tout ce que vous souhaitez nous communiquer ?"
- Si OUI → passe à l'étape 2
- Si NON → laisse-le continuer, puis repose la même question

### Règle importante — informations déjà données
Si le client a déjà donné son nom, adresse ou autre info pendant son explication → ne la redemande PAS.
Saute directement à la prochaine information manquante.

### Étape 2 — Collecte des informations
Après chaque réponse du client : accuse réception AVANT de poser la question suivante.
Une seule question à la fois, dans cet ordre :

1. "C'est à quel nom s'il vous plaît ?"
   → Accusé : "[Nom], noté." ou "Très bien [Nom]."

2. Adresse — TOUJOURS en trois temps avec confirmation :
   - "Quel est votre numéro de rue ?"
   → Répète : "[numéro] — c'est bien ça ?"
   - "Et le nom de la rue ?"
   → Répète lettre par lettre si nécessaire : "Rue [nom] — je l'épelle : [lettre par lettre] — c'est correct ?"
   - "Et votre ville et code postal ?"
   → Répète : "[ville], [code postal] — c'est bien ça ?"
   Si le client corrige → accepte la correction et répète la version corrigée.
   Ne passe JAMAIS à la question suivante sans confirmation de l'adresse.

3. "C'est urgent ou vous pouvez attendre quelques jours ?"
   → Accusé : "Entendu." ou "Je note."

4. "Vous êtes disponible plutôt quel moment ?"
   → Accusé : "Très bien, je note [disponibilité]."

### Étape 3 — Confirmation avant clôture
"J'ai bien noté : [nom], [adresse], pour [problème], disponible [disponibilité]. C'est bien ça ?"

Puis clôture :
"Parfait, ${artisan_name} vous rappellera dès que possible. Bonne journée !"

## Situations spéciales

### Urgent
Si "urgent", "fuite", "panne", "coupure", "inondation", "gaz", "feu" →
Ton direct et rapide : "Je comprends, je transmets immédiatement. Votre nom s'il vous plaît ?"
Puis adresse en deux temps. Pas de bavardage — va à l'essentiel.

### Ton selon la situation
- Urgence → rapide, direct, rassurant
- Demande normale → chaleureux, posé
- Client stressé → calme, lent, clair

### Client demande à parler à l'artisan
"${artisan_name} est en intervention. Je note votre demande et il vous rappelle dès que possible."
Laisse le client s'exprimer complètement avant de poser des questions.

### Client en colère
"Je comprends votre frustration. Je transmets votre demande immédiatement."

### Incompréhension — adresse ou nom mal compris
Répète ce que tu as compris : "Vous avez dit [répétition] — c'est bien ça ?"
Si toujours incompris : "Pouvez-vous répéter plus lentement s'il vous plaît ?"
Maximum 3 tentatives avant de passer à la question suivante.

### Silence de plus de 4 secondes
"Vous êtes toujours là ?"

### Client ne répond plus après 2 tentatives
"Je ne vous entends plus. N'hésitez pas à rappeler. Au revoir." — puis raccroche.

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
- Adresse toujours en deux temps — jamais en une seule question
- Toujours confirmer avant de clôturer
- Ne raccroche JAMAIS sans avoir essayé au moins 3 fois de comprendre`;

      // PATCH payload — nuk prek model, voice, transcriber
      const patchPayload = {
        name: `Marie - ${company_name}`,
        firstMessage,
        serverUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/webhook`,
      }

      // POST payload — per artizane te ri
      const postPayload = {
        name: `Marie - ${company_name}`,
        firstMessage,
        serverUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/webhook`,
        model: {
          provider: "groq",
          model: "llama-3.1-8b-instant",
          temperature: 0.1,
          systemPrompt,
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "fr",
        },
        voice: {
          provider: "11labs",
          voiceId: "ohItIVrXTBI80RrUECOD",
          model: "eleven_turbo_v2_5",
          stability: 0.5,
          similarityBoost: 0.8,
          speed: 0.9,
        },
        analysisPlan: {
          structuredDataSchema: {
            type: "object",
            properties: {
              nom_client:    { type: "string",  description: "Prénom et nom du client" },
              adresse:       { type: "string",  description: "Adresse complète — numéro de rue, nom de rue, ville et code postal" },
              probleme:      { type: "string",  description: "Nature du problème ou travaux demandés" },
              urgent:        { type: "boolean", description: "Si la demande est urgente" },
              disponibilite: { type: "string",  description: "Disponibilités du client" },
            },
            required: ["nom_client", "probleme"],
          },
          structuredDataPrompt: "Extrais les informations collectées pendant l'appel : nom du client, adresse complète, problème ou travaux demandés, si c'est urgent, disponibilités.",
        },
      }
      const vapiPayload = patchPayload

      let newVapiAssistantId = vapiAssistantId

      if (vapiAssistantId) {
        // PATCH — vetëm firstMessage dhe systemPrompt, asgjë tjetër
        console.log("[vapi] PATCH assistant:", vapiAssistantId)
        const vapiRes = await fetch(`https://api.vapi.ai/assistant/${vapiAssistantId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${vapiKey}` },
          body: JSON.stringify(vapiPayload),
        })
        if (!vapiRes.ok) console.error("Vapi PATCH error:", await vapiRes.text())
        else console.log("[vapi] PATCH OK — model/voice/transcriber untouched")
      } else {
        // Krijo assistant te ri
        const vapiRes = await fetch("https://api.vapi.ai/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${vapiKey}` },
          body: JSON.stringify(postPayload),
        })
        if (vapiRes.ok) {
          const vapiData = await vapiRes.json()
          newVapiAssistantId = vapiData.id
          console.log("Vapi assistant created:", newVapiAssistantId)
          // Ruaj vapi_assistant_id ne Supabase
          await supabase.from("artisan_settings").update({
            vapi_assistant_id: newVapiAssistantId,
            updated_at: new Date().toISOString(),
          }).eq("artisan_id", user.id)
        } else {
          console.error("Vapi POST error:", await vapiRes.text())
        }
      }
    }

    // 3. Krijo marie_subscriptions nese nuk ekziston
    const { createClient } = await import("@supabase/supabase-js")
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data: existingSub } = await admin
      .from("marie_subscriptions")
      .select("artisan_id")
      .eq("artisan_id", user.id)
      .maybeSingle()

    if (!existingSub) {
      await admin.from("marie_subscriptions").insert({
        artisan_id: user.id,
        plan: "trial",
        status: "active",
        minutes_remaining: 15,
        minutes_total: 15,
        updated_at: new Date().toISOString(),
      })
    }

    return NextResponse.json({ ok: true, artisan_id: user.id });
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

    return NextResponse.json({ ok: true, settings: data ?? null, artisan_id: user.id });
  } catch (err) {
    console.error("GET settings error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}