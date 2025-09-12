"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface TopNavProps {
  className?: string;
  userName?: string;
}

export function TopNav({ className, userName }: TopNavProps) {
  const { theme, setTheme } = useTheme();

  const [greeting, setGreeting] = useState("Good Morning");

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

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getTimeBasedGreeting());
    };

    updateGreeting();

    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "system":
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Switch to dark mode";
      case "dark":
        return "Switch to system mode";
      case "system":
        return "Switch to light mode";
      default:
        return "Toggle theme";
    }
  };

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
        aria-label={getThemeLabel() || "Toggle theme"}
        onClick={cycleTheme}
        className="relative"
      >
        {getThemeIcon()}
        {theme === "system" && (
          <div
            className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary"
            aria-hidden="true"
          />
        )}
      </Button>
    </div>
  );
}
