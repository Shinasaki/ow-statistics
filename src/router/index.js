import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/layouts/Layout'
import Logout from '@/components/bodys/Logout'
import Index from '@/components/bodys/Index'
import Backend from '@/components/bodys/Backend'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: 'index', component: Index, name: 'index', alias: '/' },
        { path: 'logout', component: Logout, name: 'logout'},
        { path: 'backend', component: Backend, name: 'backend', meta: { backend: true }},
      ],
    }
  ]
})


export default router

// Guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.backend)) {
    if (localStorage.token == 'undefined' || localStorage.token == undefined) { next({ name: 'index' }) } else {
      Vue.http.post('https://grabkeys.net:3443/bnet/get', JSON.stringify({ token: localStorage.token })).then( response => {
        if (response.body && response.status == 200) {
          let permission = response.body.profile.blizzard.permission;
          if (permission >= 2) next(); else next({ name: 'index' }) 
        }
      })
    }
  } else next();
});
