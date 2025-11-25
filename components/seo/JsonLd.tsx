export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LogAnalytics",
    "url": "https://loganalytics.org",
    "logo": "https://loganalytics.org/opengraph-image",
    "description": "Free browser-based log analysis tool powered by DuckDB-Wasm. Parse Apache, Nginx, AWS logs locally with SQL.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hi@loganalytics.org",
      "contactType": "Customer Support"
    },
    "sameAs": [
      "https://github.com/7and1/loganalytics"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LogAnalytics",
    "url": "https://loganalytics.org",
    "description": "Parse Apache, Nginx & AWS Logs in Your Browser. Privacy-first, DuckDB-Wasm powered.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://loganalytics.org/format/{slug}"
      },
      "query-input": "required name=slug"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LogAnalytics",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "1"
    },
    "description": "Free browser-based log analysis tool. Parse Apache, Nginx, AWS S3, CloudFront, and Kubernetes logs locally with SQL. DuckDB-Wasm powered, 100% privacy-first."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
