"use client";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PricingPage() {
    const { t } = useLanguage();
    const p = t.pricingPage;

    const pricingTiers = [
        {
            name: p.tiers.national.name,
            price: '4,99€',
            priceDetails: p.tiers.national.details,
            description: p.tiers.national.desc,
            features: p.tiers.national.features,
            buttonText: p.tiers.national.cta,
            featured: false
        },
        {
            name: p.tiers.express.name,
            price: '8,99€',
            priceDetails: p.tiers.express.details,
            description: p.tiers.express.desc,
            features: p.tiers.express.features,
            buttonText: p.tiers.express.cta,
            featured: true,
            popularText: p.tiers.express.popular
        },
        {
            name: p.tiers.intl.name,
            price: p.tiers.intl.priceText,
            priceDetails: p.tiers.intl.details,
            description: p.tiers.intl.desc,
            features: p.tiers.intl.features,
            buttonText: p.tiers.intl.cta,
            featured: false
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 py-16 sm:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                            {p.title}
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {p.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        {pricingTiers.map((tier) => (
                            <Card key={tier.name} className={tier.featured ? 'border-primary shadow-2xl scale-105' : 'shadow-lg'}>
                                <CardHeader className="text-center">
                                    {tier.featured && (
                                        <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{tier.popularText}</div>
                                    )}
                                    <CardTitle className="text-3xl">{tier.name}</CardTitle>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold">{tier.price}</span>
                                        <p className="text-sm text-muted-foreground">{tier.priceDetails}</p>
                                    </div>
                                    <CardDescription className="mt-4 px-4">{tier.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {tier.features.map((feature: string) => (
                                            <li key={feature} className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" variant={tier.featured ? 'default' : 'outline'}>
                                        {tier.buttonText}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
