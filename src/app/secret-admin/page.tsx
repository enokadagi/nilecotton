import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, verifyAdminCookie } from "@/lib/siteContent";

export default async function AdminIndex() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (verifyAdminCookie(cookieValue)) {
    redirect("/secret-admin/dashboard");
  }
  redirect("/secret-admin/login");
}
