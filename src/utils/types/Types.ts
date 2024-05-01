type SocialHandleTypes = {
    name: "facebook" | "instagram" | "twitter" | "pinterest" | "github" | "linkedin"
    link: string
};

type SiteDataTypes = {
    siteName: string;
    siteTitle: string;
    siteDescription: string;
    siteURL: string;
    siteMetaImage: string;
    logo: string;
    logoForDarkTheme: string;
    logoWidth: number;
    logoHeight: number;
    headerBrandingStyle: "only_logo" | "only_site_name" | "both"
    pages: {
        name: string;
        url: string;
    }[];
    socialHandles: SocialHandleTypes[];
    author: {
        id: string;
        name: string;
        profileImage: string;
        bio: string;
        socialLinks: SocialHandleTypes[];
    };
    themeColors: {
        lightModeColors: {
            primaryColor: string;
            backgroundColor: string;
        };
        darkModeColors: {
            primaryColor: string;
            backgroundColor: string;
        }
    };
    googleAnalyticsID?: string | undefined
}

type ArticleTypes = {
    title: string;
    coverImage: string;
    categories: string[];
    shortDescription: string;
    slug: string;
    date: string;
    content: string;
}

export type { SocialHandleTypes, SiteDataTypes, ArticleTypes };