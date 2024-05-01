import Link from "next/link";
import React from "react";
import { siteData } from "@/data/SiteData";
import Image from "next/image";
import { TbLogout2 } from "react-icons/tb";
import { Logout } from "@/utils/firebase";

export default function Header({ userData }: any) {
  const { fullName, email, profilePic } = userData
    ? userData
    : {
        fullName: "",
        email: "",
        profilePic: "https://picsum.photos/500",
      };
  return (
    <header className="z-30 w-full flex items-center justify-between px-8 py-4 bg-light-bg dark:bg-dark-bg text-white fixed top-0 left-0 shadow-md shadow-black/10 dark:shadow-white/5">
      {/* Logo & Site Name Section  */}
      <Link href="/">
        <section className="flex items-center gap-x-3">
          {/* Show Logo if headerBrandingStyle is set to only_logo or both */}
          {(siteData.headerBrandingStyle === "only_logo" ||
            siteData.headerBrandingStyle === "both") && (
            <>
              <Image
                src={siteData.logo}
                alt={siteData.siteName}
                width={siteData.logoWidth}
                height={siteData.logoHeight}
                className="block dark:hidden"
              />
              <Image
                src={siteData.logoForDarkTheme}
                alt={siteData.siteName}
                width={siteData.logoWidth}
                height={siteData.logoHeight}
                className="hidden dark:block"
              />
            </>
          )}
          {/* Show SiteName if headerBrandingStyle is set to only_site_name or both */}
          {(siteData.headerBrandingStyle === "only_site_name" ||
            siteData.headerBrandingStyle === "both") && (
            <h1 className="text-xl sm:text-2xl font-bold italic text-light-primary dark:text-dark-primary">
              {siteData.siteName}
            </h1>
          )}
        </section>
      </Link>
      <section className="relative group">
        <div className="w-10 h-10 border-[3px] border-light-primary dark:border-dark-primary rounded-full relative overflow-hidden flex justify-center items-center cursor-pointer">
          <Image
            src={profilePic}
            alt="User Profile"
            width={500}
            height={500}
            className="absolute w-full h-full object-cover"
          />
        </div>
        <section className="hidden group-hover:block absolute right-0 top-full w-80 bg-light-bg dark:bg-dark-bg rounded-lg px-5 py-3 shadow-lg shadow-black/10 dark:shadow-white/5">
          <p className="text-xl font-bold text-black dark:text-white break-all py-2.5 border-b border-black/20 dark:border-b-white/20">
            {fullName}
          </p>
          <p className="text-base font-medium text-black dark:text-white break-all py-2.5 border-b border-black/20 dark:border-b-white/20">
            {email}
          </p>
          <button
            className="flex items-center justify-start gap-x-4 w-full py-2.5 text-black dark:text-white"
            onClick={() => {
              Logout();
            }}
          >
            <TbLogout2 className="text-3xl" /> Logout
          </button>
        </section>
      </section>
    </header>
  );
}
