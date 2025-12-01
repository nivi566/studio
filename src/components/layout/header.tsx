'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#services', label: 'Servicios' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/puntos-de-recogida', label: 'Puntos de Recogida' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const isAnchorLink = (href: string) => href.startsWith('/#');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isAnchorLink(href)) {
      // If we are not on the home page, we need to navigate there first
      if (pathname !== '/') {
        // The browser will handle the navigation and then the scroll
        return;
      }

      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Logo />
        </div>
        
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Registrarse</Link>
          </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Logo />
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close Menu</span>
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground"
                      onClick={(e) => handleClick(e, link.href)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
