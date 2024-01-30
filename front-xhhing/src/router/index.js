import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            name:'home',
            component: () => import('../views/home.vue'),
            meta:{'title':'首页'},
        },
        {
            path:'/todolist',
            name:'todolist',
            component: () => import('../views/todolist.vue'),
            meta:{'title':'待办'}
        },
    ]
})

export default router