import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const footerLinks = {
  'Servicios': [
    { label: 'Envíos Urgentes', href: '#' },
    { label: 'Envíos Económicos', href: '#' },
    { label: 'Logística Integral', href: '#' },
    { label: 'Transporte Internacional', href: '#' },
  ],
  'Compañía': [
    { label: 'Quiénes somos', href: '/quienes-somos' },
    { label: 'Sedes', href: '#' },
    { label: 'Puntos de Recogida', href: '/puntos-de-recogida' },
    { label: 'Contacto', href: '/contacto' },
    { label: 'Trabaja con nosotros', href: '#' },
    { label: 'Prensa', href: '#' },
  ],
  'Legal': [
    { label: 'Aviso Legal', href: '#' },
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Política de Cookies', href: '#' },
    { label: 'Términos y Condiciones', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-background/80 max-w-xs">
              Tu solución de confianza para envíos nacionales e internacionales. Rapidez, seguridad y precios competitivos.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="text-background/60 hover:text-background">
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-semibold text-background">{title}</h3>
                <ul className="mt-4 space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-background/80 hover:text-background">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-background">Suscríbete a nuestro boletín</h3>
            <p className="text-sm text-background/80">Recibe las últimas noticias y ofertas especiales directamente en tu bandeja de entrada.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Tu email" className="bg-background/10 text-background border-background/20 placeholder:text-background/50" />
              <Button type="submit" variant="default">Suscribirse</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-8 text-center text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} InTrack. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
