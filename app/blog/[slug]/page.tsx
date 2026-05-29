import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPost, getRelatedPosts } from "@/content/blog";
import ArticleLayout from "@/components/blog/ArticleLayout";
import BlogNav from "@/components/blog/BlogNav";
import Footer from "@/components/sections/Footer";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.meta.slug }));
}

/**
 * Erzeugt einen SEO-optimierten Title (30–65 Zeichen).
 * - Hängt ` · WSM Blog` (12 Zeichen) an, wenn Platz ist
 * - Sonst wird nur der Title genutzt
 * - Wenn der Title selbst > 65 Zeichen: smart truncieren am letzten Wortende
 */
function formatSeoTitle(title: string, maxLen = 65): string {
  const suffix = " · WSM Blog";
  if (title.length + suffix.length <= maxLen) return title + suffix;
  if (title.length <= maxLen) return title;
  // Truncate am letzten Wortende vor maxLen
  const cut = title.slice(0, maxLen).replace(/[\s,;:—-]+\S*$/, "");
  return cut.trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  // Description auf 120–170 Zeichen begrenzen
  let desc = post.meta.description;
  if (desc.length > 170) {
    desc = desc.slice(0, 167).replace(/[\s,;:—-]+\S*$/, "") + "…";
  }
  return {
    title: formatSeoTitle(post.meta.title),
    description: desc,
    keywords: post.meta.keywords,
    alternates: { canonical: `/blog/${post.meta.slug}` },
    openGraph: {
      title: post.meta.title,
      description: desc,
      type: "article",
      publishedTime: post.meta.date,
      authors: ["Albert Ipgefer"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const Body = post.default;
  const related = getRelatedPosts(slug, 6).map((r) => ({
    slug: r.meta.slug,
    title: r.meta.title,
    category: r.meta.category,
  }));

  // JSON-LD: Article + FAQ for AEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    author: {
      "@type": "Person",
      "@id": "https://wohlstandsmarketing.de#person-albert",
      name: "Albert Ipgefer",
      url: "https://wohlstandsmarketing.de",
      sameAs: [
        "https://www.linkedin.com/in/albertipgefer/",
        "https://www.instagram.com/journeywithalbert/",
        "https://www.tiktok.com/@journeywithalbert",
      ],
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://wohlstandsmarketing.de#organization",
      name: "Wohlstandsmarketing",
      logo: {
        "@type": "ImageObject",
        url: "https://wohlstandsmarketing.de/icon.svg",
      },
    },
    keywords: post.meta.keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://wohlstandsmarketing.de/blog/${post.meta.slug}`,
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.meta.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {post.meta.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <BlogNav />
      <ArticleLayout meta={post.meta} related={related}>
        <Body />
      </ArticleLayout>
      <Footer />
    </main>
  );
}
