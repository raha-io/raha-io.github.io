import Image from 'next/image';
import './blog.css';

export const metadata = {
  title: 'Blog | Raha IO',
  description: 'Technical articles about DevOps, infrastructure, and cloud.',
  icons: { icon: '/icon.png', apple: '/icon.png' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header blog-header-static">
        <div className="container header-inner">
          <a className="brand" href="/">
            <Image src="/logo.png" alt="Raha IO" width={44} height={44} className="brand-mark" />
            <span className="brand-text">
              <strong>Raha IO</strong>
              <span>Blog</span>
            </span>
          </a>
          <nav className="nav" aria-label="Blog navigation">
            <a href="/">Home</a>
            <a href="/blog">All Posts</a>
          </nav>
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
