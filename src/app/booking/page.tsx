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
import { ChevronLeft, Send, CheckCircle2, Ruler, Weight, Printer, Home, MapPin } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Badge } from '@/components/ui/badge';

export default function BookingPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyeDv43xLAkFAal7iquXLsWId0Ijn_yTNUMOZhP5yB5xGxMhSNVJ9hx--cdzV-GVP6e/exec";

  const services = [
    "Recepción de paquetería nacional",
    "Compras internacionales",
    "Soluciones B2B y E-commerce",
    "Envíos urgentes 24h"
  ];

  const text = {
    es: { title: "Nueva Solicitud de Booking", desc: "Complete los detalles para solicitar un nuevo servicio.", service: "Servicio solicitado", date: "Fecha Requerida", back: "Volver", send: "Enviar Solicitud", success: "¡Solicitud Enviada!", thanks: "Hemos recibido su petición correctamente.", dims: "Medidas (cm)", weight: "Peso (kg)", observations: "Observaciones adicionales", print: "Imprimir Comprobante", inicio: "Ir al Inicio" },
    ca: { title: "Nova Sol·licitud de Booking", desc: "Ompli els detalls per sol·licitar un nou servei.", service: "Servei sol·licitat", date: "Data Requerida", back: "Tornar", send: "Enviar Sol·licitud", success: "Sol·licitud Enviada!", thanks: "Hem rebut la seva petició correctament.", dims: "Mides (cm)", weight: "Pes (kg)", observations: "Observacions addicionals", print: "Imprimir Comprovant", inicio: "Anar a l'Inici" },
    en: { title: "New Booking Request", desc: "Fill in the details to request a new service.", service: "Requested Service", date: "Required Date", back: "Back", send: "Send Request", success: "Request Sent!", thanks: "We have received your request correctly.", dims: "Dimensions (cm)", weight: "Weight (kg)", observations: "Additional observations", print: "Print Receipt", inicio: "Go Home" }
  }[language as 'es' | 'ca' | 'en'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const rawData = {
      service: formData.get('service'),
      length: formData.get('length'),
      width: formData.get('width'),
      height: formData.get('height'),
      weight: formData.get('weight'),
      details: formData.get('details'),
      date: formData.get('date')
    };

    const detallesFormateados = `SERVICIO: ${rawData.service} | MEDIDAS: ${rawData.length}x${rawData.width}x${rawData.height} cm | PESO: ${rawData.weight} kg | OBS: ${rawData.details}`.trim();

    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      data: rawData.date,
      usuari: user.usuari,
      empresa: user.empresa,
      detalls: detallesFormateados,
      estat: "Aceptada"
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: 'no-cors',
        body: JSON.stringify(newBooking)
      });
      
      setBookingData({...newBooking, ...rawData});
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && bookingData) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between print:hidden max-w-5xl mx-auto">
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                <Home className="mr-2 h-4 w-4 text-[#f39200]"/> {text.inicio}
              </Button>
            </div>
            <Button 
              className="bg-[#f39200] hover:bg-[#d88200] text-white font-bold" 
              onClick={() => window.print()}
            >
              <Printer className="mr-2 h-4 w-4"/> {text.print}
            </Button>
          </div>

          <div className="bg-white p-10 rounded-lg border shadow-sm text-slate-900 max-w-5xl mx-auto border-t-8 border-t-[#f39200]">
            <div className="flex justify-between items-start border-b pb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-6 w-6 text-green-500 print:hidden" />
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">BOOKING</h1>
                </div>
                <p className="text-slate-500 font-medium text-lg">Nº: {bookingData.id}</p>
                <p className="text-slate-500 font-medium">Fecha: {bookingData.data}</p>
                
                {/* BADGE EN VERDE - "ACEPTADA" */}
                <Badge className="mt-3 bg-green-100 text-green-700 border-green-200 uppercase font-bold px-3 py-1">
                  ACEPTADA
                </Badge>
              </div>
              <Logo />
            </div>

            <div className="grid grid-cols-2 gap-12 my-10 text-sm">
              <div>
                <h2 className="font-bold text-slate-900 uppercase mb-3 tracking-wider text-xs">Solicitante:</h2>
                <div className="text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800 text-base">{user?.empresa || 'Cliente'}</p>
                  <p>Usuario: {user?.usuari}</p>
                </div>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 uppercase mb-3 tracking-wider text-xs">Proveedor de Logística:</h2>
                <div className="text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800 text-base">InTrack Logistics, S.L.</p>
                  <p>Calle Resina, 41, 28021, Madrid</p>
                </div>
              </div>
            </div>

            <div className="mt-10 border rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="py-4 px-4 font-bold text-slate-800">Concepto / Servicio</th>
                    <th className="py-4 px-4 text-right font-bold text-slate-800">Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-bold text-slate-700">{bookingData.service}</td>
                    <td className="py-4 px-4 text-right italic text-slate-500">Servicio Estándar</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 text-slate-600">Dimensiones Totales</td>
                    <td className="py-4 px-4 text-right font-bold">{bookingData.length} x {bookingData.width} x {bookingData.height} cm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 text-slate-600">Peso Declarado</td>
                    <td className="py-4 px-4 text-right font-bold text-green-600">{bookingData.weight} KG</td>
                  </tr>
                  {bookingData.details && (
                    <tr>
                      <td className="py-4 px-4 text-slate-600" colSpan={2}>
                        <p className="font-bold text-xs uppercase mb-1 text-slate-400">Observaciones:</p>
                        {bookingData.details}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-16 pt-8 border-t text-[10px] text-slate-400 leading-relaxed italic">
              <p>Este documento es un comprobante de solicitud de reserva. Nuestro equipo validará los datos y se pondrá en contacto con usted a la mayor brevedad posible para confirmar la recogida/recepción.</p>
              <p className="mt-2">InTrack Logistics S.L. - Gestión Integral de Mercancías.</p>
            </div>
          </div>
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

                <div className="space-y-2">
                  <Label className="font-bold text-[10px] uppercase text-slate-400">{text.observations}</Label>
                  <span className="text-[10px] text-slate-400 ml-2 italic">(Opcional)</span>
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