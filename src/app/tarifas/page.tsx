
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const pricingTiers = [
    {
        name: 'Nacional',
        price: '4,99€',
        priceDetails: 'per enviament estàndard',
        description: 'Ideal per a enviaments no urgents dins del territori nacional.',
        features: [
            'Entrega en 48/72 hores',
            'Seguiment en línia inclòs',
            'Cobertura a tota la península',
            'Assegurança bàsica inclosa'
        ],
        buttonText: 'Començar ara',
        featured: false
    },
    {
        name: 'Express 24h',
        price: '8,99€',
        priceDetails: 'per enviament urgent',
        description: 'La solució perfecta per quan el temps és un factor clau.',
        features: [
            'Entrega garantida en 24 hores',
            'Seguiment prioritari en temps real',
            'Recollida a domicili preferent',
            'Notificacions per SMS'
        ],
        buttonText: 'Seleccionar Express',
        featured: true
    },
    {
        name: 'Internacional',
        price: 'Des de 15€',
        priceDetails: 'segons destí i pes',
        description: 'Connecta amb el món amb les nostres tarifes competitives.',
        features: [
            'Entrega a tota Europa en 3-5 dies',
            'Gestió de duanes inclosa',
            'Xarxa global de transportistes',
            'Seguiment internacional complet'
        ],
        buttonText: 'Calcular enviament',
        featured: false
    }
];

export default function PricingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 py-16 sm:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                            Les nostres tarifes
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Tria el pla que millor s’adapti a les teves necessitats. Preus clars i sense sorpreses.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        {pricingTiers.map((tier) => (
                            <Card key={tier.name} className={tier.featured ? 'border-primary shadow-2xl scale-105' : 'shadow-lg'}>
                                <CardHeader className="text-center">
                                    {tier.featured && (
                                        <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Més Popular</div>
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
