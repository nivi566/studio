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
import { ChevronLeft, Send, CheckCircle2 } from 'lucide-react';

export default function BookingPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Traducciones del formulario
  const text = {
    es: { title: "Nueva Solicitud de Booking", desc: "Complete los detalles para solicitar un nuevo servicio.", service: "Descripción del Servicio", date: "Fecha Requerida", back: "Volver", send: "Enviar Solicitud", success: "¡Solicitud Enviada!", thanks: "Hemos recibido su petición correctamente." },
    ca: { title: "Nova Sol·licitud de Booking", desc: "Ompli els detalls per sol·licitar un nou servei.", service: "Descripció del Servei", date: "Data Requerida", back: "Tornar", send: "Enviar Sol·licitud", success: "Sol·licitud Enviada!", thanks: "Hem rebut la seva petició correctament." },
    en: { title: "New Booking Request", desc: "Fill in the details to request a new service.", service: "Service Description", date: "Required Date", back: "Back", send: "Send Request", success: "Request Sent!", thanks: "We have received your request correctly." }
  }[language as 'es' | 'ca' | 'en'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      data: formData.get('date'),
      usuari: user.usuari,
      empresa: user.empresa,
      detalls: formData.get('details'),
      estat: "Pendent"
    };

    try {
      await fetch("https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=solicituds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [newBooking] })
      });
      setSubmitted(true);
      setTimeout(() => router.push('/dashboard'), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar");
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
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase text-slate-500">{text.date}</Label>
                  <Input name="date" type="date" required className="border-slate-200 focus:border-[#f39200] focus:ring-[#f39200]" />
                </div>
                
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase text-slate-500">{text.service}</Label>
                  <Textarea 
                    name="details" 
                    required 
                    placeholder="..." 
                    className="min-h-[120px] border-slate-200 focus:border-[#f39200] focus:ring-[#f39200]" 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#f39200] hover:bg-slate-900 text-white font-black uppercase italic py-6 transition-all"
                >
                  {isSubmitting ? "..." : <><Send className="mr-2 h-4 w-4" /> {text.send}</>}
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