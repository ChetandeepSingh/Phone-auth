"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 animate-fade-in text-center">
      <div className="w-full max-w-xl p-10 rounded-3xl shadow-2xl border border-white/60 bg-white/60 backdrop-blur-lg flex flex-col gap-6 items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 to-fuchsia-600 text-transparent bg-clip-text drop-shadow-lg">
          Phone Authentication System
        </h1>
        <p className="text-gray-700 text-lg max-w-prose">
          Secure, OTP-based authentication with a beautiful glassmorphic UI. Choose an
          option below to get started.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row w-full justify-center">
          <Link
            href="/login"
            className="flex-1 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white rounded-xl px-6 py-3 font-bold shadow-md hover:from-indigo-700 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95 transition-all duration-150"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="flex-1 bg-white/90 text-indigo-700 border border-indigo-300 rounded-xl px-6 py-3 font-bold shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95 transition-all duration-150"
          >
            Register
          </Link>
        </div>
      </div>
      <footer className="mt-8 text-sm text-gray-600">© {new Date().getFullYear()} Phone Auth System</footer>
    </div>
  );
}
