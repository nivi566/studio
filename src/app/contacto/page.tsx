'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Calculator, Map as MapIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  
  const [weight, setWeight] = useState<string>('');
  const [shippingType, setShippingType] = useState<string>('nacional');
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    const w = parseFloat(weight);
    if (!isNaN(w) && w > 0) {
      const base = 5;
      const rate = shippingType === 'internacional' ? 5 : 2;
      setTotalPrice(base + (w * rate));
    } else {
      setTotalPrice(null);
    }
  }, [weight, shippingType]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-foreground mb-4">
                {t.contact.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground font-medium">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                    <h2 className="text-2xl font-black text-foreground tracking-tighter">{t.contact.infoTitle}</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-foreground tracking-tighter">{t.contact.hq}</h3>
                                <p className="text-muted-foreground font-medium">Calle Resina, 41<br />28021, Madrid, España</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-foreground tracking-tighter">{t.contact.support}</h3>
                                <p className="text-muted-foreground font-medium">info@intrack-logistics.cat</p>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN GOOGLE MAPS */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-2 text-primary">
                            <MapIcon className="h-5 w-5" />
                            <span className="text-sm font-black uppercase tracking-widest">Nuestra Ubicación</span>
                        </div>
                        <div className="rounded-2xl overflow-hidden border-2 border-slate-100 shadow-lg h-[300px] bg-muted">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3042.144414123456!2d-3.7089123!3d40.3289123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4226cf6f6f6f6f%3A0x6f6f6f6f6f6f6f6f!2sC.%20de%20la%20Resina%2C%2041%2C%2028021%20Madrid!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                        <Button 
                            variant="outline" 
                            className="w-full font-black uppercase text-[10px] tracking-widest h-10"
                            asChild
                        >
                            <a 
                                href="https://www.google.com/maps/dir//Calle+Resina,+41,+28021,+Madrid" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Cómo llegar en Google Maps
                            </a>
                        </Button>
                    </div>
                </div>

                {/* FORMULARIO CON CALCULADORA FIJA */}
                <div>
                     <Card className="border-4 border-primary/10 shadow-2xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl font-black tracking-tighter">{t.contact.formTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action="https://formspree.io/f/xrbnkanl" method="POST" className="space-y-5">
                                
                                {/* --- SECCIÓN CALCULADORA (Dentro del form) --- */}
                                <div className="p-4 bg-muted/50 rounded-xl border-2 border-primary/10 space-y-4 mb-6">
                                    <div className="flex items-center gap-2 text-primary">
                                        <Calculator className="h-4 w-4" />
                                        <span className="text-xs font-black uppercase tracking-widest">Calculadora de Envío</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Peso (kg)</Label>
                                            <Input 
                                                type="number" 
                                                name="calculo_peso" // Importante para Formspree
                                                placeholder="0" 
                                                value={weight} 
                                                onChange={(e) => setWeight(e.target.value)}
                                                className="font-bold bg-background"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Tipo</Label>
                                            <Select onValueChange={setShippingType} defaultValue="nacional" name="calculo_tipo">
                                                <SelectTrigger className="font-bold bg-background text-foreground">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="nacional" className="font-bold">Nacional</SelectItem>
                                                    <SelectItem value="internacional" className="font-bold">Internacional</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    
                                    {totalPrice !== null && (
                                        <div className="text-center p-3 bg-primary rounded-lg shadow-sm">
                                            <p className="text-[10px] text-primary-foreground/70 font-black uppercase tracking-wider">Presupuesto Estimado</p>
                                            <p className="text-2xl font-black text-primary-foreground">{totalPrice.toFixed(2)}€</p>
                                            <input type="hidden" name="precio_estimado" value={`${totalPrice.toFixed(2)}€`} />
                                        </div>
                                    )}
                                </div>
                                {/* --- FIN CALCULADORA --- */}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="font-black uppercase text-[10px] tracking-widest">{t.contact.name}</Label>
                                        <Input id="name" name="name" placeholder={t.contact.name} required className="font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="font-black uppercase text-[10px] tracking-widest">{t.contact.email}</Label>
                                        <Input id="email" name="email" type="email" placeholder="tu@email.com" required className="font-bold" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason" className="font-black uppercase text-[10px] tracking-widest">{t.contact.reason}</Label>
                                    <Select name="reason" required>
                                        <SelectTrigger className="font-bold text-foreground">
                                            <SelectValue placeholder={t.contact.reasonPlaceholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="presupuesto" className="font-bold">Solicitar este presupuesto</SelectItem>
                                            <SelectItem value="codigo" className="font-bold">{t.contact.reasons?.code || "Duda con código"}</SelectItem>
                                            <SelectItem value="internacional" className="font-bold">{t.contact.reasons?.intl || "Envío Internacional"}</SelectItem>
                                            <SelectItem value="otro" className="font-bold">{t.contact.reasons?.other || "Otro motivo"}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="font-black uppercase text-[10px] tracking-widest">{t.contact.message}</Label>
                                    <Textarea id="message" name="message" placeholder={t.contact.messagePlaceholder} className="min-h-[100px] font-bold" required />
                                </div>

                                <Button type="submit" className="w-full text-lg h-14 font-black tracking-widest bg-primary hover:bg-primary/90 shadow-lg active:scale-[0.98] transition-all">
                                    {t.contact.submit}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
