"use client";

import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <header className="w-full bg-white shadow px-6 py-4 flex justify-end items-center gap-4">
      {isSignedIn ? (
        <>
          <span className="text-gray-700 font-medium">
            {user?.fullName ||
              user?.username ||
              user?.emailAddresses[0]?.emailAddress}
          </span>
          <UserButton afterSignOutUrl="/" />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="outline">Sign In</Button>
        </SignInButton>
      )}
    </header>
  );
}
