<template>
  <main class=" h-100">
    <div class="d-flex">
      <div class="col-2  ">
        <ul class="mt-5">
          <li class="py-3 ps-2 rounded  nav-link  my-3 retiro " :class="{ 'border-custom': view == 'wallRequests' }"
            @click="showView('wallRequests')">
            <i class="fa-solid fa-circle-dollar-to-slot"></i> &nbsp; Solicitudes Retiro
          </li>
          <li class="py-3 ps-2 rounded  nav-link  my-3 retiro "
            :class="{ 'border-custom': view == 'SolicitudesTokens' }" @click="showView('SolicitudesTokens')">
            <i class="fa-solid fa-circle-dollar-to-slot"></i> &nbsp; Solicitudes Compra de Tokens
          </li>
          <li class="py-3 ps-2 rounded  nav-link  my-3" :class="{ 'border-custom': view == 'users' }"
            @click="showView('users')">
            <i class="fa-solid fa-users "></i> &nbsp; Usuarios
          </li>

          <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('posts')"
            :class="{ 'border-custom': view === 'posts' }">
            <i class="fa-solid fa-book-open "></i>&nbsp; Guías
          </li>
          <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('categorias')"
            :class="{ 'border-custom': view === 'categorias' }">
            <i class="fa-solid fa-layer-group "></i> &nbsp; Categorías
          </li>
          <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('coment')"
            :class="{ 'border-custom': view === 'coment' }">
            <i class="fa-solid fa-comments-dollar "></i> &nbsp; Comentarios y Reseñas
          </li>
          <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('reclamos')"
            :class="{ 'border-custom': view === 'reclamos' }">
            <i class="fa-solid fa-envelope-open-text "></i> &nbsp; Consultas y Reclamos
          </li>
          <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('reportes')"
            :class="{ 'border-custom': view === 'reportes' }">
            <i class="fa-regular fa-paste "></i> &nbsp; Reportes
          </li>
          <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('ajustes')"
            :class="{ 'border-custom': view === 'ajustes' }">
            <i class="fa-solid fa-gear "></i> &nbsp; Ajustes
          </li>
          <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('faqs')"
            :class="{ 'border-custom': view === 'faqs' }">
            <i class="fa-solid fa-person-circle-question "></i> &nbsp; Preguntas Frecuentes
          </li>
        </ul>
      </div>
      <div class="col-10">
        <Solicitudes v-if="view == 'wallRequests'" />
        <SolicitudesTokens v-if="view == 'SolicitudesTokens'" />
        <Users v-if="view == 'users'" />
        <Posts v-if="view == 'posts'" />
        <Ajustes v-if="view == 'ajustes'" />
        <Categories v-if="view == 'categorias'" />
        <Coment v-if="view == 'coment'" />
        <Reportes v-if="view == 'reportes'" />
        <ConsultasReclamos v-if="view == 'reclamos'" />
        <Faqs v-if="view == 'faqs'" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Solicitudes from '../components/WalletRequests.vue'
import SolicitudesTokens from '../components/WalletRequestsTokens.vue'
import Users from '../components/Users.vue';
import Posts from '../components/Posts.vue'
import Ajustes from '@/components/Ajustes.vue';
import Categories from './Categories.vue';
import ConsultasReclamos from '@/components/ConsultasReclamos.vue';
import Coment from '../components/Coment.vue';
import Reportes from '../components/ReportesAdmin.vue';
import Faqs from '../components/Faqs.vue';
import { getUser } from '@/helpers/utilities';
// import router from '@/router';

const view = ref('users');
const user = ref(null);

onMounted(async () => {
  user.value = await getUser();
})

const showView = (typeView) => {
  view.value = typeView;
}
</script>
<style scoped>
.d-flex {
  height: 100%;
}

main {
  background-color: var(--white-anti-flash-color);
  width: 100%;
}

li {
  cursor: pointer;
  color: var(--smoky-dark-color)
}

li:hover {
  font-weight: 600;
  background-color: #17223B;
  color: white;

}

.border-custom {
  font-weight: 600;
  background-color: #17223B;
  color: white;

}

.retiro:hover {
  font-weight: 600;
  background-color: #17223B;
  color: white !important;

}
</style>