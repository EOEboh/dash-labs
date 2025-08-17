"use client";

import * as React from "react";
import { SalesTable } from "@/components/sales-table/sales-table";
import { mockContacts } from "@/components/sales-table/mock-data";
import type { Contact } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast"

export default function MainTable() {
  //   const { toast } = useToast()
  const [selectedContacts, setSelectedContacts] = React.useState<Contact[]>([]);

  const handleRowSelect = (contacts: Contact[]) => {
    setSelectedContacts(contacts);
  };

  const handleView = (contact: Contact) => {
    // toast({
    //   title: "View Contact",
    //   description: `Viewing details for ${contact.name}`,
    // })
  };

  const handleEdit = (contact: Contact) => {
    // toast({
    //   title: "Edit Contact",
    //   description: `Editing ${contact.name}`,
    // })
  };

  const handleDelete = (contact: Contact) => {
    // toast({
    //   title: "Delete Contact",
    //   description: `Deleting ${contact.name}`,
    //   variant: "destructive",
    // })
  };

  const handleBulkAction = (action: string) => {
    if (selectedContacts.length === 0) {
      //   toast({
      //     title: "No Selection",
      //     description: "Please select contacts first",
      //     variant: "destructive",
      //   });
      return;
    }

    // toast({
    //   title: `Bulk ${action}`,
    //   description: `${action} ${selectedContacts.length} contact(s)`,
    // });
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sales Data</CardTitle>
              <CardDescription>
                A comprehensive view of all your contacts with advanced
                filtering and actions
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("Export")}
                disabled={selectedContacts.length === 0}
              >
                Export ({selectedContacts.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("Delete")}
                disabled={selectedContacts.length === 0}
              >
                Delete ({selectedContacts.length})
              </Button>
              <Button size="sm">Add Contact</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <SalesTable
            contacts={mockContacts}
            onRowSelect={handleRowSelect}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
