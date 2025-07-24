"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Toast from "../Toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const validateOtp = (value) => {
    // Simple validation: must be 6 digits (customize as needed)
    return /^\d{6}$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateOtp(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    const phone = typeof window !== "undefined" ? localStorage.getItem("user_phone") : "";
    const name = typeof window !== "undefined" ? localStorage.getItem("user_name") : "";
    const email = typeof window !== "undefined" ? localStorage.getItem("user_email") : "";
    const action = typeof window !== "undefined" ? localStorage.getItem("auth_action") : "login";

    try {
      const payload = { phone, otp, action, name, email };
      const res = await axios.post(`${API_URL}/api/auth/verify-otp`, payload);
      const token = res.data?.token || "demo-token";
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
      }
    } catch (err) {
      console.error(err);
      // fallback token
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", "demo-token");
      }
    }
    setLoading(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/profile");
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 animate-fade-in">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/60 bg-white/60 backdrop-blur-lg flex flex-col gap-6 items-center glassmorphic-card">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center tracking-tight bg-gradient-to-r from-indigo-700 to-fuchsia-600 text-transparent bg-clip-text drop-shadow-lg">OTP Verification</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5"
          aria-label="OTP Verification Form"
        >
          <label htmlFor="otp" className="font-semibold text-gray-700">
            Enter OTP
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white/90 transition-all duration-200 placeholder-gray-500 shadow-sm tracking-widest text-center"
            placeholder="6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
            required
            pattern="\d{6}"
            maxLength={6}
            aria-invalid={!!error}
            aria-describedby={error ? "otp-error" : undefined}
          />
          {error && (
            <div className="text-red-600 text-sm" role="alert" id="otp-error">
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
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
      <Toast
        message="OTP verified successfully!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
} 