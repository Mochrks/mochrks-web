import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  path?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, path = "", schema }) => {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || "https://www.mochrks.my.id";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const fullUrl = `${siteUrl}${cleanPath}`;

    const defaultDescription =
      "Portfolio of Moch. Rizki Kurniawan (@mochrks), a Software Developer and UI/UX Designer specializing in building robust, intuitive, and visually stunning web applications.";
    const defaultKeywords =
      "Moch. Rizki Kurniawan, mochrks, Software Developer, Fullstack Developer, Web Developer, UI/UX Designer, Photography, Portfolio, React Developer, Next.js, Vue.js, ASP.NET Core, Indonesia";

    // 1. Update Document Title
    const formattedTitle = title.includes("Moch. Rizki Kurniawan")
      ? title
      : `${title} | Moch. Rizki Kurniawan`;
    document.title = formattedTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (element) {
        element.setAttribute("content", content);
      } else {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        element.setAttribute("content", content);
        document.head.appendChild(element);
      }
    };

    // Helper function to update or create link tags
    const updateLinkTag = (relValue: string, hrefValue: string) => {
      let element = document.querySelector(`link[rel="${relValue}"]`);
      if (element) {
        element.setAttribute("href", hrefValue);
      } else {
        element = document.createElement("link");
        element.setAttribute("rel", relValue);
        element.setAttribute("href", hrefValue);
        document.head.appendChild(element);
      }
    };

    // Helper function to update or create JSON-LD schema script tags
    const updateSchema = (schemaData?: object) => {
      let element = document.querySelector('script[type="application/ld+json"]');
      if (schemaData) {
        if (element) {
          element.innerHTML = JSON.stringify(schemaData);
        } else {
          element = document.createElement("script");
          element.setAttribute("type", "application/ld+json");
          element.innerHTML = JSON.stringify(schemaData);
          document.head.appendChild(element);
        }
      } else if (element) {
        element.remove();
      }
    };

    // 2. Update Primary Meta Tags
    updateMetaTag("name", "title", formattedTitle);
    updateMetaTag("name", "description", description || defaultDescription);
    updateMetaTag("name", "keywords", keywords || defaultKeywords);

    // 3. Update Canonical Link
    updateLinkTag("canonical", fullUrl);

    // 4. Update OpenGraph Tags
    updateMetaTag("property", "og:title", formattedTitle);
    updateMetaTag("property", "og:description", description || defaultDescription);
    updateMetaTag("property", "og:url", fullUrl);

    // 5. Update Twitter Card Tags
    updateMetaTag("property", "twitter:title", formattedTitle);
    updateMetaTag("property", "twitter:description", description || defaultDescription);
    updateMetaTag("property", "twitter:url", fullUrl);

    // 6. Inject JSON-LD Schema
    updateSchema(schema);

    return () => {
      // Cleanup schema script on unmount to prevent crossover between routes
      const element = document.querySelector('script[type="application/ld+json"]');
      if (element) {
        element.remove();
      }
    };
  }, [title, description, keywords, path, schema]);

  return null; // This component operates strictly through side effects
};

export default SEO;
