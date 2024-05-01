import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast"
import { siteData } from "@/data/SiteData";
import OneSignalPushNotificationService from "@/components/OneSignalPushNotificationService";
import Script from "next/script";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteData.siteName}`,
    default: siteData.siteTitle
  },
  description: siteData.siteDescription,
  keywords: siteData.siteName,
  authors: {
    name: siteData.author.name,
    url: siteData.author.socialLinks[0].link,
  },
  robots: "index, follow",
  openGraph: {
    images: siteData.siteMetaImage,
    type: "website",
    title: siteData.siteTitle,
    siteName: siteData.siteName,
    locale: "en_US",
    description: siteData.siteDescription,
    url: siteData.siteURL,

  },
  twitter: {
    card: "summary",
    creator: siteData.author.name,
    title: siteData.siteTitle,
    description: siteData.siteDescription,
    creatorId: siteData.author.socialLinks.find((social) => social.name === "twitter")?.link,
    images: siteData.siteMetaImage,
    site: siteData.siteName,
  },
  creator: siteData.author.name,
  colorScheme: "light",
  publisher: siteData.author.name,
  themeColor: siteData.themeColors.lightModeColors.primaryColor,
  metadataBase: new URL(siteData.siteURL),
  applicationName: siteData.siteName,
  icons: [
    {
      rel: "apple-touch-icon",
      url: `${siteData.siteURL}/Images/apple-touch-icon.png`,
    },
    {
      rel: "icon",
      url: `${siteData.siteURL}/Images/favicon-32x32.png`,
    },
    {
      rel: "mask-icon",
      url: `${siteData.siteURL}/Images/safari-pinned-tab.svg`,
    },
  ],
  manifest: null,
};

export const revalidate = 1800;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`relative min-h-screen bg-light-bg dark:bg-dark-bg text-black dark:text-white ${poppins.className}`}
      >
        {children}
        <Toaster position="bottom-center" />
        <OneSignalPushNotificationService />

        {siteData.googleAnalyticsID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteData.googleAnalyticsID}`}
              async
            />
            <Script id="googleTagScript" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', "${siteData.googleAnalyticsID}");
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
