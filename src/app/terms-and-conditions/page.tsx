import type { Metadata } from "next";
import Translate from "@/components/Translate";

export const metadata: Metadata = {
  title: "Terms & Conditions | NileCotton",
  description: "Terms and conditions for NileCotton luxury hospitality textile inquiries and services.",
};

export default function TermsAndConditions() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-14 sm:px-8 lg:px-12">
      <section className="space-y-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
          <Translate value="Terms & Conditions" fallback="Terms & Conditions" />
        </p>
        <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.03em] sm:text-5xl">
          <Translate value="Premium textile service terms built for hospitality procurement and enterprise-class experiences." fallback="Premium textile service terms built for hospitality procurement and enterprise-class experiences." />
        </h1>
        <div className="space-y-6 text-base leading-8 text-[#1C1B1A]/75">
          <p>
            <Translate value="NileCotton provides premium hospitality textile and procurement services through an editorial, secure digital platform. All orders and inquiries are managed with discretion and care." fallback="NileCotton provides premium hospitality textile and procurement services through an editorial, secure digital platform. All orders and inquiries are managed with discretion and care." />
          </p>
          <p>
            <Translate value="The site content is for informational and inquiry purposes only. Client orders, pricing, and delivery terms are subject to agreement through our hospitality team." fallback="The site content is for informational and inquiry purposes only. Client orders, pricing, and delivery terms are subject to agreement through our hospitality team." />
          </p>
        </div>
      </section>
    </main>
  );
}
