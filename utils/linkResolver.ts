export const resolveSanityLink = (link: any, locale?: string): string => {
  if (!link) return "";

  if (link.linkType === "external") {
    return link.externalUrl || "";
  }

  if (link.linkType === "internal") {
    const slug = link.internalReference?.slug?.current;
    if (slug) {
      return locale ? `/${locale}/${slug}` : `/${slug}`;
    }
  }

  return "";
};
