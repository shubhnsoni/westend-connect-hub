import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEO = ({
  title = "West End Civic Association (WECA) - Preserving the Heritage. Shaping the Future.",
  description = "The West End Civic Association represents residents of Rockville's historic West End neighborhood. Stay informed about community events, meetings, and development updates.",
  keywords = "West End, Rockville, civic association, WECA, community, meetings, events, Maryland, neighborhood",
  canonicalUrl = "https://westendrockvillemd.org",
  ogImage = "https://westendrockvillemd.org/og-image.jpg",
  ogType = "website",
  author = "West End Civic Association",
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  const fullTitle = title.includes("WECA") ? title : `${title} | WECA`;
  const truncatedTitle = fullTitle.length > 60 ? fullTitle.substring(0, 57) + "..." : fullTitle;
  const truncatedDescription = description.length > 160 ? description.substring(0, 157) + "..." : description;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{truncatedTitle}</title>
      <meta name="title" content={truncatedTitle} />
      <meta name="description" content={truncatedDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={truncatedTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="West End Civic Association" />
      <meta property="og:locale" content="en_US" />

      {/* Article specific */}
      {ogType === "article" && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={truncatedTitle} />
      <meta property="twitter:description" content={truncatedDescription} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Accessibility */}
      <meta name="theme-color" content="#1d7a5c" />
    </Helmet>
  );
};

export default SEO;
