export const resolveSanityLink = (link: any): string => {
  if (!link) return "/";

  if (link.linkType === "external") {
    return link.externalUrl || "/";
  }

  if (link.linkType === "internal" && link.internalReference?.slug?.current) {
    return `/${link.internalReference.slug.current}`;
  }

  return "/";
};
