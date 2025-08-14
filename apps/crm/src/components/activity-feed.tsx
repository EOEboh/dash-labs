import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type ActivityItem = {
  id: string;
  country: string;
  flagImg?: string; // Optional, if you want to display a flag image
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((it) => (
        <li key={it.id} className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`/${it.flagImg}?height=64&width=64`}
              alt={`${it.country} avatar`}
            />
            <AvatarFallback>
              {it.country
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h2>{it.country}</h2>
          </div>
          <div className="min-w-0">
            <h2>{it.country}</h2>
          </div>
        </li>
      ))}
      {items.length === 0 && (
        <li className="text-sm text-muted-foreground">No activity yet.</li>
      )}
    </ul>
  );
}
