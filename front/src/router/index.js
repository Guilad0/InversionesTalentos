import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrarseView from '@/views/RegistrarseView.vue'
import PostsView from '../views/PostsView.vue'
import ClientsView from '@/views/ClientsView.vue'
import ClientView from '@/views/ClientView.vue'
import IngresarView from '@/views/IngresarView.vue'
import ControlAdminView from '@/views/ControlAdmin.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registrarse',
      name: 'registrarse',
      component:RegistrarseView
    },
  {
      path: '/posts',
      name: 'posts',
      component: PostsView
    },
  {
      path: '/marketplace',
      name: 'marketplace',  
      component: ClientsView, 
    },
   
    {
      path:'/client/:name',
      name:'client',
      component:ClientView
    },
    {
      path:'/login',
      name:'Login',
      component:IngresarView
    },
    {
      path:'/admin',
      name:'admin',
      component:ControlAdminView
    },
  ]
})

export default router
