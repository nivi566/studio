'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Package, Building2, User, Mail, ShieldCheck, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PedidosPage() {
  const { t } = useLanguage();
  const o = t.ordersPage;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full mb-4 border border-primary/20">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Gestión de Lockers</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-foreground mb-4">
              {o.title}
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              {o.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <form action="https://formspree.io/f/xrbnkanl" method="POST" className="space-y-8">
              
              {/* BLOQUE EMPRESA (REMITENTE) */}
              <Card className="border-4 border-slate-100 shadow-none hover:border-primary/20 transition-colors">
                <CardHeader className="border-b bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary p-2.5 rounded-xl">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-black tracking-tighter">{o.senderTitle}</CardTitle>
                      <CardDescription className="font-medium">{o.senderDesc}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="empresa_nombre" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                      {o.companyLabel}
                    </Label>
                    <Input 
                      id="empresa_nombre" 
                      name="empresa_nombre" 
                      required 
                      placeholder="Ej: Logística S.A."
                      className="h-12 font-bold text-lg border-2 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referencia_tracking" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                      {o.trackingLabel}
                    </Label>
                    <Input 
                      id="referencia_tracking" 
                      name="referencia_tracking" 
                      required 
                      placeholder="Referencia del envío"
                      className="h-12 font-bold text-lg border-2 focus-visible:ring-primary"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* BLOQUE CLIENTE (DESTINATARIO) */}
              <Card className="border-4 border-slate-100 shadow-none hover:border-primary/20 transition-colors">
                <CardHeader className="border-b bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-900 p-2.5 rounded-xl">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-black tracking-tighter">{o.recipientTitle}</CardTitle>
                      <CardDescription className="font-medium">{o.recipientDesc}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cliente_nombre" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                        {o.clientNameLabel}
                      </Label>
                      <Input 
                        id="cliente_nombre" 
                        name="cliente_nombre" 
                        required 
                        placeholder="Nombre completo"
                        className="h-12 font-bold text-lg border-2 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cliente_dni" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                        {o.clientDniLabel}
                      </Label>
                      <Input 
                        id="cliente_dni" 
                        name="cliente_dni" 
                        required 
                        placeholder="12345678X"
                        className="h-12 font-bold text-lg border-2 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cliente_email" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                      {o.clientEmailLabel}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        id="cliente_email" 
                        name="cliente_email" 
                        type="email" 
                        required 
                        placeholder="cliente@email.com"
                        className="h-12 pl-12 font-bold text-lg border-2 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                      <p className="text-[11px] font-bold text-slate-600 italic">
                        {o.helpText}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* BOTÓN DE ENVÍO */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-20 text-xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/20 active:scale-95 transition-all group"
                >
                  {o.submitButton}
                  <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

            </form>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
