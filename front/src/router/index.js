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
import ReportesView from '@/views/ReportesView.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import Experiencia from '@/views/Experiencia.vue'
import ComoFunciona from '@/components/ComoFunciona.vue'
import ComentariosView from '@/views/ComentariosView.vue'
import PropositoView from '@/views/PropositoView.vue'
import LogrosView from '@/views/LogrosView.vue'
import AddInfInversionista from '@/views/AddInfInversionista.vue'
import InformacionView from '@/views/InformacionView.vue'
import RecoverPass from '@/views/RecoverPass.vue'
import CompraTokenView from '@/views/CompraTokenView.vue'
import TerminosCondicionesView from '@/views/TerminosCondicionesView.vue'
import PoliticaPrivacidadView from '@/views/PoliticaPrivacidadView.vue'
import NotFound from '@/views/NotFound.vue'
import { getUser } from '@/helpers/utilities'
import { ref } from "vue";

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
      // meta: {roles: ["Admin", "Inversionista",]}
    },
   
    {
      path:'/:name',
      name:'client',
      component:ClientView,
      // meta: {roles: ["Admin", "Inversionista"]} Se debe Cambiar el nombre de path
    },
    {
      path:'/login',
      name:'Login',
      component:IngresarView
    },
    {
      path:'/admin',
      name:'admin',
      component:ControlAdminView,
      meta: {roles: ["Admin"]}
    },
    {
      path:'/perfil',
      name:'perfil',
      component:PerfilView,
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
      component:BilleteraView,
      meta: {roles: ["Cliente", "Inversionista",]}
    },
    {
      path:'/reportes',
      name:'reportes',
      component:ReportesView
    },
    { path: '/forgot-password',
      name: 'forgot-password', 
      component: ForgotPassword,
    },
    { path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPassword,
    },
    { path: '/experiencia',
      name: 'experiencia', 
      component: Experiencia,
      meta: {roles: ["Inversionista", "Cliente"]}
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
      name: 'logros', 
      component: LogrosView,
      meta: {roles: ["Inversionista", "Cliente"]}
    },

    { path: '/addInfInversionista', 
      name: 'addInfInversionista',
      component: AddInfInversionista,
      meta: {roles: ["Inversionista","Null"]}
    },
    { path: '/addInfCliente', 
      name: 'addInfCliente',
      component: InformacionView,
      meta: {roles: ["Cliente","Null"]}
    },
    { path: '/RecoverPass', 
      name: 'RecoverPass',
      component: RecoverPass,
      // meta: {roles: ["Cliente", "Inversionista"]}
    },
    {
      path: '/compra-token',
      name: 'compra-token',
      component: CompraTokenView,
      
  },
  {
    path: '/terminos-condiciones',
    name: 'terminos-condiciones',
    component: TerminosCondicionesView
  },
  {
    path: '/politica-privacidad',
    name: 'politica-privacidad',
    component: PoliticaPrivacidadView
  },
  {
    path: '/not-found',
    name: 'notfound',
    component: NotFound
  }
  ]
})

router.beforeEach (async(to, from, next) => {
  try {
    const user = await getUser()
    console.log(user);
    if(to.meta.roles){
      if (!user) {
        console.warn("Acceso denegado usuario no autenticado");
       return next("/not-found")
      }
      if (!to.meta.roles.includes(user.rol)) {
        return next("/not-found")
      }
    }
    next();
  }
   catch (error) {
    console.log("Error en la verificación del usuario:" +error);
    next("/not-found");
  }
  
})

export default router
