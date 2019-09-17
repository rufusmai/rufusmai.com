import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contact',
      name: 'Nachricht schicken',
      component: () => import(/* webpackChunkName: "contact" */ './views/Contact.vue')
    },
    {
      path: '/sent',
      name: 'Nachricht gesendet',
      props: (route) => (route.query),
      component: () => import(/* webpackChunkName: "contact" */ './views/Sent.vue')
    },
    {
      path: '/projects',
      name: 'Projekte',
      component: () => import('./views/Projects.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.name+' · Rufus Maiwald'
  next()
})

export default router;
