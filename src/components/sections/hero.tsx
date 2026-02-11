'use client';

import Image from 'next/image';
import { ShippingCalculator } from '@/components/shipping-calculator';
import { useLanguage } from '@/context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      <Image
        src="/camion.png"
        alt="Red logística InTrack"
        data-ai-hint="truck logistics"
        fill
        className="object-cover object-center opacity-70"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:bg-gradient-to-b md:from-black/60 md:to-black/40" />
      
      <div className="relative container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div className="space-y-8 text-center md:text-left text-white animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter drop-shadow-2xl leading-tight uppercase">
              {t.hero.title} <br/><span className="text-primary italic font-black">{t.hero.titleItalic}</span>
            </h1>
            <p className="text-lg md:text-2xl text-neutral-200 max-w-xl mx-auto md:mx-0 font-medium leading-relaxed drop-shadow-lg">
              {t.hero.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
             <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-black uppercase tracking-tight">{t.hero.badge}</span>
             </div>
          </div>
        </div>
        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <ShippingCalculator />
        </div>
      </div>
    </section>
  );
}
