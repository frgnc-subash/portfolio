import { useEffect } from "react";

const SITE_URL = "https://subashlamatamang.com.np";
const SITE_NAME = "Subash Lama Tamang";
const DEFAULT_IMAGE = `${SITE_URL}/preview.svg`;

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown>;
}

const setMeta = (selector: string, attribute: "content" | "href", value: string) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};

const upsertMeta = (
  key: "name" | "property",
  name: string,
  content: string
) => {
  let element = document.querySelector(`meta[${key}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(key, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

export const useSeo = ({
  title,
  description,
  path = "/",
  type = "website",
  image = DEFAULT_IMAGE,
  jsonLd,
}: SeoOptions) => {
  useEffect(() => {
    const canonicalUrl = new URL(path, SITE_URL).toString();
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", "index, follow");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", `${SITE_NAME} portfolio preview`);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    setMeta('link[rel="canonical"]', "href", canonicalUrl);

    const existingJsonLd = document.querySelector('script[data-seo-jsonld="page"]');
    existingJsonLd?.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonld = "page";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [description, image, jsonLd, path, title, type]);
};

export { SITE_NAME, SITE_URL };
