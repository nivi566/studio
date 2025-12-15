'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut, Building, LayoutDashboard } from 'lucide-react';
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
import { Skeleton } from '@/components/ui/skeleton';


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
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const isAnchorLink = (href: string) => href.startsWith('/#');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isAnchorLink(href)) {
      if (pathname !== '/') {
        router.push(href);
        setIsMenuOpen(false);
        return;
      }

      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
        router.push(href);
    }
    setIsMenuOpen(false);
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-transparent backdrop-blur supports-[backdrop-filter]:bg-transparent/60">
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
          {user && (
             <Link
              href="/dashboard"
              onClick={(e) => handleClick(e, "/dashboard")}
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-auto justify-start gap-2">
                    <User className="h-5 w-5" />
                    <span className='hidden sm:inline'>{user.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    {user.empresa && (
                       <p className="text-xs leading-none text-muted-foreground flex items-center gap-1">
                         <Building className="w-3 h-3" /> {user.empresa}
                       </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Tancar Sessió</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            </>
          )}

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
                   {user && (
                    <Link
                      href="/dashboard"
                      className="text-lg font-medium text-foreground"
                      onClick={(e) => handleClick(e, "/dashboard")}
                    >
                      Dashboard
                    </Link>
                  )}
                </nav>
                 <div className="mt-auto border-t pt-4">
                  {user ? (
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Tancar Sessió
                    </Button>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      <Button variant="default" className="w-full" asChild>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
