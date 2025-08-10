import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type ActivityItem = {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((it) => (
        <li key={it.id} className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={"/placeholder.svg?height=64&width=64&query=user%20avatar"}
              alt={`${it.user} avatar`}
            />
            <AvatarFallback>
              {it.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm">
              <span className="font-medium">{it.user}</span>{" "}
              <span className="text-muted-foreground">{it.action}</span>{" "}
              <span className="font-medium">{it.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{it.time}</p>
          </div>
        </li>
      ))}
      {items.length === 0 && (
        <li className="text-sm text-muted-foreground">No activity yet.</li>
      )}
    </ul>
  );
}
