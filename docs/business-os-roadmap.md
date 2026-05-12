# G7 Creative Business OS Roadmap

This website should grow into a full operating system for the videography business.

## Phase 1: Premium public website

- Replace the old one-page site with internal pages.
- Remove old Phonesites links.
- Add portfolio, services, process, portal preview, contact, and privacy pages.
- Deploy on Cloudflare Pages from GitHub.

## Phase 2: Lead intake CRM

- Store inquiries in Cloudflare D1.
- Send owner notifications by email.
- Send client confirmation emails.
- Add lead statuses: new, contacted, discovery, proposal, won, lost.
- Add notes, source tracking, budget, service type, ideal date, and follow-up date.

## Phase 3: Payments and contracts

- Connect Stripe Checkout for deposits and balances.
- Add invoice records to each project.
- Connect a contract provider or generate contract PDFs.
- Trigger portal access after contract and deposit.

## Phase 4: Client portal

- Add auth for clients.
- Show project timeline, deliverables, invoices, contracts, messages, and files.
- Store final video/photo links or files with Cloudflare R2.
- Add approval and revision request flows.

## Phase 5: Automation engine

- Create scheduled follow-ups.
- Automate discovery reminders, proposal nudges, shoot reminders, delivery notifications, review requests, and referral asks.
- Add templates for commercial, event, social content, photography, and wedding workflows.

## Suggested Cloudflare stack

- Cloudflare Pages for the public site
- Pages Functions or Workers for API routes
- D1 for CRM and portal data
- R2 for files and delivery assets
- Cron Triggers for scheduled follow-ups
- Queues for background email and delivery jobs
- Turnstile for spam protection

## Suggested third-party services

- Stripe for payments
- Resend, Postmark, or Mailgun for email
- DocuSign, Dropbox Sign, or PandaDoc for contracts
- Google Calendar for scheduling
- Cloudflare Web Analytics or Plausible for traffic
