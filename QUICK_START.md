# 🚀 Quick Start Guide - Smart Bookmarks App

This guide will help you get the Smart Bookmarks application running in less than 15 minutes.

## ⏱️ 5-Minute Setup

### 1. Copy Environment Variables

```bash
cp .env.local.example .env.local
```

### 2. Create Supabase Project

- Visit [supabase.com](https://supabase.com)
- Create a new project (free tier works!)
- Copy your `Project URL` and `Anon Key`
- Paste them into `.env.local`

### 3. Setup Database (Copy & Paste in SQL Editor)

Go to Supabase Dashboard → SQL Editor → Create New Query

**Query 1: Create Table**

```sql
create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp with time zone default now()
);
```

**Query 2: Enable RLS**

```sql
alter table bookmarks enable row level security;
```

**Query 3: Add Policies**

```sql
-- View own bookmarks
create policy "Users can view their own bookmarks"
on bookmarks for select
using (auth.uid() = user_id);

-- Insert own bookmarks
create policy "Users can insert their own bookmarks"
on bookmarks for insert
with check (auth.uid() = user_id);

-- Delete own bookmarks
create policy "Users can delete their own bookmarks"
on bookmarks for delete
using (auth.uid() = user_id);
```

### 4. Enable Realtime

Go to **Database** → **Replication** → Toggle `bookmarks` table ON

### 5. Setup Google OAuth

#### Google Cloud Console

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project
3. Go to "Credentials" → "+ Create Credentials" → "OAuth 2.0 Client ID"
4. Choose "Web application"
5. Add Authorized JavaScript Origins:
   - `http://localhost:3000`
   - `https://YOUR_PROJECT_ID.supabase.co`
6. Add Authorized Redirect URIs:
   - `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
7. Copy `Client ID` and `Client Secret`

#### Supabase Console

1. Go to **Authentication** → **Providers** → **Google**
2. Enable Google provider
3. Paste your `Client ID` and `Client Secret`
4. Click Save

### 6. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## 🎯 What to Test First

1. **Login Page** - See the beautiful gradient background
2. **Google Login** - Click "Sign in with Google"
3. **Add Bookmark** - Type a title and valid URL
4. **Real-time Test** - Open 2 browser tabs and add bookmarks in one tab
   - You'll see them appear in the other tab instantly! ⚡
5. **Copy URL** - Click the clipboard icon
6. **Delete** - Click the trash icon with confirmation

---

## 🐛 Common Issues

### "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Fix:** Make sure `.env.local` file exists and has been saved before running `npm run dev`

### "RLS policy violation" error

**Fix:** Make sure all 3 RLS policies (select, insert, delete) are created

### Google OAuth "Invalid redirect_uri"

**Fix:** The redirect URL in Supabase must EXACTLY match what you set in Google Cloud Console

### Bookmarks not syncing in real-time

**Fix:** Go to Supabase Dashboard → Database → Replication → Make sure `bookmarks` is toggled ON

---

## 📁 Project Structure Overview

```
smart-bookmark-app/
├── app/                          # Next.js pages
│   ├── layout.tsx               # Layout with Toaster
│   ├── page.tsx                 # Redirect to login/dashboard
│   ├── login/page.tsx           # 🔐 Authentication
│   └── dashboard/page.tsx       # 📊 Main app
│
├── components/                   # React components
│   ├── Navbar.tsx               # Top navigation
│   ├── BookmarkForm.tsx         # Add bookmark form
│   ├── BookmarkList.tsx         # Grid of bookmarks
│   ├── BookmarkItem.tsx         # Single bookmark card
│   └── Loader.tsx               # Loading skeleton
│
├── hooks/                        # Custom React hooks
│   └── useBookmarks.ts          # Bookmark CRUD + realtime
│
├── lib/                          # Utilities
│   └── supabase.ts              # Supabase client
│
├── types/                        # TypeScript types
│   └── bookmark.ts              # Bookmark interface
│
├── utils/                        # Helper functions
│   └── auth-helpers.ts          # Auth utilities
│
└── .env.local                    # ⚠️ NEVER commit this!
```

---

## 🚀 Deployment (When Ready)

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit: Smart Bookmark App"
git push origin main
```

### 2. Deploy to Vercel

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Add Environment Variables:
  ```
  NEXT_PUBLIC_SUPABASE_URL = <your-project-url>
  NEXT_PUBLIC_SUPABASE_ANON_KEY = <your-anon-key>
  ```
- Click "Deploy"

### 3. Update Google OAuth

Add your Vercel domain to:

- Google Cloud Console (Authorized redirect URIs)
- Supabase OAuth redirect URL

---

## ✨ Key Features Explained

### Real-time Sync (Open 2 Tabs)

- The `useBookmarks` hook subscribes to Supabase realtime changes
- When you add/delete a bookmark in one tab, it instantly appears/disappears in another
- This is why RLS policies are important - only YOUR bookmarks sync

### Row Level Security (RLS)

- Even if someone has your API key, they can ONLY access their own bookmarks
- Enforced at the database level - no way to bypass it
- That's enterprise-level security! 🔒

### Glassmorphism UI

- Beautiful frosted glass effect with backdrop blur
- Smooth animations and hover effects
- Responsive design (1 column on mobile, 3 on desktop)

---

## 📚 Learn More

- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## 💡 Next Steps

After getting the app running:

1. ✅ Test all features thoroughly
2. ✅ Review the code structure
3. ✅ Deploy to Vercel
4. ✅ Share with friends!

---

**Happy coding! 🎉**

Questions? Check README.md for more details!
