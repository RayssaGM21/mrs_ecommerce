import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Cart from '../views/Cart.vue'
import ProductsListView from '../views/ProductsListView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/produtos', name: 'ProductsListView', component: ProductsListView },
   { path: '/about', name: 'About', component: () => import('../views/About.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router