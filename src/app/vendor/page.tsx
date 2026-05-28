import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Translate from "@/components/Translate";
import { readSiteContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Vendor Portal | NileCotton",
  description: "Vendor landing page for NileCotton hospitality supply partners.",
};

export const dynamic = "force-dynamic";

export default async function VendorPortal() {
  const content = await readSiteContent();

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-14 sm:px-8 lg:px-12">
      <section className="space-y-10 rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-10 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value={content.vendor.introLabel} fallback={content.vendor.introLabel} />
            </p>
            <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.03em] sm:text-5xl">
              <Translate value={content.vendor.title} fallback={content.vendor.title} />
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[#1C1B1A]/75">
              <Translate value={content.vendor.description} fallback={content.vendor.description} />
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <article className="rounded-[1.75rem] border border-[#1C1B1A]/10 bg-[#F8F5F0] p-8">
                <h2 className="text-2xl font-semibold">
                  <Translate value={content.vendor.card1Title} fallback={content.vendor.card1Title} />
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
                  <Translate value={content.vendor.card1Text} fallback={content.vendor.card1Text} />
                </p>
              </article>
              <article className="rounded-[1.75rem] border border-[#1C1B1A]/10 bg-[#F8F5F0] p-8">
                <h2 className="text-2xl font-semibold">
                  <Translate value={content.vendor.card2Title} fallback={content.vendor.card2Title} />
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
                  <Translate value={content.vendor.card2Text} fallback={content.vendor.card2Text} />
                </p>
              </article>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#1C1B1A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#FFFDF9] transition hover:bg-[#1C1B1A]/90">
              <Translate value={content.vendor.ctaText} fallback={content.vendor.ctaText} />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#1C1B1A]/10 bg-[#F8F5F0] shadow-[0_24px_55px_rgba(28,27,26,0.08)]">
            <div className="aspect-[4/5] w-full">
              <Image src={content.vendor.imageUrl} alt={content.vendor.imageAlt || "NileCotton vendor preview"} fill className="object-cover" unoptimized priority />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,245,240,0.2),rgba(248,245,240,0.7))]" />
          </div>
        </div>
      </section>
    </main>
  );
}
