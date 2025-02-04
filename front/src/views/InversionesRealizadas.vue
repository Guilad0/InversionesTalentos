<template>
  <div class="w-100">
    <!-- Contenedor Izquierdo (Sidebar) -->
    <div class="d-flex justify-content-center pt-5 flex-wrap">
      <div class="col-2">
        <SidebarProfile />
      </div>
      <div class="col-10 container bg-degrade rounded-3 py-4">
        <h1 class="text-light text-center font-bold  title mt-3 mb-2 p-0">Gestion de Inversiones </h1>
        <div class="d-flex justify-content-center mb-3">
          <button v-for="(tabCli, index) in tabsCli" :key="index"
            class="button-container rounded-5 px-2 text-dark hover-custom" :class="[
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
            <ListaInversionesInversor :results="results" :activeTabCli="activeTabCli" @inversionAceptada="handleClose"
              :isLoading="isLoading" :tipoMoneda="tipoMoneda"/>
          </div>
          <div v-else class=" card text-center align-middle">
            <div class="alert alert-light m-0" role="alert">
              <h4 class="alert-heading">No cuentas con inversiones en esta seccion!</h4>
              <p>    Explora nuevas oportunidades y apoya el talento. <br>
                ¡Haz crecer tu portafolio invirtiendo estratégicamente! <br>
                <RouterLink class="mt-2 nav-link custom-link" to="marketplace"> Ir al Marketplace </RouterLink>
              </p>
            </div>
          </div>
        </div>
        <div v-else class="m-auto text-center mt-5">
          <label class="text-light text-center m-auto ">Cargando...</label>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import SidebarProfile from "@/components/SidebarProfile.vue"; // Importación del componente
import useFetchData from "@/helpers/UseFetchData";
import ListaInversionesInversor from "../components/ListaInversionesInversor.vue";
const tabsCli = ref(["En Proceso","Finalizados", "Revertidos"]);
const activeTabCli = ref(0)
const page = ref(1)
const user = ref(JSON.parse(localStorage.getItem('usuario')));
const path = ref(`/inversionesRetiros/getInversores?id_inversor=${user.value.usuario_id}&page=${page.value}`)
const { results, getData, isLoading,tipoMoneda } = useFetchData(ref(path));

const showAction = async (index) => {
  console.log(index);
  activeTabCli.value = index;
  switch (index) {
    case 0:
      path.value = (`/inversionesRetiros/getInversores?id_inversor=${user.value.usuario_id}&page=${page.value}`)
      break;
    case 1:
      path.value = (`/solicitudesInversion/getInvByState/hola/${user.value.usuario_id}?state=Finalizado`)
      break;
    case 2:
      path.value = (`/solicitudesInversion/getInvByState/hola/${user.value.usuario_id}?state=Reversion`)
      break;
    case 3:
      path.value = (`/inversionesRetiros/getInversores?id_inversor=${user.value.usuario_id}&estadoInv=Reversion&page=${page.value}`)
      break;
    default:
      break;
  }
  await getData();
}
const handleClose = async () => {
     await getData()
}

</script>

<style scoped>
.hover-custom:hover {
  color: wheat !important;
}

.active {
  background-color: var(--yellow-orange);
  color: white !important;
  z-index: 1 !important;
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
</style>
