import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


interface SidebardComponentProps {
  title: string;
  children: React.ReactNode;
}

export default function SidebardComponent({ title, children }: SidebardComponentProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="flex flex-col overflow-hidden min-h-screen w-full">


        <SiteHeader title={title}/>
        <div className="flex-1 overflow-y-auto p-6">
        {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}