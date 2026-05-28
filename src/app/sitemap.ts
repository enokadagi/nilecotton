import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nilecotton.com";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/towels-collection`, lastModified: new Date() },
    { url: `${baseUrl}/hospitality-supply`, lastModified: new Date() },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date() },
    { url: `${baseUrl}/vendor`, lastModified: new Date() },
    { url: `${baseUrl}/procurement`, lastModified: new Date() },
  ];
}
