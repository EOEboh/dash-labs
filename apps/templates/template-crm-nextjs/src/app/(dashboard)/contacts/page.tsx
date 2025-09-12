"use client";

import { useMemo, useState } from "react";
import { Plus, Search, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContacts } from "@/hooks/use-contacts";
import { ContactForm } from "@/components/contact-form";
import { ConfirmDialog } from "@/components/confirm-dialog";
// import { useToast } from "@/hooks/use-toast";
import type { Contact } from "@/lib/types/contacts";

export default function ContactsPage() {
  // const { toast } = useToast();
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "status">("name");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; id?: string }>({
    open: false,
  });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const base = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
    );
    return [...base].sort((a, b) => {
      if (sortBy === "status") return a.status.localeCompare(b.status);
      if (sortBy === "email") return a.email.localeCompare(b.email);
      return a.name.localeCompare(b.name);
    });
  }, [contacts, query, sortBy]);

  function onCreate(values: Omit<Contact, "id">) {
    addContact(values);
    // toast({
    //   title: "Contact added",
    //   description: `${values.name} was created.`,
    // });
  }

  function onEdit(values: Omit<Contact, "id">) {
    if (!editing) return;
    updateContact(editing.id, values);
    // toast({
    //   title: "Contact updated",
    //   description: `${values.name} was updated.`,
    // });
  }

  function onDelete() {
    if (!confirm.id) return;
    const c = contacts.find((x) => x.id === confirm.id);
    deleteContact(confirm.id);
    setConfirm({ open: false });
    // toast({
    //   title: "Contact deleted",
    //   description: `${c?.name ?? "Contact"} was removed.`,
    // });
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl">Contacts</CardTitle>
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:gap-2">
            <div className="relative flex-1 min-w-0">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden
              />
              <Input
                aria-label="Search contacts"
                placeholder="Search contacts"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowUpDown className="h-4 w-4" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setSortBy("name")}
                  aria-label="Sort by name"
                >
                  Name
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("email")}
                  aria-label="Sort by email"
                >
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("status")}
                  aria-label="Sort by status"
                >
                  Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[60px]" aria-label="Actions">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            "/placeholder.svg?height=64&width=64&query=circle%20avatar"
                          }
                          alt={`${c.name} avatar`}
                        />
                        <AvatarFallback aria-hidden>
                          {c.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{c.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {c.company ?? ""}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={c.status === "Active" ? "default" : "secondary"}
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={`Actions for ${c.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditing(c);
                            setFormOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setConfirm({ open: true, id: c.id })}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No contacts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ContactForm
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={editing ? "edit" : "create"}
        initialValues={editing ?? undefined}
        onSubmit={(vals: Omit<Contact, "id">) => {
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
        title="Delete contact?"
        description="This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onCancel={() => setConfirm({ open: false })}
        onConfirm={onDelete}
      />
    </div>
  );
}
