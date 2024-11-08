import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrarseView from '@/views/RegistrarseView.vue'
import PostsView from '../views/PostsView.vue'
import ClientsView from '@/views/ClientsView.vue'
import ClientView from '@/views/ClientView.vue'
import IngresarView from '@/views/IngresarView.vue'
import ControlAdminView from '@/views/ControlAdmin.vue'
import PerfilView from '@/views/PerfilView.vue'
import FaqView from '@/views/FaqView.vue'
import SignUpLoginView from '@/views/SignUpLoginView.vue'
import PostView from '@/views/PostView.vue'
import ContactView from '@/views/ContactView.vue'
import BilleteraView from '@/views/BilleteraView.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import Experiencia from '@/views/Experiencia.vue'
import ComoFunciona from '@/components/ComoFunciona.vue'
import ComentariosView from '@/views/ComentariosView.vue'
import PropositoView from '@/views/PropositoView.vue'
import LogrosView from '@/views/LogrosView.vue'

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
      path: '/post/:post_id',
      name: 'post',
      component: PostView
    },
  {
      path: '/marketplace',
      name: 'marketplace',  
      component: ClientsView, 
    },
   
    {
      path:'/:name',
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
    {
      path:'/perfil',
      name:'perfil',
      component:PerfilView
    },
    {
      path:'/sign-login',
      name:'sign-login',
      component:SignUpLoginView
    },
    {
      path:'/faq',
      name:'faq',
      component:FaqView
    },
    {
      path:'/contact',
      name:'contact',
      component:ContactView
    },
    {
      path:'/billetera',
      name:'billetera',
      component:BilleteraView
    },
    { path: '/forgot-password',
      name: 'forgot-password', 
      component: ForgotPassword 
    }, 
    { path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPassword 
    },
    { path: '/experiencia',
      name: 'experiencia', 
      component: Experiencia
    }, 
    { path: '/como-funciona',
      name: 'como-funciona',
      component: ComoFunciona 
    },
    { path: '/comentarios',
      name: 'comentarios', 
      component: ComentariosView
    },
    { path: '/proposito',
      name: 'proposito', 
      component: PropositoView
    },
    { path: '/logros',
      name: 'logors', 
      component: LogrosView
    },

  ]
})

export default router
