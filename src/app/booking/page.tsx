'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Send, CheckCircle2, Package, Ruler, Weight } from 'lucide-react';

export default function BookingPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // URL DE TU GOOGLE APPS SCRIPT (Misma que el dashboard)
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz11VTa8UXoSJXlRk1e53aOCFxzjexp5DNUhpotDONP3tUISE6bT6bMiTzSRtFqikhn/exec";

  const services = [
    "Recepción de paquetería nacional",
    "Compras internacionales",
    "Soluciones B2B y E-commerce",
    "Envíos urgentes 24h"
  ];

  const text = {
    es: { title: "Nueva Solicitud de Booking", desc: "Complete los detalles para solicitar un nuevo servicio.", service: "Servicio solicitado", date: "Fecha Requerida", back: "Volver", send: "Enviar Solicitud", success: "¡Solicitud Enviada!", thanks: "Hemos recibido su petición correctamente.", dims: "Medidas (cm)", weight: "Peso (kg)", observations: "Observaciones adicionales" },
    ca: { title: "Nova Sol·licitud de Booking", desc: "Ompli els detalls per sol·licitar un nou servei.", service: "Servei sol·licitat", date: "Data Requerida", back: "Tornar", send: "Enviar Sol·licitud", success: "Sol·licitud Enviada!", thanks: "Hem rebut la seva petició correctament.", dims: "Mides (cm)", weight: "Pes (kg)", observations: "Observacions addicionals" },
    en: { title: "New Booking Request", desc: "Fill in the details to request a new service.", service: "Requested Service", date: "Required Date", back: "Back", send: "Send Request", success: "Request Sent!", thanks: "We have received your request correctly.", dims: "Dimensions (cm)", weight: "Weight (kg)", observations: "Additional observations" }
  }[language as 'es' | 'ca' | 'en'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    // Formateamos los detalles uniendo servicio, medidas y peso
    const detallesFormateados = `
      SERVICIO: ${formData.get('service')}
      MEDIDAS: ${formData.get('length')}x${formData.get('width')}x${formData.get('height')} cm
      PESO: ${formData.get('weight')} kg
      OBS: ${formData.get('details')}
    `.trim();

    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      data: formData.get('date'),
      usuari: user.usuari,
      empresa: user.empresa,
      detalls: detallesFormateados,
      estat: "Pendent"
    };

    try {
      // Enviamos mediante POST al Google Apps Script
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: 'no-cors', // Importante para Google Scripts
        body: JSON.stringify(newBooking)
      });
      
      setSubmitted(true);
      setTimeout(() => router.push('/dashboard'), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center p-8 shadow-xl border-none">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black italic uppercase">{text.success}</h2>
            <p className="text-slate-500 mt-2">{text.thanks}</p>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard')}
            className="mb-6 text-slate-500 hover:text-[#f39200] font-bold"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> {text.back}
          </Button>

          <Card className="border-none shadow-2xl overflow-hidden">
            <div className="h-2 bg-[#f39200]" />
            <CardHeader className="bg-white">
              <CardTitle className="text-3xl font-black italic uppercase text-slate-900">{text.title}</CardTitle>
              <CardDescription>{text.desc}</CardDescription>
            </CardHeader>
            <CardContent className="bg-white p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* FECHA Y SERVICIO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-[10px] uppercase text-slate-400">{text.date}</Label>
                    <Input name="date" type="date" required className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-[10px] uppercase text-slate-400">{text.service}</Label>
                    <select 
                      name="service" 
                      required 
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f39200]"
                    >
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* MEDIDAS Y PESO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl">
                  <div className="space-y-3">
                    <Label className="font-bold text-[10px] uppercase text-slate-400 flex items-center gap-2">
                      <Ruler className="h-3 w-3" /> {text.dims}
                    </Label>
                    <div className="flex gap-2">
                      <Input name="length" placeholder="L" type="number" required className="bg-white" />
                      <Input name="width" placeholder="A" type="number" required className="bg-white" />
                      <Input name="height" placeholder="H" type="number" required className="bg-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="font-bold text-[10px] uppercase text-slate-400 flex items-center gap-2">
                      <Weight className="h-3 w-3" /> {text.weight}
                    </Label>
                    <Input name="weight" placeholder="0.00" type="number" step="0.01" required className="bg-white" />
                  </div>
                </div>

                {/* OBSERVACIONES */}
                <div className="space-y-2">
                  <Label className="font-bold text-[10px] uppercase text-slate-400">{text.observations}</Label>
                  <Textarea 
                    name="details" 
                    placeholder="Escriba aquí cualquier detalle adicional..." 
                    className="min-h-[100px] border-slate-200 focus:border-[#f39200]" 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#f39200] hover:bg-slate-900 text-white font-black uppercase italic py-6 transition-all shadow-lg shadow-orange-200"
                >
                  {isSubmitting ? "ENVIANDO..." : <><Send className="mr-2 h-4 w-4" /> {text.send}</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}