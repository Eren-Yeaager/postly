"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white shadow px-8 py-4 flex justify-between items-center">
      <span className="text-xl font-bold text-indigo-700">
        Postly Dashboard
      </span>
      <div className="flex items-center gap-4">
        {session && (
          <>
            {/* <img
              src={session.user?.image || "/avatar.svg"}
              alt="User avatar"
              className="w-10 h-10 rounded-full border"
            /> */}
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
        )}
      </div>
    </header>
  );
}
