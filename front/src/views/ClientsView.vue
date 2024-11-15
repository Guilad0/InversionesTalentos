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
      <h1 class="text-center fs-3 pt-5">Marketplace</h1>
      <p class="mt-5 fw-bold fs-5">Players</p>
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <div class="position-relative">
            <input type="text" v-model="name" @input="handleName" class="form-control focus-ring focus-ring-secondary"
              placeholder="Buscar por nombre" />
            <div class="custom-absolute">
              <img src="../assets/svg/search-svgrepo-com.svg" alt="Descripción del SVG" width="25" />
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
        <div class="dropdown">
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
        <div class="d-none d-sm-block">
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
  cursor: not-allowed;
  opacity: 0.5;
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

li {
  cursor: pointer !important;
}

</style>
