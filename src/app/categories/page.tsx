import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteData } from "@/data/SiteData";
import { FormateDate } from "@/utils/FormatDate";
import { GetAllArticles, GetAllCategories } from "@/utils/firebase";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: `All Categories`,
  keywords: [siteData.siteName, "categories", "All Categories", `All Categories of ${siteData.siteName}`],
  robots: "index, follow",
  openGraph: {
    images: siteData.siteMetaImage,
    type: "website",
    title: `All Categories | ${siteData.siteName}`,
    siteName: siteData.siteName,
    locale: "en_US",
    description: siteData.siteDescription,
    url: `${siteData.siteURL}/categories`,
  },
  twitter: {
    card: "summary",
    creator: siteData.author.name,
    title: `All Categories | ${siteData.siteName}`,
    description: siteData.siteDescription,
    creatorId: siteData.author.socialLinks.find((social) => social.name === "twitter")?.link,
    images: siteData.siteMetaImage,
    site: siteData.siteName,
  },
  metadataBase: new URL(siteData.siteURL),
  alternates: {
    canonical: `${siteData.siteURL}/categories/`
  }
};

async function getData() {
  const categories = await GetAllCategories();
  return categories.categories;
}

async function Categories() {
  const categories = await getData();

  return (
    <>
      <Header />
      <main className="px-5 sm:px-10 md:px-14 lg:px-20 xl:px-36 min-h-[60vh]">
        {/* All Categories */}
        <section className="w-full my-20">
          <h1 className="text-4xl text-center font-bold my-10">
            All Categories
          </h1>
          <section className="flex flex-wrap justify-center items-center gap-10 my-16 max-w-4xl mx-auto">
            {categories.map((category, index) => {
              return (
                <Link
                  key={index}
                  href={`/categories/${category?.slug}`}
                  className="relative text-lg font-semibold text-light-bg dark:text-dark-bg px-5 py-3 border border-light-primary dark:border-dark-primary after:bg-light-primary after:dark:bg-dark-primary after:w-full after:h-full after:absolute after:top-1.5 after:left-1.5 after:z-[-1] hover:after:top-0 hover:after:left-0 focus:after:top-0 focus:after:left-0 after:transition-all after:ease-in-out after:duration-200"
                  tabIndex={2}
                >
                  {category.name}
                </Link>
              );
            })}
          </section>
        </section>
      </main>
      <Footer showEmailForm={false} />
    </>
  );
}

export default Categories;
