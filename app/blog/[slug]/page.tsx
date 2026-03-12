import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/src/lib/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found - ProJyotish" };

  return {
    title: `${post.title} - ProJyotish Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background py-24">
      <article className="container px-4 max-w-3xl mx-auto">
        <Link
          href="/blog/"
          className="font-body text-primary font-medium hover:text-primary/80 transition-colors mb-8 inline-block"
        >
          &larr; Back to Blog
        </Link>

        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground font-body mb-12">
          <span>{post.author}</span>
          <span>&middot;</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-2xl mb-12 shadow-soft"
          />
        )}

        <div
          className="prose prose-lg max-w-none font-body
            prose-headings:font-display prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80
            prose-strong:text-foreground
            prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
        />
      </article>
    </main>
  );
}
