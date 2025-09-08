// apps/crm-dashboard/app/api/score/route.ts
import { NextResponse } from "next/server";
import { scoreLead } from "@/lib/ai/scoring";
import type { Lead } from "@/lib/ai/types/leads";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.id) {
      return NextResponse.json(
        { error: "Lead must include id" },
        { status: 400 }
      );
    }

    const lead = body as Lead;
    const result = scoreLead(lead);

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
