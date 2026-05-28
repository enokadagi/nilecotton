import HomePageClient from "@/components/HomePageClient";
import { readSiteContent } from "@/lib/siteContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await readSiteContent();
  return <HomePageClient content={content} />;
}
