"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-600 to-indigo-400 text-white min-h-screen flex flex-col p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-10 tracking-tight">Postly</h2>
      <nav className="flex flex-col gap-6">
        <Link href="/dashboard" className="hover:text-indigo-100 font-medium">
          Dashboard
        </Link>
      </nav>
      <div className="mt-auto text-xs text-indigo-200">
        &copy; {new Date().getFullYear()} Postly
      </div>
    </aside>
  );
}
