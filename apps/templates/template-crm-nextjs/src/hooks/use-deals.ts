"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Deal, DealStage } from "@/lib/types/deals";

export function useDeals() {
  const queryClient = useQueryClient();

  const query = useQuery<Deal[]>({
    queryKey: ["deals"],
    queryFn: async () => {
      const res = await fetch("/api/deals");
      if (!res.ok) throw new Error("Failed to fetch deals");
      return res.json();
    },
    staleTime: 5_000,
  });

  const addMutation = useMutation({
    mutationFn: async (payload: Omit<Deal, "id">) => {
      const res = await fetch("/api/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create deal");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Deal>;
    }) => {
      const res = await fetch(`/api/deals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update deal");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/deals/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete deal");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
  });

  // helpers using the mutations (they return Promise so page can await)
  const addDeal = (payload: Omit<Deal, "id">) =>
    addMutation.mutateAsync(payload);
  const updateDeal = (id: string, updates: Partial<Deal>) =>
    updateMutation.mutateAsync({ id, updates });
  const deleteDeal = (id: string) => deleteMutation.mutateAsync(id);
  const moveDeal = (id: string, stage: DealStage) => updateDeal(id, { stage });

  return {
    deals: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    addDeal,
    updateDeal,
    deleteDeal,
    moveDeal,
  };
}
