import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Post, PostFrontmatter, PostWithHtml } from '@/types/blog';
import { markdownToHtml } from './markdown';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.filter((name) => name.endsWith('.md')).map((name) => name.replace(/\.md$/, ''));
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      };
    })
    .sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });

  return posts;
}

export async function getPostBySlug(slug: string): Promise<PostWithHtml | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const html = await markdownToHtml(content);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    html,
  };
}
