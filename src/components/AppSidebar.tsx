/* eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Brush,
  Home,
  Box,
  Cat,
  Eclipse,
  Frown,
  Heart,
  Star,
  Layers,
  WandSparkles,
  Citrus,
  AlarmClock,
  Cherry,
  Drum,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

const ITEMS = [
  { title: 'Life', url: '/', icon: Home },
  { title: 'Drawing', url: '/home', icon: Brush },
  { title: '3D', url: '/modelling', icon: Box },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="bg-zinc-800 text-slate-200">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-200">FranciTask</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
