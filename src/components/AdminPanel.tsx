"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/siteContent";

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function sectionHeader(title: string, subtitle: string) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-[#1C1B1A]">{title}</h2>
      <p className="text-sm leading-6 text-[#1C1B1A]/70">{subtitle}</p>
    </div>
  );
}

export default function AdminPanel({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [status, setStatus] = useState<string | null>(null);
  const [jsonMode, setJsonMode] = useState(false);
  const [rawJson, setRawJson] = useState(JSON.stringify(initialContent, null, 2));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!jsonMode) {
      setRawJson(JSON.stringify(content, null, 2));
    }
  }, [content, jsonMode]);

  const saveContent = async () => {
    setSaving(true);
    setStatus(null);

    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body?.error || "Unable to save content.");
      }

      setStatus("Content saved successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const applyRawJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setContent(parsed);
      setJsonMode(false);
      setStatus("Raw JSON applied. Review and save below.");
    } catch (error) {
      setStatus("Invalid JSON format. Please correct the editor content.");
    }
  };

  const updateField = (section: string, field: string, value: string) => {
    setContent((current) => ({
      ...current,
      [section]: {
        ...(current as any)[section],
        [field]: value,
      },
    }));
  };

  const updateArrayItem = (section: keyof SiteContent, index: number, field: string, value: string) => {
    setContent((current) => {
      const items = [...(current as any)[section]];
      items[index] = { ...items[index], [field]: value };
      return { ...current, [section]: items } as SiteContent;
    });
  };

  const addArrayItem = (section: keyof SiteContent, template: any) => {
    setContent((current) => {
      const items = [...(current as any)[section], template];
      return { ...current, [section]: items } as SiteContent;
    });
  };

  const removeArrayItem = (section: keyof SiteContent, index: number) => {
    setContent((current) => {
      const items = [...(current as any)[section]];
      items.splice(index, 1);
      return { ...current, [section]: items } as SiteContent;
    });
  };

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-14 sm:px-8 lg:px-12">
      <div className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-8 shadow-[0_28px_70px_rgba(28,27,26,0.08)] sm:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">Hidden admin control</p>
            <h1 className="text-4xl font-black leading-tight text-[#1C1B1A] sm:text-5xl">NileCotton site editor</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveContent}
              disabled={saving}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#1C1B1A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#FFFDF9] transition hover:bg-[#1C1B1A]/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={() => setJsonMode((current) => !current)}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#8A6F52] bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#DCCDB8]/60"
            >
              {jsonMode ? "Hide JSON" : "Edit raw JSON"}
            </button>
          </div>
        </div>
        <p className="text-sm text-[#1C1B1A]/70">Use this hidden admin portal to update homepage copy, hospitality messaging, contact details, vendor and procurement landing pages, lists, testimonials, and footer branding without editing code.</p>
        {status ? <p className="mt-4 rounded-2xl border border-[#1C1B1A]/10 bg-[#F8F5F0] p-4 text-sm text-[#1C1B1A]">{status}</p> : null}
      </div>

      {jsonMode ? (
        <section className="mb-10 rounded-[2rem] border border-[#1C1B1A]/10 bg-[#F8F5F0]/80 p-8 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#1C1B1A]">Raw JSON editor</h2>
                <p className="text-sm text-[#1C1B1A]/70">Make wide structural changes to the CMS content file directly.</p>
              </div>
              <button
                type="button"
                onClick={applyRawJson}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#1C1B1A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#FFFDF9] transition hover:bg-[#1C1B1A]/90"
              >
                Apply JSON
              </button>
            </div>
            <textarea
              value={rawJson}
              onChange={(event) => setRawJson(event.target.value)}
              className="min-h-[420px] w-full rounded-[1.5rem] border border-[#1C1B1A]/10 bg-white p-4 font-mono text-sm leading-6 text-[#1C1B1A] outline-none ring-0 transition focus:border-[#8A6F52]/80"
            />
          </div>
        </section>
      ) : null}

      <section className="space-y-10">
        {sectionHeader("Homepage hero", "Edit the homepage hero copy and CTA text.")}
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            ["pretitle", "Pretitle"],
            ["title", "Title"],
            ["subtitle", "Subtitle"],
            ["imageUrl", "Hero image URL"],
            ["imageAlt", "Hero image alt text"],
            ["primaryLabel", "Primary label"],
            ["primaryHref", "Primary href"],
            ["secondaryLabel", "Secondary label"],
            ["secondaryHref", "Secondary href"],
          ].map(([field, label]) => (
            <label key={field} className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
              <span className="font-semibold">{label}</span>
              <input
                type="text"
                value={(content.hero as any)[field]}
                onChange={(event) => updateField("hero", field, event.target.value)}
                className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
              />
            </label>
          ))}
        </div>

        {sectionHeader("Featured collections", "Add, edit, and remove homepage collection cards.")}
        <div className="space-y-4">
          {content.collections.map((item, index) => (
            <div key={item.id} className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-6 shadow-[0_18px_40px_rgba(28,27,26,0.06)]">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-[#1C1B1A]">Collection {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeArrayItem("collections", index)}
                  className="inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1C1B1A] transition hover:bg-[#E9E0D6]"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Title</span>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(event) => updateArrayItem("collections", index, "title", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Image URL</span>
                  <input
                    type="text"
                    value={item.imageUrl}
                    onChange={(event) => updateArrayItem("collections", index, "imageUrl", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Description</span>
                  <textarea
                    value={item.description}
                    onChange={(event) => updateArrayItem("collections", index, "description", event.target.value)}
                    className="min-h-[120px] rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Image alt text</span>
                  <input
                    type="text"
                    value={item.imageAlt}
                    onChange={(event) => updateArrayItem("collections", index, "imageAlt", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
              </div>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.imageAlt || item.title} className="mt-4 h-40 w-full rounded-[1.75rem] object-cover" />
              ) : null}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("collections", {
                id: createId("collection"),
                title: "New collection",
                description: "Replace this text with a new collection description.",
                imageUrl: "/nilecotton.png",
                imageAlt: "Collection image",
              })
            }
            className="inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#E9E0D6]"
          >
            Add collection
          </button>
        </div>

        {sectionHeader("Hotel collection", "Update the hospitality product grouping shown on the homepage.")}
        <div className="space-y-4">
          {content.hotelCollection.map((item, index) => (
            <div key={item.id} className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-6 shadow-[0_18px_40px_rgba(28,27,26,0.06)]">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-[#1C1B1A]">Hotel item {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeArrayItem("hotelCollection", index)}
                  className="inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1C1B1A] transition hover:bg-[#E9E0D6]"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Title</span>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(event) => updateArrayItem("hotelCollection", index, "title", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Image URL</span>
                  <input
                    type="text"
                    value={item.imageUrl}
                    onChange={(event) => updateArrayItem("hotelCollection", index, "imageUrl", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Description</span>
                  <textarea
                    value={item.description}
                    onChange={(event) => updateArrayItem("hotelCollection", index, "description", event.target.value)}
                    className="min-h-[120px] rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Image alt text</span>
                  <input
                    type="text"
                    value={item.imageAlt}
                    onChange={(event) => updateArrayItem("hotelCollection", index, "imageAlt", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
              </div>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.imageAlt || item.title} className="mt-4 h-40 w-full rounded-[1.75rem] object-cover" />
              ) : null}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("hotelCollection", {
                id: createId("hotel"),
                title: "New hospitality item",
                description: "Replace this text with a descriptive line for the hotel collection.",
                imageUrl: "/nilecotton.png",
                imageAlt: "Hospitality item image",
              })
            }
            className="inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#E9E0D6]"
          >
            Add hotel item
          </button>
        </div>

        {sectionHeader("Products", "Manage the homepage product showcase cards.")}
        <div className="space-y-4">
          {content.products.map((item, index) => (
            <div key={item.id} className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-6 shadow-[0_18px_40px_rgba(28,27,26,0.06)]">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-[#1C1B1A]">Product {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeArrayItem("products", index)}
                  className="inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1C1B1A] transition hover:bg-[#E9E0D6]"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Title</span>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(event) => updateArrayItem("products", index, "title", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Image URL</span>
                  <input
                    type="text"
                    value={item.imageUrl}
                    onChange={(event) => updateArrayItem("products", index, "imageUrl", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Detail</span>
                  <textarea
                    value={item.detail}
                    onChange={(event) => updateArrayItem("products", index, "detail", event.target.value)}
                    className="min-h-[120px] rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Price</span>
                  <input
                    type="text"
                    value={(item as any).price || ""}
                    onChange={(event) => updateArrayItem("products", index, "price", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                    placeholder="Ask for pricing"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Image alt text</span>
                  <input
                    type="text"
                    value={item.imageAlt}
                    onChange={(event) => updateArrayItem("products", index, "imageAlt", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
              </div>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.imageAlt || item.title} className="mt-4 h-40 w-full rounded-[1.75rem] object-cover" />
              ) : null}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("products", {
                id: createId("product"),
                title: "New product",
                detail: "Replace this copy with product detail for the homepage showcase.",
                imageUrl: "/nilecotton.png",
                imageAlt: "Product image",
                price: "Ask for pricing",
              })
            }
            className="inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#E9E0D6]"
          >
            Add product
          </button>
        </div>

        {sectionHeader("Testimonials", "Update the hospitality partner quotes.")}
        <div className="space-y-4">
          {content.testimonials.map((item, index) => (
            <div key={item.id} className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-6 shadow-[0_18px_40px_rgba(28,27,26,0.06)]">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-[#1C1B1A]">Quote {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeArrayItem("testimonials", index)}
                  className="inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1C1B1A] transition hover:bg-[#E9E0D6]"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Quote</span>
                  <textarea
                    value={item.quote}
                    onChange={(event) => updateArrayItem("testimonials", index, "quote", event.target.value)}
                    className="min-h-[120px] rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
                  <span className="font-semibold">Author</span>
                  <input
                    type="text"
                    value={item.author}
                    onChange={(event) => updateArrayItem("testimonials", index, "author", event.target.value)}
                    className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                  />
                </label>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("testimonials", {
                id: createId("testimonial"),
                quote: "New testimonial quote.",
                author: "– Author name",
              })
            }
            className="inline-flex items-center justify-center rounded-full border border-[#1C1B1A]/10 bg-[#F8F5F0] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#E9E0D6]"
          >
            Add testimonial
          </button>
        </div>

        {sectionHeader("Contact details", "Update the site contact and CTA text.")}
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            ["headline", "Headline"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["altEmail", "Alternate email"],
            ["buttonText", "Button text"],
          ].map(([field, label]) => (
            <label key={field} className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
              <span className="font-semibold">{label}</span>
              <input
                type="text"
                value={(content.contact as any)[field]}
                onChange={(event) => updateField("contact", field, event.target.value)}
                className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
              />
            </label>
          ))}
        </div>

        {sectionHeader("Vendor page", "Edit the vendor landing page content and CTA.")}
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            ["introLabel", "Intro label"],
            ["title", "Title"],
            ["description", "Description"],
            ["imageUrl", "Image URL"],
            ["imageAlt", "Image alt text"],
            ["card1Title", "Card 1 title"],
            ["card1Text", "Card 1 text"],
            ["card2Title", "Card 2 title"],
            ["card2Text", "Card 2 text"],
            ["ctaText", "CTA button text"],
          ].map(([field, label]) => (
            <label key={field} className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
              <span className="font-semibold">{label}</span>
              {field.includes("description") || field.includes("Text") ? (
                <textarea
                  value={(content.vendor as any)[field]}
                  onChange={(event) => updateField("vendor", field, event.target.value)}
                  className="min-h-[120px] rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                />
              ) : (
                <input
                  type="text"
                  value={(content.vendor as any)[field]}
                  onChange={(event) => updateField("vendor", field, event.target.value)}
                  className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                />
              )}
            </label>
          ))}
        </div>

        {sectionHeader("Procurement page", "Edit the procurement landing page content and CTA.")}
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            ["introLabel", "Intro label"],
            ["title", "Title"],
            ["description", "Description"],
            ["imageUrl", "Image URL"],
            ["imageAlt", "Image alt text"],
            ["card1Title", "Card 1 title"],
            ["card1Text", "Card 1 text"],
            ["card2Title", "Card 2 title"],
            ["card2Text", "Card 2 text"],
            ["ctaText", "CTA button text"],
          ].map(([field, label]) => (
            <label key={field} className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
              <span className="font-semibold">{label}</span>
              {field.includes("description") || field.includes("Text") ? (
                <textarea
                  value={(content.procurement as any)[field]}
                  onChange={(event) => updateField("procurement", field, event.target.value)}
                  className="min-h-[120px] rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                />
              ) : (
                <input
                  type="text"
                  value={(content.procurement as any)[field]}
                  onChange={(event) => updateField("procurement", field, event.target.value)}
                  className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
                />
              )}
            </label>
          ))}
        </div>

        {sectionHeader("Footer brand", "Add a footer logo image and alt text for the site.")}
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            ["logoUrl", "Logo image URL"],
            ["logoAlt", "Logo alt text"],
          ].map(([field, label]) => (
            <label key={field} className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
              <span className="font-semibold">{label}</span>
              <input
                type="text"
                value={(content.footer as any)[field]}
                onChange={(event) => updateField("footer", field, event.target.value)}
                className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
