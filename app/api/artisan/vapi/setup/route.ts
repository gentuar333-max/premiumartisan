import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )
}

function buildPrompt(company: string, artisan: string, horaires: string): string {
  return `Tu es l'assistante téléphonique de ${company}, une entreprise de plomberie.
L'artisan s'appelle ${artisan}. Horaires : ${horaires}.
Tu parles uniquement en français. Tu prends des messages, tu n'es pas un chatbot.

RÈGLES STRICTES :
- Maximum 1-2 phrases par réponse
- Une seule question à la fois
- Ne répète jamais deux fois le même accusé de réception
- Réponds à la question du client AVANT de collecter une info
- Ne dis jamais que tu es une IA sauf si le client insiste vraiment

DÉROULEMENT — suis ces étapes dans l'ordre :

ÉTAPE 1 — ÉCOUTE
Laisse le client parler sans interrompre.
Dis seulement : "Oui...", "Je vois...", "Tout à fait..."
Quand il s'arrête : "D'accord. C'est tout ?"
→ OUI : passe à l'étape 2
→ NON : laisse-le continuer

ÉTAPE 2 — NOM
"C'est à quel nom ?"
→ "[Nom], noté."

ÉTAPE 3 — ADRESSE (3 questions séparées, toujours dans cet ordre)
1. "Votre numéro de rue ?"
   → Confirme : "[numéro] — c'est bien ça ?"
2. "Et le nom de la rue ?"
   → Confirme : "Rue [nom] — c'est correct ?"
3. "Et votre ville ?"
   → Confirme : "[ville] — c'est bien ça ?"
Ne passe JAMAIS à la suite sans confirmation de chaque partie.
Si le client donne tout d'un coup — confirme quand même en 3 parties.

ÉTAPE 4 — URGENCE
"C'est urgent ou ça peut attendre ?"

ÉTAPE 5 — DISPONIBILITÉ
"Vous êtes disponible quel moment ?"

ÉTAPE 6 — CLÔTURE
"Avez-vous autre chose à me communiquer ?"
→ NON : "Parfait. J'ai noté : [nom], [adresse complète], pour [problème]. ${artisan} vous rappelle dès que possible. Bonne journée !"

URGENCES — priorité absolue — interromps et agis immédiatement :
Mots : fuite, fuit, ça coule, huit d'eau, fuit deau, eau partout, inondation, dégât des eaux, WC bouché, WC déborde, chauffe-eau en panne, pas d'eau chaude, odeur de gaz, gaz
→ "Je comprends, c'est urgent. Votre nom s'il vous plaît ?"
→ Collecte nom + adresse en 3 temps rapidement
→ "Je transmets immédiatement à ${artisan}. Bonne journée !"

RÉPONSES AUX QUESTIONS FRÉQUENTES :
"Qui êtes-vous ?" → "Je suis l'assistante de ${company}."
"Il est disponible ?" → "${artisan} est en intervention. Il vous rappelle dès que possible."
"Vous êtes ouverts quand ?" → "${horaires}."
"C'est combien ?" → "${artisan} vous fera un devis gratuit sur place."
"Vous venez où ?" → "${artisan} intervient en Côte-d'Or et aux alentours."
"Je rappelle" → "Votre nom s'il vous plaît ? Je note que vous avez rappelé."
"Je voulais annuler" → "Votre nom s'il vous plaît ? Je transmets l'annulation à ${artisan}."

GESTION DES ERREURS :
Nom mal compris → "Je n'ai pas bien saisi. Pouvez-vous l'épeler ?"
Après 2 tentatives → "Je note ce que j'ai compris. ${artisan} confirmera lors du rappel."
Silence +4 secondes → "Vous êtes toujours là ?"
Pas de réponse × 2 → "Je ne vous entends plus. N'hésitez pas à rappeler. Au revoir."
Client en colère → "Je comprends. Je transmets votre demande immédiatement."
Répondeur → "Bonjour, assistante de ${company}. Merci de rappeler. Au revoir."`
}

