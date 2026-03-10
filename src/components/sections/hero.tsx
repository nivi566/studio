
'use client';

import Image from 'next/image';
import { ShippingCalculator } from '@/components/shipping-calculator';
import { useLanguage } from '@/context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Imagen de fondo del camión */}
      <Image
        src="/camion.png"
        alt="Red logística InTrack"
        data-ai-hint="truck logistics"
        fill
        className="object-cover object-center opacity-60"
        priority
        quality={100}
      />
      
      {/* Capas de degradado para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden lg:block" />
      
      <div className="relative container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center py-20">
        <div className="space-y-8 text-center lg:text-left text-white animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl leading-[0.9]">
              {t.hero.title} <br/>
              <span className="text-primary font-black">{t.hero.titleItalic}</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-lg">
              {t.hero.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
             <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl">
                <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-black tracking-widest uppercase">{t.hero.badge}</span>
             </div>
          </div>
        </div>
        
        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
                <ShippingCalculator />
            </div>
        </div>
      </div>
    </section>
  );
}
