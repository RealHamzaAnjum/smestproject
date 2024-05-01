import { siteData } from '@/data/SiteData'
import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteData.siteName,
    short_name: siteData.siteName,
    description: siteData.siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: siteData.themeColors.lightModeColors.primaryColor,
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}