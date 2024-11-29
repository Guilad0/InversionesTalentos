<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

import Footer from "./components/Footer.vue";
import WhatsAppIco from "./components/WhatsAppIco.vue";
import { ref, onMounted } from "vue";
import { getUser } from "./helpers/utilities";
import ContactComponent from "./components/ContactComponent.vue";
import router from "./router";

const user = ref({});
onMounted(async () => {
  user.value = await getUser();
  // localStorage.setItem("usuario", JSON.stringify(user.value));
  // console.log("actualizado usuario");
  
});
</script>

<template>
  <div id="app">
    <Navbar />
    <RouterView />
    <ContactComponent class="contact" />
    <Footer />
    <WhatsAppIco />
  </div>
</template>

<style scoped>
div {
  width: 100%;
}

/* #app{
    font-family: "Monoton", sans-serif;
   } */
#app {
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
}
.contact {
  padding-bottom: 40px;
}
</style>
