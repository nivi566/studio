
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { pressReleases } from '@/lib/press-releases';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

type PressReleasePageProps = {
  params: {
    slug: string;
  };
};

export default function PressReleasePage({ params }: PressReleasePageProps) {
  const release = pressReleases.find((p) => p.slug === params.slug);

  if (!release) {
    notFound();
  }

  const releaseImage = release.localImage ? null : PlaceHolderImages.find(img => img.id === release.imageId);
  const imageUrl = release.localImage || releaseImage?.imageUrl;
  const imageHint = release.localImage ? 'sustainability logistics' : releaseImage?.imageHint;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <article className="container mx-auto px-4 max-w-3xl">
          <header className="mb-12">
            <Link href="/prensa" className="text-sm text-primary hover:underline mb-4 inline-block">&larr; Volver a Sala de Prensa</Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              {release.title}
            </h1>
            <div className="mt-6 flex items-center gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={release.date}>
                  {new Date(release.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
              </div>
            </div>
          </header>

          {imageUrl && (
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-12 shadow-lg">
              <Image
                src={imageUrl}
                alt={release.title}
                data-ai-hint={imageHint}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90
                       prose-headings:text-foreground prose-p:leading-relaxed prose-a:text-primary
                       prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: release.fullContent }} 
          />

        </article>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return pressReleases.map((release) => ({
    slug: release.slug,
  }));
}
