"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Profile = {
  name: string;
  email: string;
  company: string;
};

const STORAGE_KEY = "crm:profile";

export default function SettingsPage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    company: "",
  });

  useEffect(() => {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
  }, []);

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    toast({
      title: "Profile saved",
      description: "Your settings have been updated.",
    });
  }

  return (
    <div className="max-w-2xl">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) =>
                setProfile((s) => ({ ...s, name: e.target.value }))
              }
              placeholder="Your name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile((s) => ({ ...s, email: e.target.value }))
              }
              placeholder="you@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={(e) =>
                setProfile((s) => ({ ...s, company: e.target.value }))
              }
              placeholder="Acme Inc."
            />
          </div>
          <div className="pt-2">
            <Button onClick={save}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
