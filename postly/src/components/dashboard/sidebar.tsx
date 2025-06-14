import Link from "next/link";
export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-screen p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-6">Postly</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="hover:text-indigo-600">
          Dashboard
        </Link>
        <Link href="/generate" className="hover:text-indigo-600">
          Generate
        </Link>
        <Link href="/calendar" className="hover:text-indigo-600">
          Calendar
        </Link>
        <Link href="/analytics" className="hover:text-indigo-600">
          Analytics
        </Link>
        <Link href="/settings" className="hover:text-indigo-600">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
