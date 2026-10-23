# Rufus Maiwald Portfolio `v3`

👉 [rufusmai.com](https://rufusmai.com)

A small portfolio about me as a developer. Previous versions live on the
[`v1`](https://github.com/rufusmai/rufusmai.com/tree/v1) and
[`v2`](https://github.com/rufusmai/rufusmai.com/tree/v2) branches.

## 💻 Development

Built with [Next.js](https://nextjs.org) (App Router), [Tailwind CSS](https://tailwindcss.com) v4 and
[shadcn/ui](https://ui.shadcn.com) components on top of [Radix UI](https://www.radix-ui.com).

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn dev

# lint and check formatting
yarn lint
yarn format:check

# build for production and preview it locally
yarn build
yarn start
```

## 🌍 Deployment

Deployed on [Vercel](https://vercel.com). Analytics run through Umami: the tracker is served
first-party from `/stats/script.js`, which `next.config.ts` rewrites to `analytics.rufusmai.com`.
