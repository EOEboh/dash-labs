import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { LeadsTable } from "@/components/ai/LeadsTable";

export default function LeadsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">CRM Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and track your sales leads
        </p>
      </div>
      <LeadsTable />
    </div>
  );
}