function buildVapiPayload(
  company: string,
  artisan: string,
  horaires: string,
  systemPrompt: string
) {
  return {
    name: `Marie - ${company}`,
    firstMessage: `Bonjour, ${company}, je vous écoute.`,
    serverUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/webhook`,

    model: {
      provider: "openai",
      model: "gpt-4o-mini",
      temperature: 0.0,
      systemPrompt,
    },

    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "fr",
      smartFormat: true,
    },

    voice: {
      provider: "11labs",
      voiceId: "ohItIVrXTBI80RrUECOD",
      model: "eleven_turbo_v2_5",
      stability: 0.5,
      similarityBoost: 0.8,
      speed: 0.85,
    },

    waitSeconds: 0.4,
    numWordsToInterruptAssistant: 3,
    maxDurationSeconds: 600,
    endCallMessage: "Au revoir et bonne journée !",
    recordingPath: "mp3",
    voicemailDetection: { provider: "vapi", enabled: true },

    analysisPlan: {
      structuredDataSchema: {
        type: "object",
        properties: {
          nom_client:    { type: "string",  description: "Prénom et nom du client" },
          adresse:       { type: "string",  description: "Adresse complète : numéro, rue, ville" },
          probleme:      { type: "string",  description: "Nature du problème ou travaux" },
          urgent:        { type: "boolean", description: "Si la demande est urgente" },
          disponibilite: { type: "string",  description: "Disponibilités du client" },
        },
        required: ["probleme"],
      },
      structuredDataPrompt:
        "Extrais du transcript : nom du client, adresse complète, problème, si urgent, disponibilités.",
    },
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Non authentifie" }, { status: 401 })

    const { company_name, artisan_name, metier, phone, horaires } = await req.json()

    // 1. Supabase upsert
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
      }, { onConflict: "artisan_id" })

    if (dbError) {
      console.error("[setup] DB error:", dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // 2. Vapi assistant
    const vapiKey = process.env.VAPI_PRIVATE_KEY
    if (vapiKey) {
      const { data: existing } = await supabase
        .from("artisan_settings")
        .select("vapi_assistant_id")
        .eq("artisan_id", user.id)
        .maybeSingle()

      const vapiId = existing?.vapi_assistant_id ?? null
      const horairesStr = horaires ?? "du lundi au vendredi de 8h à 18h"
      const systemPrompt = buildPrompt(company_name, artisan_name, horairesStr)
      const payload = buildVapiPayload(company_name, artisan_name, horairesStr, systemPrompt)

      if (vapiId) {
        const patchPayload = {
          name: payload.name,
          firstMessage: payload.firstMessage,
          serverUrl: payload.serverUrl,
          model: payload.model,
          waitSeconds: payload.waitSeconds,
          numWordsToInterruptAssistant: payload.numWordsToInterruptAssistant,
          maxDurationSeconds: payload.maxDurationSeconds,
          endCallMessage: payload.endCallMessage,
        }
        console.log("[vapi] PATCH assistant:", vapiId)
        const res = await fetch(`https://api.vapi.ai/assistant/${vapiId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${vapiKey}` },
          body: JSON.stringify(patchPayload),
        })
        if (!res.ok) console.error("[vapi] PATCH error:", await res.text())
        else console.log("[vapi] PATCH OK")
      } else {
        console.log("[vapi] POST new assistant for:", company_name)
        const res = await fetch("https://api.vapi.ai/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${vapiKey}` },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const data = await res.json()
          console.log("[vapi] created:", data.id)
          await supabase
            .from("artisan_settings")
            .update({ vapi_assistant_id: data.id, updated_at: new Date().toISOString() })
            .eq("artisan_id", user.id)
        } else {
          console.error("[vapi] POST error:", await res.text())
        }
      }
    }

    // 3. Trial subscription nëse nuk ekziston
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

    return NextResponse.json({ ok: true, artisan_id: user.id })
  } catch (err) {
    console.error("[setup] error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Non authentifie" }, { status: 401 })

    const { data, error } = await supabase
      .from("artisan_settings")
      .select("*")
      .eq("artisan_id", user.id)
      .single()

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, settings: data ?? null, artisan_id: user.id })
  } catch (err) {
    console.error("[setup] GET error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}