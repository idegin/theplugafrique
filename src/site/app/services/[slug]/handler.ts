import { Request, Response } from 'express';
import { getBySlug, getAll } from '../../../../types/cms-types.js';
import metadata from '../../metadata.js';
import type { SiteMetadata } from '../../../../types/app.types.js';

export default async function handler(req: Request, res: Response) {
  const { slug } = req.params;
  
  const [serviceResponse, faqResponse] = await Promise.all([
    getBySlug('services', slug),
    getAll('faq'),
  ]);
  
  const service = serviceResponse.data;
  const faq = faqResponse.data.entries;
  
  return {
    data: {
      service,
      faq,
      pageHero: {
        title: service?.data?.name || 'Service',
        bgImage: service?.data?.cover_image?.url || '/external/service-hero.png',
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service?.data?.name || 'Service' }
        ]
      }
    },
    metadata: {
      ...metadata,
      title: service?.data?.name ? `${service.data.name} | The Plug Afrique` : 'Service | The Plug Afrique',
      description: service?.data?.excerpt || ''
    } as SiteMetadata
  };
}
