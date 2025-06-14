import { getCurrentUser } from "@/lib/CurrentUser";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-gray-600">
        This is where you'll see your content, stats, and more.
      </p>
    </div>
  );
}
