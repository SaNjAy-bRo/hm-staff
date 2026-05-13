import { getJoinSubmissions, getContactSubmissions } from "@/lib/db";
import DashboardClient from "./DashboardClient";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token || token.value !== "authenticated") {
    redirect("/admin/login");
  }

  const joinSubmissions = getJoinSubmissions();
  const contactSubmissions = getContactSubmissions();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">HM Tech Staffing <span className="text-sky-600">Admin</span></h1>
        <div className="flex items-center gap-6">
          <a href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            Back to Website
          </a>
          <LogoutButton />
        </div>
      </header>
      
      <main className="p-6 md:p-12">
        <DashboardClient 
          initialJoinData={joinSubmissions} 
          initialContactData={contactSubmissions} 
        />
      </main>
    </div>
  );
}
