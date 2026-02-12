"use client";
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer({ className }: { className?: string }) {
  const { t } = useLanguage();
  const f = t.footer;

  const footerLinks = {
    [f.sections.services]: [
      { label: t.nav.services, href: '/#services' },
      { label: 'Tarifas', href: '/tarifas' },
    ],
    [f.sections.company]: [
      { label: t.nav.about, href: '/quienes-somos' },
      { label: 'Quiero instalar un Locker', href: '/quiero-instalar-un-locker' },
      { label: t.nav.pickup, href: '/puntos-de-recogida' },
      { label: t.nav.contact, href: '/contacto' },
      { label: 'Trabaja con nosotros', href: '/trabaja-con-nosotros' },
      { label: t.nav.blog, href: '/blog' },
    ],
    [f.sections.legal]: [
      { label: 'Aviso Legal', href: '#' },
      { label: 'Política de Privacidad', href: '#' },
      { label: 'Términos y Condiciones', href: '/terminos-y-condiciones' },
    ],
  };

  return (
    <footer className={cn("bg-background text-foreground border-t", className)}>
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              {f.desc}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="text-muted-foreground hover:text-foreground">
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <ul className="mt-4 space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{f.newsletter}</h3>
            <p className="text-sm text-muted-foreground">{f.newsletterDesc}</p>
            <form action="https://formspree.io/f/xrbnkanl" method="POST" className="flex gap-2">
              <Input type="email" name="email" placeholder="Email" className="bg-background" required />
              <Button type="submit" variant="default">{f.subscribe}</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InTrack. {f.rights}</p>
        </div>
      </div>
    </footer>
  );
}
