// Supabase Edge Function: perception
// POST /perception
// Env required:
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY
// - RESEND_API_KEY (for email)
// - RESEND_TO_EMAIL (recipient)
// - RESEND_FROM_EMAIL (verified sender)
// Deno runtime (no Node APIs)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

type Responses = Record<string, unknown>;

type Payload = {
  responses: Responses;
};

const emailSubject = "Nouvelle candidature PERCEPTION";

function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const k of keys) out[k] = obj[k];
  return out;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function validate(payload: Payload) {
  if (!payload || typeof payload !== "object" || !payload.responses) {
    return "Payload invalide.";
  }
  const r = payload.responses as Record<string, any>;
  // Required basics
  if (!isNonEmptyString(r.fullName)) return "Nom complet requis.";
  if (!isNonEmptyString(r.age)) return "Âge requis.";
  if (!isNonEmptyString(r.gender)) return "Genre requis.";
  if (!isNonEmptyString(r.email)) return "Email requis.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) return "Email invalide.";
  if (!isNonEmptyString(r.whatsapp)) return "WhatsApp requis.";
  if (!/^\+213[0-9]{9}$/.test(r.whatsapp)) return "WhatsApp invalide (+213XXXXXXXXX).";
  if (!isNonEmptyString(r.location)) return "Localisation requise.";
  // Scales
  if (typeof r.alignmentScale !== "number") return "Score d'alignement invalide.";
  if (typeof r.selfChallengeScale !== "number") return "Score de remise en question invalide.";
  return null;
}

function buildEmailHtml(r: Record<string, any>) {
  const lines: string[] = [];
  lines.push(`<h2 style="margin:0 0 12px;color:#d4af37;">Nouvelle candidature PERCEPTION</h2>`);
  lines.push(`<p><strong>Nom:</strong> ${r.fullName}</p>`);
  lines.push(`<p><strong>Âge:</strong> ${r.age}</p>`);
  lines.push(`<p><strong>Genre:</strong> ${r.gender}</p>`);
  lines.push(`<p><strong>Email:</strong> ${r.email}</p>`);
  lines.push(`<p><strong>WhatsApp:</strong> ${r.whatsapp}</p>`);
  lines.push(`<p><strong>Localisation:</strong> ${r.location}</p>`);
  lines.push(`<p><strong>Alignement (Q10):</strong> ${r.alignmentScale}</p>`);
  lines.push(`<p><strong>Remise en question (Q29):</strong> ${r.selfChallengeScale}</p>`);
  lines.push(`<hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />`);
  lines.push(`<p style="color:#666">Résumé: voir les sections JSON insérées en base.</p>`);
  return `<div style="font-family:Inter,Arial,sans-serif;background:#0e0e1a;color:#fff;padding:16px;border-radius:12px">
  ${lines.join("")}
  </div>`;
}

async function sendEmail(responses: Record<string, any>) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const RESEND_TO_EMAIL = Deno.env.get("RESEND_TO_EMAIL");
  const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL");
  if (!RESEND_API_KEY || !RESEND_TO_EMAIL || !RESEND_FROM_EMAIL) {
    // Not configured; skip email
    return;
  }
  const html = buildEmailHtml(responses);
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [RESEND_TO_EMAIL],
      subject: emailSubject,
      html,
    }),
  });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
  }
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  try {
    const body = (await req.json()) as Payload;
    const err = validate(body);
    if (err) {
      return new Response(JSON.stringify({ success: false, error: err }), { status: 400 });
    }
    const r = body.responses as Record<string, any>;

    // Map sections (group by section id ranges)
    const section1 = pick(r, ["fullName","age","gender","email","whatsapp","location"]);
    const section2 = pick(r, ["selfDescription","frequentEmotions","topStressSources","alignmentScale","alignmentWhy"]);
    const section3 = pick(r, ["relationshipsQuality","relationshipsWhy","conflictReaction","intimateRelationships"]);
    const section4 = pick(r, ["topGoals","mission","knowsValuesSystem","valuesSystemExplanation","topValues"]);
    const section5 = pick(r, ["dailyOrganization","decisionMaking","futureSelf5Years"]);
    const section6 = pick(r, ["pastCoaching","pastCoachingExperience","budgetAbility","timeAvailability","whyPerception"]);
    const section7 = pick(r, ["selfChallengeScale","anythingToKnow"]);

    const insertPayload = {
      nom: r.fullName,
      age: r.age,
      genre: r.gender,
      email: r.email,
      whatsapp: r.whatsapp,
      localisation: r.location,
      section1,
      section2,
      section3,
      section4,
      section5,
      section6,
      section7,
      score_alignement: r.alignmentScale,
      score_remise_en_question: r.selfChallengeScale,
      status: "Nouveau",
    };

    const { error } = await supabase.from("perception_candidatures").insert(insertPayload);
    if (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }

    // Fire-and-forget email (no blocking)
    sendEmail(r).catch(() => {});

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: String(e?.message ?? e) }), { status: 500 });
  }
});


