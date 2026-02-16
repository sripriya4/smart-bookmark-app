# 🚀 QUICK REFERENCE CARD

## Start Here!

```bash
# 1. Copy environment template
cp .env.local.example .env.local

# 2. Add your Supabase credentials to .env.local
# Get these from Supabase dashboard

# 3. Run development server
npm run dev

# Visit: http://localhost:3000
```

---

## 📍 File Locations - Quick Navigation

| What I Want to...           | Go to File                    | Line Count |
| --------------------------- | ----------------------------- | ---------- |
| Change login UI             | `app/login/page.tsx`          | 111        |
| Modify dashboard layout     | `app/dashboard/page.tsx`      | 62         |
| Update bookmark form        | `components/BookmarkForm.tsx` | 89         |
| Change bookmark card design | `components/BookmarkItem.tsx` | 125        |
| Modify API calls            | `hooks/useBookmarks.ts`       | 125        |
| Change styling colors       | Any component `.tsx`          | -          |
| Add new TypeScript type     | `types/bookmark.ts`           | 12         |
| Add auth helper function    | `utils/auth-helpers.ts`       | 23         |

---

## 🎯 Feature Coverage

| Feature             | Location                      | Status      |
| ------------------- | ----------------------------- | ----------- |
| Google OAuth Login  | `app/login/page.tsx`          | ✅ Complete |
| Protected Routes    | `app/dashboard/page.tsx`      | ✅ Complete |
| Add Bookmarks       | `components/BookmarkForm.tsx` | ✅ Complete |
| Delete Bookmarks    | `components/BookmarkItem.tsx` | ✅ Complete |
| Real-time Sync      | `hooks/useBookmarks.ts`       | ✅ Complete |
| Copy to Clipboard   | `components/BookmarkItem.tsx` | ✅ Complete |
| Error Handling      | All components                | ✅ Complete |
| Loading States      | `components/Loader.tsx`       | ✅ Complete |
| Toast Notifications | All components                | ✅ Complete |
| Responsive Design   | All components                | ✅ Complete |

---

## 🔧 Common Tasks

### Add a New Component

1. Create file in `components/ComponentName.tsx`
2. Import React hooks: `'use client'` at top
3. Export default function
4. Use Tailwind classes for styling

### Create a New Page

1. Create folder in `app/my-page/`
2. Create `page.tsx` inside
3. Add route automatically!

### Add TypeScript Type

1. Go to `types/bookmark.ts`
2. Add new interface
3. Export it
4. Use in components with `import { MyType } from '@/types/bookmark'`

### Debug Something

1. Open DevTools (F12)
2. Check Console tab
3. Look for error messages
4. Check Network tab for requests

---

## 🎨 Styling

All styling uses **Tailwind CSS**. Examples:

```tsx
// Background colors
className = "bg-indigo-600"; // Blue
className = "bg-white/70"; // White with 70% opacity
className = "bg-gradient-to-r from-indigo-600 to-purple-600";

// Text colors
className = "text-white";
className = "text-gray-600";

// Spacing
className = "p-4"; // Padding
className = "mb-6"; // Margin bottom
className = "gap-3"; // Gap between items

// Responsive
className = "grid grid-cols-1 md:grid-cols-3"; // 1 col mobile, 3 on desktop

// Effects
className = "rounded-lg"; // Rounded corners
className = "shadow-md"; // Drop shadow
className = "hover:scale-105"; // Scale on hover
className = "transition"; // Smooth animation
```

---

## 📊 Component Props

### `<BookmarkItem />`

```tsx
<BookmarkItem bookmark={bookmarkData} />

// bookmarkData shape:
{
  id: "uuid-string",
  title: "GitHub",
  url: "https://github.com",
  user_id: "uuid-string",
  created_at: "2024-01-01T12:00:00Z"
}
```

---

## 🔐 Authentication Flow

```
1. User lands on app
2. Check if authenticated
   - Yes → Go to /dashboard
   - No → Go to /login
3. In /login:
   - Click "Sign in with Google"
   - Complete OAuth flow
   - Redirect to /dashboard
4. In /dashboard:
   - User fully authenticated
   - Can add/delete bookmarks
   - Changes sync in real-time
```

