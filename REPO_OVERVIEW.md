# Repository Intelligence: africanpalace

## Snapshot
- Framework: Next.js 16 App Router + React 19 + TypeScript.
- Domain: hotel/airbnb-style booking and profile platform for "The African Palace".
- Main integrations: MongoDB Atlas, Cloudinary, Nodemailer (SMTP).

## Runtime architecture
- Route rendering is handled in `app/` with composable sections on the home page.
- Server Actions in `app/actions/*` are the business layer for auth, bookings, and profile/favorites.
- Session auth uses signed JWT cookies (`session`) via `jose`.
- Route access control is enforced centrally by `proxy.ts`.

## Data model hints (MongoDB collections)
- `users`: account profile, password hash, avatar, favorites.
- `otps`: signup verification codes + pending user payload.
- `password_resets`: reset tokens + expiry.
- `bookings`: completed booking records tied to user email/id.

## Product flows
1. Signup flow:
   - request OTP with user info + hashed password
   - verify OTP
   - create user + issue session cookie
2. Login flow:
   - validate user and bcrypt password
   - issue session cookie
3. Password reset flow:
   - generate reset token + email reset link
   - verify token and write new password hash
4. Booking flow:
   - authenticated user submits room/date/payment details
   - booking stored in DB
   - confirmation email attempted (non-blocking)
5. Profile flow:
   - avatar upload to Cloudinary
   - profile update in DB
   - session cookie is refreshed with updated user payload

## Notable implementation details
- Room inventory is currently static in `lib/data.ts` (2 room types).
- Favorites are persisted in MongoDB and also mirrored in localStorage for perceived snappiness.
- Several pages rely on rich custom Tailwind-heavy styling.

## Risks / technical debt observed
- Linting currently fails with numerous issues (unescaped entities, `any`, require-import, unused vars).
- `JWT_SECRET` has an insecure fallback default in code.
- Some content references image files that may not exist in `public/`.
- README appears to contain stale project naming/path references (`seyramz`).

## Runbook
```bash
npm install
npm run dev
npm run lint
npm run build
```

## Environment variables expected
- `MONGODB_URI`
- `JWT_SECRET`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_UPLOAD_PRESET`
- `NEXT_PUBLIC_BASE_URL`
