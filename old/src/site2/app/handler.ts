import { Request, Response } from 'express';
import type { SiteMetadata } from '../../types/app.types.js';

export default async function handler(req: Request, res: Response) {
    return {
        data: {
            
        },
        metadata: {
            title: 'The Plug Afrique | Strategic Consulting for Impact in Africa',
            description: "The Plug Afrique is a Pan-African consulting practice. We connect people, ideas, and opportunities to bridge strategy and execution for measurable impact."
        } as SiteMetadata
    };
}