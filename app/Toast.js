"use client";
import { useEffect } from "react";

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-fade-in">
      {message}
    </div>
  );
}

// Add a simple fade-in animation
// In globals.css, add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: translateY(0);} }
// .animate-fade-in { animation: fade-in 0.3s ease; } 