# Usermetrics

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project displays users social media posts in a paginated format. It also has dashboards for displaying users monlthly posts metrics.

It is assumed that the user is already authenticated / logged in. The user authentication flow is yet to be implemented.

## AWS deployment

This project is deployed on AWS using S3 and Cloudfront.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Improvement ideas

- Add unit tests
- Add e2e tests
- Add user authentication flow
