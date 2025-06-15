"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full bg-white shadow px-6 py-4 flex justify-end items-center gap-4">
      {status === "loading" ? null : session ? (
        <>
          <span className="text-gray-700 font-medium">
            {session.user?.name || session.user?.email}
          </span>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <Button variant="outline" onClick={() => signIn("google")}>
          Sign In
        </Button>
      )}
    </header>
  );
}
