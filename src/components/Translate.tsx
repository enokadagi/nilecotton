"use client";

import { useTranslate } from "@/components/AutoTranslateProvider";

export default function Translate({ value, fallback }: { value: string; fallback?: string }) {
  const { t } = useTranslate();
  return <>{t(value, fallback ?? value)}</>;
}
