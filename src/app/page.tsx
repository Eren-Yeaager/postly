"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white flex flex-col items-center">
      <div className="w-full h-2 bg-gradient-to-r from-indigo-500 via-blue-400 to-purple-400 mb-8" />

      <section className="w-full flex-1 flex flex-col items-center justify-center py-20">
        <div className="bg-white/90 rounded-2xl shadow-2xl px-10 py-14 max-w-2xl w-full text-center space-y-8 border border-indigo-100">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 shadow">
              P
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Welcome to <span className="text-indigo-600">Postly</span>
          </h1>
          <p className="text-xl text-gray-700">
            <span className="font-semibold text-indigo-600">AI-powered</span>{" "}
            content creation, scheduling, and analytics for modern brands.
          </p>
          <p className="text-gray-500">
            Save time, grow your audience, and never run out of content ideas
            again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <a href="mailto:hello@postly.com">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <span className="text-indigo-500 text-4xl mb-3">⚡️</span>
          <h3 className="font-bold text-xl mb-2">Instant Content</h3>
          <p className="text-gray-500 text-center text-base">
            Generate high-quality posts for all your platforms in seconds using
            GPT-4.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <span className="text-indigo-500 text-4xl mb-3">📅</span>
          <h3 className="font-bold text-xl mb-2">Smart Scheduling</h3>
          <p className="text-gray-500 text-center text-base">
            Plan, schedule, and automate your content calendar with ease.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <span className="text-indigo-500 text-4xl mb-3">📈</span>
          <h3 className="font-bold text-xl mb-2">Actionable Analytics</h3>
          <p className="text-gray-500 text-center text-base">
            Track engagement and optimize your strategy with real-time insights.
          </p>
        </div>
      </section>
    </main>
  );
}
