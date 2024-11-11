<template>
  <main>
    <div class="proposito bg-dark d-flex align-items-center justify-content-center">
      <div class="text-container">
        <h1 class="text-center text-white">
          Nuestro propósito es ayudar a que todos los profesionales puedan desarrollar su
          carrera a través del poder de financiamiento de sus fans.
        </h1>
      </div>
    </div>
    <div class="destacados-section">
      <h3 class="py-5 text-center">Destacados</h3>
      <div class="d-flex flex-wrap justify-content-center">
        <CardClient
          v-for="client in primerosCinco"
          :key="client.usuario_id"
          :client="client"
          class="fade-in card-client"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center pb-5">
      <div class="wrap">
        <RouterLink to="marketplace" class="btn-6 text-center rounded-3"
          >Ir a marketplace<span></span
        ></RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import useFetchData from "../helpers/UseFetchData";
import { ref, computed } from "vue";
import CardClient from "../components/CardClient.vue";
import { RouterLink } from "vue-router";

const path = ref("/clients");
const { results: clients, getData: getClients } = useFetchData(path);

const primerosCinco = computed(() => clients.value.slice(0, 5));
console.log(primerosCinco);
</script>

<style scoped>
.proposito {
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s ease-in-out;
  padding: 1rem;
  text-align: center;
}

.text-container {
  max-width: 800px;
}

.destacados-section {
  padding: 2rem 1rem;
  animation: slideIn 1s ease-in-out;
}

.card-client {
  margin: 0.5rem;
  flex: 1 1 calc(100% - 1rem);
  max-width: calc(100% - 1rem);
  min-height: 400px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card-client img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.card-client .user-picture {
  width: 120px;
  height: 120px;
  margin-top: -60px;
}

.card-client .name-client {
  font-size: 1.4rem;
  margin: 25px 0 10px;
}

.card-client .description {
  font-size: 1.1rem;
  padding: 0 25px;
}

.card-client:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (min-width: 600px) {
  .card-client {
    flex: 1 1 calc(50% - 2rem);
    max-width: calc(50% - 2rem);
    margin: 1rem;
    min-height: 450px;
  }
}

@media (min-width: 900px) {
  .card-client {
    flex: 1 1 calc(33.33% - 2rem);
    max-width: calc(33.33% - 2rem);
    min-height: 500px;
  }
}

@media (min-width: 1200px) {
  .card-client {
    flex: 1 1 calc(25% - 2rem);
    max-width: calc(25% - 2rem);
  }
}

.wrap {
  width: 100%;
  max-width: 200px;
}

a {
  text-decoration: none;
  line-height: 40px;
  color: black;
  transition: color 0.3s ease-in-out;
}

a:hover {
  color: var(--white-anti-flash-color);
}

.btn-6 {
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 40px;
  text-transform: uppercase;
  border: 1px solid currentColor;
  color: var(--gray-color);
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
}

.btn-6 span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: var(--gray-color);
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.btn-6:hover {
  color: var(--white-anti-flash-color);
}

.btn-6:hover span {
  width: 225%;
  height: 562.5px;
}

.btn-6:active {
  background-color: var(--white-anti-flash-color);
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
