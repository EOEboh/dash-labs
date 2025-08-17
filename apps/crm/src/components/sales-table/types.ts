import type React from "react";

export type Deal = {
  id: string;
  dealName: string;
  company: string;
  email: string;
  owner: string;
  stage: "prospect" | "negotiation" | "proposal" | "closed-won" | "closed-lost";
  amount: number;
  closeDate: Date;
  lastActivity: Date;
  avatar?: string;
  alt?: string;
};

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
