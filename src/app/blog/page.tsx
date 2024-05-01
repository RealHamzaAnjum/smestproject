import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteData } from "@/data/SiteData";
import { FormateDate } from "@/utils/FormatDate";
import { GetAllArticles } from "@/utils/firebase";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Blog`,
  keywords: [siteData.siteName, "Blog", "Blog", "All Blogs", `All Blogs of ${siteData.siteName}`, `All Articles in ${siteData.siteName}`],
  robots: "index, follow",
  openGraph: {
    images: siteData.siteMetaImage,
    type: "website",
    title: `Blog | ${siteData.siteName}`,
    siteName: siteData.siteName,
    locale: "en_US",
    description: siteData.siteDescription,
    url: `${siteData.siteURL}/blog`,
  },
  twitter: {
    card: "summary",
    creator: siteData.author.name,
    title: `Blog | ${siteData.siteName}`,
    description: siteData.siteDescription,
    creatorId: siteData.author.socialLinks.find((social) => social.name === "twitter")?.link,
    images: siteData.siteMetaImage,
    site: siteData.siteName,
  },
  metadataBase: new URL(siteData.siteURL),
  alternates: {
    canonical: `${siteData.siteURL}/blog/`
  }
};

async function getData() {
  const articles = await GetAllArticles();
  return articles.articles;
}

async function Blogs() {

  const articles = await getData();

  return (
    <>
      <Header />
      <main className="px-5 sm:px-10 md:px-14 lg:px-20 xl:px-36">
        {/* All Recent Articles */}
        <section className="w-full my-20">
          <h2 className="text-4xl text-center font-bold my-10">
            Latest Articles
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <section className="hidden md:block">
              {articles
                .filter((article, index) => index % 2 == 0)
                .map((article, index) => {
                  return (
                    <ArticleCard
                      key={index}
                      title={article.title}
                      coverImage={article.coverImage}
                      categories={article.categories}
                      shortDescription={article.shortDescription}
                      slug={article.slug}
                      layout="default"
                      date={article.date}
                    />
                  );
                })}
            </section>
            <section className="hidden md:block">
              {articles
                .filter((article, index) => index % 2 != 0)
                .map((article, index) => {
                  return (
                    <ArticleCard
                      key={index}
                      title={article.title}
                      coverImage={article.coverImage}
                      categories={article.categories}
                      shortDescription={article.shortDescription}
                      slug={article.slug}
                      layout="default"
                      date={article.date}
                    />
                  );
                })}
            </section>
            <section className="block md:hidden">
              {articles.map((article, index) => {
                return (
                  <ArticleCard
                    key={index}
                    title={article.title}
                    coverImage={article.coverImage}
                    categories={article.categories}
                    shortDescription={article.shortDescription}
                    slug={article.slug}
                    layout="default"
                    date={article.date}
                  />
                );
              })}
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Blogs;
