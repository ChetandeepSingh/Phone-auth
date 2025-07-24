"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Toast from "../Toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      if (!token) {
        router.replace("/login");
        return;
      }
      try {
        const res = await axios.get(`${API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        // If network error but token exists, use fallback profile from localStorage
        if (!err.response) {
          const phoneFallback = typeof window !== "undefined" ? localStorage.getItem("user_phone") : null;
          setUser({ name: "User", phone: phoneFallback || "Unknown" });
        } else {
          setError("Session expired. Please login again.");
          setTimeout(() => router.replace("/login"), 1500);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.replace("/login");
    }, 1200);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-gray-600">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="text-red-600 font-semibold mb-2">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 animate-fade-in">
      <div className="w-full max-w-md bg-white/60 p-8 rounded-3xl shadow-2xl border border-white/60 backdrop-blur-lg flex flex-col items-center gap-4 glassmorphic-card">
        <h1 className="text-3xl font-extrabold mb-2 text-center tracking-tight bg-gradient-to-r from-indigo-700 to-fuchsia-600 text-transparent bg-clip-text drop-shadow-lg">Profile</h1>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-green-300 flex items-center justify-center text-4xl font-bold text-white mb-2 shadow-md">
          {user?.name?.[0] || user?.phone?.[0] || "U"}
        </div>
        <div className="text-lg font-semibold text-gray-800">{user?.name || "User"}</div>
        <div className="text-gray-500 mb-2">{user?.phone}</div>
        <div className="mb-4 text-green-700 font-semibold">Authentication status: Authenticated</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white rounded-xl px-5 py-2 font-bold shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95 transition-all duration-150"
        >
          Logout
        </button>
      </div>
      <Toast
        message="Logged out successfully!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
} 