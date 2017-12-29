import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/layouts/Layout'
import Index from '@/components/bodys/Index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: 'index', component: Index, name: 'index', alias: '/' }
      ],
    }
  ]
})


export default router
