"use client";

import * as React from "react";
import { SalesTable } from "@/components/sales-table/sales-table";
import { useTableSales } from "@/hooks/use-table-sales";
import type { Deal } from "@/components/sales-table/types";
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
  const { data, isLoading, error } = useTableSales();
  const [selectedDeals, setSelectedDeals] = React.useState<Deal[]>([]);

  const handleRowSelect = (contacts: Deal[]) => {
    setSelectedDeals(contacts);
  };

  const handleView = (deal: Deal) => {
    // toast({
    //   title: "View Contact",
    //   description: `Viewing details for ${contact.name}`,
    // })
  };

  const handleEdit = (deal: Deal) => {
    // toast({
    //   title: "Edit Contact",
    //   description: `Editing ${contact.name}`,
    // })
  };

  const handleDelete = (deal: Deal) => {
    // toast({
    //   title: "Delete Contact",
    //   description: `Deleting ${contact.name}`,
    //   variant: "destructive",
    // })
  };

  const handleBulkAction = (action: string) => {
    if (selectedDeals.length === 0) {
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
              <CardTitle>
                <h2 className="text-lg font-semibold mb-4">Sales Data</h2>
              </CardTitle>
              {/* <CardDescription>
                A comprehensive view of all your contacts with advanced
                filtering and actions
              </CardDescription> */}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("Export")}
                disabled={selectedDeals.length === 0}
              >
                Export ({selectedDeals.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("Delete")}
                disabled={selectedDeals.length === 0}
              >
                Delete ({selectedDeals.length})
              </Button>
              <Button size="sm">Add Contact</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <SalesTable
            data={data ?? []}
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
