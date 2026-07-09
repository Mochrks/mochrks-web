import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  path?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, path = "", schema }) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://www.mochrks.my.id";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = `${siteUrl}${cleanPath}`;

  const defaultDescription =
    "Portfolio of Moch. Rizki Kurniawan (@mochrks), a Software Developer and UI/UX Designer specializing in building robust, intuitive, and visually stunning web applications.";
  const defaultKeywords =
    "Moch. Rizki Kurniawan, mochrks, Software Developer, Fullstack Developer, Web Developer, UI/UX Designer, Photography, Portfolio, React Developer, Next.js, Vue.js, ASP.NET Core, Indonesia";

  const formattedTitle = title.includes("Moch. Rizki Kurniawan")
    ? title
    : `${title} | Moch. Rizki Kurniawan`;

  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="title" content={formattedTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={fullUrl} />

      <meta property="twitter:title" content={formattedTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:url" content={fullUrl} />

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default SEO;
