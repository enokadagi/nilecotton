import type { Metadata } from "next";
import Translate from "@/components/Translate";

export const metadata: Metadata = {
  title: "Privacy Policy | NileCotton",
  description: "NileCotton's privacy policy for luxury hospitality textile inquiries and client data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-14 sm:px-8 lg:px-12">
      <section className="space-y-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">
          <Translate value="Privacy Policy" fallback="Privacy Policy" />
        </p>
        <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.03em] sm:text-5xl">
          <Translate value="We respect your privacy and protect your hospitality inquiry data." fallback="We respect your privacy and protect your hospitality inquiry data." />
        </h1>
        <div className="space-y-6 text-base leading-8 text-[#1C1B1A]/75">
          <p>
            <Translate value="NileCotton only collects the information needed to respond to your inquiries, support hospitality proposals, and deliver premium service." fallback="NileCotton only collects the information needed to respond to your inquiries, support hospitality proposals, and deliver premium service." />
          </p>
          <p>
            <Translate value="We do not sell your personal data. Contact details are used for the sole purpose of managing your request and answering follow-up questions." fallback="We do not sell your personal data. Contact details are used for the sole purpose of managing your request and answering follow-up questions." />
          </p>
          <p>
            <Translate value="Form input is validated, sanitized, and protected with anti-spam measures. Environment configuration is secured at the edge for deploys on Cloudflare." fallback="Form input is validated, sanitized, and protected with anti-spam measures. Environment configuration is secured at the edge for deploys on Cloudflare." />
          </p>
        </div>
      </section>
    </main>
  );
}
