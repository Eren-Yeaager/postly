"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { fetchWithAuth, API_URL } from "@/lib/api";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ContentGenerator({
  onContentSaved,
}: {
  onContentSaved?: () => void;
}) {
  const { data: session, status } = useSession();
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Twitter");
  const [tone, setTone] = useState("Professional");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const idToken = session?.id_token;
  useEffect(() => {
    if (!idToken) return;
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/content`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await res.json();
        setItems(data.contents);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [session?.id_token]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session)
    return (
      <div>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>
    );

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          topic,
          platform,
          tone,
          keywords: keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        }),
      });
      const data = await res.json();
      setResult(data.content || data.error || "No content generated.");
    } catch (error) {
      console.error("Generation error:", error);
      setResult("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          title: topic,
          content: result,
          platform,
          tone,
          status: "draft",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Content saved!");
        onContentSaved?.();
        console.log("Fetched contents from DB:", data.contents);
      } else {
        alert(data.error || "Failed to save content.");
      }
    } catch (error) {
      alert("Failed to save content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 rounded-2xl shadow-lg bg-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
        <span>AI Content Generator</span>
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-semibold">
          Beta
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input
          placeholder="Topic (e.g. Social Media Marketing)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="col-span-2"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Platform
          </label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option>Twitter</option>
            <option>LinkedIn</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>TikTok</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tone
          </label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option>Professional</option>
            <option>Casual</option>
            <option>Funny</option>
            <option>Informative</option>
          </select>
        </div>
        <Input
          placeholder="Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="col-span-2"
        />
      </div>
      <Button
        className="w-full py-3 text-lg font-semibold"
        onClick={handleGenerate}
        disabled={loading || !topic}
      >
        {loading ? "Generating..." : "Generate Content"}
      </Button>
      {result && (
        <div className="mt-8 flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Content
          </label>
          <Textarea
            className="w-full rounded-lg border p-4 text-base"
            value={result}
            readOnly
            rows={6}
          />
          <Button
            className="w-full py-3 text-lg font-semibold mt-2"
            onClick={handleSave}
            disabled={loading}
            variant="secondary"
          >
            Save Content
          </Button>
        </div>
      )}
    </Card>
  );
}
