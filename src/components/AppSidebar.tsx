'use client';

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
  SidebarSeparator,
} from './ui/sidebar';
import { usePathname } from 'next/navigation';
import { Project } from '@prisma/client';
import { useEffect, useState } from 'react';

const ITEMS = [
  { title: 'Drawing', url: '/project/X33rfd', icon: Brush, id: 'X33rfd' },
  { title: '3D', url: '/project/X33rfr', icon: Box, id: 'X33rfr' },
];

const AppSidebar = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const pathname = usePathname();

  // useEffect(async () => {
  //   const res = await fetch('/api/projects', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   const data = await res.json();
  //   setProjects(data);
  // }, []);

  return (
    <Sidebar>
      <SidebarContent className="bg-zinc-800 text-slate-200">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-200">FranciTask</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={pathname === '/' ? 'bg-zinc-700 hover:bg-zinc-700' : ''}
                >
                  <a href="/">
                    <Home className="text-slate-100" />
                    <span className="text-slate-100 font-semibold">Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator />
              {ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      pathname === item.url ? 'bg-zinc-700 hover:bg-zinc-700' : ''
                    }
                  >
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
