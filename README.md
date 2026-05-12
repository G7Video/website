# G7 Creative Website

Cloudflare Pages-ready static website for G7 Creative.

## Pages included

- `/` public homepage
- `/work.html` portfolio archive
- `/services.html` services and packages
- `/process.html` client journey and automation plan
- `/portal.html` client portal preview
- `/studio.html` CRM preview for the business owner
- `/contact.html` project intake form
- `/privacy.html` privacy draft

## Cloudflare Pages settings

- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`

The `functions/api/inquiries.js` endpoint is ready for Cloudflare Pages Functions. It validates inquiry form submissions and returns a success response. The next backend step is to connect storage, email notifications, payments, auth, contracts, and file delivery.
