import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found | Raha IO Blog' };
  }

  return {
    title: `${post.frontmatter.title} | Raha IO Blog`,
    description: post.frontmatter.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="blog-post">
      <div className="container">
        <header className="post-header">
          <h1>{post.frontmatter.title}</h1>
          <p className="post-meta">{post.frontmatter.date}</p>
        </header>

{/* biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown HTML is sanitized and controlled */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </article>
  );
}
