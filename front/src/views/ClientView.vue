<style scoped>
main {
  width: 100vw;
  background-color: var(--white-anti-flash-color);
}

/* .profile {
  height: 70vh;
  width: 100%;
} */

li {
  font-size: 0.8rem;
}
</style>
<script setup>
import { useClientStore } from "../stores/clientStore";
// import ContactComponent from '../components/ContactComponent.vue'
import CardDetailsClient from "../components/CardDetailsClient.vue";
import CardDetailsClientSm from "../components/CardDetailsClientSm.vue";

const clientStore = useClientStore();
const selectedClient = clientStore.selectedClient;
</script>
<template>
  <main class="min-vh-100 w-100 scroll-container">
    <div class="container">
      <div class="profile row pt-5 justify-content-center mb-5 mx-auto">
        <CardDetailsClient :selectedClient="selectedClient" />
        <CardDetailsClientSm :selectedClient="selectedClient" />
      </div>
      <div class="links py-5">
        <!-- <ContactComponent /> -->
      </div>
    </div>
  </main>
</template>
