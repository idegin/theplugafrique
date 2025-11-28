import { Request, Response } from 'express';
import type { SiteMetadata } from '../../types/app.types.js';
import { getAll } from '../../types/cms-types.js';

export default async function handler(req: Request, res: Response) {
    const [faqResponse, blogPostsResponse, testimonialsResponse] = await Promise.all([
        getAll('faq'),
        getAll('blog-posts', { limit: 3 }),
        getAll('testimonials')
    ]);
    
    return {
        data: {
            faq: faqResponse.data.entries,
            blogPosts: blogPostsResponse.data.entries,
            testimonials: testimonialsResponse.data.entries
        },
        metadata: {
            title: 'The Plug Afrique | Strategic Consulting for Impact in Africa',
            description: "The Plug Afrique is a Pan-African consulting practice. We connect people, ideas, and opportunities to bridge strategy and execution for measurable impact."
        } as SiteMetadata
    };
}