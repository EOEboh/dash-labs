"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import type { Lead } from "@/lib/types/leads";
import type { Deal } from "@/lib/types/deals";

interface ConvertToDealButtonProps {
  lead: Lead;
}

export function ConvertToDealButton({ lead }: ConvertToDealButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (lead: Lead): Promise<Deal> => {
      // 1. Update lead status
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lead.id,
          updates: { status: "converted", converted: true },
        }),
      });

      // 2. Create deal payload from lead
      const dealPayload: Omit<Deal, "id"> = {
        dealName: `${lead.company} - ${lead.job_title}`,
        company: lead.company,
        email: `${lead.name.toLowerCase().replace(" ", ".")}@example.com`,
        owner: "Unassigned",
        stage: "prospect",
        value: Math.floor(Math.random() * 20000) + 5000,
        closeDate: new Date().toISOString(),
        lastActivity: new Date(lead.last_contacted).toISOString(),
        avatar: undefined,
        alt: lead.company,
      };

      // 3. Save new deal
      const res = await fetch("/api/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dealPayload),
      });

      if (!res.ok) throw new Error("Failed to create deal");
      return res.json();
    },
    onSuccess: () => {
      // Refresh both lists
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      setIsOpen(false);
    },
  });

  const handleConvert = () => {
    mutation.mutate(lead);
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
            <p className="text-sm">
              You are about to convert <strong>{lead.name}</strong> from{" "}
              <strong>{lead.company}</strong> into a deal.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConvert}
              disabled={mutation.isPending}
              className="gap-2"
            >
              {mutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Convert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
