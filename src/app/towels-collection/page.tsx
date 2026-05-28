import Link from "next/link";
import type { Metadata } from "next";
import Translate from "@/components/Translate";

const whatsappNumber = "96170693560";

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const metadata: Metadata = {
  title: "Towels Collection | NileCotton",
  description: "Discover NileCotton's signature towel collection designed for premium hospitality and refined everyday rituals.",
};

export default function TowelsCollection() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-14 sm:px-8 lg:px-12">
      <section className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
            <Translate value="Towels Collection" fallback="Towels Collection" />
          </p>
          <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.03em] sm:text-5xl">
            <Translate value="Towels made for calm, tactile luxury." fallback="Towels made for calm, tactile luxury." />
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[#1C1B1A]/75">
            <Translate value="Our towel collection combines thoughtful weight, soft structure, and a refined palette so every touch feels elevated." fallback="Our towel collection combines thoughtful weight, soft structure, and a refined palette so every touch feels elevated." />
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Luxe Plush" fallback="Luxe Plush" />
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight">
              <Translate value="Suite Towels" fallback="Suite Towels" />
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate
                value="Generous dimensions, soft absorbency, and a premium finish designed for guest rooms and serene bathrooms."
                fallback="Generous dimensions, soft absorbency, and a premium finish designed for guest rooms and serene bathrooms."
              />
            </p>
            <a
              href={buildWhatsAppLink("Hi NileCotton, I am interested in Suite Towels for my hospitality project.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#DCCDB8]/70"
            >
              <Translate value="Order now" fallback="Order now" />
            </a>
          </article>
          <article className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Fine Weave" fallback="Fine Weave" />
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight">
              <Translate value="Bath Towels" fallback="Bath Towels" />
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate
                value="A balanced weight and luxurious hand feel that preserves warmth while maintaining an airy drape."
                fallback="A balanced weight and luxurious hand feel that preserves warmth while maintaining an airy drape."
              />
            </p>
            <a
              href={buildWhatsAppLink("Hi NileCotton, I am interested in Bath Towels from your collection.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#DCCDB8]/70"
            >
              <Translate value="Order now" fallback="Order now" />
            </a>
          </article>
          <article className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Guest Ready" fallback="Guest Ready" />
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight">
              <Translate value="Hand Towels" fallback="Hand Towels" />
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate
                value="Crisp edges, layering softness, and quiet formality for powder rooms, spas, and hospitality environments."
                fallback="Crisp edges, layering softness, and quiet formality for powder rooms, spas, and hospitality environments."
              />
            </p>
            <a
              href={buildWhatsAppLink("Hi NileCotton, I am interested in Hand Towels for hospitality and spa spaces.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#DCCDB8]/70"
            >
              <Translate value="Order now" fallback="Order now" />
            </a>
          </article>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2.5rem] border border-[#1C1B1A]/10 bg-[#F8F5F0] p-10 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Signature details" fallback="Signature details" />
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[#1C1B1A]/75">
              <li>
                <Translate value="Long staple cotton with a dense, plush weave." fallback="Long staple cotton with a dense, plush weave." />
              </li>
              <li>
                <Translate value="Soft sheen and exceptional durability for commercial use." fallback="Soft sheen and exceptional durability for commercial use." />
              </li>
              <li>
                <Translate value="Neutral tones that anchor any interior with warmth." fallback="Neutral tones that anchor any interior with warmth." />
              </li>
            </ul>
          </div>
          <div className="rounded-[2.5rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-10 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Tailored service" fallback="Tailored service" />
            </p>
            <p className="mt-6 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate value="Request a curated sample set or wholesale pricing for your project. We support hospitality programs, residential collections, and custom orders." fallback="Request a curated sample set or wholesale pricing for your project. We support hospitality programs, residential collections, and custom orders." />
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#1C1B1A] px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#FFFDF9] transition hover:bg-[#1C1B1A]/90"
              >
                <Translate value="Request sample" fallback="Request sample" />
              </Link>
              <a
                href="https://wa.me/96170693560"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-transparent px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:border-[#8A6F52] hover:text-[#8A6F52]"
              >
                <Translate value="WhatsApp order" fallback="WhatsApp order" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
