import type { Contact, Deal } from "./types";

export const initialContacts: Contact[] = [
  {
    id: "c1",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    status: "Active",
    company: "Acme Inc.",
  },
  {
    id: "c2",
    name: "Devon Lane",
    email: "devon.lane@example.com",
    status: "Active",
    company: "Globex",
  },
  {
    id: "c3",
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    status: "Inactive",
    company: "Initech",
  },
  {
    id: "c4",
    name: "Wade Warren",
    email: "wade.warren@example.com",
    status: "Active",
    company: "Umbrella",
  },
];

export const initialDeals: Deal[] = [
  {
    id: "d1",
    name: "Pro Plan 100 seats",
    company: "Acme Inc.",
    owner: "Jane Doe",
    value: 32000,
    probability: 40,
    stage: "Prospecting",
  },
  {
    id: "d2",
    name: "Enterprise Annual",
    company: "Globex",
    owner: "John Smith",
    value: 125000,
    probability: 30,
    stage: "Qualified",
  },
  {
    id: "d3",
    name: "Add-on Security",
    company: "Initech",
    owner: "Ana Gomez",
    value: 18000,
    probability: 50,
    stage: "Proposal",
  },
  {
    id: "d4",
    name: "Renewal",
    company: "Umbrella",
    owner: "Liam Chen",
    value: 54000,
    probability: 45,
    stage: "Negotiation",
  },
];

export function getInitialDealsByStage() {
  const stages = ["Prospecting", "Qualified", "Proposal", "Negotiation"];
  return stages.map((stage) => ({
    stage,
    value: initialDeals
      .filter((d) => d.stage === stage)
      .reduce((sum, d) => sum + d.value, 0),
  }));
}

export function getInitialActivities() {
  return [
    {
      id: "a1",
      country: "USA",
      flagImg: "flags/usa.svg",
    },
    {
      id: "a2",
      country: "Nigeria",
      flagImg: "flags/nigeria.svg",
    },
    {
      id: "a3",
      country: "Brazil",
      flagImg: "flags/brazil.svg",
    },
  ];
}
