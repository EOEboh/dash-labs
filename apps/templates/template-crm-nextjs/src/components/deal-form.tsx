"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Deal } from "@/lib/types/deals";
import { DEAL_STAGES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Values = Omit<Deal, "id">;

export function DealForm({
  open,
  onOpenChange,
  mode,
  initialValues,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: "create" | "edit";
  initialValues?: Deal;
  onSubmit: (values: Values) => void;
}) {
  const [values, setValues] = useState<Values>({
    dealName: "",
    company: "",
    email: "",
    owner: "",
    value: 0,
    closeDate: new Date().toISOString(),
    stage: DEAL_STAGES[0],
  });

  useEffect(() => {
    if (initialValues) {
      const { id, ...rest } = initialValues;
      setValues(rest);
    } else {
      setValues({
        dealName: "",
        company: "",
        email: "",
        owner: "",
        value: 0,
        closeDate: new Date().toISOString(),
        stage: DEAL_STAGES[0],
      });
    }
  }, [initialValues, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="deal-form-desc">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Deal" : "Edit Deal"}
          </DialogTitle>
          <DialogDescription id="deal-form-desc">
            {mode === "create" ? "Create a new deal." : "Update deal details."}
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(values);
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Deal name</Label>
            <Input
              id="name"
              value={values.dealName}
              onChange={(e) =>
                setValues((s) => ({ ...s, dealName: e.target.value }))
              }
              required
              placeholder="Enterprise plan"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={values.company}
              onChange={(e) =>
                setValues((s) => ({ ...s, company: e.target.value }))
              }
              placeholder="Acme Inc."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={values.email}
              onChange={(e) =>
                setValues((s) => ({ ...s, email: e.target.value }))
              }
              placeholder="john.doe@core.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="owner">Owner</Label>
            <Input
              id="owner"
              value={values.owner}
              onChange={(e) =>
                setValues((s) => ({ ...s, owner: e.target.value }))
              }
              placeholder="Jane Doe"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Value (USD)</Label>
            <Input
              id="value"
              type="number"
              min={0}
              value={values.value}
              onChange={(e) =>
                setValues((s) => ({ ...s, value: Number(e.target.value) }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="closeDate">Close Date</Label>
            <Input
              id="closeDate"
              type="date"
              value={values.closeDate ? values.closeDate.split("T")[0] : ""}
              onChange={(e) => {
                const dateValue = e.target.value;
                setValues((s) => ({
                  ...s,
                  closeDate: dateValue ? new Date(dateValue).toISOString() : "",
                }));
              }}
            />
          </div>

          <div className="grid gap-2">
            <Label>Stage</Label>
            <Select
              value={values.stage}
              onValueChange={(v) =>
                setValues((s) => ({
                  ...s,
                  stage: v as (typeof DEAL_STAGES)[number],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                {DEAL_STAGES.map((s) => (
                  <SelectItem value={s} key={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create" : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
