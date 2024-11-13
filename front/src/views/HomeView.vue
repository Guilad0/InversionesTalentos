<template>
  <main class="">
    <div v-if="!loading">
      <Carrusel :rol="user?.rol"/>
    <Destacados />
    <Partners />
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
const loading = ref(false);

const user = ref(null)
onMounted(async()=>{
  loading.value =true
  user.value = await getUser();
  setTimeout(() => {
    loading.value =false
  }, 500);
})

</script>

<style scoped></style>
