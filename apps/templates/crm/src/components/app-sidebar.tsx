"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Target } from "lucide-react";
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaChartPie,
  FaFileExport,
  FaChevronDown,
} from "react-icons/fa";
import { MdViewKanban, MdBarChart } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";

const nav = [
  { title: "Overview", href: "/overview", icon: FaHome },
  { title: "Contacts", href: "/contacts", icon: FaUsers },
  { title: "Deals", href: "/deals", icon: MdViewKanban },
  { title: "Settings", href: "/settings", icon: IoSettings },
];

const salesNav = [
  { title: "Pipeline", href: "/sales/pipeline", icon: Target },
  { title: "Forecasts", href: "/sales/forecasts", icon: FaArrowTrendUp },
  { title: "Activities", href: "/sales/activities", icon: FaCalendarAlt },
];

const reportsNav = [
  { title: "Analytics", href: "/reports/analytics", icon: MdBarChart },
  { title: "Performance", href: "/reports/performance", icon: FaChartPie },
  { title: "Export Data", href: "/reports/export", icon: FaFileExport },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="size-6 rounded bg-primary/10" aria-hidden />
          <span className="font-semibold tracking-tight">Adven Sales Inc.</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <a
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors">
                <span>Sales</span>
                <FaChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <SidebarGroupContent>
                <SidebarMenu>
                  {salesNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        className="pl-6"
                      >
                        <a
                          href={item.href}
                          aria-current={
                            pathname === item.href ? "page" : undefined
                          }
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors">
                <span>Reports</span>
                <FaChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <SidebarGroupContent>
                <SidebarMenu>
                  {reportsNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        className="pl-6"
                      >
                        <a
                          href={item.href}
                          aria-current={
                            pathname === item.href ? "page" : undefined
                          }
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={"/placeholder.svg?height=64&width=64&query=user%20avatar"}
              alt="User avatar"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Jane Doe</div>
            <div className="truncate text-xs text-muted-foreground">
              jane@example.com
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
