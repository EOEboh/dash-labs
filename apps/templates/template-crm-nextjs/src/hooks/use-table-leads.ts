import { Lead } from "@/lib/types/leads";
import { useQuery } from "@tanstack/react-query";

export function useTableLeads() {
  return useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await fetch("/api/leads");
      if (!res.ok) throw new Error("Failed to fetch leads");
      return res.json();
    },
  });
}
