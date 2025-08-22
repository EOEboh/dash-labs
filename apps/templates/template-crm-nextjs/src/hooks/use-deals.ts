"use client";

import { useLocalStorage } from "./use-local-storage";
import type { Deal, DealStage } from "@/lib/types";
import { initialDeals } from "@/lib/mock-data";

const KEY = "crm:deals";

export function useDeals() {
  const { value, setValue } = useLocalStorage<Deal[]>(KEY, initialDeals);

  function addDeal(d: Omit<Deal, "id">) {
    const id = crypto.randomUUID();
    setValue([{ id, ...d }, ...value]);
  }

  function updateDeal(id: string, patch: Omit<Deal, "id">) {
    setValue(value.map((c) => (c.id === id ? { id, ...patch } : c)));
  }

  function deleteDeal(id: string) {
    setValue(value.filter((c) => c.id !== id));
  }

  function moveDeal(id: string, stage: DealStage) {
    setValue(value.map((c) => (c.id === id ? ({ ...c, stage } as Deal) : c)));
  }

  return {
    deals: value,
    addDeal,
    updateDeal,
    deleteDeal,
    moveDeal,
  };
}
