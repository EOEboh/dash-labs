"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDeals } from "@/hooks/use-deals";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { DealForm } from "@/components/deal-form";
import type { Deal, DealStage } from "@/lib/types";
import { DEAL_STAGES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";

type DragInfo = { id: string; from: DealStage } | null;

export default function DealsPage() {
  // const { toast } = useToast();
  const { deals, addDeal, updateDeal, deleteDeal, moveDeal } = useDeals();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Deal | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; id?: string }>({
    open: false,
  });
  const [drag, setDrag] = useState<DragInfo>(null);

  function onCreate(values: Omit<Deal, "id">) {
    addDeal(values);
    // toast({
    //   title: "Deal added",
    //   description: `${values.name} created in ${values.stage}.`,
    // });
  }

  function onEdit(values: Omit<Deal, "id">) {
    if (!editing) return;
    updateDeal(editing.id, values);
    // toast({ title: "Deal updated", description: `${values.name} updated.` });
  }

  function onDelete() {
    if (!confirm.id) return;
    const d = deals.find((x) => x.id === confirm.id);
    deleteDeal(confirm.id);
    setConfirm({ open: false });
    // toast({
    //   title: "Deal deleted",
    //   description: `${d?.name ?? "Deal"} removed.`,
    // });
  }

  const grouped: Record<DealStage, Deal[]> = DEAL_STAGES.reduce(
    (acc, s) => {
      acc[s] = deals.filter((d) => d.stage === s);
      return acc;
    },
    {} as Record<DealStage, Deal[]>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Deals</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {DEAL_STAGES.map((stage) => (
          <div
            key={stage}
            className="rounded-xl border bg-card text-card-foreground shadow-sm"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (drag && drag.from !== stage) {
                moveDeal(drag.id, stage);
                setDrag(null);
                // toast({
                //   title: "Deal moved",
                //   description: `Moved to ${stage}.`,
                // });
              }
            }}
            aria-label={`${stage} column`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="font-medium">{stage}</div>
              <Badge variant="secondary">{grouped[stage]?.length ?? 0}</Badge>
            </div>
            <ScrollArea className="h-[60vh]">
              <div className="p-3 space-y-3">
                {grouped[stage]?.map((deal) => (
                  <Card
                    key={deal.id}
                    className="p-3 cursor-move border-muted hover:shadow-sm transition"
                    draggable
                    onDragStart={() =>
                      setDrag({ id: deal.id, from: deal.stage })
                    }
                    onDragEnd={() => setDrag(null)}
                    role="button"
                    aria-label={`Deal ${deal.name}, value ${deal.value}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium">{deal.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {deal.company}
                        </div>
                      </div>
                      <div className="text-sm font-semibold tabular-nums">
                        ${deal.value.toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Owner: {deal.owner}</span>
                      <span aria-hidden>•</span>
                      <span>Prob: {deal.probability}%</span>
                    </div>
                    <div className="mt-3 flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditing(deal);
                          setFormOpen(true);
                        }}
                        aria-label={`Edit ${deal.name}`}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setConfirm({ open: true, id: deal.id })}
                        aria-label={`Delete ${deal.name}`}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
                {(grouped[stage]?.length ?? 0) === 0 && (
                  <div className="text-sm text-muted-foreground px-1">
                    No deals.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>

      <DealForm
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={editing ? "edit" : "create"}
        initialValues={editing ?? undefined}
        onSubmit={(vals) => {
          if (editing) {
            onEdit(vals);
          } else {
            onCreate(vals);
          }
          setFormOpen(false);
          setEditing(null);
        }}
      />

      <ConfirmDialog
        open={confirm.open}
        title="Delete deal?"
        description="This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onCancel={() => setConfirm({ open: false })}
        onConfirm={onDelete}
      />
    </div>
  );
}
