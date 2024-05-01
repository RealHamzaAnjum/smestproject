import { siteData } from "@/data/SiteData";
import { GetAllArticles, GetAllCategories } from "@/utils/firebase";
import { MetadataRoute } from "next";

const getArticlesData = async () => {
  const articlesRes = await GetAllArticles();
  return articlesRes.articles;
};
const getCategoriesData = async () => {
  const categoriesRes = await GetAllCategories();
  return categoriesRes.categories;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  var siteMap: {
    url: string;
    lastModified?: string;
    changeFrequency?:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never"
      | undefined;
    priority: number;
  }[] = [];

  await getArticlesData().then((articles) => {
    articles.forEach((article) => {
      siteMap.push({
        url: `${siteData.siteURL}/blog/${article.slug}`,
        lastModified: article.date,
        priority: 0.8,
      });
    });
  });

  await getCategoriesData().then((categories) => {
    categories.forEach((category) => {
      siteMap.push({
        url: `${siteData.siteURL}/categories/${category.slug}`,
        priority: 0.8,
      });
    });
  });

  return [
    {
      url: siteData.siteURL,
      priority: 1,
    },
    {
      url: `${siteData.siteURL}/author/${siteData.author.id}`,
      priority: 0.8,
    },
    {
      url: `${siteData.siteURL}/categories`,
      priority: 0.8,
    },
    {
      url: `${siteData.siteURL}/blog`,
      priority: 0.8,
    },
    ...siteMap,
    {
      url: `${siteData.siteURL}/about-us`,
      priority: 0.5,
    },
    {
      url: `${siteData.siteURL}/login`,
      priority: 0.5,
    },
    {
      url: `${siteData.siteURL}/register`,
      priority: 0.5,
    },
  ];
}
