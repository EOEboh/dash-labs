export type DealStage =
  | "prospect"
  | "negotiation"
  | "proposal"
  | "closed-won"
  | "closed-lost";

export type Deal = {
  id: string;
  dealName: string;
  company: string;
  email: string;
  owner: string;
  stage: DealStage;
  value: number;
  closeDate: string;
  lastActivity?: string;
  avatar?: string;
  alt?: string;
};
