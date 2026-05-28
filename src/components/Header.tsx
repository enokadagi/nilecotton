"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslate } from "@/components/AutoTranslateProvider";

const navLinks = [
  { href: "/towels-collection", label: "Towels" },
  { href: "/hospitality-supply", label: "Hospitality" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslate();

  return (
    <header className="sticky top-0 z-40 border-b border-[#1C1B1A]/10 bg-[#F8F5F0]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="inline-flex items-center gap-3 transition duration-300 hover:opacity-90" onClick={() => setOpen(false)}>
          <Image
            src="/nilecotton.png"
            alt="NileCotton"
            width={420}
            height={110}
            className="h-20 w-auto sm:h-[96px]"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.22em] text-[#1C1B1A]/80 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[#8A6F52]">
              {t(link.label, link.label)}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? t("Close menu", "Close menu") : t("Open menu", "Open menu")}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1C1B1A]/10 text-[#1C1B1A] transition duration-200 hover:border-[#8A6F52] lg:hidden"
        >
          <span className="relative block h-5 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-full bg-current transition duration-300 ${open ? "rotate-45 top-1/2" : "-translate-y-2"}`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-full bg-current transition duration-300 ${open ? "opacity-0" : "-translate-y-1/2"}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-full bg-current transition duration-300 ${open ? "-rotate-45 bottom-1/2" : "translate-y-2"}`}
            />
          </span>
        </button>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[420px]" : "max-h-0"}`}>
        <div className="border-t border-[#1C1B1A]/10 bg-[#F8F5F0]/95 px-6 pb-6 pt-4 sm:px-8">
          <nav className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-3xl border border-[#1C1B1A]/10 bg-[#FFFDF9] px-5 py-4 text-sm uppercase tracking-[0.22em] text-[#1C1B1A] transition hover:bg-[#F8F5F0] hover:text-[#8A6F52]"
                onClick={() => setOpen(false)}
              >
                {t(link.label, link.label)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
