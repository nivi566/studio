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
  
  // Enlaces de navegación utilizando las traducciones del contexto
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
        // CAMBIOS: 
        // 1. bg-background/60 para que sea más transparente que el original (95)
        // 2. backdrop-blur-md para un desenfoque más elegante del fondo
        // 3. border-white/10 para que el borde no sea tan duro sobre el fondo
        "sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md transition-all duration-300", 
        className
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <div className="mr-6 flex items-center space-x-2">
            <Logo />
          </div>
          
          {/* Este componente maneja la navegación y el selector de idiomas */}
          <HeaderClient navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}