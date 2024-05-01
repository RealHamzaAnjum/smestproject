"use client";
import React, { useEffect, useRef, useState } from "react";
import { siteData } from "@/data/SiteData";
import Image from "next/image";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const urlPath = usePathname();

  useEffect(() => {
    setShowMenu(false);
  }, [urlPath]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className={`z-30 w-full flex items-center justify-between px-5 sm:px-10 md:px-14 lg:px-20 xl:px-36 py-4 bg-light-bg/30 dark:bg-dark-bg/30 backdrop-blur-lg text-white sticky top-0 left-0 shadow-md`}
      >
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
              <p className="text-xl sm:text-2xl font-bold italic text-light-primary dark:text-dark-primary">
                {siteData.siteName}
              </p>
            )}
          </section>
        </Link>
        <div className="flex md:hidden z-[31]" ref={menuRef}>
          <button
            className="text-black dark:text-white text-3xl border border-black/60 dark:border-white/60 rounded w-8 aspect-square flex justify-center items-center"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            {!showMenu ? <HiMenu /> : <IoClose />}
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-x-6">
          {siteData.pages.map((page, index) => {
            return (
              <Link
                key={index}
                href={page.url}
                className="text-black dark:text-white hover:text-light-primary dark:hover:text-dark-primary text-lg font-medium scale-100 hover:scale-105 transition-all duration-150 ease-in-out"
              >
                {page.name}
              </Link>
            );
          })}
        </nav>
      </header>
      <section
        ref={menuRef}
        className={`block md:hidden z-[31] pl-10 pt-24 h-screen backdrop-blur-lg bg-white/10 dark:bg-black/10 fixed top-0 left-0 w-80 max-w-xs transition-all duration-150 ease-in-out shadow-lg ${
          showMenu ? "translate-x-0" : "-translate-x-[110%]"
        }`}
      >
        <nav className="flex flex-col items-start gap-y-7">
          {siteData.pages.map((page, index) => {
            return (
              <Link
                key={index}
                href={page.url}
                className="text-black dark:text-white hover:text-light-primary dark:hover:text-dark-primary text-xl font-medium scale-100 hover:scale-105 transition-all duration-150 ease-in-out"
              >
                {page.name}
              </Link>
            );
          })}
        </nav>
      </section>
    </>
  );
}

export default Header;
