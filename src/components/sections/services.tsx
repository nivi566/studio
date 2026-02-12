"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, DollarSign, Smartphone, Globe, ShieldCheck, ShoppingCart, Rocket, ArrowRight, Bell, Lock, CreditCard, Clock, MapPin, Package, Building2, Layers, TrendingUp, Undo2, PiggyBank } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export function Services() {
  const { t } = useLanguage();
  const s = t.services.items;

  return (
    <section id="services" className="py-16 sm:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {t.services.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. Recepción de paquetería nacional */}
          <Dialog>
            <DialogTrigger asChild>
               <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader className="items-center">
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <Package className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{s.reception.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{s.reception.desc}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Package className="h-6 w-6 text-[#0B3C5D]" />
                  {s.reception.detail.title}
                </DialogTitle>
                <DialogDescription>
                  {s.reception.detail.intro}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground">{s.reception.detail.f1}</span> {s.reception.detail.f1d}
                    </div>
                  </li>
                   <li className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground">{s.reception.detail.f2}</span> {s.reception.detail.f2d}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground">{s.reception.detail.f3}</span> {s.reception.detail.f3d}
                    </div>
                  </li>
                </ul>
                <p className="pt-2 font-bold text-foreground">{s.reception.detail.footer}</p>
              </div>
               <DialogClose asChild>
                <Button type="button" variant="secondary">OK</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          {/* 2. Compras Internacionales */}
          <Dialog>
            <DialogTrigger asChild>
               <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader className="items-center">
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <Globe className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{s.intl.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{s.intl.desc}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-[#0B3C5D]" />
                  {s.intl.detail.title}
                </DialogTitle>
                <DialogDescription>
                  {s.intl.detail.intro}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.intl.detail.f1}</span> {s.intl.detail.f1d}</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.intl.detail.f2}</span> {s.intl.detail.f2d}</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.intl.detail.f3}</span> {s.intl.detail.f3d}</div>
                  </li>
                </ul>
                <p className="font-bold text-foreground">{s.intl.detail.footer}</p>
              </div>
               <DialogClose asChild>
                <Button type="button" variant="secondary">OK</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          {/* 3. Soluciones B2B */}
          <Dialog>
            <DialogTrigger asChild>
               <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader className="items-center">
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <Building2 className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{s.b2b.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{s.b2b.desc}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-[#0B3C5D]" />
                  {s.b2b.detail.title}
                </DialogTitle>
                <DialogDescription>
                  {s.b2b.detail.intro}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <Layers className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.b2b.detail.f1}</span> {s.b2b.detail.f1d}</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.b2b.detail.f2}</span> {s.b2b.detail.f2d}</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Undo2 className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.b2b.detail.f3}</span> {s.b2b.detail.f3d}</div>
                  </li>
                </ul>
                <p className="font-bold text-foreground">{s.b2b.detail.footer}</p>
              </div>
               <DialogClose asChild>
                <Button type="button" variant="secondary">OK</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          {/* 4. Envíos Urgentes 24h */}
          <Dialog>
            <DialogTrigger asChild>
               <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader className="items-center">
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <Zap className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{s.urgent.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{s.urgent.desc}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-[#0B3C5D]" />
                  {s.urgent.detail.title}
                </DialogTitle>
                <DialogDescription>
                  {s.urgent.detail.intro}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <Rocket className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.urgent.detail.f1}</span> {s.urgent.detail.f1d}</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.urgent.detail.f2}</span> {s.urgent.detail.f2d}</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.urgent.detail.f3}</span> {s.urgent.detail.f3d}</div>
                  </li>
                </ul>
                <p className="font-bold text-foreground">{s.urgent.detail.footer}</p>
              </div>
               <DialogClose asChild>
                <Button type="button" variant="secondary">OK</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          {/* 5. Seguimiento en Tiempo Real */}
          <Dialog>
            <DialogTrigger asChild>
               <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader className="items-center">
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <Smartphone className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{s.tracking.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{s.tracking.desc}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Smartphone className="h-6 w-6 text-[#0B3C5D]" />
                  {s.tracking.detail.title}
                </DialogTitle>
                <DialogDescription>
                  {s.tracking.detail.intro}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.tracking.detail.f1}</span> {s.tracking.detail.f1d}</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.tracking.detail.f2}</span> {s.tracking.detail.f2d}</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.tracking.detail.f3}</span> {s.tracking.detail.f3d}</div>
                  </li>
                </ul>
                <p className="font-bold text-foreground">{s.tracking.detail.footer}</p>
              </div>
               <DialogClose asChild>
                <Button type="button" variant="secondary">OK</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          {/* 6. Tarifas */}
          <Dialog>
            <DialogTrigger asChild>
               <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader className="items-center">
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <PiggyBank className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{s.pricing.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{s.pricing.desc}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-[#0B3C5D]" />
                  {s.pricing.detail.title}
                </DialogTitle>
                <DialogDescription>
                  {s.pricing.detail.intro}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <PiggyBank className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.pricing.detail.f1}</span> {s.pricing.detail.f1d}</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.pricing.detail.f2}</span> {s.pricing.detail.f2d}</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">{s.pricing.detail.f3}</span> {s.pricing.detail.f3d}</div>
                  </li>
                </ul>
                <p className="font-bold text-foreground">{s.pricing.detail.footer}</p>
              </div>
                <div className="flex gap-2">
                   <DialogClose asChild>
                    <Button type="button" variant="secondary" className="w-full">OK</Button>
                  </DialogClose>
                  <Button asChild className="w-full">
                    <Link href="/tarifas" className="flex items-center gap-2">
                        {s.pricing.detail.cta} <ArrowRight />
                    </Link>
                  </Button>
                </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
