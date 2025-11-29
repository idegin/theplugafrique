import { Request, Response } from 'express';
import { iDeginCloud } from '../../../../lib/idegin-cloud';
import type { SiteMetadata } from '../../../../types/app.types.js';
import { siteData } from '../../../../lib/app.data';
import { getAll } from '../../../../types/cms-types.js';

export default async function handler(req: Request, res: Response) {

  const blogDetails = await iDeginCloud(`/cms/collections/blog-posts/slug/${req.params.slug}`);
  const blog = blogDetails.data;

  const [categoriesResponse, latestBlogsResponse] = await Promise.all([
    getAll('categories', { limit: 5 }),
    getAll('blog-posts', { limit: 4 }),
  ]);

  const categories = categoriesResponse.data.entries;
  const latestBlogs = latestBlogsResponse.data.entries;

  const blogUrl = `${siteData.website}/blog/${blog.data.slug}`;
  const thumbnailUrl = blog.data.thumbnail?.url;
  const categoryNames = blog.data.categories?.map((cat: any) => cat.data.name) || [];
  const truncatedName =  blog.data.name;

  console.log('AUTHOR AVATAR URL:', blog.data.author);

  return {
    data: {
      blog: blog,
      categories: categories,
      latestBlogs: latestBlogs,
      pageHero: {
        title: "Blog post",
        bgImage: thumbnailUrl,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: truncatedName }
        ]
      }
    },
    metadata: {
      title: `${blog.data.name} | The Plug Afrique`,
      description: blog.data.excerpt,
      keywords: ['The Plug Afrique', 'blog', ...categoryNames],
      twitterHandle: '@theplugafrique',
      og: {
        type: 'article',
        url: blogUrl,
        title: blog.data.name,
        description: blog.data.excerpt,
        image: thumbnailUrl
      },
      twitter: {
        card: 'summary_large_image',
        url: blogUrl,
        title: blog.data.name,
        description: blog.data.excerpt,
        image: thumbnailUrl
      }
    } as SiteMetadata
  };
}
