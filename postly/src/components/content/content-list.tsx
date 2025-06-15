"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { useSession } from "next-auth/react";

type Content = {
  Id?: string | number;
  Platform?: string;
  Tone?: string;
  Status?: string;
  Title?: string;
  Content?: string;
};

export default function ContentList({
  refreshFlag,
}: {
  refreshFlag?: boolean;
}) {
  const { data: session } = useSession();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.id_token) return;
    const fetchContents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/content`, {
          headers: {
            Authorization: `Bearer ${session.id_token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch content");
        const data = await res.json();
        setContents(data.contents || []);
      } catch (err) {
        setContents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchContents();
  }, [session?.id_token, refreshFlag]);

  if (loading) return <div>Loading your content...</div>;
  if (!contents.length)
    return (
      <div className="text-gray-500 text-center py-8">
        No content found. Start generating some posts!
      </div>
    );

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {contents.slice(0, 2).map((item, idx) => (
        <div
          key={item.Id || idx}
          className="bg-white rounded-2xl shadow-lg border flex flex-col p-6 min-h-[340px] max-h-[480px] w-full max-w-xl mx-auto transition hover:shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-semibold">
              {item.Platform}
            </span>
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-semibold">
              {item.Tone || "General"}
            </span>
            <span className="ml-auto text-xs text-gray-400">
              {item.Status || "draft"}
            </span>
          </div>
          <h3 className="font-bold text-lg mb-1 line-clamp-2">
            {item.Title || "Untitled"}
          </h3>
          <div className="flex-1 overflow-auto max-h-[260px]">
            <p className="text-gray-700 whitespace-pre-line text-sm pr-1">
              {item.Content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
