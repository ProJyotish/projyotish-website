import Link from "next/link";
import type { TopicPost } from "@/src/lib/topics";

const PILLAR_LABELS: Record<string, string> = {
  career: "Career",
  health: "Health",
  business: "Business",
  love: "Love & Relationships",
  wealth: "Wealth",
};

const WHATSAPP_MESSAGES: Record<string, string> = {
  career: "I%20have%20a%20career%20question",
  health: "I%20have%20a%20health%20question",
  business: "I%20have%20a%20business%20question",
  love: "I%20have%20a%20love%20and%20relationship%20question",
  wealth: "I%20have%20a%20wealth%20question",
};

interface TopicPageProps {
  post: TopicPost;
  pillar: string;
}

export default function TopicPage({ post, pillar }: TopicPageProps) {
  const pillarLabel = PILLAR_LABELS[pillar] ?? pillar;
  const waMessage = WHATSAPP_MESSAGES[pillar] ?? "I%20have%20a%20question";
  const waUrl = `https://wa.me/918291218234?text=${waMessage}`;

  return (
    <main className="min-h-screen bg-background py-24">
      <article className="container px-4 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground font-body mb-8">
          <Link
            href={`/${pillar}/`}
            className="text-primary font-medium hover:text-primary/80 transition-colors"
          >
            {pillarLabel}
          </Link>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        {/* Back link */}
        <Link
          href={`/${pillar}/`}
          className="font-body text-primary font-medium hover:text-primary/80 transition-colors mb-8 inline-block"
        >
          &larr; Back to {pillarLabel}
        </Link>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 mt-4">
          {post.title}
        </h1>

        {/* Date */}
        {post.date && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-body mb-12">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        )}

        {/* Cover image */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-2xl mb-12 shadow-soft"
          />
        )}

        {/* Article body */}
        <div
          className="prose prose-lg max-w-none font-body
            prose-headings:font-display prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80
            prose-strong:text-foreground
            prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
        />

        {/* WhatsApp CTA */}
        <div className="mt-16 p-8 bg-card rounded-2xl border border-border shadow-soft text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Have a personal question about {pillarLabel.toLowerCase()}?
          </h2>
          <p className="font-body text-muted-foreground mb-6">
            Get personalised Vedic astrology guidance from our experts — your first question is free.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-body font-bold text-lg rounded-2xl shadow-elevated hover:bg-[#20BD5A] transition-colors duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ask Your Free Question
          </a>
        </div>
      </article>
    </main>
  );
}
