export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "lost";

export interface Lead {
  id: string;
  name: string;
  company: string;
  company_size: number;
  industry: string;
  job_title: string;
  email_opens: number;
  email_replies: number;
  last_contacted: string; // ISO date string
  website_visits: number;
  status: LeadStatus;
  converted: boolean;
}
