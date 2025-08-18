import type { Contact, Deal } from "./types";

export const initialContacts: Contact[] = [
  {
    id: "c1",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    status: "Active",
    company: "Acme Inc.",
    phone: "+1-555-1234",
    lastActivity: new Date("2024-06-01"),
  },
  {
    id: "c2",
    name: "Devon Lane",
    email: "devon.lane@example.com",
    status: "Active",
    company: "Globex",
    phone: "+1-555-5678",
    lastActivity: new Date("2024-05-28"),
  },
  {
    id: "c3",
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    status: "Inactive",
    company: "Initech",
    phone: "+1-555-8765",
    lastActivity: new Date("2024-05-15"),
  },
  {
    id: "c4",
    name: "Wade Warren",
    email: "wade.warren@example.com",
    status: "Active",
    company: "Umbrella",
    phone: "+1-555-4321",
    lastActivity: new Date("2024-06-03"),
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
      progressValue: 60,
    },
    {
      id: "a2",
      country: "Nigeria",
      flagImg: "flags/nigeria.svg",
      progressValue: 30,
    },
    {
      id: "a3",
      country: "Brazil",
      flagImg: "flags/brazil.svg",
      progressValue: 39,
    },
    {
      id: "a4",
      country: "South Africa",
      flagImg: "flags/south-africa.svg",
      progressValue: 39,
    },
    {
      id: "a5",
      country: "Canada",
      flagImg: "flags/canada.svg",
      progressValue: 49,
    },
  ];
}
