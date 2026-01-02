import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-page">
      <div className="container">
        <header className="blog-page-header">
          <p className="eyebrow">Technical Articles</p>
          <h1 className="section-title">Blog</h1>
          <p className="section-subtitle">
            Insights about DevOps, cloud infrastructure, and engineering best practices.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
                <h2>{post.frontmatter.title}</h2>
                <p className="post-meta">{post.frontmatter.date}</p>
                <p className="post-excerpt">{post.frontmatter.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
