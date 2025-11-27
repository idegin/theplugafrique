import { Request, Response } from 'express';
import type { SiteMetadata } from '../../types/app.types.js';
import { iDeginCloud } from '../../lib/idegin-cloud.js';

export default async function handler(req: Request, res: Response) {

    const faq = await iDeginCloud('/public/cms/collections/faq');
    const blogPosts = await iDeginCloud('/public/cms/collections/blog-posts?limit=3');

    console.log('data:::', {
        data: blogPosts.data.entries[0]?.data,
        author: blogPosts.data.entries[0]?.data.author,
        thumbnail: blogPosts.data.entries[0]?.data.thumbnail,
        categories: blogPosts.data.entries[0]?.data.categories[0]?.data,
    })
    
    return {
        data: {
            faq: faq.data.entries,
            blogPosts: blogPosts.data.entries
        },
        metadata: {
            title: 'The Plug Afrique | Strategic Consulting for Impact in Africa',
            description: "The Plug Afrique is a Pan-African consulting practice. We connect people, ideas, and opportunities to bridge strategy and execution for measurable impact."
        } as SiteMetadata
    };
}