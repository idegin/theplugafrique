import { Request, Response } from 'express';
import { getAll } from '../../../types/cms-types.js';
import metadata from '../metadata.js';
import type { SiteMetadata } from '../../../types/app.types.js';

export default async function handler(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 5;
    const search = req.query.search as string || '';

    const [categoriesResponse, latestBlogsResponse, blogPostsResponse] = await Promise.all([
      getAll('categories', { limit: 5 }),
      getAll('blog-posts', { limit: 4 }),
      getAll('blog-posts', { page, limit, search }),
    ]);

    const categories = categoriesResponse.data.entries;
    const latestBlogs = latestBlogsResponse.data.entries;
    const blogPosts = blogPostsResponse.data.entries;
    const pagination = blogPostsResponse.data.pagination;

    return {
      data: {
        categories,
        latestBlogs,
        blogPosts,
        pagination,
        searchQuery: search,
        pageHero: {
          title: search ? `Search Results: ${search}` : 'Our Blog',
          breadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Blog' }
          ]
        }
      },
      metadata: {
        ...metadata,
        title: 'Blog | The Plug Afrique',
        description: 'Read our latest insights, stories, and updates from The Plug Afrique.'
      } as SiteMetadata
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    
    return {
      data: {
        categories: [],
        latestBlogs: [],
        blogPosts: [],
        pagination: { total: 0, page: 1, limit: 5, totalPages: 0 },
        error: 'Unable to load blog posts at this time. Please try again later.',
        pageHero: {
          title: 'Our Blog',
          breadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Blog' }
          ]
        }
      },
      metadata: {
        ...metadata,
        title: 'Blog | The Plug Afrique',
        description: 'Read our latest insights, stories, and updates from The Plug Afrique.'
      } as SiteMetadata
    };
  }
}
