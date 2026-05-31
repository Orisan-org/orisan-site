import type { MetadataRoute } from "next";
import { navigation, siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = Array.from(new Set(["/", "/brief", "/scout/sample-report", ...navigation.map((item) => item.href)]));

  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8
  }));
}
