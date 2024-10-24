<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import WhatsAppIco from './components/WhatsAppIco.vue';
import axios from 'axios';

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
  
</style>
