import React from "react";
import { SocialHandleTypes } from "@/utils/types/Types";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";

type Props = {
  SocialLinks: SocialHandleTypes[];
};

export default function SocialLinks({ SocialLinks }: Props) {
  return (
    <section className="flex items-center gap-x-3">
      {SocialLinks.find((link) => link.name == "facebook") && (
        <a
          href={SocialLinks.find((link) => link.name == "facebook")?.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsFacebook className="text-3xl text-black hover:text-light-primary dark:text-white dark:hover:text-dark-primary transition-all ease-in-out duration-150 cursor-pointer hover:scale-110" />
        </a>
      )}

      {SocialLinks.find((link) => link.name == "instagram") && (
        <a
          href={SocialLinks.find((link) => link.name == "instagram")?.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsInstagram className="text-3xl text-black hover:text-light-primary dark:text-white dark:hover:text-dark-primary transition-all ease-in-out duration-150 cursor-pointer hover:scale-110" />
        </a>
      )}

      {SocialLinks.find((link) => link.name == "twitter") && (
        <a
          href={SocialLinks.find((link) => link.name == "twitter")?.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTwitter className="text-3xl text-black hover:text-light-primary dark:text-white dark:hover:text-dark-primary transition-all ease-in-out duration-150 cursor-pointer hover:scale-110" />
        </a>
      )}

      {SocialLinks.find((link) => link.name == "pinterest") && (
        <a
          href={SocialLinks.find((link) => link.name == "pinterest")?.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsPinterest className="text-3xl text-black hover:text-light-primary dark:text-white dark:hover:text-dark-primary transition-all ease-in-out duration-150 cursor-pointer hover:scale-110" />
        </a>
      )}

      {SocialLinks.find((link) => link.name == "github") && (
        <a
          href={SocialLinks.find((link) => link.name == "github")?.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub className="text-3xl text-black hover:text-light-primary dark:text-white dark:hover:text-dark-primary transition-all ease-in-out duration-150 cursor-pointer hover:scale-110" />
        </a>
      )}

      {SocialLinks.find((link) => link.name == "linkedin") && (
        <a
          href={SocialLinks.find((link) => link.name == "linkedin")?.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsLinkedin className="text-3xl text-black hover:text-light-primary dark:text-white dark:hover:text-dark-primary transition-all ease-in-out duration-150 cursor-pointer hover:scale-110" />
        </a>
      )}
    </section>
  );
}
