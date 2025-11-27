import { siteData } from '../../lib/app.data.js';
import type { SiteMetadata } from '../../types/app.types.js';

const metadata: SiteMetadata = {
    title: siteData.title,
    description: siteData.description,
    keywords: ['consulting', 'Africa', 'strategy', 'impact', 'advisory', 'business', 'iDegin Technologies', 'Emeka Ifeora'],
    twitterHandle: siteData.socialHandle,
    og: {
        type: 'website',
        url: siteData.website,
        title: siteData.title,
        description: siteData.description,
        image: 'https://www.theplugafrique.com/images/og-preview-image.jpg',
    },
    twitter: {
        card: 'summary_large_image',
        url: siteData.website,
        title: siteData.title,
        description: siteData.description,
        image: 'https://www.theplugafrique.com/images/twitter-preview-image.jpg',
    },
};

export default metadata;