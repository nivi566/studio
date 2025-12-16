'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons/logo';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#services', label: 'Servicios' },
  { href: '/tracking', label: 'Seguir mi pedido' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/puntos-de-recogida', label: 'Puntos de Recogida' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAnchorLink = (href: string) => href.startsWith('/#');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isAnchorLink(href)) {
      if (pathname !== '/') {
        router.push(href);
      } else {
        e.preventDefault();
        const targetId = href.substring(2);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
        router.push(href);
    }
    setIsMenuOpen(false);
  };
  
  const allNavLinks = navLinks;


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Logo />
        </div>
        
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
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
                <nav className="mt-8 flex flex-1 flex-col gap-6">
                  {allNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground"
                      onClick={(e) => handleNavClick(e, link.href)}
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
