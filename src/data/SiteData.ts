import { SiteDataTypes } from "@/utils/types/Types";

const siteData: SiteDataTypes = {
  // Website Name
  siteName: "Blog Website",

  // Website Meta Title
  siteTitle: "Blog Website",

  // Website Meta Description
  siteDescription: "My Blog Website",

  siteURL: "http://localhost:3636",
  siteMetaImage: "/Images/metaCoverImage.jpg",

  // Website Logo that will be shown in header if color mode is dark
  logo: "/Images/logo.png",
  // Website Logo that will be shown in header if color mode is dark
  logoForDarkTheme: "/Images/logo-for-dark.png",

  // Logo Image dimentions - how large your image is
  logoWidth: 40,
  logoHeight: 40,

  // Flag to show logo in header. If true then Logo will be shown
  headerBrandingStyle: "both",

  googleAnalyticsID: undefined,

  // List of Pages to show in header
  pages: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Blogs",
      url: "/blog",
    },
    {
      name: "Categories",
      url: "/categories",
    },
    {
      name: "About us",
      url: "/about-us",
    },
  ],

  // List of all social Handles that will be shown on website
  socialHandles: [
    {
      name: "facebook",
      link: "https://web.facebook.com/AhmadRaza365",
    },
    {
      name: "instagram",
      link: "https://www.instagram.com/ahmadraza_365",
    },
    {
      name: "linkedin",
      link: "https://www.linkedin.com/in/ahmadraza365",
    },
    {
      name: "pinterest",
      link: "https://www.pinterest.com/ahmadraza365",
    },
    {
      name: "github",
      link: "https://github.com/AhmadRaza365",
    },
  ],

  // Define the Author
  author: {
    id: "ahmadraza365",
    name: "Ahmad Raza",
    profileImage: "/Images/author.jpg",
    bio: "Hi, I am Ahmad Raza from Pakistan. I am a Software Engineer with expertise in Web Development. I have professional experience in MERN Stack development, and Content Creation.",
    socialLinks: [
      {
        name: "facebook",
        link: "https://web.facebook.com/AhmadRaza365",
      },
      {
        name: "instagram",
        link: "https://www.instagram.com/ahmadraza_365",
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/ahmadraza365",
      },
      {
        name: "pinterest",
        link: "https://www.pinterest.com/ahmadraza365",
      },
      {
        name: "github",
        link: "https://github.com/AhmadRaza365",
      },
    ],
  },

  // Define your brand theme colors
  themeColors: {
    lightModeColors: {
      primaryColor: "#083D56",
      backgroundColor: "#FFFFFF",
    },
    darkModeColors: {
      primaryColor: "#D7DF71",
      backgroundColor: "#171717",
    },
  },
};

export { siteData };
