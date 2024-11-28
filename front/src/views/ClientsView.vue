<script setup>
import { ref, computed, onMounted } from "vue";
import useFetchData from "../helpers/UseFetchData";
import CardClient from "../components/CardClient.vue";
import CardSm from "@/components/CardSm.vue";
import FilterClients from "@/components/FilterClients.vue";
import FilterClientsSm from "@/components/FilterClientsSm.vue";
import PlaceholderCards from "@/components/placeholder/PlaceholderCards.vue";
import Unete from "@/components/Unete.vue";
import { orderByName, orderByEdad, orderByPrice, getUser } from "@/helpers/utilities";

const { results: categories, getData: getCategories } = useFetchData(ref("/categories"));
const activeCategory = ref(null);
const path = ref("/clients");
const { results: clients, getData: getClients, isLoading } = useFetchData(path);
const name = ref("");
const user = ref(null);

// Variables de paginación
const currentPage = ref(1);
const itemsPerPage = ref(10); // Número de clientes por página

// Computed para la lista de clientes paginada
const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return clients.value.slice(start, end);
});

// Total de páginas
const totalPages = computed(() => Math.ceil(clients.value.length / itemsPerPage.value));

// Funciones para cambiar de página
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const findByname = (categoryId) => {
  activeCategory.value = categoryId;
  path.value = "/clients/findBy/" + categoryId;
  getClients();
  name.value = "";
};

const getAll = () => {
  activeCategory.value = null;
  path.value = "/clients/";
  getClients();
};

const orderBy = (order) => {
  if (order == "nombre") {
    clients.value = orderByName(clients.value);
    return;
  }
  if (order == "edad") {
    clients.value = orderByEdad(clients.value);
    return;
  }
  if (order == "precio") {
    clients.value = orderByPrice(clients.value);
    return;
  }
};
const handleName = () => {
  if (name.value.trim() !== "") {
    activeCategory.value = "undefined";
    path.value = "/clients/filterByName/" + name.value;
  } else {
    name.value = "";
    activeCategory.value = "undefined";
    path.value = "/clients/";
    getClients();
  }
};


onMounted(async () => {
  getCategories();
  getClients();
  user.value = await getUser();

});
</script>
<template>
  <main class="min-vh-100">
    <div class="container">
      <h1 class="text-center titleM pt-5">Marketplace</h1>
      <p class="mt-5 fw-bold fs-5">Profesionales</p>
      <div class="d-flex justify-content-between flex-column flex-md-row">
        <div class="d-flex">
          <div class="position-relative w-75">
            <input type="text" v-model="name" @input="handleName" class=" search_input form-control focus-ring focus-ring-secondary"
              placeholder="Buscar por nombre" />
            
          </div>
          <div class="d-none d-xl-block filter-large">
            <FilterClients :categories="categories" @getAll="getAll" @findByname="findByname"
              :activeCategory="activeCategory" />
          </div>
          <div class="d-block d-xl-none filter-large">
            <FilterClientsSm :categories="categories" @getAll="getAll" @findByname="findByname"
              :activeCategory="activeCategory" />
          </div>
        </div>
        <div class="dropdown mt-md-0">
          <div class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <small>Orden por
              <img src="../assets/svg/menu-order-svgrepo-com.svg" width="15" />
              <ul class="dropdown-menu bg-custom m-0 p-0">
                <li @click="orderBy('edad')">
                  <a class="dropdown-item"><small>Edad</small></a>
                </li>
                <li @click="orderBy('nombre')">
                  <a class="dropdown-item"><small>Nombre</small></a>
                </li>
                <li @click="orderBy('precio')">
                  <a class="dropdown-item"><small>Precio</small> </a>
                </li>
              </ul>
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="content" v-if="clients.length > 0">
        <div class="">
          <div v-if="!isLoading" class="d-flex flex-wrap justify-content-start">
            <CardClient v-for="client in clients" :key="client.usuario_id" :client="client"
              class="animate__animated animate__fadeIn card-client" />
          </div>
          <div v-else class="d-flex flex-wrap justify-content-start">
            <PlaceholderCards v-for="client in 12" :key="client" class="" />
          </div>
        </div>

        <div class="pagination mt-4" v-if="!isLoading">
          <button @click="prevPage" :disabled="currentPage === 1" class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-left"></i></button>
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)" class="page-link bg-light mx-2 color-gray fw-bolder rounded-5 border border-3">
            {{ page }}
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="page-link color-gray fw-bolder rounded-5 border border-3">
            <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    </div>

    <div v-if="user == null || user?.rol == 'Null'">
      <Unete />
    </div>
  </main>
</template>
<style scoped>
.search_input {
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: 25px;
  gap: 10px;
}
.filter-large {
  font-size: 20px;
  padding: 15px;
}

.titleM {
  font-family: var(--font-montserrat-bold);
  font-weight: 700;
  font-size: 30px;
  color: var( --gray-color); 
  text-transform: uppercase;
}
.dropdown-toggle {
  font-size: 18px; 
  padding: 10px 15px; 
  height: auto; 
  border-radius: 8px; 
}

.dropdown-menu {
  font-size: 16px; 
  padding: 10px; 
}

.dropdown-item {
  font-size: 16px; 
  padding: 10px 15px; 
}

main {
  width: 100%;
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
  color: var(--white-anti-flash-color);
}

input:focus {
  border: 1px solid var(--white-anti-flash-color);
}

.card-client {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-client:hover {
  transform: translateY(-10px);
  /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); */
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: pointer !important;
}
.pagination {
  margin-top: 1rem;
}

.pagination .page-item {
  display: inline-block;
}

.pagination .page-item:nth-child(n + 4):nth-last-child(n + 4):not(.active) {
  display: none;
}

.pagination .page-item.active .page-link {
  background-color: #e0e4ff;
  color: #080808;
  font-weight: bold;
  border: 1.5px solid #b0b8ff;
  box-shadow: 0px 0px 6px rgb(3, 3, 3);
  transform: scale(1.05);
}

.active-button {
  font-weight: 500;
  border-bottom: 1px solid var(--gray-color);
  text-decoration: underline !important;
}
.custom-absolute {
  position: absolute;
  top: 50%; 
  transform: translateY(-50%); 
  
  right: 10px; 
  pointer-events: none;
}

</style>
