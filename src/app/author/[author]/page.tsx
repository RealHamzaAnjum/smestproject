import Image from "next/image";
import React from "react";
import { siteData } from "@/data/SiteData";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Error from "next/error";
import { notFound } from "next/navigation";

const getAuthorBio = (author: string) => {
  // const siteData;
  const ismatching = siteData.author.id === author;
};

function Author({ params }: { params: { author: string } }) {
  const { author } = siteData;
  // const navigation = u

  if (author.id !== params.author) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="px-5 sm:px-10 md:px-14 lg:px-20 xl:px-36 py-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-light-primary dark:text-dark-primary">
          About The Author
        </h1>
        <section className="my-10 grid grid-cols-12 gap-x-5 gap-y-10">
          <section className="col-span-full md:col-span-4 bg-black aspect-square w-full max-w-sm mx-auto rounded-full overflow-hidden relative">
            <Image src={author.profileImage} alt={author.name} fill />
          </section>
          <section className="col-span-full md:col-span-8 flex flex-col items-center justify-center gap-y-5 lg:gap-y-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-center text-light-primary dark:text-dark-primary">
              {author.name}
            </h2>
            <p className="w-full lg:w-8/12 text-center text-lg lg:text-xl">
              {author.bio}
            </p>
            <SocialLinks SocialLinks={author.socialLinks} />
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Author;
