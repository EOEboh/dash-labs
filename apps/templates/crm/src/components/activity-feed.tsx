import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "./ui/progress";

export type ActivityItem = {
  id: string;
  country: string;
  flagImg?: string; // Optional, if you want to display a flag image
  progressValue: number;
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((it) => (
        <li key={it.id} className="flex items-center space-x-4">
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
          <div className="w-full flex items-center gap-3">
            <h2>{it.country}</h2>
            <Progress value={it.progressValue} className="w-[60%]" />
          </div>
        </li>
      ))}
      {items.length === 0 && (
        <li className="text-sm text-muted-foreground">No activity yet.</li>
      )}
    </ul>
  );
}
