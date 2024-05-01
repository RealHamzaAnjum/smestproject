import React from "react";
import EmailForm from "./EmailForm";
import SocialLinks from "./SocialLinks";
import { siteData } from "@/data/SiteData";

type props = {
  showEmailForm?: boolean;
};

export default function Footer({ showEmailForm = true }: props) {
  return (
    <section className="">
      {showEmailForm && (
        <section className="relative">
          <EmailForm />
        </section>
      )}
      <section className="py-10 flex flex-col items-center gap-y-5">
        <SocialLinks SocialLinks={siteData.socialHandles} />

        <p className="text-sm">
          {`${siteData.author.name} © ${new Date().getFullYear()} • ${
            siteData.siteName
          }`}
        </p>
        <a
          href="https://ahmadraza365.diveintoskills.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
        >
          Developed By AhmadRaza365
        </a>
      </section>
    </section>
  );
}
