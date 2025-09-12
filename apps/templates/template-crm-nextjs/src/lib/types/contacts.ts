export type Contact = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | (string & {});
  company?: string;
  phone: string;
  lastActivity: Date;
  avatar?: string;
};
