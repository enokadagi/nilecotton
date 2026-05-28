import type { Metadata } from "next";
import Translate from "@/components/Translate";

export const metadata: Metadata = {
  title: "About | NileCotton",
  description: "Learn about NileCotton's premium cotton legacy, hospitality-inspired craft, and thoughtful design philosophy.",
};

export default function About() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-14 sm:px-8 lg:px-12">
      <section className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
            <Translate value="About NileCotton" fallback="About NileCotton" />
          </p>
          <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.03em] sm:text-5xl">
            <Translate value="Designed for quiet luxury and premium hospitality living." fallback="Designed for quiet luxury and premium hospitality living." />
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[#1C1B1A]/75">
            <Translate
              value="NileCotton blends refined textiles, elevated minimalism, and hospitality sensibility to create everyday objects that feel generous and serene."
              fallback="NileCotton blends refined textiles, elevated minimalism, and hospitality sensibility to create everyday objects that feel generous and serene."
            />
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-10 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Our approach" fallback="Our approach" />
            </p>
            <p className="mt-6 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate
                value="We design with restraint, prioritizing warm neutrals, tactile surfaces, and sustainable materials that age gracefully."
                fallback="We design with restraint, prioritizing warm neutrals, tactile surfaces, and sustainable materials that age gracefully."
              />
            </p>
          </div>
          <div className="rounded-[2.5rem] border border-[#1C1B1A]/10 bg-[#F8F5F0] p-10 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Our craft" fallback="Our craft" />
            </p>
            <p className="mt-6 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate
                value="Premium cotton, considered construction, and a focus on quiet comfort define every textile we bring to market."
                fallback="Premium cotton, considered construction, and a focus on quiet comfort define every textile we bring to market."
              />
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Material" fallback="Material" />
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight">
              <Translate value="Premium cotton" fallback="Premium cotton" />
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate value="Long staple fibers woven for softness, strength, and a plush finish that invites touch." fallback="Long staple fibers woven for softness, strength, and a plush finish that invites touch." />
            </p>
          </article>
          <article className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Tone" fallback="Tone" />
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight">
              <Translate value="Warm minimalism" fallback="Warm minimalism" />
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate value="Soft beige, ivory and muted gold notes create a calm, timeless backdrop for luxury living." fallback="Soft beige, ivory and muted gold notes create a calm, timeless backdrop for luxury living." />
            </p>
          </article>
          <article className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Service" fallback="Service" />
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight">
              <Translate value="Bespoke support" fallback="Bespoke support" />
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1B1A]/75">
              <Translate value="We assist projects with tailored proposals, custom quantities, and premium hospitality program coordination." fallback="We assist projects with tailored proposals, custom quantities, and premium hospitality program coordination." />
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
