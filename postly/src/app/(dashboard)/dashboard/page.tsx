import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ContentGenerator from "@/components/content/content-generator";
import ContentList from "@/components/content/content-list";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <ContentGenerator />
      <div className="mt-10">
        <ContentList />
      </div>
    </div>
  );
}
