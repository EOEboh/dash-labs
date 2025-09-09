import { NextResponse } from "next/server";
import type { Lead } from "@/lib/types/leads";
import { mockLeads } from "@/data/mock-leads";

let leads: Lead[] = [...mockLeads];

export async function GET() {
  await new Promise((res) => setTimeout(res, 500));
  return NextResponse.json(leads);
}

export async function PATCH(req: Request) {
  const { id, updates } = await req.json();

  leads = leads.map((lead) =>
    lead.id === id ? { ...lead, ...updates } : lead
  );

  return NextResponse.json({ success: true });
}
