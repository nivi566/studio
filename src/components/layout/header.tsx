'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, LayoutDashboard, FileText } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons/logo';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { HeaderClient } from './header-client';

export function Header({ className }: { className?: string }) {
  
  const navLinks = [
    { href: '/', label: "Inicio" },
    { href: '/#services', label: "Servicios" },
    { href: '/tracking', label: "Seguir mi pedido" },
    { href: '/quienes-somos', label: "Quiénes somos" },
    { href: '/puntos-de-recogida', label: "Puntos de Recogida" },
    { href: '/blog', label: "Blog" },
    { href: '/contacto', label: "Contacto" },
    { href: '/assistent', label: "Asistente" },
  ];

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm", className)}>
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Logo />
        </div>
        
        <HeaderClient navLinks={navLinks} />
        
      </div>
    </header>
  );
}
