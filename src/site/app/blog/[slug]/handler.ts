import { Request, Response } from 'express';
import { iDeginCloud } from '../../../../lib/idegin-cloud';
import type { SiteMetadata } from '../../../../types/app.types.js';
import { siteData } from '../../../../lib/app.data';

export default async function handler(req: Request, res: Response) {
  
  const blogDetails = await iDeginCloud(`/cms/collections/blog-posts/slug/${req.params.slug}`);
  const blog = blogDetails.data;

  const blogUrl = `${siteData.website}/blog/${blog.data.slug}`;
  const thumbnailUrl = blog.data.thumbnail[0]?.url;
  const categoryNames = blog.data.categories?.map((cat: any) => cat.data.name) || [];

  return {
    data: {
      blog: blog,
      pageHero: {
        title: blog.data.name,
        bgImage: thumbnailUrl,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: blog.data.name }
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
