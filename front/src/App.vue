<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';

import Footer from './components/Footer.vue';
import WhatsAppIco from './components/WhatsAppIco.vue';

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
