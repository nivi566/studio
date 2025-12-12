import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Blog de InTrack
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Noticias, novedades y curiosidades del sector de la logística y la paquetería.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => {
                const postImage = post.localImage ? null : PlaceHolderImages.find(img => img.id === post.imageId);
                const imageUrl = post.localImage || postImage?.imageUrl;
                const imageHint = post.localImage ? 'sustainability logistics' : postImage?.imageHint;
                
                return (
                  <Card key={post.slug} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {imageUrl && (
                      <Link href={`/blog/${post.slug}`} className="block">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          data-ai-hint={imageHint}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover"
                        />
                      </Link>
                    )}
                    <CardHeader>
                       <div className="flex justify-between items-center">
                        <Badge variant="secondary">{post.category}</Badge>
                        <time dateTime={post.date} className="text-sm text-muted-foreground">
                          {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </time>
                      </div>
                      <CardTitle className="mt-2 text-xl">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{post.description}</p>
                    </CardContent>
                     <div className="p-6 pt-0">
                      <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                        Leer más <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
