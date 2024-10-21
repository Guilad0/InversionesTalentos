<script setup>
import useFetchData from '../helpers/UseFetchData'
import CardClient from '../components/CardClient.vue'
import { ref, onMounted } from 'vue';
import { orderByName, orderByEdad, orderByPrice } from '@/helpers/utilities';
import CardSm from '@/components/CardSm.vue';
import FilterClients from '@/components/FilterClients.vue';
import FilterClientsSm from '@/components/FilterClientsSm.vue';

const { results: categories, getData: getCategories } = useFetchData(ref('/categories'));
const activeCategory = ref(null);
const path = ref('/users/clients/all')
const { results: clients, getData: getClients } = useFetchData(path);
const name = ref('')

const findByname = (categoryId) => {
    activeCategory.value = categoryId;
    path.value = '/users/clients/findBy/' + categoryId;
    getClients();
    name.value = '';
};

const getAll = () => {
    activeCategory.value = null;
    path.value = '/users/clients/all';
    getClients()
}
const orderBy = (order) => {
    if (order == 'nombre') {
        clients.value = orderByName(clients.value)
        return
    }
    if (order == 'edad') {
        clients.value = orderByEdad(clients.value)
        return;
    }
    if (order == 'precio') {
        clients.value = orderByPrice(clients.value)
        return;
    }

}
const handleName = () => {
    if (name.value.trim() !== '') {
        activeCategory.value = 'undefined';
        path.value = '/users/clients/filterByName/' + name.value;
    } else {
        name.value = ''
    }

}

onMounted(() => {
    getCategories();
    getClients();

});

</script>
<template>
    <main class="min-vh-100">
        <div class="container">
            <h1 class="text-center  fs-3 pt-5">Marketplace</h1>
            <p class=" mt-5 fw-bold fs-5">Players</p>
            <div class="d-flex justify-content-between">
                <div class="d-flex">
                    <div class="position-relative">
                        <input type="text" v-model="name" @input="handleName"
                            class="form-control focus-ring focus-ring-secondary " placeholder="Buscar por nombre">
                        <div class="custom-absolute">
                            <img src="../assets/svg/search-svgrepo-com.svg" alt="Descripción del SVG" width="25">
                        </div>
                    </div>
                    <div class="d-none d-xl-block">
                        <FilterClients :categories="categories" @getAll="getAll" @findByname="findByname"
                            :activeCategory="activeCategory" />
                    </div>
                    <div class="d-block d-xl-none">
                        <FilterClientsSm :categories="categories" @getAll="getAll" @findByname="findByname"
                            :activeCategory="activeCategory" />
                    </div>
                </div>
                <div class="dropdown ">
                    <div class="dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <small>Orden por
                            <img src="../assets/svg/menu-order-svgrepo-com.svg" width="15">
                            <ul class="dropdown-menu bg-custom m-0 p-0">
                                <li @click="orderBy('edad')"><a class="dropdown-item"><small>Edad</small></a></li>
                                <li @click="orderBy('nombre')"><a class="dropdown-item"><small>Nombre</small></a></li>
                                <li @click="orderBy('precio')"><a class="dropdown-item"><small>Precio</small> </a></li>
                            </ul>
                        </small>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-3 ">
            <div class="content" v-if="clients.length > 0">
                <div class="d-none d-sm-block">
                    <div class="d-flex flex-wrap justify-content-start">
                        <CardClient v-for="client in clients" :key="client.usuario_id" :client="client" />
                    </div>
                </div>

                <div class="d-block d-sm-none">
                    <CardSm v-for="client in clients" :key="client.usuario_id" :client="client" />

                </div>
            </div>
            <div class="content mt-4 rounded-2 shadow" v-if="clients.length == 0">
                <div class="alert alert-gray text-center py-3 " role="alert">
                  <img src="../assets/svg/alert-2-svgrepo-com.svg" width="20" > No se encontraron clientes con el nombre de <strong>{{ name }}</strong>
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

.content {
    width: 100%;
}

.bg-custom {
    background-color: var(--white-anti-flash-color);
    opacity: 0.9;
}

.dropdown-item:hover {
    background-color: var(--gray-color);
    color: var(--white-anti-flash-color)
}

input:focus {
    border: 1px solid var(--white-anti-flash-color);
}
</style>