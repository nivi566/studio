'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, LayoutDashboard, FileText, Globe, ChevronDown, Bookmark } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Logo } from '@/components/icons/logo';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
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
import { NavLink } from './header';

export function HeaderClient({ navLinks }: { navLinks: NavLink[] }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const isAnchorLink = (href: string) => href.startsWith('/#');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isAnchorLink(href)) {
      if (pathname !== '/') { 
        setIsMenuOpen(false);
      } else {
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
    } else if (href === '#') {
      e.preventDefault();
    } else {
      setIsMenuOpen(false);
    }
  };
  
  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const dynamicLinks = React.useMemo(() => {
    return navLinks.map(link => {
      if (link.label === t.nav.orders) {
        const subLinks = [...(link.subLinks || [])];
        const isClient = user?.rol?.toLowerCase() === 'cliente';
        const isDashboard = pathname.includes('/dashboard');
        
        if (user && isClient && isDashboard) {
          if (!subLinks.find(s => s.href === '/booking')) {
            subLinks.push({ href: '/booking', label: t.nav.booking });
          }
        }
        
        return { ...link, subLinks };
      }
      return link;
    });
  }, [navLinks, user, pathname, t]);

  const languages: { code: Language; label: string }[] = [
    { code: 'es', label: 'Español' },
    { code: 'ca', label: 'Català' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <>
      <nav className="hidden md:flex md:items-center md:gap-6 text-sm">
        {dynamicLinks.map((link) => (
          link.subLinks ? (
            <DropdownMenu key={link.label}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 font-black text-foreground/70 transition-colors hover:text-primary tracking-tight outline-none">
                  {link.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[180px]">
                {link.subLinks.map((sub) => (
                  <DropdownMenuItem key={sub.href} asChild>
                    <Link
                      href={sub.href}
                      onClick={(e) => handleNavClick(e as any, sub.href)}
                      className="font-bold cursor-pointer w-full flex items-center justify-between"
                    >
                      {sub.label}
                      {sub.href === '/booking' && <Bookmark className="h-3 w-3 text-primary ml-2" />}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-black text-foreground/70 transition-colors hover:text-primary tracking-tight"
            >
              {link.label}
            </Link>
          )
        ))}
      </nav>

      <div className="flex flex-1 items-center justify-end gap-3">
        {/* Selector de idioma con Icono de Mundo */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Globe className="h-5 w-5 text-foreground/70" />
              <span className="sr-only">Seleccionar idioma</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[120px]">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "font-bold cursor-pointer",
                  language === lang.code ? "text-primary bg-primary/5" : ""
                )}
              >
                <span className="flex-1">{lang.label}</span>
                <span className="text-[10px] font-black uppercase ml-2 opacity-40">{lang.code}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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
                    <p className="text-sm font-black leading-none">{user.nom}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.empresa}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer font-bold">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>{t.nav.profile}</span>
                </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/documents')} className="cursor-pointer font-bold">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{t.nav.invoices}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer focus:text-destructive font-bold">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.nav.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-black tracking-tight shadow-md hover:shadow-lg transition-all active:scale-95 text-xs h-9 px-4">
              <Link href="/login">{t.nav.login}</Link>
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
              
              <div className="py-6 flex justify-around border-b bg-muted/30">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "text-[11px] font-black uppercase tracking-widest px-2 py-1 rounded",
                      language === lang.code ? "bg-primary text-primary-foreground" : "text-foreground/60"
                    )}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>

              <nav className="mt-4 flex flex-1 flex-col gap-2">
                {dynamicLinks.map((link) => (
                  <React.Fragment key={link.label}>
                    {link.subLinks ? (
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-4 mb-2">{link.label}</span>
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="text-xl font-black text-foreground hover:text-primary transition-colors py-2 tracking-tighter flex items-center justify-between"
                            onClick={(e) => handleNavClick(e, sub.href)}
                          >
                            {sub.label}
                            {sub.href === '/booking' && <Bookmark className="h-5 w-5 text-primary" />}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xl font-black text-foreground hover:text-primary transition-colors py-3 border-b border-border/30 tracking-tighter"
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </nav>
              <div className="mt-auto pb-8">
                 {!isLoading && !user && (
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black tracking-widest" size="lg">
                      <Link href="/login">{t.nav.login}</Link>
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
