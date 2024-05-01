import type { Config } from 'tailwindcss'
import { siteData } from './src/data/SiteData'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "light-primary": siteData.themeColors.lightModeColors.primaryColor,
        "dark-primary": siteData.themeColors.darkModeColors.primaryColor,
        "light-bg": siteData.themeColors.lightModeColors.backgroundColor,
        "dark-bg": siteData.themeColors.darkModeColors.backgroundColor,
      },
      typography: {
        custom: {
          css: {
            '--tw-prose-body': 'rgb(0 0 0 / 100%)',
            '--tw-prose-headings': siteData.themeColors.lightModeColors.primaryColor,
            '--tw-prose-lead': siteData.themeColors.lightModeColors.primaryColor,
            '--tw-prose-links': siteData.themeColors.lightModeColors.primaryColor,
            '--tw-prose-bold': 'rgb(0 0 0 / 100%)',
            '--tw-prose-counters': siteData.themeColors.lightModeColors.primaryColor,
            '--tw-prose-bullets': siteData.themeColors.lightModeColors.primaryColor,
            '--tw-prose-hr': siteData.themeColors.lightModeColors.primaryColor,
            '--tw-prose-quotes': 'rgb(0 0 0 / 100%)',
            '--tw-prose-quote-borders': siteData.themeColors.lightModeColors.primaryColor,
            '--tw-prose-captions': 'rgb(0 0 0 / 100%)',
            '--tw-prose-code': siteData.themeColors.lightModeColors.primaryColor,
            '--tw-prose-pre-code': siteData.themeColors.lightModeColors.primaryColor,
            '--tw-prose-pre-bg': siteData.themeColors.lightModeColors.backgroundColor,
            '--tw-prose-th-borders': siteData.themeColors.lightModeColors.primaryColor,
            '--tw-prose-td-borders': siteData.themeColors.lightModeColors.primaryColor,

            '--tw-prose-invert-body': 'rgb(255 255 255 / 100%)',
            '--tw-prose-invert-headings': siteData.themeColors.darkModeColors.primaryColor,
            '--tw-prose-invert-lead': siteData.themeColors.darkModeColors.primaryColor,
            '--tw-prose-invert-links': siteData.themeColors.darkModeColors.primaryColor,
            '--tw-prose-invert-bold': 'rgb(255 255 255 / 100%)',
            '--tw-prose-invert-counters': siteData.themeColors.darkModeColors.primaryColor,
            '--tw-prose-invert-bullets': siteData.themeColors.darkModeColors.primaryColor,
            '--tw-prose-invert-hr': siteData.themeColors.darkModeColors.primaryColor,
            '--tw-prose-invert-quotes': 'rgb(255 255 255 / 100%)',
            '--tw-prose-invert-quote-borders': siteData.themeColors.darkModeColors.primaryColor,
            '--tw-prose-invert-captions': 'rgb(255 255 255 / 100%)',
            '--tw-prose-invert-code': siteData.themeColors.darkModeColors.primaryColor,
            '--tw-prose-invert-pre-code': siteData.themeColors.darkModeColors.primaryColor,
            '--tw-prose-invert-pre-bg': siteData.themeColors.darkModeColors.backgroundColor,
            '--tw-prose-invert-th-borders': siteData.themeColors.darkModeColors.primaryColor,
            '--tw-prose-invert-td-borders': siteData.themeColors.darkModeColors.primaryColor,
          },
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
