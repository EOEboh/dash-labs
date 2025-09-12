import { NextResponse } from "next/server";
import type { Deal } from "@/lib/types/deals";
import { mockDeals } from "@/data/mock-deals";

let deals: Deal[] = [...mockDeals];

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: Request, { params }: Props) {
  const { id } = await params;
  const updates = await req.json();

  const i = deals.findIndex((d) => d.id === id);
  if (i === -1)
    return NextResponse.json({ error: "Deal not found" }, { status: 404 });

  deals[i] = { ...deals[i], ...updates };
  return NextResponse.json(deals[i]);
}

export async function DELETE(_req: Request, { params }: Props) {
  const { id } = await params;
  const before = deals.length;
  deals = deals.filter((d) => d.id !== id);
  if (deals.length === before) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  console.log("DELETE called with id:", id);
  console.log(
    "Current deals:",
    deals.map((d) => d.id)
  );

  return NextResponse.json({ success: true }, { status: 200 });
}
