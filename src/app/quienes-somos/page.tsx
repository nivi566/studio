"use client";
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Globe, Heart, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutUsPage() {
    const { t } = useLanguage();
    const heroImage = PlaceHolderImages.find(img => img.id === 'about-us-hero');
    const a = t.aboutPage;

    const values = [
        { icon: Rocket, title: a.values.v1, description: a.values.v1d },
        { icon: CheckCircle2, title: a.values.v2, description: a.values.v2d },
        { icon: Heart, title: a.values.v3, description: a.values.v3d },
        { icon: Globe, title: a.values.v4, description: a.values.v4d }
    ];

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
                            {a.heroTitle}
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-neutral-200">
                            {a.heroSubtitle}
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                                    {a.storyTitle}
                                </h2>
                                <p className="mt-4 text-lg text-muted-foreground">
                                   {a.storyP1}
                                </p>
                                <p className="mt-4 text-muted-foreground">
                                   {a.storyP2}
                                </p>
                                 <p className="mt-4 text-muted-foreground">
                                   {a.storyP3}
                                </p>
                            </div>
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src="/historia.png"
                                    alt="Ilustración sobre la historia de InTrack"
                                    data-ai-hint="logistics history"
                                    width={600}
                                    height={500}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Mission and Vision Section */}
                <section className="py-16 sm:py-24 bg-primary/5">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{a.missionTitle}</h3>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    {a.missionDesc}
                                </p>
                            </div>
                             <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{a.visionTitle}</h3>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    {a.visionDesc}
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
                                {a.valuesTitle}
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                {a.valuesSubtitle}
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
