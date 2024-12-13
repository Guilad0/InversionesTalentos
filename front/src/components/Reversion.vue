<template>
  <main class="bg-light">
    <div class="content">
      <h4 class="d-block text-start mb-2 text-center title">Reversion</h4>
      <div class="table-container">
        <table class="table overflow-x-scroll">
          <thead>
            <tr class="table-secondary">
              <th class="td-custom align-middle custom-size">Cliente</th>
              <th class="td-custom custom-size">Monto Recaudado</th>
              <th class="td-custom align-middle custom-size">Inversores</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(cliente, clienteIndex) in Object.keys(inversionesPorCliente)" :key="clienteIndex">
              <tr>
                <td class="text-start fw-bold">
                  {{ clienteIndex + 1 }}. {{ cliente }}
                </td>
                <td class="text-center align-middle fw-bold">
                  {{ calcularMontoRecaudado(inversionesPorCliente[cliente].inversiones).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                </td>
                <td class="text-center align-middle">
                  <button 
                    class="btn btn-primary btn-sm" 
                    @click="abrirModal(cliente, inversionesPorCliente[cliente].inversiones)">
                    Ver Inversores
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      
      <!-- Modal Component -->
      <InversoresModal 
        v-if="mostrarModal" 
        :cliente="clienteActual" 
        :inversiones="inversionesModal" 
        @cerrar="cerrarModal" />
      <!-- Pagination -->
      <div class="footer">
        <div class="d-flex justify-content-center">
          <nav v-if="paginacion.total > 0" aria-label="Page navigation example">
            <ul class="pagination">
              <li v-if="paginacion.previous == null" class="page-item disabled">
                <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
              </li>
              <li v-else class="page-item">
                <button @click="obtenerDatos(paginacion.previous, search, currentNav)"
                  class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
              </li>
              <li v-for="page in paginacion.pages" :key="page" class="page-item" :class="paginacion.current === page ? 'active' : ''">
                <button @click="obtenerDatos(page, search, currentNav)"
                  class="page-link bg-light mx-2 color-gray fw-bolder rounded-5 border border-3">
                  {{ page }}
                </button>
              </li>
              <li v-if="paginacion.next == null" class="page-item disabled">
                <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </li>
              <li v-else class="page-item">
                <button @click="obtenerDatos(paginacion.next, search, currentNav)"
                  class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import InversoresModal from "./InversoresModal.vue";

const inversionesPorCliente = ref([]);
const inversionesModal = ref([]);
const clienteActual = ref("");
const mostrarModal = ref(false);
const paginacion = ref({});
const BaseURL = import.meta.env.VITE_BASE_URL + "/reporteReversion";

onMounted(async () => {
  await obtenerDatos();
});

const obtenerDatos = async (page = 1, search = "") => {
  try {
    let url = `${BaseURL}?page=${page}&search=${search}`;
    const { data } = await axios.get(url);
    console.log(data);
    inversionesPorCliente.value = data.inversionesPorCliente;
    paginacion.value = data.paginacion;
  } catch (error) {
    console.error(error);
  }
};

const calcularMontoRecaudado = (inversiones) => {
  return inversiones.reduce((total, inversion) => total + parseFloat(inversion.monto || 0), 0);
};

const abrirModal = (cliente, inversiones) => {
  clienteActual.value = cliente;
  inversionesModal.value = inversiones;
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};
</script>

<style scoped>
.custom-size {
  font-size: 0.8rem;
  font-weight: 630;
}

.table-container {
  max-height: 60vh;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.table {
  width: 100%;
}

</style>