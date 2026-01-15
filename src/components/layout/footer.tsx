
'use client';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const t = useTranslations('Footer');

  const footerLinks = {
    [t('services.title')]: [
      { label: t('services.urgent'), href: '#' },
      { label: t('services.integral'), href: '#' },
      { label: t('services.international'), href: '#' },
      { label: t('services.rates'), href: '/tarifas' },
    ],
    [t('company.title')]: [
      { label: t('company.about'), href: '/quienes-somos' },
      { label: t('company.locker'), href: '/quiero-instalar-un-locker' },
      { label: t('company.pickup'), href: '/puntos-de-recogida' },
      { label: t('company.contact'), href: '/contacto' },
      { label: t('company.work'), href: '/trabaja-con-nosotros' },
      { label: t('company.press'), href: '/prensa' },
    ],
    [t('legal.title')]: [
      { label: t('legal.notice'), href: '#' },
      { label: t('legal.privacy'), href: '#' },
      { label: t('legal.cookies'), href: '#' },
      { label: t('legal.terms'), href: '/terminos-y-condiciones' },
    ],
  };

  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              {t('tagline')}
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
            <h3 className="font-semibold text-foreground">{t('newsletter.title')}</h3>
            <p className="text-sm text-muted-foreground">{t('newsletter.description')}</p>
            <form action="https://formspree.io/f/xrbnkanl" method="POST" className="flex gap-2">
              <Input type="email" name="email" placeholder={t('newsletter.placeholder')} className="bg-background" required />
              <Button type="submit" variant="default">{t('newsletter.button')}</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InTrack. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
