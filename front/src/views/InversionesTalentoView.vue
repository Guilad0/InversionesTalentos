<template>
     <main class="w-100">
          <div class="d-flex justify-content-center pt-5 flex-wrap">
               <div class="col-2">
                    <SideBar />
               </div>
               <div class="col-10  container bg-degrade rounded-3 py-4">
                    <h1 class="text-light text-center font-bold  title mt-3 mb-2 p-0">Gestion de Inversiones</h1>
                    <div class="d-flex justify-content-center mb-3">
                         <button v-for="(tabCli, index) in tabsCli" :key="index" class="button-container rounded-5  text-dark hover-custom"
                              :class="[
                                   'animate__animated',
                                   'animate__fadeInUp',
                                   'animate__slow',
                                   'btn-6',
                                   'm-2',
                                   { active: activeTabCli === index },
                              ]" @click="showAction(index)">
                              {{ tabCli }} <span></span>
                         </button>
                    </div>

                    <div v-if="!isLoading" class="card  mx-3 rounded-3 m-auto ">
                         <div v-if="results.length > 0" class="card-body">
                                   <ListaInversionesTalento :results="results" :activeTabCli="activeTabCli"
                                        @inversionAceptada="handleClose" :isLoading="isLoading" />
                         </div>
                         <div v-else class=" card text-center align-middle">
                              <div class="alert alert-light m-0" role="alert">
                                   <h4 class="alert-heading">No cuentas con solicitudes o inversiones en progreso en esta seccion!</h4>
                                   <p>Solicita una inversion en el siguiente enlace <br> <RouterLink class="mt-2 nav-link custom-link" to="solicitar-inversion"> Ir al formulario </RouterLink>
                                   </p>
                              </div>
                         </div>
                    </div>
                    <div v-else class="m-auto text-center mt-5">
                         <label class="text-light text-center m-auto ">Cargando...</label>
                    </div>
               </div>
          </div>
     </main>
</template>
<script setup>
import useFetchData from '@/helpers/UseFetchData';
import SideBar from '../components/SidebarProfile.vue'
import { onMounted, ref } from 'vue'
import ListaInversionesTalento from '@/components/ListaInversionesTalento.vue';
import { RouterLink } from 'vue-router';
const tabsCli = ref(["En Proceso", "Finalizados", "Revertidos", "Rechazados"]);
const activeTabCli = ref(0)
const user = ref(JSON.parse(localStorage.getItem('usuario')));
const pathQuery = ref(`?estado=(s.estado_inversion = 'Inicial' OR s.estado_inversion = 'Pendiente' OR s.estado_inversion = 'Proceso') AND s.aprobado != 'Rechazado'`)
const path = ref("/solicitudesInversion/user/" + user.value.usuario_id + pathQuery.value)
const showAction = async (index) => {
     activeTabCli.value = index;
     switch (index) {
          case 0:
               pathQuery.value = (`?estado=(s.estado_inversion = 'Inicial' OR s.estado_inversion = 'Pendiente' OR s.estado_inversion = 'Proceso') AND s.aprobado != 'Rechazado'`)
               path.value = ("/solicitudesInversion/user/" + user.value.usuario_id + pathQuery.value)
               break;
          case 1:
               pathQuery.value = (`?estado=s.estado_inversion = 'Finalizado' `)
               path.value = ("/solicitudesInversion/user/" + user.value.usuario_id + pathQuery.value)
               break;
          case 2:
               pathQuery.value = (`?estado=s.estado_inversion = 'Reversion' `)
               path.value = ("/solicitudesInversion/user/" + user.value.usuario_id + pathQuery.value)
               break;
          case 3:
               pathQuery.value = (`?estado=s.aprobado = 'Rechazado' `)
               path.value = ("/solicitudesInversion/user/" + user.value.usuario_id + pathQuery.value)
               break;
          default:
               break;
     }
     await getData()
}
const handleClose = async () => {
     await getData()
     console.log('ejecutado carga');
}

const { results, getData, isLoading } = useFetchData(ref(path));
</script>
<style scoped>
.custom-card {
     border-radius: 15px;
}

.bg-degrade-inverso {
     background: linear-gradient(to left, var(--gray-color), rgb(101, 126, 197));
}

.bg-degrade {
     background: linear-gradient(to right, var(--gray-color), rgb(101, 126, 197));
}

.h1 {
     font-family: var(--font-montserrat-bold);
}

.button-container {
     flex-direction: column;
     align-items: center;
     gap: 10px;
}


.animate__slow {
     animation-duration: 5s;
}

.active {
     background-color: var(--yellow-orange);
     color: white !important;
     z-index: 1 !important;
}

button {
     color: rgb(128, 159, 245);
     padding: 5px 10px;

     transition: background-color 0.3s, transform 0.3s;
}
.custom-link{
     text-decoration: none;
     transition: all 0.5s ease;
}
.custom-link:hover{
     font-size: 1rem;
     font-weight: bold;
     text-decoration: underline;
     text-underline-offset: 5px;

}
.hover-custom:hover{
     color: wheat !important;
}
</style>