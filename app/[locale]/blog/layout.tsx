import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import './blog.css';

export const metadata = {
  title: 'Blog | Raha IO',
  description: 'Technical articles about DevOps, infrastructure, and cloud.',
};

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <header className="site-header blog-header-static">
        <div className="container header-inner">
          <Link className="brand" href={`/${locale}`}>
            <Image src="/logo.png" alt="Raha IO" width={44} height={44} className="brand-mark" />
            <span className="brand-text">
              <strong>Raha IO</strong>
              <span>Blog</span>
            </span>
          </Link>
          <nav className="nav" aria-label="Blog navigation">
            <Link href={`/${locale}`}>Home</Link>
            <Link href="/en/blog">All Posts</Link>
          </nav>
          <div className="header-actions">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container">
          <p className="footer-bottom">
            &copy; {new Date().getFullYear()} Raha IO. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
