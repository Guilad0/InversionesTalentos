<script setup>
import useFetchData from '../helpers/UseFetchData'
import CardClient from '../components/CardClient.vue'
import { ref, onMounted } from 'vue';
import { orderByName,orderByEdad,orderByPrice } from '@/helpers/utilities';

const { results: categories, getData: getCategories } = useFetchData(ref('/categories'));
const activeCategory = ref(null);
const path = ref('/users/clients/all')
const { results: clients, getData: getClients } = useFetchData(path);
const findByname = (categoryId) => {
    activeCategory.value = categoryId;
    path.value = '/users/clients/findBy/' + categoryId;
    getClients()
};

const getAll = () => {
    activeCategory.value = null;
    path.value = '/users/clients/all';
    getClients()
}
const orderBy = ( order )=>{
    if( order == 'nombre' ){
        clients.value = orderByName(clients.value)
        return
    }
    if( order == 'edad' ){
        clients.value = orderByEdad(clients.value)
        return;
    }
    if( order == 'precio' ){
        clients.value = orderByPrice(clients.value)
        return;
    }
    
}

onMounted(() => {
    getCategories();
    getClients();
    
});
console.log(clients);

</script>
<template>
    <main class="min-vh-100">
        <div class="container">
            <h1 class="text-center  fs-3 pt-5">Marketplace</h1>
            <p class=" mt-5 fw-bold fs-5">Players</p>
            <div class="d-flex justify-content-between">
                <div class="d-flex">
                    <div class="position-relative">
                        <input type="text" class="form-control" placeholder="Buscar por nombre">
                        <div class="custom-absolute">
                            <img src="../assets/svg/search-svgrepo-com.svg" alt="Descripción del SVG" width="25">
                        </div>
                    </div>
                    <div>
                        <small class="ms-3">Filtrar por</small>
                        <button @click="getAll()" type="button" class="btn btn-sm mx-1 rounded"
                            :class="{ 'btn-secondary': activeCategory === null, 'btn-ligth active': activeCategory !== null }">All</button>
                        <div class="btn-group" role="group" v-for="cat in categories" :key="cat.categoria_persona_id">
                            <button type="button" class="btn btn-sm mx-1 rounded"
                                :class="{ 'btn-secondary': activeCategory === cat.categoria_persona_id, 'btn-ligth active': activeCategory !== cat.categoria_persona_id }"
                                @click="findByname(cat.categoria_persona_id)">
                                {{ cat.nombre }}
                            </button>
                        </div>
                    </div>
                </div>
                <div  class="dropdown ">
                    <div class="dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <small>Orden por
                            <img src="../assets/svg/menu-order-svgrepo-com.svg" width="15">
                            <ul class="dropdown-menu bg-custom m-0 p-0">
                                <li @click="orderBy('edad')"><a  class="dropdown-item"  >Edad</a></li>
                                <li @click="orderBy('nombre')"><a class="dropdown-item" >Nombre</a></li>
                                <li @click="orderBy('precio')"><a class="dropdown-item" >Precio </a></li>
                            </ul>
                        </small>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-3 ">
            <div class="content ">
                <div class="d-flex flex-wrap justify-content-start ">
                    <CardClient v-for="client in clients" :key="client.usuario_id" :client="client" />
                </div>
            </div>
        </div>

    </main>
</template>
<style scoped>
main {
    width: 100%;
}

.custom-absolute {
    position: absolute;
    right: 10px;
    top: 5px;
}
.content{
    width: 100%;
}

.bg-custom{
    background-color: var(--white-anti-flash-color);
    opacity: 0.9;
}
main{
    background-color: var(--dun-color);
   
}
.dropdown-item:hover{
    background-color: var(--gray-color);
    color:var(--white-anti-flash-color)
}
</style>