import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

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
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/sent',
      name: 'Nachricht gesendet',
      props: (route) => (route.query),
      component: () => import('../views/Sent.vue')
    },
    {
      path: '/projects',
      name: 'Projekte',
      component: () => import('../views/Projects.vue')
    },
    {
      path: '/privacy',
      name: 'Datenschutz',
      component: () => import('../views/Privacy.vue')
    },
    {
      path: '*',
      name: 'Nicht gefunden',
      component: () => import('../views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.name + ' · Rufus Maiwald'
  next()
})

export default router
