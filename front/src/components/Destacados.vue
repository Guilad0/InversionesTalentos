<template>
    <main>
        <div class="proposito bg-dark d-flex align-items-center align-content-center">
            <div class="col-3"></div>
            <div class="col-6">
                <h1 class="text-center text-white">Nuestro propósito es ayudar a que todos los profesionales puedan
                    desarrollar su carrera a través del
                    poder de financiamiento de sus fans.
                </h1>
            </div>
            <div class="col-3"></div>
        </div>
        <div>
            <h3 class="py-5 text-center">Destacados</h3>
            <div>
                <div class="d-flex flex-wrap justify-content-center">
                    <CardClient v-for="client in primerosCinco" :key="client.usuario_id" :client="client" />
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center pb-5">
            <div class="wrap">
                <RouterLink to="marketplace" class="btn-6 text-center rounded-3">Ir a marketplace<span></span></RouterLink>
            </div>
        </div>
    </main>

</template>
<script setup>
import useFetchData from '../helpers/UseFetchData'
import { ref, computed } from 'vue';
import CardClient from '../components/CardClient.vue';
import { RouterLink } from 'vue-router';

const path = ref('/clients')
const { results: clients, getData: getClients } = useFetchData(path);

const primerosCinco = computed(() => clients.value.slice(0, 5));
console.log(primerosCinco);

</script>
<style scoped>
.proposito {
    width: 100%;
    height: 30vh;
}

/* *:before,
*:after {
    z-index: -1;
} */
.centerer {
  width: 100%;
  max-width: 600px;
  padding: 0 1rem;
}

a {
    text-decoration: none;
    line-height: 40px;
    color: black;
}

@media (min-width: 600px) {
    .wrap {
        width: 50%;
        float: left;
    }
}

.btn-6 {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    height: 40px;
    max-width: 180px;
    margin: 1rem auto;
    text-transform: uppercase;
    border: 1px solid currentColor;
}

.btn-6 {
    color: var(--gray-color);
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
    color:  var(--white-anti-flash-color);
}

.btn-6:hover span {
    width: 225%;
    height: 562.5px;
}

.btn-6:active {
    background-color: var(--white-anti-flash-color);
}
</style>