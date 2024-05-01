import Image from "next/image";
import { siteData } from "@/data/SiteData";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GetAllArticles } from "@/utils/firebase";
import { FormateDate } from "@/utils/FormatDate";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteData.siteURL}/`
  }
};

async function getData() {
  const articles = await GetAllArticles();
  return articles.articles;
}

export default async function Home() {
  const articles = await getData();

  return (
    <>
      <Header />
      <main className="px-5 sm:px-10 md:px-14 lg:px-20 xl:px-36">
        {/* Top Brand Line Section */}
        <section className="w-full flex flex-col items-center gap-y-5 my-10 lg:my-16 px-3 py-12 rounded-lg bg-light-primary/20 dark:bg-dark-primary/20">
          <h1 className="text-center text-lg uppercase font-light tracking-wider">
            Welcome to {siteData.siteName}
          </h1>
          <p className="text-2xl lg:text-3xl w-full max-w-sm lg:max-w-3xl text-center leading-relaxed break-keep">
            Mastering Code: Weaving Together{" "}
            <span className="text-light-primary dark:text-dark-primary break-inside-avoid">
              Knowledge,{" "}
            </span>
            <span className="text-light-primary dark:text-dark-primary">
              Creativity,{" "}
            </span>
            and{" "}
            <span className="text-light-primary dark:text-dark-primary">
              Technical Excellence.
            </span>
          </p>
        </section>

        {/* Featured Section */}

        <section className="w-full">
          {articles.length > 0 && (
            <ArticleCard
              title={articles[0]?.title ?? ""}
              coverImage={articles[0]?.coverImage ?? ""}
              categories={articles[0]?.categories ?? []}
              shortDescription={articles[0]?.shortDescription ?? ""}
              slug={articles[0]?.slug ?? ""}
              layout="featured"
              date={articles[0]?.date}
            />
          )}
        </section>

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
          <section className="my-16 w-full flex items-center justify-center">
            <Link
              href="/blogs"
              className="text-lg bg-light-primary dark:bg-dark-primary text-light-bg dark:text-dark-bg py-2 px-5 w-fit rounded shadow-md "
            >
              Read More Articles
            </Link>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
