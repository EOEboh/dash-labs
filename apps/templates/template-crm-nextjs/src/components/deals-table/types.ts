import type React from "react";

export interface DataTableColumn<T> {
  id: string;
  header?: string;
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
