import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteData } from "@/data/SiteData";
import { FormateDate } from "@/utils/FormatDate";
import { GetAllArticles, GetArticlesByCategory } from "@/utils/firebase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

async function getData(category: string) {
  const articles = await GetArticlesByCategory(category);
  if (articles.result === "error") {
    notFound();
  }
  return articles.articles;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  return {
    title: `${params.category}`,
    keywords: [siteData.siteName, params.category, `${params.category} in ${siteData.siteName}`, `articles related to ${params.category}`],
    robots: "index, follow",
    openGraph: {
      images: siteData.siteMetaImage,
      type: "website",
      title: `${params.category} | ${siteData.siteName}`,
      siteName: siteData.siteName,
      locale: "en_US",
      description: siteData.siteDescription,
      url: `${siteData.siteURL}/categories/${params.category}`,
    },
    twitter: {
      card: "summary",
      creator: siteData.author.name,
      title: `${params.category} | ${siteData.siteName}`,
      description: siteData.siteDescription,
      creatorId: siteData.author.socialLinks.find((social) => social.name === "twitter")?.link,
      images: siteData.siteMetaImage,
      site: siteData.siteName,
    },
    metadataBase: new URL(siteData.siteURL),
    alternates: {
      canonical: `${siteData.siteURL}/categories/${params.category}/`
    }
  }
}

async function Blogs({
  params,
}: {
  params: { category: string };
}) {
  const articles = await getData(params.category);

  return (
    <>
      <Header />
      <main className="px-5 sm:px-10 md:px-14 lg:px-20 xl:px-36">
        {/* All Recent Articles */}
        <section className="w-full my-20">
          <h1 className="text-4xl text-center font-bold my-10">
            From A to Z: Your Complete Guide to {params.category} - Top Articles for you!
          </h1>
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
