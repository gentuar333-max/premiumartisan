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

URGENCES — priorité absolue :
Mots : fuite, fuit, ça coule, huit d'eau, fuit deau, eau partout, inondation, dégât des eaux, WC bouché, WC déborde, chauffe-eau en panne, pas d'eau chaude, odeur de gaz, gaz
→ "Je comprends, c'est urgent. Votre nom s'il vous plaît ?"
→ Collecte nom + adresse en 3 temps rapidement
→ "Je transmets immédiatement à ${artisan}."

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

async function createRetellAgent(company: string, artisan: string, horairesStr: string) {
  const apiKey = process.env.RETELL_API_KEY!
  const prompt = buildPrompt(company, artisan, horairesStr)

  // 1. Krijo LLM
  const llmRes = await fetch("https://api.retellai.com/create-retell-llm", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      general_prompt: prompt,
      begin_message: `Bonjour, ${company}, je vous écoute.`,
      general_tools: [],
    }),
  })
  if (!llmRes.ok) throw new Error(`LLM create failed: ${await llmRes.text()}`)
  const llm = await llmRes.json()

  // 2. Krijo Agent
  const agentRes = await fetch("https://api.retellai.com/create-agent", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      agent_name: `Marie - ${company}`,
      response_engine: { type: "retell-llm", llm_id: llm.llm_id },
      voice_id: "11labs-Domi",
      language: "fr-FR",
      stt_mode: "accurate",
      denoising_mode: "noise-cancellation",
      normalize_for_speech: true,
      webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/retell/webhook`,
      post_call_analysis_data: [
        { type: "string",  name: "nom_client",    description: "Prénom et nom du client", required: false },
        { type: "string",  name: "adresse",       description: "Adresse complète : numéro, rue, ville", required: false },
        { type: "string",  name: "probleme",      description: "Nature du problème ou travaux", required: true },
        { type: "boolean", name: "urgent",        description: "Si la demande est urgente", required: false },
        { type: "string",  name: "disponibilite", description: "Disponibilités du client", required: false },
      ],
    }),
  })
  if (!agentRes.ok) throw new Error(`Agent create failed: ${await agentRes.text()}`)
  const agent = await agentRes.json()

  return { agentId: agent.agent_id, llmId: llm.llm_id }
}

async function updateRetellAgent(agentId: string, llmId: string, company: string, artisan: string, horairesStr: string) {
  const apiKey = process.env.RETELL_API_KEY!
  const prompt = buildPrompt(company, artisan, horairesStr)

  // Update LLM prompt
  await fetch(`https://api.retellai.com/update-retell-llm/${llmId}`, {
    method: "PATCH",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      general_prompt: prompt,
      begin_message: `Bonjour, ${company}, je vous écoute.`,
    }),
  })

  // Update Agent
  await fetch(`https://api.retellai.com/update-agent/${agentId}`, {
    method: "PATCH",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ agent_name: `Marie - ${company}` }),
  })
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

    // 2. Retell agent
    const { data: existing } = await supabase
      .from("artisan_settings")
      .select("vapi_assistant_id, retell_llm_id")
      .eq("artisan_id", user.id)
      .maybeSingle()

    const horairesStr = horaires ?? "du lundi au vendredi de 8h à 18h"
    const existingAgentId = existing?.vapi_assistant_id ?? null
    const existingLlmId = existing?.retell_llm_id ?? null

    if (existingAgentId && existingLlmId) {
      console.log("[retell] UPDATE agent:", existingAgentId)
      await updateRetellAgent(existingAgentId, existingLlmId, company_name, artisan_name, horairesStr)
    } else {
      console.log("[retell] CREATE agent for:", company_name)
      const { agentId, llmId } = await createRetellAgent(company_name, artisan_name, horairesStr)
      await supabase.from("artisan_settings").update({
        vapi_assistant_id: agentId,
        retell_llm_id: llmId,
        updated_at: new Date().toISOString(),
      }).eq("artisan_id", user.id)
      console.log("[retell] created agent:", agentId)
    }

    // 3. Trial subscription
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
  } catch (err: any) {
    console.error("[setup] error:", err)
    return NextResponse.json({ error: err.message ?? "Internal error" }, { status: 500 })
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