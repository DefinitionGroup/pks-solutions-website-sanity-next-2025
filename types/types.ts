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

export interface ThreeColVideoBannerProps {
  _type: "threeColumnVideoBanner";
  videoCloudinary: { url: string };
  title: string;
  highlight?: string;
  primaryDescription?: string;
  secondaryDescription?: string;
  ctaButtons: Array<{
    name: string;
    link: { href?: string; reference?: { slug?: { current: string } } };
  }>;
}
export interface FourColVideoBannerProps {
  _type: "fourColumnVideoBanner";
  videoCloudinary: { url: string };
  brandName: string;
  headline: string;
  headlineHighlight?: string;
  column2Title?: string;
  column2Description?: string;
  column3Title?: string;
  column3Description?: string;
  ctaButtons: Array<{
    name: string;
    link: { href?: string; reference?: { slug?: { current: string } } };
  }>;
}
type Module = {
  _type: "card3";
  title: string;
  subtitle: string;
  video: CloudinaryAsset;
};
// future modules:

export interface TabItem {
  title: string;
  value: string;
  modules: Module[];
}
export interface ShowcaseTabsProps {
  _type: "showcaseTabs";
  className?: string;
  tabs: TabItem[];
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
  showTopHero?: boolean;
  className?: string;
  containerClassName?: string;
  videoCloudinary?: CloudinaryAsset;
  headline: string;
  highlightText: string;
  leftDescription: string;
  rightDescription: string;
  ctaButton: {
    name: string;
    link?: {
      _type: string;
      linkType: "external" | "internal";
      externalUrl?: string;
      internalReference?: {
        _ref: string;
        _type: "reference";
      };
    };
  };
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
  ctaButton: {
    name: string;
    link?: {
      _type: string;
      linkType: "external" | "internal";
      externalUrl?: string;
      internalReference?: {
        _ref: string;
        _type: "reference";
      };
    };
  };
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
      ctaButton: {
        name: string;
        link?: {
          _type: string;
          linkType: "external" | "internal";
          externalUrl?: string;
          internalReference?: {
            _ref: string;
            _type: "reference";
          };
        };
      };
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
      ctaButton: {
        name: string;
        link?: {
          _type: string;
          linkType: "external" | "internal";
          externalUrl?: string;
          internalReference?: {
            _ref: string;
            _type: "reference";
          };
        };
      };
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
    ctaButton: {
      name: string;
      link?: {
        _type: string;
        linkType: "external" | "internal";
        externalUrl?: string;
        internalReference?: {
          _ref: string;
          _type: "reference";
        };
      };
    };
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
    ctaButton: {
      name: string;
      link?: {
        _type: string;
        linkType: "external" | "internal";
        externalUrl?: string;
        internalReference?: {
          _ref: string;
          _type: "reference";
        };
      };
    };
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
  ctaButton: {
    name: string;
    link?: {
      _type: string;
      linkType: "external" | "internal";
      externalUrl?: string;
      internalReference?: {
        _ref: string;
        _type: "reference";
      };
    };
  };
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
  contentPKS: (
    | Hero
    | BlogList
    | ProjectList
    | ClientsList
    | ContactForm
    | ThreeColVideoBannerProps
    | ShowcaseTabsProps
  )[];
  channel: string;
  protected?: boolean;
  allowedGroups?: UserGroup[];
}

// Add these interfaces to your existing types.ts
export interface BlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: {
    _type: "slug";
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

/**
 * Project Schema
 */
export interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: {
    current: string;
  };
  logo?: CloudinaryAsset;
  headerImage?: CloudinaryAsset;
  description?: string;
  client?: {
    _ref: string;
    _type: "reference";
  };
}

/**
 * ProjectList Schema
 */
export interface ProjectList {
  _type: "projectList";
  title: string;
  subtitle?: string;
  description?: string;
  projects: Project[];
}
export interface Client {
  _id: string;
  _type: "client";
  name: string;
  slug: { current: string };
  logo?: CloudinaryAsset;
  website?: string;
  description?: string;
  channels?: string[];
  projects?: Project[];
}
export interface ClientsList {
  _type: "clientsList";
  _key: string;
  title: string;
  subtitle?: string;
  description?: string;
  clients?: Array<{
    _type: "reference";
    _ref: string;
  }>;
}
/**
 * ContactForm Schema
 */
export interface ContactForm {
  _type: "contactForm";
  title?: string;
  subtitle?: string;
  emailRecipient?: string;
  successMessage?: string;
  nameFieldLabel?: string;
  emailFieldLabel?: string;
  messageFieldLabel?: string;
  submitButtonText?: string;
}
export interface SanityContactFormPropsType {
  value: ContactForm;
  locale: string;
}
export interface UserGroup {
  _id: string;
  _type: "userGroup";
  name: string;
  description?: string;
}

export interface User {
  _id: string;
  _type: "user";
  clerkId: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  group?: UserGroup;
  restrictedPages?: string[];
}
