'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Package, Building2, User, Mail, ShieldCheck, ChevronRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext'; 

export default function PedidosPage() {
  const { t } = useLanguage();
  const { user } = useAuth(); 
  const o = t.ordersPage;

  // ESTADOS
  const [trackingCode, setTrackingCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generador ONL-0XX
  const generarCodigoInterno = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setTrackingCode(`ONL-0${num1}${num2}`);
  };

  useEffect(() => {
    generarCodigoInterno();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scriptURL = "https://script.google.com/macros/s/AKfycbwn7kGe--3mFqaD6BjtK08diNQ-vcj3jtmW-HIO7Vs-RrfK4sFKWgIq5gIEacsd01xB/exec";
    const form = e.currentTarget;
    const formData = new FormData(form);

    // PREPARAMOS EL OBJETO PARA EL EXCEL
    const pedidoData = {
      id: trackingCode,
      data: new Date().toLocaleDateString(),
      // Si el usuario está logueado usamos su usuari, si no, "invitado"
      usuari: user ? user.usuari : "invitado",
      empresa: user ? user.empresa : formData.get('empresa_nombre'),
      detalls: `Destinatario: ${formData.get('cliente_nombre')} | DNI: ${formData.get('cliente_dni')} | Email: ${formData.get('cliente_email')}`,
      estat: "Pendiente" // <--- CAMBIADO A PENDIENTE POR DEFECTO
    };

    try {
      await fetch(scriptURL, { 
        method: 'POST', 
        body: JSON.stringify(pedidoData),
        mode: 'no-cors' 
      });
      
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Hubo un error al registrar el pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          
          {isSuccess ? (
            <div className="max-w-2xl mx-auto text-center py-20 animate-in fade-in zoom-in duration-500">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-6 rounded-full">
                  <CheckCircle2 className="h-20 w-20 text-green-600" />
                </div>
              </div>
              <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase text-slate-900">
                ¡Gracias por hacer tu envío con nosotros!
              </h2>
              <p className="text-xl text-muted-foreground mb-8 font-medium">
                Tu pedido con referencia <span className="font-bold text-primary">{trackingCode}</span> ya está en proceso.
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="h-14 px-8 font-bold border-2 border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Registrar otro envío
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full mb-4 border border-primary/20">
                  <Package className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Gestión de Lockers</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-foreground mb-4 uppercase">
                  {o.title}
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  {o.subtitle}
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* BLOQUE EMPRESA */}
                  <Card className="border-4 border-slate-100 shadow-none hover:border-primary/20 transition-colors">
                    <CardHeader className="border-b bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary p-2.5 rounded-xl text-white">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-black tracking-tighter uppercase">{o.senderTitle}</CardTitle>
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
                          defaultValue={user?.empresa || ""}
                          placeholder="Ej: Amazon, Inditex..."
                          className="h-12 font-bold text-lg border-2 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="referencia_tracking" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                          Referencia Tracking (Automática)
                        </Label>
                        <div className="relative">
                          <Input 
                            id="referencia_tracking" 
                            name="referencia_tracking" 
                            value={trackingCode}
                            readOnly
                            className="h-12 font-black text-lg border-2 bg-slate-50 text-primary border-primary/20"
                          />
                          <button 
                            type="button" 
                            onClick={generarCodigoInterno}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white rounded-md transition-colors"
                          >
                            <RefreshCw className="h-4 w-4 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* BLOQUE CLIENTE */}
                  <Card className="border-4 border-slate-100 shadow-none hover:border-primary/20 transition-colors">
                    <CardHeader className="border-b bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-900 p-2.5 rounded-xl text-white">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-black tracking-tighter uppercase">{o.recipientTitle}</CardTitle>
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
                          <Input id="cliente_nombre" name="cliente_nombre" required placeholder="Nombre completo" className="h-12 font-bold text-lg border-2 focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cliente_dni" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                            {o.clientDniLabel}
                          </Label>
                          <Input id="cliente_dni" name="cliente_dni" required placeholder="12345678X" className="h-12 font-bold text-lg border-2 focus-visible:ring-primary" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cliente_email" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                          Email de contacto
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input 
                            id="cliente_email" 
                            name="cliente_email" 
                            type="email" 
                            required 
                            placeholder="tuemail@ejemplo.com" 
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

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-20 text-xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-xl active:scale-95 transition-all group"
                    >
                      {isSubmitting ? 'Registrando pedido...' : o.submitButton}
                      {!isSubmitting && <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}