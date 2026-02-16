"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { logout } from "@/utils/auth-helpers";
import toast from "react-hot-toast";

interface NavbarProps {
  userName?: string;
}

export default function Navbar({ userName }: NavbarProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🔖</div>
          <h1 className="text-2xl font-bold">Smart Bookmarks</h1>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={
                    user.user_metadata?.avatar_url ||
                    "https://via.placeholder.com/40"
                  }
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">
                  {user.user_metadata?.name || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition transform hover:scale-105"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
