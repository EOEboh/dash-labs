export type Contact = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | (string & {});
  company?: string;
};

export type DealStage =
  | "Prospecting"
  | "Qualified"
  | "Proposal"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";

export type Deal = {
  id: string;
  name: string;
  company: string;
  owner: string;
  value: number;
  probability: number;
  stage: DealStage;
};
