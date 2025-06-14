"use client";
import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-white">
      <SignUp redirectUrl="/dashboard" routing="hash" />
    </div>
  );
}
