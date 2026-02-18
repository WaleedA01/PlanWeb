import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import StructuredData from '@/components/StructuredData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | PlanLife`,
    description: post.description,
    alternates: {
      canonical: `https://planlifeusa.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'PlanLife Insurance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://planlifeusa.com/logo-full.png',
      },
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <StructuredData data={articleSchema} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0da9e4] via-[#3db8e8] to-[#7dd3f0] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-2 text-white/90 mb-4">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-medium">{post.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Reading time estimate */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {Math.ceil(post.content.split(' ').length / 200)} min read
              </span>
              <span className="text-border">•</span>
              <span>{post.category}</span>
            </div>
            
            <div className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:text-secondary prose-h1:mb-6 prose-h1:mt-12 prose-h1:leading-tight
              prose-h2:text-3xl prose-h2:text-secondary prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-primary/20 prose-h2:leading-tight
              prose-h3:text-xl prose-h3:text-primary prose-h3:mt-8 prose-h3:mb-3 prose-h3:font-semibold
              prose-h4:text-lg prose-h4:text-secondary prose-h4:mt-6 prose-h4:mb-2 prose-h4:font-semibold
              prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:mb-5 prose-p:text-base
              prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline prose-a:transition-all
              prose-strong:text-secondary prose-strong:font-bold
              prose-em:text-secondary/90 prose-em:italic
              prose-ul:my-5 prose-ul:space-y-2 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-5 prose-ol:space-y-2 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-muted-foreground prose-li:leading-[1.7] prose-li:text-base prose-li:my-1
              prose-li:marker:text-primary prose-li:marker:font-bold
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:rounded-r-lg prose-blockquote:shadow-sm prose-blockquote:text-secondary/90
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:font-normal
              prose-pre:bg-secondary/5 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-6
              prose-hr:border-border prose-hr:my-10
              prose-table:border-collapse prose-table:w-full prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden prose-table:my-6
              prose-thead:bg-primary/10
              prose-th:p-3 prose-th:text-left prose-th:font-bold prose-th:text-secondary prose-th:border-b-2 prose-th:border-primary/30
              prose-td:p-3 prose-td:border prose-td:border-border prose-td:bg-white
              prose-tr:border-b prose-tr:border-border
              first:prose-p:text-lg first:prose-p:text-secondary/90 first:prose-p:leading-relaxed first:prose-p:font-medium
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Ready to Get Covered?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get a free quote from our licensed agents today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/business/form"
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Business Quote
              </Link>
              <Link
                href="/personal"
                className="px-8 py-4 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
              >
                Get Personal Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Posts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
