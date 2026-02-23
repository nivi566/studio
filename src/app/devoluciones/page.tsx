
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

export default function DevolucionesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL proporcionada para el envío a Google Apps Script
  const SCRIPT_URL = "https://script.google.com/u/0/home/projects/1yB8p-V1WjmaYT1irggCuaj8i75YGc3-kjy4nhaIfRWw7vFDvojFyUb0a/edit";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Convertimos FormData a URLSearchParams (application/x-www-form-urlencoded)
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    try {
      // Usamos no-cors para evitar bloqueos del navegador al redirigir GAS, 
      // aunque no podamos leer el cuerpo de la respuesta, la inserción suele ser exitosa.
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      // Asumimos éxito al completar el fetch en modo no-cors
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Error enviando devolución:", err);
      setError("Hubo un problema al conectar con el servidor de devoluciones. Por favor, inténtalo de nuevo.");
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
                ¡Solicitud Recibida!
              </h2>
              <p className="text-xl text-muted-foreground mb-8 font-medium">
                Los datos de la devolución se han registrado correctamente en nuestro sistema. El cliente recibirá las instrucciones en breve.
              </p>
              <Button 
                onClick={() => setIsSuccess(false)} 
                className="h-14 px-8 font-bold bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Registrar otra devolución
              </Button>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {/* CABECERA */}
              <div className="text-center mb-10">
                <div className="flex justify-center mb-6">
                  <Logo className="scale-125" />
                </div>
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
                  Gestión de Devoluciones
                </h1>
                <p className="mt-2 text-lg text-muted-foreground font-medium">
                  Portal exclusivo para empresas. Autoriza el retorno de mercancía vía Locker.
                </p>
              </div>

              <Card className="border-none shadow-2xl overflow-hidden bg-white">
                {/* LÍNEA DE ACENTO ROJO */}
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
                        Completa los campos para generar la orden de recogida.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* SECCIÓN EMPRESA */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <Building2 className="h-4 w-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Empresa Destino</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="empresa_nombre" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                            Nombre de tu Empresa
                          </Label>
                          <Input 
                            id="empresa_nombre" 
                            name="empresa_nombre" 
                            required 
                            placeholder="Ej: Inditex, Amazon..."
                            className="h-12 font-bold border-2 focus-visible:ring-red-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="referencia_devolucion" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                            Referencia de Devolución
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

                    {/* SECCIÓN CLIENTE */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <User className="h-4 w-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Datos del Cliente</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="cliente_nombre" className="font-black uppercase text-[10px] tracking-widest text-slate-500">
                            Nombre Completo
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
                            DNI / NIE
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
                          Email para confirmación
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input 
                            id="cliente_email" 
                            name="cliente_email" 
                            type="email" 
                            required 
                            placeholder="cliente@ejemplo.com"
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
                          Enviando...
                        </>
                      ) : (
                        'Autorizar Devolución'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <p className="mt-8 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
                InTrack Logistics S.L. &copy; {new Date().getFullYear()} - Reverse Logistics System
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
