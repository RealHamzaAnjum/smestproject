import { siteData } from '@/data/SiteData'
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/',
    },
    sitemap: `${siteData.siteURL}/sitemap.xml`,
  }
}