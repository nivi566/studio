"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Headset, ShieldCheck, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function CompetitiveAdvantages() {
  const { t } = useLanguage();
  const c = t.competitiveAdvantages;

  const advantages = [
    {
      icon: Rocket,
      title: c.agilityTitle,
      desc: c.agilityDesc
    },
    {
      icon: Headset,
      title: c.humanTitle,
      desc: c.humanDesc
    },
    {
      icon: ShieldCheck,
      title: c.securityTitle,
      desc: c.securityDesc
    },
    {
      icon: Eye,
      title: c.visibilityTitle,
      desc: c.visibilityDesc
    }
  ];

  return (
    <section id="advantages" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {c.sectionTitle}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, index) => (
            <Card 
              key={index} 
              className="border-4 bg-background transition-all duration-300 hover:border-primary group shadow-none"
            >
              <CardHeader>
                <div className="bg-primary/10 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <adv.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-black tracking-tighter leading-tight">
                  {adv.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {adv.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
