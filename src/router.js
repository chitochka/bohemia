import Vue from 'vue'
import Router from 'vue-router'
import Home from "./views/Home.vue"
import Account from "./views/AccountPage.vue"
import SingUp from "./views/SingUp.vue"
import SingIn from "./views/SingIn.vue"

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter:requireAuth
  },  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter:requireAuth
  },  {
    path: '/singup',
    name: 'SingUp',
    component: SingUp,
    beforeEnter:requireAuth
  },  {
    path: '/singin',
    name: 'SingIn',
    component: SingIn,
    beforeEnter:requireAuth
  }
]


async function requireAuth(to, from, next) {
  if (localStorage.isAuth){
    if (to.path === '/account') next()
    else next("/account")
  } else {
    if (to.path === '/account') next('/')
    else next()
  }
}
 

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router