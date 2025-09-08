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
    <div className="container mx-auto py-4">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <CardTitle>
                <h2 className="text-lg font-semibold mb-4">All Deals</h2>
              </CardTitle>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("Export")}
                disabled={selectedDeals.length === 0}
                className="w-full sm:w-auto"
              >
                Export ({selectedDeals.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("Delete")}
                disabled={selectedDeals.length === 0}
                className="w-full sm:w-auto"
              >
                Delete ({selectedDeals.length})
              </Button>
              <Button size="sm" className="w-full sm:w-auto">
                Add Contact
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <div className="min-w-[800px] px-4">
              <SalesTable
                data={data ?? []}
                onRowSelect={handleRowSelect}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
