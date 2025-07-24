"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Toast from "../Toast";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const mode = "register";

  const validatePhone = (value) => /^\d{10}$/.test(value);
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/send-otp`, { name, phone, email, action: mode });
    } catch (err) {
      console.error(err);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_phone", phone);
      localStorage.setItem("user_email", email);
      localStorage.setItem("auth_action", mode);
    }
    setLoading(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/verify");
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 animate-fade-in">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/60 bg-white/60 backdrop-blur-lg flex flex-col gap-6 items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center tracking-tight bg-gradient-to-r from-indigo-700 to-fuchsia-600 text-transparent bg-clip-text">Register</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5" aria-label="Register Form">
          <label htmlFor="name" className="font-semibold text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white/90 placeholder-gray-500 shadow-sm"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
          <label htmlFor="phone" className="font-semibold text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white/90 placeholder-gray-500 shadow-sm"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            required
            pattern="\d{10}"
            aria-invalid={!!error && error.includes("phone")}
            aria-describedby={error && error.includes("phone") ? "phone-error" : undefined}
          />
          <label htmlFor="email" className="font-semibold text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white/90 placeholder-gray-500 shadow-sm"
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            aria-invalid={!!error && error.includes("email")}
            aria-describedby={error && error.includes("email") ? "email-error" : undefined}
          />
          {error && (
            <div className="text-red-600 text-sm" role="alert" id="phone-error">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white rounded-xl px-4 py-2 font-bold shadow-md hover:from-indigo-700 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sending OTP...
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
      <p className="mt-4 text-sm text-gray-700">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
      <Toast message="OTP sent successfully!" show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
} 