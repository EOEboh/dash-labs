"use client";

import { useQuery } from "@tanstack/react-query";
import { Deal } from "@/components/deals-table/types";

export function useTableSales() {
  return useQuery<Deal[]>({
    queryKey: ["deals"],
    queryFn: async () => {
      const res = await fetch("/api/deals");
      if (!res.ok) throw new Error("Failed to fetch deals");
      return res.json();
    },
  });
}
