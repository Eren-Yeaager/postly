"use client";
import { useSession, signIn } from "next-auth/react";
import ContentGenerator from "@/components/content/content-generator";
import ContentList from "@/components/content/content-list";
import { useState, useCallback } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [refreshFlag, setRefreshFlag] = useState(false);
  const handleContentSaved = useCallback(() => {
    setRefreshFlag((flag) => !flag);
  }, []);

  if (status === "loading") return <div>Loading...</div>;

  if (!session)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">
            Sign in required
          </h2>
          <p className="mb-6 text-gray-500 text-center">
            Please sign in with Google to access your dashboard.
          </p>
          <button
            onClick={() => signIn("google")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );

  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-indigo-500 via-blue-400 to-indigo-200 p-8 flex flex-col md:flex-row items-center">
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow">
            Welcome to your Dashboard
          </h1>
          <p className="text-indigo-100 text-lg mb-4">
            Generate, organize, and manage your content with AI-powered tools.
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
              AI Content Generation
            </span>
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
              Multi-Platform
            </span>
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
              Effortless Scheduling
            </span>
          </div>
        </div>
        {/* <img
          src="/dashboard-illustration.svg"
          alt="Dashboard illustration"
          className="w-40 h-40 md:w-56 md:h-56 ml-0 md:ml-8 mt-8 md:mt-0 drop-shadow-xl"
        /> */}
      </div>

      <div>
        <ContentGenerator onContentSaved={handleContentSaved} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          Your Recent Content
        </h2>
        <ContentList refreshFlag={refreshFlag} />
      </div>
    </div>
  );
}
