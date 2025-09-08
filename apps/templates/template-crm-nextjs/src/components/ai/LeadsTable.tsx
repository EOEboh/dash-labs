"use client";

import { useState, useMemo, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import type { Lead, LeadStatus } from "@/lib/ai/types/leads";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUp, ChevronDown, Loader2, Upload } from "lucide-react";
import leadsData from "@/data/leads.json";

const columnHelper = createColumnHelper<Lead>();

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  contacted:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  qualified:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  converted:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  lost: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const getScoreColor = (score: number) => {
  if (score >= 71)
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  if (score >= 31)
    return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
};

interface ScoreButtonProps {
  lead: Lead;
}

function ScoreButton({ lead }: ScoreButtonProps) {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScore = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      });

      if (response.ok) {
        const data = await response.json();
        setScore(data.score);
      }
    } catch (error) {
      console.error("Error scoring lead:", error);
    } finally {
      setLoading(false);
    }
  };

  if (score !== null) {
    return <Badge className={getScoreColor(score)}>{score}</Badge>;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleScore}
      disabled={loading}
      className="h-8 bg-transparent"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Score"}
    </Button>
  );
}

export function LeadsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ✅ use state so we can update leads in memory
  const [data, setData] = useState<Lead[]>(() => leadsData as Lead[]);

  const handleConvert = (lead: Lead) => {
    setData((prev) =>
      prev.map((l) =>
        l.id === lead.id ? { ...l, status: "converted", converted: true } : l
      )
    );
    console.log(`Converted lead ${lead.name} into a Deal (mock only)`);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => <div className="font-medium">{info.getValue()}</div>,
      }),
      columnHelper.accessor("company", {
        header: "Company",
        cell: (info) => (
          <div className="text-muted-foreground">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <Badge className={statusColors[info.getValue()]}>
            {info.getValue()}
          </Badge>
        ),
        enableSorting: false,
      }),
      columnHelper.display({
        id: "score",
        header: "Score",
        cell: (info) => <ScoreButton lead={info.row.original} />,
      }),
      // ✅ new Actions column
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const lead = info.row.original;
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleConvert(lead)}
              disabled={lead.converted}
            >
              {lead.converted ? "Converted" : "Convert"}
            </Button>
          );
        },
      }),
    ],
    [data]
  );

  const table = useReactTable({
    data: data.filter((l) => !l.converted), // hide converted leads
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Leads</CardTitle>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="font-semibold">
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "flex items-center space-x-2 cursor-pointer select-none hover:text-foreground"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <div className="flex flex-col">
                              <ChevronUp
                                className={`h-3 w-3 ${
                                  header.column.getIsSorted() === "asc"
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              />
                              <ChevronDown
                                className={`h-3 w-3 -mt-1 ${
                                  header.column.getIsSorted() === "desc"
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
