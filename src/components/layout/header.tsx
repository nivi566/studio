'use client';

import * as React from 'react';
import { Logo } from '@/components/icons/logo';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { HeaderClient } from './header-client';

export function Header({ className }: { className?: string }) {
  const { t } = useLanguage();
  
  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/#services', label: t.nav.services },
    { href: '/tracking', label: t.nav.tracking },
    { href: '/quienes-somos', label: t.nav.about },
    { href: '/puntos-de-recogida', label: t.nav.pickup },
    { href: '/blog', label: t.nav.blog },
    { href: '/contacto', label: t.nav.contact },
    { href: '/assistent', label: t.nav.assistant },
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
