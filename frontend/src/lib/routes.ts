import {
    NavigationItemProp,
    NavigationGroupItemProp,
  } from "@/types/index";
  
  import {
    BookText,
    LogOutIcon,
    LayoutDashboard,
    Mail,
    MessageSquare,
    Users,
  } from "lucide-react";
  
  const dashboard: NavigationItemProp[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/test",
     
    },
  ];
  
  const apps: NavigationItemProp[] = [
    {
      name: "Email",
      icon: Mail,
      path: "/email",
    },
    { name: "Chat", icon: MessageSquare, path: "/chat" },
    { name: "Users", icon: Users, path: "/users" },
    { name: "Invoices", icon: BookText, path: "/invoices" },
    { name: "Logout", icon: LogOutIcon, path: "/auth/signin" },

  ];
  
  
  
  export const routes: NavigationGroupItemProp[] = [
    {
      group: "",
      items: dashboard,
    },
    {
      group: "Services",
      items: apps,
    },
    
  ];
  