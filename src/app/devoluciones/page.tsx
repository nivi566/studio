'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Undo2, Building2, User, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { useLanguage } from '@/context/LanguageContext';

export default function DevolucionesPage() {
  const { t } = useLanguage();
  const r = t.returnsPage;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL del Google Apps Script configurada exactamente como solicitaste
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzcWB7HGXoFvyWqrE_XQqSjuVArGyqKzrt3Pj3f-CeR_0l_dywEDxkWxsNtadHqEKBM/exec";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    /**
     * IMPORTANTE: Usamos URLSearchParams para convertir los datos al formato 
     * application/x-www-form-urlencoded, que es el que Google Apps Script 
     * procesa a través de e.parameter en la función doPost.
     */
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    try {
      /**
       * Usamos mode: 'no-cors' ya que GAS redirige la petición al finalizar y 
       * eso suele causar bloqueos de CORS en el navegador, aunque los datos 
       * se guarden correctamente en el Excel.
       */
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      // Si el fetch no lanza error, asumimos éxito (común con no-cors y GAS)
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Error enviando devolución:", err);
      setError(t.tracking.connError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          
          {isSuccess ? (
            <div className="max-w-2xl mx-auto text-center py-20 animate-in fade-in zoom-in duration-500">
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 p-6 rounded-full">
                  <CheckCircle2 className="h-20 w-20 text-red-600" />
                </div>
              </div>
              <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase text-slate-900">
                {r.successTitle || '¡Solicitud Recibida!'}
              </h2>
              <p className="text-xl text-muted-foreground mb-8 font-medium">
                {r.successMsg || 'Tu solicitud de devolución se ha registrado correctamente en nuestro sistema.'}
              </p>
              <Button 
                onClick={() => setIsSuccess(false)} 
                className="h-14 px-8 font-bold bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                {r.retry || 'Registrar otra devolución'}
              </Button>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="flex justify-center mb-6">
                  <Logo className="scale-125" />
                </div>
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
                  {r.title}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground font-medium">
                  {r.subtitle}
                </p>
              </div>

              <Card className="border-none shadow-2xl overflow-hidden bg-white">
                <div className="h-2 bg-red-600 w-full" />
                
                <CardHeader className="p-8 border-b">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-600 p-3 rounded-2xl text-white shadow-lg shadow-red-200">
                      <Undo2 className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-black tracking-tighter uppercase text-slate-800">
                        Formulario de Retorno
                      </CardTitle>
                      <CardDescription className="font-medium">
                        Completa los campos exactos para que nuestro sistema procese tu devolución.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* SECCIÓN DATOS ENVÍO */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <Building2 className="h-4 w-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Información de la Compra</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="empresa_nombre" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                            {r.companyLabel}
                          </Label>
                          <Input 
                            id="empresa_nombre" 
                            name="empresa_nombre" 
                            required 
                            placeholder="Ej: Amazon, Inditex..."
                            className="h-12 font-bold border-2 focus-visible:ring-red-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="referencia_devolucion" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                            {r.refLabel}
                          </Label>
                          <Input 
                            id="referencia_devolucion" 
                            name="referencia_devolucion" 
                            required 
                            placeholder="Ej: RET-2024-XXXX"
                            className="h-12 font-bold border-2 focus-visible:ring-red-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* SECCIÓN DATOS CLIENTE */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <User className="h-4 w-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Datos del Solicitante</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="cliente_nombre" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                            {r.nameLabel}
                          </Label>
                          <Input 
                            id="cliente_nombre" 
                            name="cliente_nombre" 
                            required 
                            placeholder="Nombre y apellidos"
                            className="h-12 font-bold border-2 focus-visible:ring-red-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cliente_dni" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                            {r.dniLabel}
                          </Label>
                          <Input 
                            id="cliente_dni" 
                            name="cliente_dni" 
                            required 
                            placeholder="12345678X"
                            className="h-12 font-bold border-2 focus-visible:ring-red-600"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cliente_email" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                          {r.emailLabel}
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input 
                            id="cliente_email" 
                            name="cliente_email" 
                            type="email" 
                            required 
                            placeholder="tuemail@ejemplo.com"
                            className="h-12 pl-12 font-bold border-2 focus-visible:ring-red-600"
                          />
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border-2 border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-bold">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        {error}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-16 text-lg font-black uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-100 transition-all active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {r.sending}
                        </>
                      ) : (
                        r.submit
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <p className="mt-8 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
                InTrack Logistics S.L. &copy; {new Date().getFullYear()} - Sistema de Logística Inversa
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
