# Hostinger Premium Upload

This project is configured for Hostinger Premium Web Hosting, which does not run Node.js apps.

## What to upload

1. Run `npm run build`
2. Open the generated `out/` folder
3. Upload the contents of `out/` into Hostinger `public_html`

## Important

- Before uploading, edit `public/contact.php`
- Replace `replace-with-your-email@example.com` with the real inbox that should receive submissions
- Build again after changing it so the updated `contact.php` is copied into `out/`
- The export already includes `icon.png` and `og-image.png` as normal static files for shared hosting

## Do not upload

- `node_modules/`
- `.next/`
- the full project source unless you specifically want a backup on the server

## Contact flow

- The site sends form submissions to `/contact.php`
- `contact.php` uses PHP `mail()` on the hosting account
- If Hostinger mail delivery is limited for your setup, use a mailbox on the same domain for best results
