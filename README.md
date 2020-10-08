# Rufus Maiwald Portfolio `v2`

👉 [rufusmaiwald.de](https://rufusmaiwald.de)

This site aims to be a small portfolio about me as developer. 
Its made using the newest web technologies und frameworks.

## 💻 Development

This site utilizes the [Nuxt](https://nuxtjs.org/) Full static mode. 
It pre renders all sites in static html files for optimal seo and performance.

All the routing after the initial load will happen on the client side like a normal SPA.
[tailwindcss](https://tailwindcss.com/) is used as CSS framework to create an easy unique design, 
without having too much struggle with custom CSS.

For internationalization [vue-i18n](http://kazupon.github.io/vue-i18n/) and its [nuxt-i18n](https://i18n.nuxtjs.org/) module is used, 
to allow easy reactive translations on the whole site.

This site can be installed and used offline using the built in service worker from the [@nuxt/pwa](https://pwa.nuxtjs.org/) module.
Just click `Install` on the right navbar. This button appears if your browser thinks you might want to install this PWA.

As a small easter egg you can test the Oauth2 login of my project [OneGaming](https://id.onegaming.group) right on the projects page.

## 🌍 Deployment

This site is deployed on [Vercel](https://vercel.com). 
It provides multiple deployments for each branch and commit for free.
Its integrated with github for deployment info and has many ready to go build templates for nuxt, next, vue, react, ...

## 🛠 Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
