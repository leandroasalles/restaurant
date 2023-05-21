import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/homeView.vue'
import cart from '../components/cartList.vue'
import addToCart from '../components/addToCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/addToCart/:id',
    name: 'addToCart',
    component: addToCart,
    props: true
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
