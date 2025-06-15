"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { fetchWithAuth, API_URL } from "@/lib/api";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ContentGenerator() {
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

  return (
    <Card className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-2">AI Content Generator</h2>
      <div className="space-y-4">
        <Input
          placeholder="Topic (e.g. Social Media Marketing)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <div className="flex gap-4">
          <select
            className="border rounded px-3 py-2 flex-1"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option>Twitter</option>
            <option>LinkedIn</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>TikTok</option>
          </select>
          <select
            className="border rounded px-3 py-2 flex-1"
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
        />
        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={loading || !topic}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>
      {result && <Textarea className="mt-4" value={result} readOnly rows={6} />}
    </Card>
  );
}
