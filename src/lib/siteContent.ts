import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export const AUTH_COOKIE_NAME = "nilecotton_admin_auth";
const dataPath = path.join(process.cwd(), "src", "data", "siteContent.json");

export interface SiteContent {
  hero: {
    pretitle: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    imageAlt: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  collections: Array<{ id: string; title: string; description: string; imageUrl: string; imageAlt: string }>;
  hotelCollection: Array<{ id: string; title: string; description: string; imageUrl: string; imageAlt: string }>;
  products: Array<{ id: string; title: string; detail: string; imageUrl: string; imageAlt: string; price: string }>;
  testimonials: Array<{ id: string; quote: string; author: string }>;
  contact: {
    headline: string;
    email: string;
    phone: string;
    altEmail: string;
    buttonText: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    designerLabel: string;
    designerUrl: string;
    logoUrl: string;
    logoAlt: string;
  };
  vendor: {
    introLabel: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    card1Title: string;
    card1Text: string;
    card2Title: string;
    card2Text: string;
    ctaText: string;
  };
  procurement: {
    introLabel: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    card1Title: string;
    card1Text: string;
    card2Title: string;
    card2Text: string;
    ctaText: string;
  };
}

const defaultContent: SiteContent = {
  hero: {
    pretitle: "Luxury hospitality textiles",
    title: "Elevated bedding, towels, and spa textiles for hotels, resorts, and residences.",
    subtitle: "Warm, tactile fibers designed for hospitality environments where calm, premium comfort is essential.",
    imageUrl: "/nilecotton.png",
    imageAlt: "NileCotton luxury textile presentation",
    primaryLabel: "Explore collections",
    primaryHref: "#collections",
    secondaryLabel: "Request pricing",
    secondaryHref: "#b2b",
  },
  collections: [
    {
      id: "collection-1",
      title: "Toweling essentials",
      description: "Soft, absorbent towels that feel luxurious and refined in every suite.",
      imageUrl: "/nilecotton.png",
      imageAlt: "Luxury towel collection",
    },
    {
      id: "collection-2",
      title: "Spa robe rituals",
      description: "Relaxed silhouettes woven from premium cotton with a discreet, elevated finish.",
      imageUrl: "/nilecotton.png",
      imageAlt: "Spa robe textiles",
    },
    {
      id: "collection-3",
      title: "Guestroom accents",
      description: "Curated linens and vanity details created for calm, memorable interiors.",
      imageUrl: "/nilecotton.png",
      imageAlt: "Guestroom textile accents",
    },
  ],
  hotelCollection: [
    {
      id: "hotel-1",
      title: "Guestroom programs",
      description: "Textile palettes that support serene and sophisticated hospitality settings.",
      imageUrl: "/nilecotton.png",
      imageAlt: "Guestroom textile program",
    },
    {
      id: "hotel-2",
      title: "Spa and wellness",
      description: "Soft, restorative linens designed for quiet spa rituals and premium treatments.",
      imageUrl: "/nilecotton.png",
      imageAlt: "Spa textile collection",
    },
  ],
  products: [
    {
      id: "product-1",
      title: "Signature bath towels",
      detail: "A tactile weave with a luminous hand and exceptional durability.",
      imageUrl: "/nilecotton.png",
      imageAlt: "Signature bath towels",
      price: "Ask for pricing",
    },
    {
      id: "product-2",
      title: "Weighted bathrobes",
      detail: "Substantial, draped robes that feel indulgent and easy to wear.",
      imageUrl: "/nilecotton.png",
      imageAlt: "Weighted bathrobe",
      price: "Ask for pricing",
    },
    {
      id: "product-3",
      title: "Suite essentials",
      detail: "Thoughtful details and soft neutrals that anchor premium guest experiences.",
      imageUrl: "/nilecotton.png",
      imageAlt: "Suite essentials",
      price: "Ask for pricing",
    },
  ],
  testimonials: [
    {
      id: "testimonial-1",
      quote: "The textiles transformed our suites with calm, understated luxury.",
      author: "– General Manager, Luxury Resort",
    },
    {
      id: "testimonial-2",
      quote: "Every piece feels deliberate and beautifully finished.",
      author: "– Director of Hospitality, Boutique Hotel",
    },
    {
      id: "testimonial-3",
      quote: "Exceptional quality, consistently delivered across multiple properties.",
      author: "– Procurement Lead, Private Residences",
    },
  ],
  contact: {
    headline: "Speak with our hospitality team.",
    email: "thenilecotton@gmail.com",
    phone: "+961 70 693 560",
    altEmail: "nilecotton@nilelink.app",
    buttonText: "WhatsApp order",
  },
  footer: {
    copyright: "© 2026 NileCotton. Premium hospitality textiles.",
    tagline: "Luxury textile experiences for homes and hotels.",
    designerLabel: "Designed by StudioLink",
    designerUrl: "https://studiolink.nilelink.app/",
    logoUrl: "/nilecotton.png",
    logoAlt: "NileCotton logo",
  },
  vendor: {
    introLabel: "Vendor collaboration",
    title: "Partner with NileCotton for premium hospitality supply.",
    description: "Collaborate with our textile team to bring curated linens, towels, and spa programs to luxury hotels, resorts, and residences.",
    imageUrl: "/nilecotton.png",
    imageAlt: "Vendor preview",
    card1Title: "Wholesale coordination",
    card1Text: "Align inventory, pricing, and delivery cadence with our refined hospitality programs.",
    card2Title: "Supplier partnerships",
    card2Text: "Work with a trusted partner that understands premium textile quality and operational hospitality standards.",
    ctaText: "Request partner pricing",
  },
  procurement: {
    introLabel: "Procurement support",
    title: "Hospitality procurement with premium textile clarity.",
    description: "For buyers, designers, and project teams seeking refined textile programs, sample support and procurement guidance.",
    imageUrl: "/nilecotton.png",
    imageAlt: "Procurement preview",
    card1Title: "Program scoping",
    card1Text: "Align specifications, quantities, and material selections for hospitality projects with polished, premium support.",
    card2Title: "Sample approvals",
    card2Text: "Receive careful sample guidance and textile recommendations built for high-end guestroom and wellness environments.",
    ctaText: "Request a procurement briefing",
  },
};

function mergeDefaults<T>(defaults: T, value: unknown): T {
  if (Array.isArray(defaults)) {
    if (!Array.isArray(value)) {
      return defaults;
    }
    return value.map((item, index) => mergeDefaults(defaults[index] ?? defaults[0], item)) as any;
  }

  if (typeof defaults === "object" && defaults !== null) {
    const result: any = { ...defaults };
    if (typeof value === "object" && value !== null) {
      for (const key of Object.keys(defaults)) {
        result[key] = mergeDefaults((defaults as any)[key], (value as any)[key]);
      }
    }
    return result as T;
  }

  return value === undefined ? defaults : (value as T);
}

export async function ensureSiteContent(): Promise<SiteContent> {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.writeFile(dataPath, JSON.stringify(defaultContent, null, 2), "utf8");
  }
  return defaultContent;
}

export async function readSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    const parsed = JSON.parse(raw);
    return mergeDefaults(defaultContent, parsed) as SiteContent;
  } catch {
    return ensureSiteContent();
  }
}

export async function writeSiteContent(content: SiteContent): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(content, null, 2), "utf8");
}

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL?.trim() || "admin@nilecotton.com";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "NileCotton!2026";
}

export function getAdminToken(email: string, password: string): string {
  return crypto.createHash("sha256").update(`${email}:${password}`).digest("hex");
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  return email === getAdminEmail() && password === getAdminPassword();
}

export function verifyAdminCookie(cookieValue?: string): boolean {
  if (!cookieValue) {
    return false;
  }
  return cookieValue === getAdminToken(getAdminEmail(), getAdminPassword());
}
