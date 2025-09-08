import { NextResponse } from "next/server";
import { mockSales } from "@/data/mock-data";

export async function GET() {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 500));

  return NextResponse.json(mockSales);
}
