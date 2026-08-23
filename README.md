# Rufus Maiwald Portfolio `v2`

👉 [rufusmai.com](https://rufusmai.com)

This site aims to be a small portfolio about me as developer. 
Its made using the newest web technologies und frameworks.  
Click [here](https://github.com/rufusmai/rufusmai.com/tree/v1) to watch `v1` repository.

## 💻 Development

This site is built with [Nuxt](https://nuxt.com/). All pages are prerendered to
static HTML at build time for optimal SEO and performance, and the contact
endpoint runs as a serverless function.

All the routing after the initial load will happen on the client side like a normal SPA.
[tailwindcss](https://tailwindcss.com/) is used as CSS framework to create an easy unique design, 
without having too much struggle with custom CSS.

For internationalization [vue-i18n](https://vue-i18n.intlify.dev/) and its [@nuxtjs/i18n](https://i18n.nuxtjs.org/) module is used, 
to allow easy reactive translations on the whole site.

This site can be installed and used offline using the service worker from the [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt.html) module.
Just click `Install` on the left navbar. This button appears if your browser thinks you might want to install this PWA.

## 🌍 Deployment

This site is deployed on [Vercel](https://vercel.com). 
It provides multiple deployments for each branch and commit for free.
Its integrated with github for deployment info and has many ready to go build templates for nuxt, next, vue, react, ...

The contact form is realized via a Nitro server route (`server/api/contact.post.ts`), which Vercel
deploys as a serverless function.

Analytics run through Umami. The tracker is served first-party from `/stats/script.js`:
`nitro.vercel.config` rewrites `/stats/*` to `analytics.rufusmai.com` in production,
and `nitro.devProxy` does the same for `yarn dev`.

## 🛠 Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and preview it locally
$ yarn build
$ yarn start
```

For detailed explanation on how things work, check out the [Nuxt docs](https://nuxt.com).
