import { Request, Response } from 'express';
import metadata from '../metadata.js';
import type { SiteMetadata } from '../../../types/app.types.js';
import { siteData } from '../../../lib/app.data.js';

export default async function handler(req: Request, res: Response) {
  return {
    data: {
      locations: siteData.locations,
      phoneNumber: siteData.phoneNumber,
      email: siteData.email,
      social: siteData.social,
      pageHero: {
        title: 'Contact Us',
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Contact' }
        ]
      }
    },
    metadata: {
      ...metadata,
      title: 'Contact Us | The Plug Afrique',
      description: 'Get in touch with The Plug Afrique. We have offices in Lagos and Abuja, Nigeria.'
    } as SiteMetadata
  };
}
