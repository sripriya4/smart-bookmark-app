"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/login";
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      <div className="text-center text-white">
        <div className="text-6xl mb-4">🔖</div>
        <h1 className="text-4xl font-bold mb-2">Smart Bookmarks</h1>
        <p className="text-lg opacity-90">Redirecting...</p>
      </div>
    </div>
  );
}
