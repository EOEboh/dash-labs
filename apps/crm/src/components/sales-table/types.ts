import type React from "react";
export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "prospect" | "customer";
  lastActivity: Date;
  avatar?: string;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage:
    | "lead"
    | "qualified"
    | "proposal"
    | "negotiation"
    | "closed-won"
    | "closed-lost";
  closeDate: Date;
  probability: number;
}

export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  enableSorting?: boolean;
  enableHiding?: boolean;
  size?: number;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchKey?: keyof T;
  searchPlaceholder?: string;
  onRowSelect?: (selectedRows: T[]) => void;
  onEdit?: (row: T) => void;
  onView?: (row: T) => void;
  onDelete?: (row: T) => void;
  pageSize?: number;
}
