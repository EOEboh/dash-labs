// context/CRMContext.tsx
"use client";

import { createContext, useContext, useState } from "react";
import type { Lead } from "@/lib/types/leads";
import type { Deal } from "@/lib/types/deals";
import leadsData from "@/data/leads.json";
import { convertLeadToDeal } from "@/lib/mockConversion";

type CRMContextType = {
  leads: Lead[];
  deals: Deal[];
  convertLead: (lead: Lead) => void;
};

const CRMContext = createContext<CRMContextType | null>(null);

export function CRMProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(leadsData as Lead[]);
  const [deals, setDeals] = useState<Deal[]>([]);

  const convertLead = (lead: Lead) => {
    const newDeal = convertLeadToDeal(lead);
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, status: "converted" } : l))
    );
    setDeals((prev) => [...prev, newDeal]);
  };

  return (
    <CRMContext.Provider value={{ leads, deals, convertLead }}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM() {
  const ctx = useContext(CRMContext);
  if (!ctx) throw new Error("useCRM must be used inside CRMProvider");
  return ctx;
}
