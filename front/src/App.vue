<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ContactComponent from './components/ContactComponent.vue';
</script>

<template>
  <div id="app">
    <Navbar />
    <RouterView />
    <ContactComponent />
    <Footer />
    
  </div>
</template>

<script>

</script>

<style scoped></style>
