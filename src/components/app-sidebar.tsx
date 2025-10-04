import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconMessageChatbot,
  IconSettings,
  IconCalendar
} from "@tabler/icons-react"
import { MyGenLogo } from "@/components/MyGenLogo"


import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"
import { NavModeToggle } from "./nav-mode-toggle"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "MyGennie",
      url: "/chat",
      icon: IconMessageChatbot,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: IconCalendar,
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  // Create user data for NavUser component
  const userData = user ? {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    avatar: "/avatars/user.jpg", // Default avatar
  } : {
    name: "Guest",
    email: "guest@example.com",
    avatar: "/avatars/guest.jpg",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <MyGenLogo className="!size-9 logo-primary" size={36} />
                <span className="text-base font-semibold">MyGen Wellness</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto">
          <NavModeToggle />
        </NavSecondary>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
