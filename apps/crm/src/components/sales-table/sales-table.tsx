"use client";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "./data-table";
import type { Contact, DataTableColumn } from "./types";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

interface ContactTableProps {
  contacts: Contact[];
  onRowSelect?: (selectedContacts: Contact[]) => void;
  onEdit?: (contact: Contact) => void;
  onView?: (contact: Contact) => void;
  onDelete?: (contact: Contact) => void;
}

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  prospect: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  customer:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

export function SalesTable({
  contacts,
  onRowSelect,
  onEdit,
  onView,
  onDelete,
}: ContactTableProps) {
  const columns: DataTableColumn<Contact>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: (contact) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={contact.avatar || "/placeholder.svg"}
              alt={contact.name}
            />
            <AvatarFallback>
              {contact.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{contact.name}</div>
            <div className="text-sm text-muted-foreground">{contact.email}</div>
          </div>
        </div>
      ),
      size: 250,
    },
    {
      id: "company",
      header: "Company",
      accessorKey: "company",
      size: 200,
    },
    {
      id: "phone",
      header: "Phone",
      accessorKey: "phone",
      size: 150,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (contact) => (
        <Badge variant="secondary" className={statusColors[contact.status]}>
          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
        </Badge>
      ),
      size: 120,
    },
    {
      id: "lastActivity",
      header: "Last Activity",
      accessorKey: "lastActivity",
      cell: (contact) => (
        <div className="text-sm">
          {formatDistanceToNow(contact.lastActivity, { addSuffix: true })}
        </div>
      ),
      size: 150,
    },
  ];

  return (
    <DataTable
      data={contacts}
      columns={columns}
      searchKey="name"
      searchPlaceholder="Search contacts..."
      onRowSelect={onRowSelect}
      onEdit={onEdit}
      onView={onView}
      onDelete={onDelete}
      pageSize={10}
    />
  );
}
