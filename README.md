# Smart Bookmarks App

A beautiful, real-time bookmark management application built with Next.js, Supabase, and Tailwind CSS.

##  Features

-  **Google OAuth Authentication** - Secure login with Google
-  **Real-time Synchronization** - Bookmarks sync instantly across devices
-  **Private & Secure** - Row-Level Security ensures data isolation
-  **Beautiful UI** - Glassmorphism design with smooth animations
-  **Copy to Clipboard** - Quick URL copying functionality
-  **Responsive Design** - Works seamlessly on mobile and desktop
-  **Delete Confirmation** - Prevent accidental deletions
-  **Loading States** - Skeleton loaders for better UX
-  **Toast Notifications** - Real-time feedback on actions

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15+ with TypeScript |
| **Styling** | Tailwind CSS |
| **Backend** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth + Google OAuth |
| **Real-time** | Supabase Realtime |
| **Notifications** | React Hot Toast |
| **Deployment** | Vercel |

##  Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier available)
- Google Cloud OAuth credentials

##  Installation & Setup

### Step 1: Clone Repository
\\\ash
cd smart-bookmark-app
npm install
\\\

### Step 2: Supabase Setup

#### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Select your region and create the project
4. Copy your \Project URL\ and \Anon Key\

#### 2.2 Create Database Table
In Supabase SQL Editor, run:
\\\sql
create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp with time zone default now()
);
\\\

#### 2.3 Enable Row Level Security (CRITICAL!)
\\\sql
alter table bookmarks enable row level security;

-- Policy 1: Users can view their own bookmarks
create policy "Users can view their own bookmarks"
on bookmarks
for select
using (auth.uid() = user_id);

-- Policy 2: Users can insert their own bookmarks
create policy "Users can insert their own bookmarks"
on bookmarks
for insert
with check (auth.uid() = user_id);

-- Policy 3: Users can delete their own bookmarks
create policy "Users can delete their own bookmarks"
on bookmarks
for delete
using (auth.uid() = user_id);
\\\

#### 2.4 Enable Realtime
1. Go to **Database**  **Replication**
2. Enable replication for \ookmarks\ table
3. Select \INSERT\, \UPDATE\, \DELETE\ events

#### 2.5 Setup Google OAuth
1. Go to **Authentication**  **Providers**  **Google**
2. Click **Enable**
3. Add your Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 credentials
   - Add redirect URL: \https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback\

### Step 3: Environment Variables
\\\ash
cp .env.local.example .env.local
\\\

Edit \.env.local\:
\\\env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
\\\

### Step 4: Run Development Server
\\\ash
npm run dev
\\\

Visit \http://localhost:3000\

##  Project Structure

\\\
smart-bookmark-app/
 app/
    layout.tsx              # Root layout with Toaster provider
    page.tsx                # Home (redirects to login/dashboard)
    login/
       page.tsx             # Google OAuth login page
    dashboard/
        page.tsx             # Main dashboard
 components/
    Navbar.tsx              # Navigation with user profile
    BookmarkForm.tsx        # Add bookmark form
    BookmarkList.tsx        # Display all bookmarks
    BookmarkItem.tsx        # Individual bookmark card
    Loader.tsx              # Loading skeleton
 hooks/
    useBookmarks.ts         # Custom bookmark hook with CRUD
 lib/
    supabase.ts             # Supabase client initialization
 types/
    bookmark.ts             # TypeScript interfaces
 utils/
    auth-helpers.ts         # Auth utility functions
 .env.local                  # Environment variables
 README.md                   # This file
\\\

##  How It Works

### Authentication Flow
1. User clicks "Sign in with Google"
2. Redirected to Google OAuth consent screen
3. After approval, redirected to \/dashboard\
4. User session stored in Supabase

### Bookmark Management
1. User enters title and URL
2. Form validates URL format
3. Bookmark inserted into \ookmarks\ table with \user_id\
4. Realtime listener triggers bookmark refresh
5. New bookmark appears in the grid

### Real-time Sync
- Supabase channel listens for \postgres_changes\ on \ookmarks\ table
- Any INSERT/UPDATE/DELETE events trigger automatic refresh
- Open multiple tabs and see changes instantly!

##  Deployment on Vercel

### Step 1: Push to GitHub
\\\ash
git add .
git commit -m "Initial commit: Smart Bookmark App"
git push origin main
\\\

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository
4. Add environment variables:
   - \NEXT_PUBLIC_SUPABASE_URL\
   - \NEXT_PUBLIC_SUPABASE_ANON_KEY\
5. Click "Deploy"

### Step 3: Update Google OAuth Redirect URL
Add your Vercel domain to Supabase Google OAuth settings:
\\\
https://your-domain.vercel.app/dashboard
\\\

##  Key Implementation Details

### RLS Policies Impact
The Row Level Security policies ensure:
- Users can ONLY see their own bookmarks
- Users cannot view/modify others' bookmarks
- Secure data isolation at database level

### Realtime Subscription
\\\	ypescript
supabase
  .channel('bookmarks')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'bookmarks' },
    () => fetchBookmarks()
  )
  .subscribe()
\\\
This enables the "open 2 tabs" requirement - changes sync instantly!

### URL Validation
\\\	ypescript
isValidUrl('https://github.com') //  Valid
isValidUrl('not-a-url')          //  Invalid
\\\

##  Troubleshooting

### Issue: "RLS policy violation" on insert
**Solution:** Make sure RLS policies are created correctly and you're passing \user_id\ in insert

### Issue: Realtime not updating
**Solution:** Ensure replication is enabled for bookmarks table in Supabase

### Issue: Google OAuth not working
**Solution:** Verify redirect URL matches exactly in Google Cloud Console

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"
**Solution:** Run \
pm run dev\ after creating \.env.local\ file

##  Performance Optimization

-  Server-side rendering where possible
-  Image optimization with Next.js Image component
-  CSS-in-JS with Tailwind (no runtime overhead)
-  Lazy loading of components
-  Optimistic UI updates

##  Security Best Practices

-  Row Level Security enforced at database
-  Never expose secret keys in client code
-  Session managed by Supabase
-  URL validation on client and (ideally) server
-  CORS properly configured

##  Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Realtime Guide](https://supabase.com/docs/guides/realtime)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

##  UI/UX Features

- **Glassmorphism Cards** - Modern frosted glass effect
- **Smooth Animations** - Hover scales, fade-ins
- **Gradient Backgrounds** - Beautiful color transitions
- **Empty State** - Friendly message when no bookmarks
- **Loading Skeletons** - Better perceived performance
- **Toast Notifications** - Non-intrusive feedback
- **Responsive Grid** - 1 column on mobile, 3 on desktop

##  Future Enhancements

- [ ] Search and filter bookmarks
- [ ] Organize into folders/categories
- [ ] Dark mode toggle
- [ ] Bookmark tags
- [ ] Bookmark rating/favorites
- [ ] Batch operations
- [ ] Export bookmarks as JSON/CSV
- [ ] Browser extension integration
- [ ] Sharing bookmarks with team members

##  Assignment Checklist

- [x] Google OAuth authentication
- [x] Supabase database integration
- [x] Row Level Security policies
- [x] Real-time synchronization
- [x] Add/delete bookmarks
- [x] Beautiful responsive UI
- [x] Proper folder structure
- [x] TypeScript for type safety
- [x] Environment variable management
- [x] Deployment ready

##  License

This project is open source and available under the MIT License.

##  Author

Built as a professional full-stack web application assignment.

---

**Happy bookmarking! **

For questions or improvements, feel free to create an issue or pull request.
