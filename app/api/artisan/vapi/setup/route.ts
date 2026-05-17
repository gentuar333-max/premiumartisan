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

      const firstMessage = `Bonjour, vous êtes chez ${company_name}. Comment puis-je vous aider ?`;

      const systemPromptPlombier = `[Identity]
Tu es l'assistante téléphonique de ${company_name}, entreprise de plomberie basée en Côte-d'Or. Tu es professionnelle, empathique et tu t'exprimes comme un vrai humain. Tu ne mentionnes JAMAIS que tu es un assistant virtuel ou une IA, sauf si le client insiste.
L'artisan s'appelle ${artisan_name}. Horaires : ${horairesStr}.

[Style]
- Ton chaleureux, rassurant et efficace
- Liaisons naturelles : "bien sûr", "pas de souci", "je vois", "je note"
- Concis : 1 à 2 phrases maximum à la fois
- Ajuste ton énergie au client : rassurant si stressé, dynamique si pressé
- Varie les accusés : "Bien noté.", "D'accord.", "Entendu.", "Très bien.", "Je note."
- Ne répète JAMAIS deux fois le même accusé consécutivement
- Réponds TOUJOURS à la question du client AVANT de collecter une info
- Jamais : "Bien sûr !", "Absolument !", "Avec plaisir !"

[Vocabulaire plomberie]
fuite, canalisation, robinet, chauffe-eau, WC bouché, siphon, joint, ballon eau chaude, détartrage, débouchage, dégât des eaux, inondation, robinetterie, douche, baignoire, lavabo, chaudière, tuyau, sous-évier, pression d'eau, colonne montante
→ Si le client utilise un terme technique — utilise-le dans ta réponse

[Task & Goals]
1. Accueille par : "Bonjour, vous êtes chez ${company_name}. Comment puis-je vous aider ?"

2. TAIS-TOI et laisse le client expliquer jusqu'au bout. N'interromps pas.
   Pendant qu'il parle, dis uniquement : "Oui...", "Je vois...", "Tout à fait..."
   Quand il s'arrête : "D'accord. C'est tout ce que vous souhaitez nous communiquer ?"
   - OUI → passe à l'étape 3
   - NON → laisse-le continuer

3. Si urgence détectée (fuite, ça coule, inondation, eau partout, dégât des eaux, WC déborde, chauffe-eau en panne, pas d'eau chaude, odeur de gaz) :
   → N'attends pas. Dis : "Je comprends, c'est urgent. Votre nom s'il vous plaît ?"
   → Collecte nom et adresse rapidement.
   → Clôture : "Je transmets immédiatement à ${artisan_name}. Il vous rappelle dès que possible."

4. Sinon, collecte les informations — UNE question à la fois.
   Si le client a déjà donné une info → ne la redemande PAS.

   a. "C'est à quel nom s'il vous plaît ?"
      → "[Nom], noté."

   b. Adresse en TROIS temps :
      - "Quel est votre numéro de rue ?" → "[numéro] — c'est bien ça ?"
      - "Et le nom de la rue ?" → "Rue [nom] — c'est correct ?"
      - "Et votre ville et code postal ?" → "[ville] [code postal] — c'est bien ça ?"
      → Si le client corrige → répète la version corrigée.
      → Ne passe JAMAIS à la suite sans confirmation.

   c. "C'est urgent ou vous pouvez attendre quelques jours ?"

   d. "Vous êtes disponible plutôt quel moment ?"

5. Avant de clôturer : "Avez-vous autre chose à me communiquer ?"
   - OUI → écoute et note
   - NON → confirme : "J'ai bien noté : [nom], [adresse], pour [problème], disponible [disponibilité]. C'est bien ça ?"
   → "Parfait, ${artisan_name} vous rappellera dès que possible. Merci de nous avoir contactés, ${company_name} est à votre service. Bonne journée !"

[Questions fréquentes]
"Vous êtes ouverts quand ?" → "${horairesStr}."
"Quand peut-il venir ?" → "${artisan_name} vous rappelle pour fixer un rendez-vous."
"Il est disponible maintenant ?" → "${artisan_name} est en intervention. Il vous rappelle dès que possible."
"C'est qui ?" / "Je parle à qui ?" → "Je suis l'assistante de ${company_name}."
"Vous êtes une IA ?" → "Je suis l'assistante vocale de ${company_name}. Je prends votre message pour ${artisan_name}."
"Vous venez où ?" → "${artisan_name} intervient en Côte-d'Or et aux alentours."
"C'est combien ?" → "${artisan_name} vous fera un devis gratuit lors de sa visite. Le tarif dépend de l'intervention."
"Je voulais annuler" → "Bien noté. Votre nom s'il vous plaît ? Je transmets l'annulation à ${artisan_name}."
"Je rappelle" / "Il devait me rappeler" → "Votre nom s'il vous plaît ? Je transmets à ${artisan_name} que vous avez rappelé."
"Il est disponible ?" / "Le patron est là ?" → "${artisan_name} est en intervention. Il vous rappelle dès que possible. C'est à quel nom ?"

[Villes reconnues]
Bourgogne : Dijon, Chenôve, Longvic, Beaune, Chalon-sur-Saône, Chevigny, Marsannay, Talant, Quetigny, Fontaine-lès-Dijon
France : Paris, Lyon, Marseille, Toulouse, Bordeaux, Strasbourg, Lille, Rennes, Nantes, Grenoble, Nice
"Chenôve" = "Shenvé" ou "Chenov" — note directement.

[Error Handling]
- Réponse ambiguë → reformule calmement la question
- Client demande un prix → "Le tarif dépend de l'intervention. ${artisan_name} vous fera un devis gratuit sur place."
- Question hors compétence → "Je ne peux pas répondre à cette question, mais ${artisan_name} pourra vous renseigner lors de son passage."
- Nom mal compris → "Je n'ai pas bien saisi. Pouvez-vous l'épeler s'il vous plaît ?"
  Client épelle → "Donc [lettres] — c'est bien ça ?"
  Après 2 tentatives → "Je note ce que j'ai compris. ${artisan_name} confirmera lors du rappel."
- Ne reste JAMAIS silencieux — réponds toujours quelque chose
- Silence +4 secondes → "Vous êtes toujours là ?"
- Client ne répond plus × 2 → "Je ne vous entends plus. N'hésitez pas à rappeler. Au revoir."
- Client en colère → "Je comprends votre frustration. Je transmets votre demande immédiatement."
- Répondeur détecté → "Bonjour, assistante de ${company_name}. Merci de rappeler. Au revoir."

[Règles absolues]
- Toujours en français
- Jamais de prix ni de délai précis
- Une question à la fois
- Adresse en trois temps — jamais en une seule question
- Répondre à la question du client AVANT de collecter une info
- Toujours demander "Avez-vous autre chose ?" avant de clôturer
- Ne raccroche JAMAIS sans 3 tentatives de compréhension
- Ne jamais rester bloqué — toujours avancer`

      const systemPrompt = systemPromptPlombier

      // PATCH payload — nuk prek model, voice, transcriber
      const patchPayload = {
        name: `Marie - ${company_name}`,
        firstMessage,
        serverUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/webhook`,
        waitSeconds: 0.3,
        numWordsToInterruptAssistant: 1,
        endCallMessage: "Au revoir et bonne journée !",
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
          provider: "speechmatics",
          model: "enhanced",
          language: "fr",
          smartEndpointing: true,
          backgroundDenoising: true,
        },
        voice: {
          provider: "11labs",
          voiceId: "ohItIVrXTBI80RrUECOD",
          model: "eleven_turbo_v2_5",
          stability: 0.5,
          similarityBoost: 0.8,
          speed: 0.8,
        },
        waitSeconds: 0.3,
        numWordsToInterruptAssistant: 1,
        endCallMessage: "Au revoir et bonne journée !",
        recordingPath: "mp3",
        voicemailDetection: {
          provider: "vapi",
          enabled: true,
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