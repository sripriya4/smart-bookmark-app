"use client";

import { useState } from "react";
import { isValidUrl } from "@/utils/auth-helpers";
import toast from "react-hot-toast";
import { CreateBookmarkDTO } from "@/types/bookmark";

interface BookmarkFormProps {
  onAdd: (bookmark: CreateBookmarkDTO) => Promise<any>;
}

export default function BookmarkForm({ onAdd }: BookmarkFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsSubmitting(true);

    try {
      await onAdd({ title, url }); // ✅ uses Dashboard hook
      setTitle("");
      setUrl("");
    } catch {
      // handled in hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/20">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Add New Bookmark
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter bookmark title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
            disabled={isSubmitting}
          />

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold"
        >
          {isSubmitting ? "Adding..." : "➕ Add Bookmark"}
        </button>
      </div>
    </form>
  );
}
