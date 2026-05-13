# G7 Creative Website

Cloudflare Pages-ready React website for G7 Creative.

## Pages included

- `/` public homepage
- `/work` portfolio archive
- `/services` services and packages
- `/process` client journey and automation plan
- `/portal` client portal preview
- `/contact` project intake form
- `/privacy` privacy draft

## Cloudflare Pages settings

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`

The `functions/api/inquiries.js` endpoint is ready for Cloudflare Pages Functions. It validates inquiry form submissions and returns a success response. The next backend step is to connect storage, email notifications, payments, auth, contracts, and file delivery.
