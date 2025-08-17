import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNav } from "@/components/top-nav";
import QueryProvider from "@/components/query-provider";

export const metadata: Metadata = {
  title: "CRM Dashboard",
  description:
    "A Turborepo-ready CRM dashboard template built with Next.js, Tailwind, and shadcn/ui.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-svh bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="flex min-h-svh w-full flex-col">
                <header className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                  <div className="container mx-auto flex items-center gap-2 px-4 py-3">
                    <SidebarTrigger />
                    <TopNav />
                  </div>
                </header>
                <main className="container mx-auto flex-1 px-4 py-6">
                  {children}
                </main>
              </div>
            </SidebarProvider>
            {/* <Toaster /> */}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
