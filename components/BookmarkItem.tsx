"use client";

import { useState } from "react";
import { Bookmark } from "@/types/bookmark";
import { useBookmarks } from "@/hooks/useBookmarks";
import toast from "react-hot-toast";

interface BookmarkItemProps {
  bookmark: Bookmark;
  onDelete: (id: string) => Promise<void>;
}

export default function BookmarkItem({
  bookmark,
  onDelete,
}: BookmarkItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(bookmark.id);
      setShowDeleteConfirm(false);
    } catch {
      // handled in hook
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(bookmark.url);
      toast.success("URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace("www.", "");
    } catch {
      return "Link";
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-md hover:shadow-xl transition transform hover:scale-105 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition">
            {bookmark.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {getDomain(bookmark.url)}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition text-center"
        >
          🔗 Open
        </a>
        <button
          onClick={handleCopyUrl}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition"
          title="Copy URL"
        >
          📋
        </button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {new Date(bookmark.created_at).toLocaleDateString()}
        </p>

        {showDeleteConfirm ? (
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50 transition"
            >
              {isDeleting ? "..." : "Delete?"}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
              className="px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500 disabled:opacity-50 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-1 bg-red-500/20 text-red-600 rounded text-xs font-medium hover:bg-red-500/30 transition"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}
