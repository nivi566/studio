'use client';

import * as React from 'react';
import { Logo } from '@/components/icons/logo';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { HeaderClient } from './header-client';

export type NavLink = {
  href: string;
  label: string;
  subLinks?: NavLink[];
};

export function Header({ className }: { className?: string }) {
  const { t } = useLanguage();
  
  const navLinks: NavLink[] = [
    { href: '/', label: t.nav.home },
    { href: '/#services', label: t.nav.services },
    { 
      href: '#', 
      label: t.nav.orders,
      subLinks: [
        { href: '/tracking', label: t.nav.tracking },
        { href: '/pedidos', label: t.nav.place_order },
        { href: '/devoluciones', label: t.nav.returns },
        { href: '/puntos-de-recogida', label: t.nav.pickup },
      ]
    },
    { href: '/blog', label: t.nav.blog },
    { href: '/quienes-somos', label: t.nav.about },
    { href: '/contacto', label: t.nav.contact },
    { href: '/assistent', label: t.nav.assistant },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md transition-all duration-300", 
        className
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* El Logo a la izquierda */}
        <Logo className="mr-8 shrink-0" />
        
        {/* HeaderClient maneja el menú central y las acciones de la derecha */}
        <HeaderClient navLinks={navLinks} />
      </div>
    </header>
  );
}
