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
import type { Contact } from "@/lib/types";

type Values = Omit<Contact, "id">;

export function ContactForm({
  open,
  onOpenChange,
  mode,
  initialValues,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: "create" | "edit";
  initialValues?: Contact;
  onSubmit: (values: Values) => void;
}) {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    status: "Active",
    company: "",
  });

  useEffect(() => {
    if (initialValues) {
      const { id, ...rest } = initialValues;
      setValues(rest);
    } else {
      setValues({ name: "", email: "", status: "Active", company: "" });
    }
  }, [initialValues, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="contact-form-desc">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Contact" : "Edit Contact"}
          </DialogTitle>
          <DialogDescription id="contact-form-desc">
            {mode === "create"
              ? "Create a new contact."
              : "Update contact details."}
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={values.name}
              onChange={(e) =>
                setValues((s) => ({ ...s, name: e.target.value }))
              }
              required
              placeholder="Jane Doe"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) =>
                setValues((s) => ({ ...s, email: e.target.value }))
              }
              required
              placeholder="jane@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={values.company ?? ""}
              onChange={(e) =>
                setValues((s) => ({ ...s, company: e.target.value }))
              }
              placeholder="Acme Inc."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              value={values.status}
              onChange={(e) =>
                setValues((s) => ({ ...s, status: e.target.value }))
              }
              placeholder="Active or Inactive"
            />
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
