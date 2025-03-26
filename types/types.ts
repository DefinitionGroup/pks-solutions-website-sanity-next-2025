// types.ts

/**
 * A basic type for Sanity images.
 * You may choose to import your own image type from your Sanity helper libraries.
 */
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

/**
 * CloudinaryAsset represents an asset stored in Cloudinary.
 */
export interface CloudinaryAsset {
  _type: "cloudinary.asset";
  public_id: string;
  secure_url: string;
  // Add any additional Cloudinary-specific fields if needed.
}

/**
 * Portable text block.
 * Adjust this type according to your project's setup,
 * for example by importing types from "@sanity/block-content-to-react" or "@sanity/types".
 */
export type PortableTextBlock = any;

/* ===================================================== */
/*                   Schema Types                        */
/* ===================================================== */

/**
 * HeroType Schema
 */
export interface Hero {
  _type: "hero";
  className?: string;
  containerClassName?: string;
  videoCloudinary?: CloudinaryAsset;
  headline: string;
  highlightText: string;
  leftDescription: string;
  rightDescription: string;
  ctaButtonText: string;
  modules: (
    | SciFiBlock[]
    | GridHero[]
    | GridHero2[]
    | GridHero3[]
    | ZwischenTitelCta[]
  )[];
}

/**
 * TripleHero Schema and its Hero Items.
 */
export interface TripleHero {
  _type: "tripleHero";
  items: HeroItem[]; // Must contain exactly three items in your schema validation.
}

export interface HeroItem {
  _type: "heroItem";
  /** Background image for hover effect */
  hoverBackgroundCloudinary?: CloudinaryAsset;
  /** Fixed title text (e.g. "PSYSTEM", "PMOBILE", "AVATR") */
  fixedTitle: string;
  /** Hover title text (defaults to "AI Analyse") */
  hoverTitle?: string;
  /** Description text shown on hover */
  hoverDescription?: string;
  /** Call-to-action button text */
  buttonText: string;
  /** Icon image displayed alongside the fixed title */
  fixedIconCloudinary?: CloudinaryAsset;
}

/**
 * SciFiBlock Schema
 * This schema now only uses the TripleHero module.
 */
export interface SciFiBlock {
  _type: "sciFiBlock";
  className?: string;
  tripleHero: TripleHero;
}

/**
 * GridHero Schema
 */
export interface GridHero {
  _type: "gridHero";
  sectionOne: {
    left: {
      subtitle: string;
      title: string;
    };
    middle: {
      quote: string;
      buttonText: string;
    };
    right: {
      videoCloudinary?: CloudinaryAsset;
    };
  };
  showSectionTwo: boolean;
  sectionTwo: {
    leftCard: {
      imageCloudinary: CloudinaryAsset;
      title: string;
      description: string;
    };
    rightSection: {
      subtitle: string;
      title: string;
      description: string;
      buttonText: string;
    };
  };
}

/**
 * GridHero2 Schema
 */
export interface GridHero2 {
  _key: string;
  _type: "gridHero2";
  leftTitle: string;
  middle: {
    description1: string;
    description2: string;
  };
  right: {
    logoTitle: string;
    logos: CloudinaryAsset[];
    buttonText: string;
  };
}

/**
 * GridHero3 Schema
 */
export interface GridHero3 {
  _type: "gridHero3";
  leftSection: {
    subtitle: string;
    title: string;
    quoteLeft: string;
  };
  middleSection: {
    title: string;
    subtitle: string;
    videoCloudinary: CloudinaryAsset;
  };
  rightSection: {
    quoteRight: string;
    buttonText: string;
  };
}

/**
 * ZwischenTitelCta Schema
 */
export interface ZwischenTitelCta {
  _type: "zwischenTitelCta";
  integrationTitle: string;
  headline: string;
  subHeadline: string;
  buttonText: string;
}

/**
 * PageType Schema
 */
// Add these interfaces above your existing PageType definition
export interface MenuItemType {
  _key: string;
  displayName: string;
  page: {
    slug: {
      current: string;
    };
  };
}

export interface MenuType {
  _id: string;
  _type: "menu";
  title?: string;
  menuType: "Navbar" | "Footer";
  menuItems?: MenuItemType[];
  imageCloud?: CloudinaryAsset;
  footerColumns?: Array<{
    title?: string;
    links?: LinkType[];
  }>;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  copyright?: string;
}

export interface LinkType {
  displayName?: string;
  linkType?: "internal" | "external";
  page?: {
    _ref: string;
    _type: "reference";
    slug?: {
      current: string;
    };
  };
  externalUrl?: string;
}

export interface PageType {
  _type: "page";
  title: string;
  slug: string;
  subtitle: string;
  content: (Hero | BlogList)[]; // Add BlogList to the union type
}

// Add these interfaces to your existing types.ts
export interface BlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  content: PortableTextBlock;
  categories?: BlogCategory[];
  author?: BlogAuthor;
}

export interface BlogCategory {
  _id: string;
  _type: "blogCategory";
  title: string;
  slug: string;
}

export interface BlogAuthor {
  _id: string;
  _type: "blogAuthor";
  name: string;
  image?: SanityImage;
  bio?: string;
}

export interface BlogList {
  _type: "blogList";
  title?: string;
  subtitle?: string;
  postsPerPage?: number;
  selectedPosts?: BlogPost[];
  selectionType: "auto" | "manual";
}
