"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import type { Lead, LeadStatus } from "@/lib/types/leads";
import type { Deal } from "@/lib/types/deals";
import { convertLeadToDeal } from "@/lib/mockConversion";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ChevronUp,
  ChevronDown,
  Loader2,
  Upload,
  ArrowRight,
} from "lucide-react";
import initialLeads from "@/data/leads.json";

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

interface ConvertToDealButtonProps {
  lead: Lead;
  onConvert: (leadId: string, deal: Deal) => void;
}

function ConvertToDealButton({ lead, onConvert }: ConvertToDealButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [convertedDeal, setConvertedDeal] = useState<Deal | null>(null);

  const handleConvert = () => {
    const newDeal = convertLeadToDeal(lead);
    setConvertedDeal(newDeal);
    onConvert(lead.id, newDeal);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="h-8 bg-transparent gap-1"
      >
        <ArrowRight className="h-3 w-3" />
        Convert
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Convert to Deal</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {!convertedDeal ? (
              <>
                <p className="text-sm">Convert this lead into a new deal?</p>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Name
                  </p>
                  <p className="text-sm font-semibold">{lead.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Company
                  </p>
                  <p className="text-sm font-semibold">{lead.company}</p>
                </div>
              </>
            ) : (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-center font-semibold">
                  Deal created successfully! 🎉
                </p>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {convertedDeal.name} @ {convertedDeal.company}, Stage:{" "}
                  {convertedDeal.stage}, Value: ${convertedDeal.value}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            {!convertedDeal ? (
              <>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConvert}>Convert</Button>
              </>
            ) : (
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function LeadsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [leads, setLeads] = useState<Lead[]>(initialLeads as Lead[]);
  const [deals, setDeals] = useState<Deal[]>([]);

  const handleConvert = (leadId: string, newDeal: Deal) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: "converted" } : l))
    );
    setDeals((prev) => [...prev, newDeal]);
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
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <ConvertToDealButton
            lead={info.row.original}
            onConvert={handleConvert}
          />
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: leads,
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
