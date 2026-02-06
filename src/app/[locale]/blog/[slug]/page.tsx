import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft } from 'lucide-react';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find(img => img.id === post.imageId);
  const imageUrl = post.localImage || postImage?.imageUrl;
  const imageHint = postImage?.imageHint;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
          </div>

          <header className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              {post.title}
            </h1>
            <div className="mt-6 flex justify-center items-center gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </header>
          
          {imageUrl && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-12 shadow-lg">
              <Image
                src={imageUrl}
                alt={post.title}
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
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

        </article>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
