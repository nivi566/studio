import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Blog() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Nuestro Blog
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mantente al día con las últimas noticias, tendencias y consejos del sector de la logística y la paquetería.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => {
            const postImage = PlaceHolderImages.find(img => img.id === post.imageId);
            return (
              <Card key={post.slug} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                {postImage && (
                  <Link href={`/blog/${post.slug}`} className="block">
                    <Image
                      src={postImage.imageUrl}
                      alt={post.title}
                      data-ai-hint={postImage.imageHint}
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
        
        <div className="text-center mt-12">
          <Button asChild size="lg" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
            <Link href="/blog">Ver todos los artículos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
