"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex flex-col justify-center items-center flex-1 bg-gradient-to-br from-indigo-500 via-blue-300 to-indigo-100 relative">
        {/* <img
          src="/login-illustration.svg"
          alt="Create and schedule content"
          className="w-3/4 max-w-lg"
        /> */}
        <h2 className="text-3xl font-bold text-white mt-8 drop-shadow-lg text-center">
          Create. Schedule. Grow.
        </h2>
        <p className="text-lg text-indigo-50 mt-4 text-center max-w-md">
          Postly helps you generate, organize, and publish content to all your
          social platforms with AI.
        </p>
      </div>

      {/* Right: Login Card */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 shadow">
              P
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-indigo-700">
            Welcome to Postly
          </h1>
          <p className="mb-8 text-gray-500 text-center text-lg">
            Sign in with your Google account to access your dashboard and start
            creating amazing content!
          </p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-lg"
          >
            <svg width="28" height="28" viewBox="0 0 48 48" className="mr-2">
              <g>
                <path
                  fill="#4285F4"
                  d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"
                />
                <path
                  fill="#34A853"
                  d="M6.3 14.7l7 5.1C15.2 17.1 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3c-7.2 0-13.3 4.1-16.7 10.1z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 44c5.6 0 10.5-1.9 14.3-5.1l-6.6-5.4C29.7 35.5 27 36.5 24 36.5c-6.1 0-10.7-3.9-12.5-9.1l-7 5.4C10.7 40.1 16.8 44 24 44z"
                />
                <path
                  fill="#EA4335"
                  d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-4.7 0-8.5-3.8-8.5-8.5s3.8-8.5 8.5-8.5c2.3 0 4.3.8 5.8 2.2l6.4-6.4C34.5 5.1 29.6 3 24 3c-7.2 0-13.3 4.1-16.7 10.1z"
                />
              </g>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
