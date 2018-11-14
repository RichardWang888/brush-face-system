import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'

import Layout from '../view/layout/Layout'
import Login from '../view/login/Login'
import Home from '../view/home/Home'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    component: Login
}, {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
        path: '/home',
        component: Home,
    }],
    meta: {
        login: true
    }
}]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    let token = Cookie.get("Token");
    let needAuth = to.matched.some(item => item.meta.login);
    if (!token && needAuth) {
        next({
            path: "/login"
        })
    } else {
        next()
    }
})

export default router