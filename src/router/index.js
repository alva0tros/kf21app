import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) => {
  if (store.state.login.isLogin) {
    // 로그인 된 유저는 로그인 페이지 접근제한
    next('/home')
  } else {
    next()
  }
}

const onlyAuthUser = (to, from, next) => {
  if (store.state.login.isLogin) {
    // 로그인 안된 유저는 로그인페이지로
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/layouts/default/Index.vue'),
    beforeEnter: onlyAuthUser,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/main/Home.vue')
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "home" */ '@/views/main/Table.vue')
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import(/* webpackChunkName: "home" */ '@/views/main/Product.vue')
      }
    ]
  },
  {
    path: '/com',
    component: () => import(/* webpackChunkName: "com" */ '@/layouts/default/Index.vue'),
    beforeEnter: onlyAuthUser,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "com" */ '@/views/com/User.vue')
      },
      {
        path: 'organization',
        name: 'Organization',
        component: () => import(/* webpackChunkName: "com" */ '@/views/com/Organization.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "login" */ '@/layouts/login/Index.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        beforeEnter: rejectAuthUser,
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
