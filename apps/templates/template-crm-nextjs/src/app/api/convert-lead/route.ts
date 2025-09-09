// app/api/convert-lead/route.ts
import { NextResponse } from "next/server";
import type { Lead } from "@/lib/types/leads";
import type { Deal } from "@/lib/types/deals";
import { mockLeads } from "@/data/mock-leads";
import { mockDeals } from "@/data/mock-deals";

let leads: Lead[] = [...mockLeads];
const deals: Deal[] = [...mockDeals];

export async function POST(req: Request) {
  const { leadId } = await req.json();
  const lead = leads.find((l) => l.id === leadId);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  // Mark lead as converted
  leads = leads.map((l) =>
    l.id === leadId ? { ...l, status: "converted", converted: true } : l
  );

  // Create new deal
  const newDeal: Deal = {
    id: crypto.randomUUID(),
    dealName: lead.name,
    company: lead.company,
    email: `${lead.name.split(" ").join(".").toLowerCase()}@${lead.company.toLowerCase()}.com`,
    owner: "Unassigned",
    stage: "prospect",
    amount: Math.floor(Math.random() * 10000) + 1000,
    closeDate: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
  };

  deals.push(newDeal);

  return NextResponse.json({ success: true, leadId, newDeal });
}
