# Raha Cloud Website

Next.js website with `next-intl` for i18n (English + Persian). Uses pnpm.

## Commands

- `pnpm dev` - start dev server
- `pnpm build` - production build
- `pnpm lint` - lint with biome

## Adding a New Client

To add a new client to the "Teams who trust Raha" section:

1. **Add a logo** - Place a JPG image (ideally square, 64x64 or larger) at `public/logos/<client-key>.jpg`
2. **Add translations** - Add a key under `clients` in both message files:
   - `messages/en.json`: `"clients": { ..., "<client-key>": "Client Display Name" }`
   - `messages/fa.json`: `"clients": { ..., "<client-key>": "نام فارسی کلاینت" }`
3. **Add the card** - In `app/[locale]/page.tsx`, add a new `<a>` block inside the clients `squad-grid` div, following the existing pattern:
   ```tsx
   <a
     href="https://client-website.com/"
     target="_blank"
     rel="noopener noreferrer"
     className="squad-card"
   >
     <Image
       src="/logos/<client-key>.jpg"
       alt={t('clients.<client-key>')}
       width={64}
       height={64}
       className="squad-logo"
     />
     <span className="squad-name">{t('clients.<client-key>')}</span>
   </a>
   ```
