<template>
  <main class="">
    <div v-if="!loading">
      <Carrusel :rol="user?.rol"/>
    <Destacados :rol="user?.rol" />
    <Partners :rol="user?.rol"/>
    <ComoFunciona />
    </div>
    <div v-else>
      <Sppiner/>
    </div>
  </main>
</template>

<script setup>
import ComoFunciona from "@/components/ComoFunciona.vue";
import Carrusel from "../components/Carrusel.vue";
import Destacados from "../components/Destacados.vue";
import Partners from "../components/Partners.vue";
import {ref, onMounted} from 'vue'
import { getUser } from '@/helpers/utilities';
import Sppiner from '../components/Spinner.vue'
import iziToast from "izitoast";
import { infoAlert } from "@/helpers/iziToast";
const loading = ref(false);
const userL = JSON.parse(localStorage.getItem("usuario"));


const user = ref(null)
onMounted(async()=>{
  loading.value =true
  user.value = await getUser();
  setTimeout(() => {
    loading.value =false
  }, 500);

  if (userL.rol == 'Null' || userL.rol == '' || userL.rol == null) {

    infoAlert(`No tienes un rol. <a href="/perfil" style="color: blue; text-decoration:none;">ÚNETE</a> a nuestra comunidad como Inversor o Talento`, "Por favor Unete a nuestra comunidad")
  }
})

</script>

<style scoped></style>
