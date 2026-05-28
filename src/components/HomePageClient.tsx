"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { useAutoTranslate } from "@/lib/translate";
import type { SiteContent } from "@/lib/siteContent";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
};

function sanitizePhone(phone: string) {
  return (phone?.replace(/\D/g, "") || "96170693560").replace(/^0+/, "");
}

function buildWhatsAppLink(phone: string, message: string) {
  return `https://wa.me/${sanitizePhone(phone)}?text=${encodeURIComponent(message)}`;
}

function buildOrderMessage(item: { title: string; detail?: string; imageUrl?: string; price?: string }, prefix: string) {
  const lines = [
    prefix,
    `Product: ${item.title}`,
    item.price ? `Price: ${item.price}` : null,
    item.detail ? `Description: ${item.detail}` : null,
    item.imageUrl ? `Image: ${item.imageUrl}` : null,
    "Please send pricing, availability, and next steps.",
  ];

  return lines.filter(Boolean).join("\n");
}

export default function HomePageClient({ content }: { content: SiteContent }) {
  const { t } = useAutoTranslate();
  const heroImage = content.hero.imageUrl || "/nilecotton.png";
  const heroImageAlt = content.hero.imageAlt || "NileCotton luxury textile presentation";

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1C1B1A]">
      <motion.main initial="hidden" animate="visible" variants={fadeIn} className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(220,205,184,0.18),transparent_45%)] opacity-80" />
        <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-20 sm:px-8 md:pt-28 lg:px-12">
          <section className="relative overflow-hidden rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9]/95 shadow-[0_40px_90px_rgba(28,27,26,0.1)] md:min-h-[82vh]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(199,169,123,0.12),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(138,111,82,0.08),transparent_20%)]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8F5F0] via-transparent opacity-90" />
            <div className="grid min-h-[82vh] gap-10 px-6 py-10 md:grid-cols-[1.02fr_0.98fr] md:px-10 lg:px-14 xl:px-20">
              <motion.div variants={stagger} className="flex flex-col justify-center gap-8 py-8">
                <motion.p variants={fadeInUp} className="text-sm uppercase tracking-[0.34em] text-[#8A6F52]">{content.hero.pretitle}</motion.p>
                <motion.h1 variants={fadeInUp} className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-6xl">{content.hero.title}</motion.h1>
                <motion.p variants={fadeInUp} className="max-w-2xl text-base leading-7 text-[#1C1B1A]/80 sm:text-base">{content.hero.subtitle}</motion.p>
                <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href={content.hero.primaryHref}
                    className="inline-flex w-full min-h-[58px] items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#1C1B1A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#FFFDF9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1C1B1A]/95 sm:w-auto"
                  >
                    {content.hero.primaryLabel}
                  </a>
                  <a
                    href={content.hero.secondaryHref}
                    className="inline-flex w-full min-h-[58px] items-center justify-center rounded-full border border-[#8A6F52] bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#1C1B1A] transition duration-300 hover:bg-[#DCCDB8]/60 sm:w-auto"
                  >
                    {content.hero.secondaryLabel}
                  </a>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeIn} className="relative overflow-hidden rounded-[2rem] border border-[#1C1B1A]/10 bg-[#F2ECE4] shadow-[0_30px_80px_rgba(28,27,26,0.08)]">
                <div className="absolute inset-0">
                  <Image src={heroImage} alt={heroImageAlt} fill className="object-cover" unoptimized priority />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,245,240,0.85),rgba(248,245,240,0.45))]" />
                <div className="relative h-full min-h-[360px] overflow-hidden rounded-[2rem]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_40%)]" />
                  <div className="relative z-10 flex h-full items-end justify-end p-8">
                    <div className="max-w-[320px] rounded-[2rem] border border-[#FFFDF9]/70 bg-white/75 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(28,27,26,0.08)] sm:max-w-[360px]">
                      <p className="text-xs uppercase tracking-[0.34em] text-[#8A6F52]">{t("Editorial scene", "Editorial scene")}</p>
                      <p className="mt-4 text-3xl font-semibold leading-tight">{t("Warm, tactile textiles in natural light.", "Warm, tactile textiles in natural light.")}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="collections" className="mt-20 space-y-10">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">
              <motion.p variants={fadeInUp} className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">{t("Featured Collections", "Featured Collections")}</motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl font-semibold leading-tight sm:text-4xl">{t("An editorial rhythm of texture, tone, and hospitality.", "An editorial rhythm of texture, tone, and hospitality.")}</motion.h2>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {content.collections.map((item) => (
                <motion.article
                  key={item.id}
                  variants={fadeInUp}
                  className="group overflow-hidden rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-6 shadow-[0_24px_55px_rgba(28,27,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(28,27,26,0.12)]"
                >
                  <div className="mb-6 h-60 overflow-hidden rounded-[1.75rem] bg-[#E9E0D6]">
                    <img src={item.imageUrl || "/nilecotton.png"} alt={item.imageAlt || item.title} className="h-full w-full object-cover" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">{t("Collection", "Collection")}</p>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">{item.description}</p>
                  <a
                    href={buildWhatsAppLink(content.contact.phone, buildOrderMessage(item, "Hi NileCotton, I am interested in this collection:"))}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#1C1B1A] transition hover:bg-[#DCCDB8]/70"
                  >
                    {t("Order now", "Order now")}
                  </a>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mt-20 grid gap-8 xl:grid-cols-[1fr_0.95fr] xl:items-center">
            <motion.div variants={fadeInUp} className="space-y-5">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">{t("Hotel Collection", "Hotel Collection")}</p>
              <h2 className="text-4xl font-semibold leading-tight sm:text-4xl">{t("Tailored textiles for hospitality environments.", "Tailored textiles for hospitality environments.")}</h2>
              <p className="max-w-2xl text-base leading-7 text-[#1C1B1A]/75 sm:text-base">
                From guestroom programs to spa retreats, every piece is curated to feel calm, luxurious, and consistently exceptional.
              </p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2">
              {content.hotelCollection.map((item) => (
                <motion.article key={item.id} variants={fadeInUp} className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-6 shadow-[0_24px_50px_rgba(28,27,26,0.08)]">
                  <div className="mb-5 h-56 overflow-hidden rounded-[1.75rem] bg-[#E9E0D6]">
                    <img src={item.imageUrl || "/nilecotton.png"} alt={item.imageAlt || item.title} className="h-full w-full object-cover" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">{t("Signature", "Signature")}</p>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">{item.description}</p>
                  <a
                    href={buildWhatsAppLink(content.contact.phone, buildOrderMessage(item, "Hi NileCotton, I am interested in this hospitality item:"))}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#1C1B1A] transition hover:bg-[#DCCDB8]/70"
                  >
                    {t("Order now", "Order now")}
                  </a>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mt-20 overflow-hidden rounded-[2rem] border border-[#1C1B1A]/10 bg-[#DCCDB8]/10 p-8 shadow-[0_32px_80px_rgba(28,27,26,0.08)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">{t("Hospitality Supply", "Hospitality Supply")}</p>
                <h2 className="text-4xl font-semibold leading-tight sm:text-4xl">{t("A premium supply experience for hospitality partners.", "A premium supply experience for hospitality partners.")}</h2>
                <p className="max-w-2xl text-base leading-7 text-[#1C1B1A]/75 sm:text-base">
                  We deliver curated textile programs, project support, and refined coordination so every room feels thoughtfully appointed.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-[#FFFDF9] p-6 shadow-[0_24px_50px_rgba(28,27,26,0.05)]">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">{t("Sample service", "Sample service")}</p>
                  <p className="mt-4 text-3xl font-semibold">{t("Fast delivery", "Fast delivery")}</p>
                </div>
                <div className="rounded-[2rem] bg-[#FFFDF9] p-6 shadow-[0_24px_50px_rgba(28,27,26,0.05)]">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">{t("Program support", "Program support")}</p>
                  <p className="mt-4 text-3xl font-semibold">{t("Dedicated team", "Dedicated team")}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] xl:gap-14">
            <motion.div variants={fadeInUp} className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_30px_80px_rgba(28,27,26,0.08)] sm:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">{t("Product Showcase", "Product Showcase")}</p>
              <div className="mt-8 space-y-5">
                {content.products.map((product) => (
                  <div key={product.id} className="group overflow-hidden rounded-[2rem] border border-[#1C1B1A]/10 bg-[#F8F5F0] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(28,27,26,0.08)] sm:p-8">
                    <div className="mb-5 h-60 overflow-hidden rounded-[1.75rem] bg-[#E9E0D6]">
                      <img src={product.imageUrl || "/nilecotton.png"} alt={product.imageAlt || product.title} className="h-full w-full object-cover" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">Featured</p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight">{product.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">{product.detail}</p>
                    {product.price ? (
                      <p className="mt-4 text-lg font-semibold text-[#1C1B1A]">{product.price}</p>
                    ) : null}
                    <a
                      href={buildWhatsAppLink(content.contact.phone, buildOrderMessage(product, "Hi NileCotton, I would like to order this product:"))}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#1C1B1A] transition hover:bg-[#DCCDB8]/70"
                    >
                      {t("Order now", "Order now")}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="rounded-[2rem] bg-[#F8F5F0] p-8 shadow-[0_30px_80px_rgba(28,27,26,0.06)] sm:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">{t("Editorial Lifestyle", "Editorial Lifestyle")}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-4xl">{t("Soft light, tactile layers, and elegant pace.", "Soft light, tactile layers, and elegant pace.")}</h2>
              <p className="mt-5 text-base leading-7 text-[#1C1B1A]/75 sm:text-base">
                A calm modern perspective on luxury textiles rooted in hospitality, sunlit spaces and refined composition.
              </p>
            </motion.div>
          </section>

          <section className="mt-20 space-y-10">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">{t("Testimonials", "Testimonials")}</p>
              <h2 className="text-4xl font-semibold leading-tight sm:text-4xl">{t("What hospitality partners say.", "What hospitality partners say.")}</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {content.testimonials.map((item) => (
                <motion.article key={item.id} variants={fadeInUp} className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)] sm:p-10">
                  <p className="text-base font-semibold leading-tight text-[#1C1B1A] sm:text-base">{item.quote}</p>
                  <p className="mt-6 text-sm uppercase tracking-[0.3em] text-[#8A6F52]">{item.author}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="b2b" className="mt-20 grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2.5rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_40px_90px_rgba(28,27,26,0.1)] sm:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">{t("B2B Inquiry", "B2B Inquiry")}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-4xl">{t("Request hospitality pricing", "Request hospitality pricing")}</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#1C1B1A]/75 sm:text-base">
                {t("Share your property details and receive a premium offer curated for hotels, resorts, spas and luxury residences.", "Share your property details and receive a premium offer curated for hotels, resorts, spas and luxury residences.")}
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-[#F8F5F0] p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">{t("Properties", "Properties")}</p>
                  <p className="mt-4 text-3xl font-semibold">120+</p>
                </div>
                <div className="rounded-[2rem] bg-[#F8F5F0] p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">{t("Suites", "Suites")}</p>
                  <p className="mt-4 text-3xl font-semibold">3,500</p>
                </div>
              </div>
            </div>

            <ContactForm contactEmail={content.contact.email} contactPhone={content.contact.phone} />
          </section>

          <section className="mt-20 rounded-[2.5rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_40px_90px_rgba(28,27,26,0.1)] sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">{t("Contact", "Contact")}</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{content.contact.headline}</h2>
              </div>
              <a
                href={buildWhatsAppLink(content.contact.phone, "Hello NileCotton, I would like to inquire about hospitality textile pricing and collaboration.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#1C1B1A] transition duration-300 hover:border-[#8A6F52] hover:text-[#8A6F52]"
              >
                {t(content.contact.buttonText, content.contact.buttonText)}
              </a>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-[#F8F5F0] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">{t("Email", "Email")}</p>
                <p className="mt-3 text-base font-semibold">{content.contact.email}</p>
                <p className="text-sm text-[#1C1B1A]/60">{content.contact.altEmail}</p>
              </div>
              <div className="rounded-[2rem] bg-[#F8F5F0] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">{t("Phone", "Phone")}</p>
                <p className="mt-3 text-base font-semibold">{content.contact.phone}</p>
              </div>
            </div>
          </section>

          <footer className="mt-20 border-t border-[#1C1B1A]/10 pt-10 text-sm text-[#1C1B1A]/70">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {content.footer.logoUrl ? (
                  <img src={content.footer.logoUrl} alt={content.footer.logoAlt || "NileCotton logo"} className="h-10 w-auto object-contain" />
                ) : null}
                <div className="space-y-2">
                  <p>{content.footer.copyright}</p>
                  <a
                    href={content.footer.designerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8A6F52] transition duration-300 hover:text-[#1C1B1A] hover:underline"
                  >
                    {content.footer.designerLabel}
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.24em] text-[#8A6F52]">
                <a href="/privacy-policy" className="transition hover:text-[#1C1B1A] hover:underline">
                  {t("Privacy policy", "Privacy policy")}
                </a>
                <a href="/terms-and-conditions" className="transition hover:text-[#1C1B1A] hover:underline">
                  {t("Terms & Conditions", "Terms & Conditions")}
                </a>
              </div>
            </div>
            <p className="mt-6">{content.footer.tagline}</p>
          </footer>
        </div>
      </motion.main>

      <a
        href="https://wa.me/96170693560"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/90 px-4 py-3 text-xs font-semibold text-[#1C1B1A] shadow-[0_18px_50px_rgba(28,27,26,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(28,27,26,0.22)] sm:right-6 sm:bottom-6 sm:px-5 sm:py-4 sm:text-sm"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#DCCDB8] text-sm font-semibold text-[#1C1B1A] shadow-sm">WA</span>
        WhatsApp order
      </a>
    </div>
  );
}
