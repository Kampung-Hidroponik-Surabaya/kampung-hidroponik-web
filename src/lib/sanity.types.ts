import type { PortableTextBlock } from "@portabletext/react";

// ── Mirrors Sanity schema field names exactly ──────────────────────────────
// Any schema field rename must be reflected here + in GROQ queries (Item 5)

export type SanityImageAsset = {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    hotspot?: { x: number; y: number; width: number; height: number };
    alt?: string;
};

export type Author = {
    _id: string;
    name: string;
    photo?: SanityImageAsset;
    bio?: string;
};

export type Category = {
    _id: string;
    title: string;
    description?: string;
};

export type Post = {
    _id: string;
    title: string;
    slug: { current: string };
    author?: Pick<Author, "_id" | "name" | "photo">;
    category?: Pick<Category, "_id" | "title">;
    tags?: string[];
    mainImage?: SanityImageAsset;
    excerpt?: string;
    publishedAt?: string;
    featured?: boolean;
    body?: PortableTextBlock[];
};

export type Member = {
    _id: string;
    name: string;
    photo: SanityImageAsset;
    jabatan: string;
    orderRank: string;
    description?: string;
    instagram?: string;
    facebook?: string;
};

export type GalleryImage = {
    _id: string;
    title: string;
    image: SanityImageAsset;
    takenAt?: string;
    orderRank: string;
};

export type Program = {
    _id: string;
    title: string;
    description: string;
    image?: SanityImageAsset;
    date: string;
    active: boolean;
    relatedPost?: {slug: string};
};

export type SiteSettings = {
    siteTitle: string;
    description?: string;
    phone?: string;
    email?: string;
    instagram?: string;
    facebook?: string;
    address?: string;
};

export type Contact = {
    _id: string;
    name: string;
    phone: string;
    orderRank: string;
};

export type AboutPage = {
    heroImage?: SanityImageAsset;
    heroTagline: string;
    shortDescription: string;
    visi: string;
    misi: string[];
};
