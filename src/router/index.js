import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import MyOrder from '@/views/myOrder'
import ProductDetail from '@/views/productDetail'
import Pay from '@/views/pay'
import Search from '@/views/search'
import Home from '@/views/layout/home'
import User from '@/views/layout/user'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import store from '@/store'
import SearchList from '@/views/search/list'
import Address from '@/views/address'
import AddAddress from '@/views/address/add'
import EditAddress from '@/views/address/edit'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children:
        [
          { path: '/home', component: Home },
          { path: '/user', component: User },
          { path: '/category', component: Category },
          { path: '/cart', component: Cart }
        ]
    },
    { path: '/myOrder', component: MyOrder },
    { path: '/productDetail/:id', component: ProductDetail },
    { path: '/pay', component: Pay },
    { path: '/search', component: Search },
    { path: '/searchList', component: SearchList },
    { path: '/address', component: Address },
    { path: '/addAddress', component: AddAddress },
    { path: '/editAddress/:id', component: EditAddress }
  ]
})
// 全局前置导航守卫，所有路由真正被访问到均会触发
// to：到哪里去
// from：从哪里来
// next()：是否放行
// next(路径)：进行拦截

// 定义以一个数组，专门存放所有需要权限访问的路径
const authUrls = ['/pay', '/myOrder', '/address']
router.beforeEach((to, from, next) => {
  // 看to.path是否再authUrls中出现
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
