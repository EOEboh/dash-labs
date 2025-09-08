"use client";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "./data-table";
import type { Deal, DataTableColumn } from "./types";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

interface SalesTableProps {
  data: Deal[];
  onRowSelect?: (selectedDeals: Deal[]) => void;
  onEdit?: (deal: Deal) => void;
  onView?: (deal: Deal) => void;
  onDelete?: (deal: Deal) => void;
}

const statusColors = {
  "closed-won":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "closed-lost": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  proposal:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  negotiation: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  prospect: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

export function DealsTable({
  data,
  onRowSelect,
  onEdit,
  onView,
  onDelete,
}: SalesTableProps) {
  const columns: DataTableColumn<Deal>[] = [
    {
      id: "avatar",
      cell: (deal) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={deal.avatar || "/placeholder.svg"}
              alt={deal.alt}
            />
            <AvatarFallback>
              {deal.dealName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      ),
      size: 50,
      enableSorting: false,
    },
    {
      id: "dealName",
      header: "Deal",
      accessorKey: "dealName",
      size: 200,
    },
    {
      id: "owner",
      header: "Owner",
      accessorKey: "owner",
      size: 120,
    },
    {
      id: "company",
      header: "Company",
      accessorKey: "company",
      size: 150,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      size: 120,
    },
    {
      id: "amount",
      header: "Amount",
      accessorKey: "amount",
      cell: (deal) => (
        <div className="text-sm">
          $
          {deal.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      id: "stage",
      header: "Stage",
      accessorKey: "stage",
      cell: (deal) => (
        <Badge variant="secondary" className={statusColors[deal.stage]}>
          {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
        </Badge>
      ),
      size: 80,
    },
    {
      id: "closeDate",
      header: "Close Date",
      accessorKey: "closeDate",
      cell: (deal) => (
        <div className="text-sm">
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date(deal.closeDate))}
        </div>
      ),
      size: 80,
    },
    {
      id: "lastActivity",
      header: "Last Activity",
      accessorKey: "lastActivity",
      cell: (deal) => (
        <div className="text-sm">
          {formatDistanceToNow(deal.lastActivity, { addSuffix: true })}
        </div>
      ),
      size: 150,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      searchKey="dealName"
      searchPlaceholder="Search deals..."
      onRowSelect={onRowSelect}
      onEdit={onEdit}
      onView={onView}
      onDelete={onDelete}
      pageSize={10}
    />
  );
}
