import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue';

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        },
        {
            path: '/list-author',
            name: 'autores',
            component: () => import('../components/autores/list.vue')
        },
        {
            path: '/list-publisher',
            name: 'editoras',
            component: () => import('../components/editoras/list.vue')
        },
        {
            path: '/list-book',
            name: 'livros',
            component: () => import('../components/livros/list.vue')
        }
    ],
    mode: 'history'
})