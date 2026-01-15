import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Tier = {
    name: string;
    price: string;
    priceDetails: string;
    description: string;
    features: string[];
    buttonText: string;
    featured: boolean;
};

export default function PricingPage() {
    const t = useTranslations('PricingPage');
    const t_tiers = useTranslations('PricingPage.tiers');

    const pricingTiers: Tier[] = ['national', 'express', 'international'].map(tierKey => ({
        name: t_tiers(`${tierKey}.name`),
        price: t_tiers(`${tierKey}.price`),
        priceDetails: t_tiers(`${tierKey}.priceDetails`),
        description: t_tiers(`${tierKey}.description`),
        features: t_tiers.raw(`${tierKey}.features`) as string[],
        buttonText: t_tiers(`${tierKey}.buttonText`),
        featured: tierKey === 'express'
    }));

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 py-16 sm:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                            {t('title')}
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        {pricingTiers.map((tier) => (
                            <Card key={tier.name} className={tier.featured ? 'border-primary shadow-2xl scale-105' : 'shadow-lg'}>
                                <CardHeader className="text-center">
                                    {tier.featured && (
                                        <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{t('mostPopular')}</div>
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
                                        {tier.features.map((feature) => (
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
