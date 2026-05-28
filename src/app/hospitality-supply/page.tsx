import Link from "next/link";
import type { Metadata } from "next";
import Translate from "@/components/Translate";

const whatsappNumber = "96170693560";

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const metadata: Metadata = {
  title: "Hospitality Supply | NileCotton",
  description: "Explore NileCotton's hospitality supply services for premium hotels, spas, and boutique residences.",
};

export default function HospitalitySupply() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-14 sm:px-8 lg:px-12">
      <section className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
            <Translate value="Hospitality Supply" fallback="Hospitality Supply" />
          </p>
          <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.03em] sm:text-5xl">
            <Translate value="Premium textile programs for elevated guest experiences." fallback="Premium textile programs for elevated guest experiences." />
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[#1C1B1A]/75">
            <Translate value="We partner with luxury hotels, spa destinations, and curated residences to deliver hospitality linens that feel calm, considered, and unforgettable." fallback="We partner with luxury hotels, spa destinations, and curated residences to deliver hospitality linens that feel calm, considered, and unforgettable." />
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Program" fallback="Program" />
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight">
              <Translate value="Guestroom Linens" fallback="Guestroom Linens" />
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate
                value="Coordinated towels, robes, and bath accessories designed to feel cohesive in premium guestrooms."
                fallback="Coordinated towels, robes, and bath accessories designed to feel cohesive in premium guestrooms."
              />
            </p>
            <a
              href={buildWhatsAppLink("Hi NileCotton, I am interested in the Guestroom Linens hospitality program.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#DCCDB8]/70"
            >
              <Translate value="Order now" fallback="Order now" />
            </a>
          </article>
          <article className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Service" fallback="Service" />
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight">
              <Translate value="Spa & Wellness" fallback="Spa & Wellness" />
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate
                value="Thoughtful textiles for spa lounges, treatment rooms, and restorative rituals that honor calm."
                fallback="Thoughtful textiles for spa lounges, treatment rooms, and restorative rituals that honor calm."
              />
            </p>
            <a
              href={buildWhatsAppLink("Hi NileCotton, I am interested in the Spa & Wellness hospitality program.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#DCCDB8]/70"
            >
              <Translate value="Order now" fallback="Order now" />
            </a>
          </article>
          <article className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Scope" fallback="Scope" />
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight">
              <Translate value="Bespoke Orders" fallback="Bespoke Orders" />
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate
                value="Custom quantities, bespoke color stories, and project support for premium build-outs."
                fallback="Custom quantities, bespoke color stories, and project support for premium build-outs."
              />
            </p>
            <a
              href={buildWhatsAppLink("Hi NileCotton, I am interested in bespoke hospitality orders.")}
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
              <Translate value="Project support" fallback="Project support" />
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[#1C1B1A]/75">
              <li>
                <Translate value="Product selection and specification guidance for hospitality environments." fallback="Product selection and specification guidance for hospitality environments." />
              </li>
              <li>
                <Translate value="Samples delivered to your design team or procurement office." fallback="Samples delivered to your design team or procurement office." />
              </li>
              <li>
                <Translate value="Flexible ordering windows and tailored fulfillment options." fallback="Flexible ordering windows and tailored fulfillment options." />
              </li>
            </ul>
          </div>
          <div className="rounded-[2.5rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-10 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Start a program" fallback="Start a program" />
            </p>
            <p className="mt-6 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate value="Share your vision, guest profile, or property plan to receive a thoughtful proposal from our hospitality team." fallback="Share your vision, guest profile, or property plan to receive a thoughtful proposal from our hospitality team." />
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#1C1B1A] px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#FFFDF9] transition hover:bg-[#1C1B1A]/90"
              >
                <Translate value="Start inquiry" fallback="Start inquiry" />
              </Link>
              <a
                href="https://wa.me/96170693560"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-transparent px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:border-[#8A6F52] hover:text-[#8A6F52]"
              >
                <Translate value="WhatsApp inquiry" fallback="WhatsApp inquiry" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
