import type { MetadataRoute } from "next";

// /components is a noindexed internal reference and stays out on purpose.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://orisan.org/", changeFrequency: "monthly", priority: 1 },
    { url: "https://orisan.org/contact", changeFrequency: "monthly", priority: 0.5 },
  ];
}
