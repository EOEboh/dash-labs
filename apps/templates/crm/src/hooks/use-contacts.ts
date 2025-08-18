"use client";

import { useLocalStorage } from "./use-local-storage";
import type { Contact } from "@/lib/types";
import { initialContacts } from "@/lib/mock-data";

const KEY = "crm:contacts";

export function useContacts() {
  const { value, setValue } = useLocalStorage<Contact[]>(KEY, initialContacts);

  function addContact(c: Omit<Contact, "id">) {
    const id = crypto.randomUUID();
    setValue([{ id, ...c }, ...value]);
  }

  function updateContact(id: string, patch: Omit<Contact, "id">) {
    setValue(value.map((c) => (c.id === id ? { id, ...patch } : c)));
  }

  function deleteContact(id: string) {
    setValue(value.filter((c) => c.id !== id));
  }

  return {
    contacts: value,
    addContact,
    updateContact,
    deleteContact,
  };
}
