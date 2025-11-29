import { Request, Response } from 'express';
import { getBySlug } from '../../../../types/cms-types.js';
import metadata from '../../metadata.js';
import type { SiteMetadata } from '../../../../types/app.types.js';

export default async function handler(req: Request, res: Response) {
  const { slug } = req.params;
  const serviceResponse = await getBySlug('services', slug);
  const service = serviceResponse.data;
  return {
    data: {
      service
    },
    metadata: {
      ...metadata,
      title: service ? service.name : 'Service',
      description: service ? service.excerpt : ''
    } as SiteMetadata
  };
}
