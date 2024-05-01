import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteData } from "@/data/SiteData";
import { FormateDate } from "@/utils/FormatDate";
import { GetArticleBySlug } from "@/utils/firebase";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

async function getBlogData(slug: string) {
  const article = await GetArticleBySlug(slug);
  if (article.result === "error") {
    notFound();
  }
  return article.article;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getBlogData(params.slug);

  return {
    title: article?.title,
    description: article?.shortDescription,
    keywords: article?.categories,
    authors: {
      name: siteData.author.name,
      url: siteData.author.socialLinks[0].link,
    },
    robots: "index, follow",
    openGraph: {
      images: [article?.coverImage],
      type: "article",
      title: article?.title,
      siteName: siteData.siteName,
      locale: "en_US",
      description: article?.shortDescription,
      authors: siteData.author.name,
      publishedTime: article?.date,
      tags: article?.categories,
      url: `${siteData.siteURL}/blog/${article?.slug}`,
    },
    twitter: {
      card: "summary",
      creator: siteData.author.name,
      title: article?.title,
      description: article?.shortDescription,
      creatorId: siteData.author.socialLinks.find(
        (social) => social.name === "twitter"
      )?.link,
      images: article?.coverImage,
      site: siteData.siteName,
    },
    metadataBase: new URL(siteData.siteURL),
    alternates: {
      canonical: `${siteData.siteURL}/blog/${article?.slug}/`,
    },
    category: article?.categories[0],
    publisher: siteData.author.name,
  };
}

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getBlogData(params.slug);

  return (
    <>
      <Header />
      <article className="px-5 sm:px-10 md:px-14 lg:px-20 xl:px-36 py-16">
        <section className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
          <dl>
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-light-primary/70 dark:text-dark-primary/70">
                <time dateTime="2023-06-01T00:00:00.000Z">
                  {FormateDate(article?.date ?? "", "MMM DD, YYYY")}
                </time>
              </dd>
            </div>
          </dl>
          <section>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-light-primary dark:text-dark-primary sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {article?.title}
            </h1>
          </section>
        </section>

        <section className="my-14 relative w-full aspect-video overflow-hidden">
          <Image src={article?.coverImage} alt={article?.title} fill className="object-cover" />
        </section>

        <section
          className="pt-10 pb-8 prose prose-custom dark:prose-invert max-w-none prose-img:object-contain"
          dangerouslySetInnerHTML={{ __html: article?.content }}
        ></section>
      </article>
      <Footer />
    </>
  );
}
