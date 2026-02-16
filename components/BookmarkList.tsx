"use client";

import BookmarkItem from "./BookmarkItem";
import Loader from "./Loader";
import { Bookmark } from "@/types/bookmark";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => Promise<void>;
}

export default function BookmarkList({
  bookmarks,
  loading,
  error,
  onDelete,
}: BookmarkListProps) {
  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p className="font-semibold">Error loading bookmarks</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
          No bookmarks yet
        </h3>
        <p className="text-gray-500">
          Create your first bookmark to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
