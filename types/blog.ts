export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostWithHtml extends Post {
  html: string;
}
