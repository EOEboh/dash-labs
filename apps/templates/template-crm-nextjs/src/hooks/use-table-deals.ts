"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Deal } from "@/lib/types/deals";

export function useTableDeals() {
  return useQuery<Deal[]>({
    queryKey: ["deals"],
    queryFn: async () => {
      const res = await fetch("/api/deals");
      if (!res.ok) throw new Error("Failed to fetch deals");
      return res.json();
    },
  });
}

export function useAddDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deal: Deal) => {
      const res = await fetch("/api/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deal),
      });
      if (!res.ok) throw new Error("Failed to add deal");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });
}
