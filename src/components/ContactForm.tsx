"use client";

import { useState, type FormEvent } from "react";
import { useAutoTranslate } from "@/lib/translate";

type ContactFormProps = {
  contactEmail?: string;
  contactPhone?: string;
};

export default function ContactForm({ contactEmail, contactPhone }: ContactFormProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>(
    {
      type: "idle",
      message: "",
    },
  );
  const [isSending, setIsSending] = useState(false);
  const { t } = useAutoTranslate();

  const recipientEmail = contactEmail?.trim() || "thenilecotton@gmail.com";
  const whatsappNumber = (contactPhone?.replace(/\D/g, "") || "96170693560").replace(/^0+/, "");

  const buildContactBody = () => {
    return `${t("Name", "Name")}: ${name.trim()}
${t("Company", "Company")}: ${company.trim()}
${t("Email", "Email")}: ${email.trim()}

${t("Message", "Message")}:\n${message.trim()}`;
  };

  const buildEmailSubject = () => {
    const prefix = t("Inquiry from", "Inquiry from");
    return `${prefix} ${name.trim() || "website visitor"}`;
  };

  const validateFields = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", message: t("Please complete your name, email, and message before sending.", "Please complete your name, email, and message before sending.") });
      return false;
    }

    if (website.trim()) {
      setStatus({ type: "error", message: "Spam detected. Please refresh the page and try again." });
      return false;
    }

    return true;
  };

  const sendEmailDraft = () => {
    const subject = buildEmailSubject();
    const body = buildContactBody();
    const mailto = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus({ type: "success", message: t("Your default email client opened with a ready message draft.", "Your default email client opened with a ready message draft.") });
  };

  const sendWhatsAppDraft = () => {
    const body = `${t("Hello NileCotton, I would like to share the following inquiry:", "Hello NileCotton, I would like to share the following inquiry:")}

${buildContactBody()}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`;
    window.open(whatsappUrl, "_blank");
    setStatus({ type: "success", message: t("WhatsApp window opened with your message ready.", "WhatsApp window opened with your message ready.") });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateFields()) {
      return;
    }
    sendEmailDraft();
  };

  const handleSendWhatsApp = () => {
    if (!validateFields()) {
      return;
    }
    sendWhatsAppDraft();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-[2.5rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-10 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-[#1C1B1A]/80">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="block w-full rounded-3xl border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-4 text-sm outline-none transition focus:border-[#8A6F52]"
            placeholder="Your name"
          />
        </label>
        <label className="space-y-2 text-sm text-[#1C1B1A]/80">
          Company
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="block w-full rounded-3xl border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-4 text-sm outline-none transition focus:border-[#8A6F52]"
            placeholder="Brand or hotel"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm text-[#1C1B1A]/80">
        Email
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          className="block w-full rounded-3xl border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-4 text-sm outline-none transition focus:border-[#8A6F52]"
          placeholder="you@example.com"
        />
      </label>
      <div className="sr-only">
        <label className="flex flex-col text-sm text-[#1C1B1A]/80">
          Do not fill this field
          <input
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            name="website"
            autoComplete="off"
            tabIndex={-1}
            className="mt-2 block rounded-3xl border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-4 text-sm outline-none"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm text-[#1C1B1A]/80">
        Message
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="block min-h-[140px] w-full rounded-[1.75rem] border border-[#1C1B1A]/10 bg-[#F8F5F0] px-5 py-4 text-sm outline-none transition focus:border-[#8A6F52]"
          placeholder="Tell us about your project or order."
        />
      </label>
      {status.type !== "idle" ? (
        <div
          role="status"
          className={`rounded-3xl px-5 py-4 text-sm font-semibold ${
            status.type === "success" ? "bg-[#EBF7EE] text-[#1B4622]" : "bg-[#FBEAEA] text-[#7A1F1F]"
          }`}
        >
          {status.message}
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
        <button
          type="submit"
          disabled={isSending}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#1C1B1A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#FFFDF9] transition duration-300 hover:bg-[#1C1B1A]/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSending ? "Sending…" : t("Send inquiry", "Send inquiry")}
        </button>
        <button
          type="button"
          onClick={handleSendWhatsApp}
          disabled={isSending}
          className="inline-flex w-full items-center justify-center rounded-full border border-[#8A6F52] bg-transparent px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition duration-300 hover:bg-[#DCCDB8]/60 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("Send via WhatsApp", "Send via WhatsApp")}
        </button>
      </div>
    </form>
  );
}
