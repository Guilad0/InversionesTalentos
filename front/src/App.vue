<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';

import Footer from './components/Footer.vue';
import WhatsAppIco from './components/WhatsAppIco.vue';
import {ref,onMounted} from 'vue'
import { getUser } from './helpers/utilities';

const user = ref({})
onMounted(async()=>{
  user.value = await getUser()
  localStorage.setItem('usuario',JSON.stringify(user.value));
  console.log('actualizado usuario');
})

</script>

<template>
  <div id="app" >
    <Navbar />
    <RouterView />     
    <ContactComponent /> 
      
    <Footer />
    <WhatsAppIco />
  </div>
</template>

<style scoped>
  div{
    width: 100%;
  }

</style>
