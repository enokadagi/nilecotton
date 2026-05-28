import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Translate from "@/components/Translate";
import { readSiteContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Contact | NileCotton",
  description: "Contact NileCotton for wholesale inquiries, hospitality programs, and luxury textile support.",
};

export default async function Contact() {
  const content = await readSiteContent();
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-14 sm:px-8 lg:px-12">
      <section className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
            <Translate value="Contact" />
          </p>
          <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.03em] sm:text-5xl">
            <Translate value="Let's begin your hospitality textile conversation." fallback="Let's begin your hospitality textile conversation." />
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[#1C1B1A]/75">
            <Translate value="Reach out for bespoke orders, hotel supply inquiries, and premium cotton proposals tailored to your brand." fallback="Reach out for bespoke orders, hotel supply inquiries, and premium cotton proposals tailored to your brand." />
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.5rem] border border-[#1C1B1A]/10 bg-[#F8F5F0] p-10 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
              <Translate value="Reach us" fallback="Reach us" />
            </p>
            <div className="mt-8 space-y-6 text-sm leading-7 text-[#1C1B1A]/75">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
                  <Translate value="Email" fallback="Email" />
                </p>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="mt-3 inline-flex text-base font-semibold text-[#1C1B1A] underline decoration-[#8A6F52]/30"
                >
                  {content.contact.email}
                </a>
                <p className="mt-2 text-sm text-[#1C1B1A]/75">{content.contact.altEmail}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
                  <Translate value="Phone" fallback="Phone" />
                </p>
                <p className="mt-3 text-base font-semibold">{content.contact.phone}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#8A6F52]">
                  <Translate value="WhatsApp" fallback="WhatsApp" />
                </p>
                <a
                  href={`https://wa.me/${content.contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hello NileCotton, I would like to inquire about your hospitality textile programs and pricing.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-base font-semibold text-[#1C1B1A] underline decoration-[#8A6F52]/30"
                >
                  {content.contact.phone}
                </a>
              </div>
            </div>
          </div>

          <ContactForm contactEmail={content.contact.email} contactPhone={content.contact.phone} />
        </div>
      </section>
    </main>
  );
}
