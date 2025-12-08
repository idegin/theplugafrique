import { Request, Response } from 'express';
import { getAll } from '../../../types/cms-types.js';
import metadata from '../metadata.js';
import type { SiteMetadata } from '../../../types/app.types.js';

export default async function handler(req: Request, res: Response) {
  const servicesResponse = await getAll('services');
  return {
    data: {
      services: servicesResponse.data.entries,
      pageHero: {
        title: 'Our Services',
        bgImage: '/external/service-hero.png',
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Services' }
        ]
      }
    },
    metadata: {
      ...metadata,
      title: 'Our Services',
      description: 'Explore our range of services for your business needs.'
    } as SiteMetadata
  };
}
