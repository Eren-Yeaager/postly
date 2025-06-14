"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface Content {
  id: string;
  title: string;
  content: string;
  platform: string;
  status: string;
  createdAt: string;
}

export default function ContentList() {
  const [items, setItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content/user")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading your content...</div>;
  if (!items.length)
    return (
      <div className="text-gray-500">
        No content yet. Generate and save your first post!
      </div>
    );

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{item.title}</span>
            <span className="text-xs text-gray-400">{item.platform}</span>
          </div>
          <div className="text-gray-700 whitespace-pre-line">
            {item.content}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            {new Date(item.createdAt).toLocaleString()}
          </div>
        </Card>
      ))}
    </div>
  );
}
