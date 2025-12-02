import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Globe, Heart, Rocket } from 'lucide-react';

const values = [
    {
        icon: Rocket,
        title: 'Velocidad',
        description: 'Nos obsesiona la rapidez. Optimizamos cada ruta y proceso para que tus envíos lleguen en tiempo récord.'
    },
    {
        icon: CheckCircle2,
        title: 'Fiabilidad',
        description: 'Tu confianza es nuestro mayor activo. Garantizamos la seguridad e integridad de cada paquete que manejamos.'
    },
    {
        icon: Heart,
        title: 'Cercanía',
        description: 'A pesar de nuestra tecnología avanzada, ofrecemos un trato humano y personalizado a cada uno de nuestros clientes.'
    },
    {
        icon: Globe,
        title: 'Alcance Global',
        description: 'Conectamos tu mundo. Nuestra red logística no tiene fronteras, llevando tus envíos a cualquier rincón del planeta.'
    }
];

export default function AboutUsPage() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'about-us-hero');
    const valuesImage = PlaceHolderImages.find(img => img.id === 'about-us-values');

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[50vh] flex items-center justify-center text-center text-white">
                     {heroImage && (
                        <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        fill
                        className="object-cover"
                        priority
                        />
                    )}
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 px-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                            Conectando tu mundo, un envío a la vez
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-neutral-200">
                            En InTrack, somos más que una empresa de logística. Somos un equipo apasionado por la innovación, la eficiencia y, sobre todo, por las personas.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                                    Nuestra Historia
                                </h2>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    InTrack nació de una idea simple: hacer que la logística fuera más inteligente, rápida y accesible para todos. Fundada en 2020, en medio de un mundo en rápida transformación, vimos la necesidad de un socio logístico que no solo transportara paquetes, sino que también construyera puentes y facilitara oportunidades.
                                </p>
                                <p className="mt-4 text-muted-foreground">
                                    Comenzamos con una pequeña flota y un gran sueño. Hoy, gracias a nuestra apuesta por la tecnología de vanguardia y un equipo humano excepcional, hemos crecido hasta convertirnos en un referente en el sector, ofreciendo soluciones de envío nacionales e internacionales a miles de empresas y particulares.
                                </p>
                            </div>
                            {valuesImage && (
                                <div className="rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src={valuesImage.imageUrl}
                                        alt={valuesImage.description}
                                        data-ai-hint={valuesImage.imageHint}
                                        width={600}
                                        height={500}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                
                {/* Mission and Vision Section */}
                <section className="py-16 sm:py-24 bg-primary/5">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Nuestra Misión</h3>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    Proveer soluciones logísticas excepcionales que impulsen el éxito de nuestros clientes, combinando tecnología innovadora con un compromiso inquebrantable con la fiabilidad y el servicio al cliente.
                                </p>
                            </div>
                             <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Nuestra Visión</h3>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    Ser el líder global en logística inteligente, reconocidos por nuestra sostenibilidad, eficiencia y por crear un ecosistema logístico conectado que beneficie a empresas, personas y al planeta.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Our Values Section */}
                <section className="py-16 sm:py-24">
                     <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                                Nuestros Valores
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Los principios que guían cada una de nuestras acciones y decisiones.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value) => (
                                <Card key={value.title} className="text-center p-6">
                                    <div className="flex justify-center mb-4">
                                        <div className="bg-primary/10 p-4 rounded-full">
                                            <value.icon className="h-8 w-8 text-primary" />
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-semibold text-foreground">{value.title}</h4>
                                    <p className="mt-2 text-muted-foreground">{value.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
