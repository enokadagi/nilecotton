import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";
import { AUTH_COOKIE_NAME, readSiteContent, verifyAdminCookie } from "@/lib/siteContent";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!verifyAdminCookie(cookieValue)) {
    redirect("/secret-admin/login");
  }

  const content = await readSiteContent();
  return <AdminPanel initialContent={content} />;
}
