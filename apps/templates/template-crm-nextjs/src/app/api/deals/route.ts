import { NextResponse } from "next/server";
import type { Deal } from "@/lib/types/deals";
import { mockDeals } from "@/data/mock-deals";

const deals: Deal[] = [...mockDeals];

export async function GET() {
  await new Promise((res) => setTimeout(res, 500));
  return NextResponse.json(deals);
}

export async function POST(req: Request) {
  const newDeal: Omit<Deal, "id"> = await req.json();

  const dealWithId: Deal = {
    id: crypto.randomUUID(),
    ...newDeal,
  };

  deals.push(dealWithId);
  return NextResponse.json(dealWithId, { status: 201 });
}
