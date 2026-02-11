'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
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
                         <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-foreground tracking-tighter">{t.contact.phone}</h3>
                                <p className="text-muted-foreground font-medium">+34 912 345 678</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-muted rounded-xl border-2 border-primary/20 shadow-inner">
                        <h4 className="font-black flex items-center gap-2 mb-2 tracking-tighter text-primary">
                            <MessageSquare className="h-5 w-5" /> 
                            {t.contact.urgentTitle}
                        </h4>
                        <p className="text-sm text-muted-foreground font-medium">
                            {t.contact.urgentDesc}
                        </p>
                    </div>
                </div>

                <div>
                     <Card className="border-4 border-primary/10 shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-black tracking-tighter">{t.contact.formTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action="https://formspree.io/f/xrbnkanl" method="POST" className="space-y-5">
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
                                        <SelectTrigger className="font-bold">
                                            <SelectValue placeholder={t.contact.reasonPlaceholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="codigo" className="font-bold">{t.contact.reasons.code}</SelectItem>
                                            <SelectItem value="internacional" className="font-bold">{t.contact.reasons.intl}</SelectItem>
                                            <SelectItem value="ecommerce" className="font-bold">{t.contact.reasons.biz}</SelectItem>
                                            <SelectItem value="otro" className="font-bold">{t.contact.reasons.other}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="order" className="font-black uppercase text-[10px] tracking-widest">{t.contact.orderId}</Label>
                                    <Input id="order" name="order_id" placeholder="Ej: INT-12345" className="font-bold" />
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
