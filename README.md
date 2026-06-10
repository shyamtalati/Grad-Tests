# Apta Tests

Apta Tests is a legal and graduate exam preparation website. The current release focuses on original, unofficial LSAT-style practice with timed sections, question navigation, scoring, and answer explanations.

## What is included

- Public Apta Tests landing page
- Legal disclaimer and trademark/non-affiliation notice
- 3 imported practice tests
- Timed section practice
- Question navigation
- Answer selection and flagging
- Score summary
- Review mode with correct answers and explanations

## Security and confidentiality

This repository should not contain `.env` files, Vercel project metadata, API keys, private keys, service-account JSON files, credentials, logs, or build artifacts. The `.gitignore` file includes rules for those sensitive local files.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy

Push the repository to GitHub and import it in Vercel. Vercel will detect Next.js automatically.

## Legal notice

Apta Tests is independent and unofficial. It is not affiliated with, endorsed by, approved by, or sponsored by LSAC, ETS, GMAC, AAMC, NCBE, BARBRI, Kaplan, Themis, UWorld, or any other testing service, publisher, or preparation provider. Test names and related marks belong to their respective owners.