---

## ⚡ Real-time Magic Explained

When you add a bookmark:

1. You see it in your tab
2. Every other browser tab with the app open...
3. **Sees your new bookmark instantly!**

Why?

- Supabase listens to database changes
- Notifies all connected clients
- Components re-fetch and update
- No page reload needed!

Test it:

- Open app in Tab A and Tab B
- Add bookmark in Tab A
- Watch Tab B update instantly ⚡

---

## 🐛 Troubleshooting Quick Fixes

| Error                                 | Solution                                             |
| ------------------------------------- | ---------------------------------------------------- |
| "Cannot find module '@/lib/supabase'" | Check `tsconfig.json` has `"@/*"` path configured    |
| Blank page on /dashboard              | Check browser console for errors (F12)               |
| "RLS policy violation"                | Make sure all 3 RLS policies are created in Supabase |
| Bookmarks not syncing                 | Enable Replication in Supabase → Database section    |
| Google login not working              | Check redirect URL matches in Google Cloud Console   |
| env variables undefined               | Run `npm run dev` AFTER creating `.env.local`        |

---

## 🚀 Deploy Commands

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Lint code
npm run lint
```

---

## 📚 Important Links in Code

| Purpose          | Link                     |
| ---------------- | ------------------------ |
| Supabase Client  | `lib/supabase.ts`        |
| CRUD Logic       | `hooks/useBookmarks.ts`  |
| Main App         | `app/dashboard/page.tsx` |
| Login Page       | `app/login/page.tsx`     |
| Type Definitions | `types/bookmark.ts`      |

---

## 💡 Pro Tips

1. **Use "Open in New Tab"** on bookmark card while testing
2. **Keep browser F12 open** while developing to catch errors
3. **Read error messages carefully** - they usually tell you exactly what's wrong
4. **Test in 2 browser tabs** to verify real-time is working
5. **Check .env.local file exists** if environment variables aren't loading

---

## 📖 Documentation Files guide

| File                   | Read When                            | Time   |
| ---------------------- | ------------------------------------ | ------ |
| `QUICK_START.md`       | You want to run it NOW               | 10 min |
| `README.md`            | You want complete details            | 15 min |
| `DEVELOPMENT_GUIDE.md` | You want to understand architecture  | 20 min |
| `FILE_STRUCTURE.md`    | You want to know where everything is | 10 min |
| This card              | You need quick answers               | 5 min  |

---

## 🎓 Understanding the Code

### Entry Point

```
User visits localhost:3000
         ↓
app/page.tsx (checks auth)
         ↓
Redirects to /login or /dashboard
```

### Main App Page

```
app/dashboard/page.tsx
  ├── <Navbar />
  ├── <BookmarkForm />
  └── <BookmarkList />
        └── {bookmarks.map(b => <BookmarkItem />)}
```

### Data Flow

```
useBookmarks hook
  ├── fetchBookmarks()
  ├── addBookmark()
  ├── deleteBookmark()
  └── setupRealtimeSubscription()
```

---

## ✨ Features Breakdown

### Authentication (10 min setup)

- Google OAuth through Supabase
- Session stored in browser
- Protected routes redirect to login

### Real-time Sync (5 min setup to understand)

- PostgreSQL change events
- Supabase broadcasts changes
- All clients update instantly

### Beautiful UI (Already done!)

- Glassmorphism design
- Smooth animations
- Responsive grid layout
- Toast notifications

### Secure Database (Automatic)

- Row Level Security (RLS) policies
- Can only access own data
- Enforced at database level

---

## 🎯 Your Next Steps

1. **Today:** Get it running (`npm run dev`)
2. **Today:** Set up Supabase and test adding bookmarks
3. **Today:** Test real-time in 2 browser tabs
4. **This week:** Deploy to Vercel
5. **This week:** Share with others!

---

## 🎉 You now have a production-ready app!

- ✅ Professional code structure
- ✅ Beautiful UI
- ✅ Secure authentication
- ✅ Real-time features
- ✅ Full documentation
- ✅ Ready toshow to interviewers

Start with: `npm run dev`

Questions? Check the docs! 📚
