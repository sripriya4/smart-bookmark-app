"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import Loader from "@/components/Loader";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function Dashboard() {
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ ONE shared hook instance
  const { bookmarks, loading, error, addBookmark, deleteBookmark } =
    useBookmarks();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!data.user) {
          window.location.href = "/login";
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        window.location.href = "/login";
      } finally {
        setIsAuthChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthChecking) return <Loader />;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            My Bookmarks
          </h2>
          <p className="text-gray-600">
            Keep all your favorite links organized and synchronized in real-time
          </p>
        </div>

        <BookmarkForm onAdd={addBookmark} />

        <BookmarkList
          bookmarks={bookmarks}
          loading={loading}
          error={error}
          onDelete={deleteBookmark}
        />
      </div>
    </div>
  );
}
