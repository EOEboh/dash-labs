"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface TopNavProps {
  className?: string;
  userName?: string; // Optional prop for user name
}

export function TopNav({ className, userName }: TopNavProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [greeting, setGreeting] = useState("Good Morning");

  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  // Update greeting on component mount and every minute
  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getTimeBasedGreeting());
    };

    // Set initial greeting
    updateGreeting();

    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex w-full items-center gap-2", className)}>
      <div className="font-semibold tracking-tight">
        {greeting}{" "}
        {userName && <span className="text-primary">{userName}</span>}
      </div>
      <div className="flex-1" />
      <div className="hidden md:block w-full max-w-sm relative">
        <Search
          className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          aria-hidden
        />
        <Input
          placeholder="Search anything"
          className="pl-8"
          aria-label="Global search"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
