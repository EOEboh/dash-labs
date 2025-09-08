import type { Lead } from "./types/leads";
import type { Deal } from "./types/deals";

const stageProbabilities: Record<Deal["stage"], number> = {
  Prospecting: 10,
  Qualified: 30,
  Proposal: 50,
  Negotiation: 70,
  "Closed Won": 100,
  "Closed Lost": 0,
};

export function convertLeadToDeal(lead: Lead): Deal {
  return {
    id: `deal_${lead.id}`,
    name: lead.name,
    company: lead.company,
    owner: "Unassigned", // mock owner
    value: Math.floor(Math.random() * 10000) + 500, // mock deal value
    probability: stageProbabilities["Prospecting"],
    stage: "Prospecting",
  };
}
