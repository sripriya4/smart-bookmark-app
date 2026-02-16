"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Bookmark, CreateBookmarkDTO } from "@/types/bookmark";
import toast from "react-hot-toast";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==============================
  // Fetch Bookmarks (Auth Safe)
  // ==============================
  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setBookmarks([]);
        return;
      }

      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookmarks(data || []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch bookmarks";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Add Bookmark
  // ==============================
  const addBookmark = async (bookmark: CreateBookmarkDTO) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("bookmarks").insert([
        {
          ...bookmark,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Bookmark added!");
      // No need to manually fetch — realtime will handle it
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to add bookmark";

      toast.error(message);
      throw err;
    }
  };

  // ==============================
  // Delete Bookmark
  // ==============================
  const deleteBookmark = async (id: string) => {
    try {
      // 🔥 Remove from UI instantly
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));

      const { error } = await supabase.from("bookmarks").delete().eq("id", id);

      if (error) throw error;

      toast.success("Bookmark deleted!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete bookmark";

      toast.error(message);

      // If something fails, re-fetch to restore state
      await fetchBookmarks();
    }
  };

  // ==============================
  // Setup Realtime
  // ==============================
  const setupRealtime = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`, // 🔥 only your bookmarks
        },
        () => {
          fetchBookmarks();
        },
      )
      .subscribe();

    return channel;
  };

  // ==============================
  // Initial Load
  // ==============================
  useEffect(() => {
    let channel: any;

    const init = async () => {
      await fetchBookmarks();
      channel = await setupRealtime();
    };

    init();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    deleteBookmark,
    fetchBookmarks,
  };
};
