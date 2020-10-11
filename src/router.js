import _ from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';
import { checkUserData } from './helpers/user';
import store from './store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/src/views/Home.vue'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('@/src/views/About.vue'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/src/components/auth/Login.vue'),
            props: true,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/src/components/auth/Register.vue'),
            props: true,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/chat',
            name: 'Chat',
            props: true,
            component: () => import('@/src/components/Dash.vue'),
            meta: {
                requiresAuth: true
            },
            children: [
                
            ]
        },
        {
            path: '*',
            component: () => import('@/src/components/error/NotFound.vue')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    await checkUserData(next);
    if (to.meta.requiresAuth) {
        if (localStorage.getItem('token') === null) {
            localStorage.clear();
            next({
                name: 'Login',
                params: { message: 'You are unauthorized, Please login to access' }
            });
        } else {
            next();
        }
    } else {
        next();
    }
    next();
});

export default router;
