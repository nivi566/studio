'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, LayoutDashboard, FileText, ClipboardList } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
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

type NavLink = {
  href: string;
  label: string;
};

export function HeaderClient({ navLinks }: { navLinks: NavLink[] }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  const isAnchorLink = (href: string) => href.startsWith('/#');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isAnchorLink(href)) {
      if (pathname !== '/') { 
        // Si no estamos en la home, dejamos que Link haga la navegación normal
        setIsMenuOpen(false);
      } else {
        // Si estamos en la home, hacemos scroll suave manual
        e.preventDefault();
        const targetId = href.substring(2);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        setIsMenuOpen(false);
      }
    } else {
      setIsMenuOpen(false);
    }
  };
  
  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <>
      <nav className="hidden md:flex md:items-center md:gap-6 text-sm">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-semibold text-foreground/70 transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-1 items-center justify-end gap-2">
        {!isLoading && (
          user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20">
                  <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold">{getInitials(user.nom)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">{user.nom}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.empresa}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Mi perfil</span>
                </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/documents')} className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Mis Facturas</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/albaranes')} className="cursor-pointer">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  <span>Mis Albaranes</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Salir</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
              <Button asChild style={{ backgroundColor: '#0B3C5D', color: 'white' }} className="shadow-md hover:shadow-lg transition-all active:scale-95">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          )
        )}
        
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-background">
            <SheetTitle className="sr-only">Navegación Móvil</SheetTitle>
            <SheetDescription className="sr-only">Enlaces principales del sitio para móviles</SheetDescription>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b pb-4">
                <Logo />
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="mt-8 flex flex-1 flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-bold text-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pb-8">
                 {!isLoading && !user && (
                    <Button asChild className="w-full" size="lg" style={{ backgroundColor: '#0B3C5D' }}>
                      <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                 )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
