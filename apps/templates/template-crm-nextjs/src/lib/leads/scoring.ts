// apps/crm-dashboard/lib/scoring.ts
import type { Lead } from "@/lib/types/leads";

export type ScoreResult = {
  score: number; // 0..100 normalized
  raw: number; // raw sum of contributions
  maxRaw: number; // 120 (constant)
  contributions: Record<string, number>;
  reasons: string[];
};

const MAX_RAW = 120;

export function scoreLead(lead: Lead): ScoreResult {
  const c: Record<string, number> = {};
  const reasons: string[] = [];
  let raw = 0;

  // 1. Company size
  const size = lead.company_size ?? 0;
  let companyScore = 0;
  if (size >= 1000) companyScore = 30;
  else if (size >= 100) companyScore = 20;
  else if (size >= 10) companyScore = 10;
  c.company = companyScore;
  reasons.push(`Company size ${size || "unknown"} → +${companyScore}`);
  raw += companyScore;

  // 2. Job title
  const title = (lead.job_title || "").toLowerCase();
  let jobScore = 0;
  const cLevel = ["ceo", "cto", "cfo", "coo", "founder", "chief"];
  const vp = ["vp", "vice president", "head of", "director"];
  if (cLevel.some((k) => title.includes(k))) jobScore = 25;
  else if (vp.some((k) => title.includes(k))) jobScore = 15;
  else if (title) jobScore = 5;
  c.job = jobScore;
  reasons.push(`Job title "${lead.job_title || "unknown"}" → +${jobScore}`);
  raw += jobScore;

  // 3. Email replies (cap 20)
  const replies = lead.email_replies ?? 0;
  const repliesScore = Math.min(replies * 8, 20);
  c.replies = repliesScore;
  reasons.push(`${replies} reply(ies) → +${repliesScore}`);
  raw += repliesScore;

  // 4. Email opens (cap 10)
  const opens = lead.email_opens ?? 0;
  const opensScore = Math.min(opens * 2, 10);
  c.opens = opensScore;
  reasons.push(`${opens} open(s) → +${opensScore}`);
  raw += opensScore;

  // 5. Website visits (cap 10)
  const visits = lead.website_visits ?? 0;
  const visitsScore = Math.min(visits * 3, 10);
  c.visits = visitsScore;
  reasons.push(`${visits} website visit(s) → +${visitsScore}`);
  raw += visitsScore;

  // 6. Recency of contact
  let recencyScore = 0;
  if (lead.last_contacted) {
    const days = Math.floor(
      (Date.now() - new Date(lead.last_contacted).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (days <= 7) recencyScore = 15;
    else if (days <= 30) recencyScore = 8;
    c.recency = recencyScore;
    reasons.push(`Last contacted ${days} day(s) ago → +${recencyScore}`);
    raw += recencyScore;
  } else {
    c.recency = 0;
    reasons.push("Never contacted → +0");
  }

  // 7. Industry match
  const targetIndustries = ["software", "fintech", "saas", "healthcare"];
  let industryScore = 0;
  if (
    lead.industry &&
    targetIndustries.some((i) => lead.industry.toLowerCase().includes(i))
  ) {
    industryScore = 10;
    reasons.push(`Industry "${lead.industry}" matches → +10`);
  }
  c.industry = industryScore;
  raw += industryScore;

  // normalize
  const clampedRaw = Math.max(0, Math.min(raw, MAX_RAW));
  const score = Math.round((clampedRaw / MAX_RAW) * 100);

  return { score, raw: clampedRaw, maxRaw: MAX_RAW, contributions: c, reasons };
}
