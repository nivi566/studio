import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const pricingTiers = [
    {
        name: 'Nacional',
        price: '4,99€',
        priceDetails: 'por envío estándar',
        description: 'Ideal para envíos no urgentes dentro del territorio nacional.',
        features: [
            'Entrega en 48/72 horas',
            'Seguimiento en línea incluido',
            'Cobertura en toda la península',
            'Seguro básico incluido'
        ],
        buttonText: 'Comenzar ahora',
        featured: false
    },
    {
        name: 'Express 24h',
        price: '8,99€',
        priceDetails: 'por envío urgente',
        description: 'La solución perfecta para cuando el tiempo es un factor clave.',
        features: [
            'Entrega garantizada en 24 horas',
            'Seguimiento prioritario en tiempo real',
            'Recogida a domicilio preferente',
            'Notificaciones por SMS'
        ],
        buttonText: 'Seleccionar Express',
        featured: true,
        popularText: 'Más Popular'
    },
    {
        name: 'Internacional',
        price: 'Consultar',
        priceDetails: 'según destino y peso',
        description: 'Conecta con el mundo con nuestras tarifas competitivas.',
        features: [
            'Entrega en toda Europa en 3-5 días',
            'Gestión de aduanas incluida',
            'Red global de transportistas',
            'Seguimiento internacional completo'
        ],
        buttonText: 'Calcular envío',
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
                            Nuestras tarifas
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Elige el plan que mejor se adapte a tus necesidades. Precios claros y sin sorpresas.
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
