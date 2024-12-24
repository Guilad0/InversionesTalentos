<template>
  <main class="bg-light">
    <div class="content">
      <h4 class="d-block text-start mb-2 text-center title">Reversión</h4>
      <div class="table-container">
        <table class="table overflow-x-scroll">
          <thead>
            <tr class="table-secondary">
              <th class="td-custom align-middle custom-size text-start">Cliente</th>
              <th class="td-custom custom-size">Monto Recaudado</th>
              <th class="td-custom align-middle custom-size">Inversores</th>
            </tr>
          </thead>
          <tbody v-if="Object.keys(inversionesPorCliente).length">
            <tr v-for="(cliente, clienteIndex) in Object.keys(inversionesPorCliente)" :key="clienteIndex">
              <td class="text-start fw-bold">
                {{ clienteIndex + 1 }}. {{ cliente }}
              </td>
              <td class="text-center align-middle fw-bold">
                {{ calcularMontoRecaudado(inversionesPorCliente[cliente]).toLocaleString(undefined, {
                  minimumFractionDigits: 2, maximumFractionDigits: 2
                }) }}
              </td>
              <td class="text-center align-middle">
                <button class="btn btn-primary btn-sm" @click="abrirModal(cliente, inversionesPorCliente[cliente])">
                  Ver Inversores
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="3" class="text-center text-muted py-3">
                No hay datos disponibles para mostrar.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal Component -->
      <InversoresModal v-if="mostrarModal" :cliente="clienteActual" :inversiones="inversionesModal"
        @cerrar="cerrarModal" />
      <!-- Pagination -->
      <div class="footer">
        <div class="d-flex justify-content-center">
          <nav v-if="paginacion.total > 0" aria-label="Page navigation example">
            <ul class="pagination">
              <li v-if="!paginacion.previous" class="page-item disabled">
                <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
              </li>
              <li v-else class="page-item">
                <button @click="obtenerDatos(paginacion.previous)"
                  class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
              </li>
              <li v-for="page in paginacion.pages" :key="page" class="page-item"
                :class="paginacion.current === page ? 'active' : ''">
                <button @click="obtenerDatos(page)"
                  class="page-link bg-light mx-2 color-gray fw-bolder rounded-5 border border-3">
                  {{ page }}
                </button>
              </li>
              <li v-if="!paginacion.next" class="page-item disabled">
                <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </li>
              <li v-else class="page-item">
                <button @click="obtenerDatos(paginacion.next)"
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
import { getHeaderRequest } from "@/helpers/Authenticator";

const inversionesPorCliente = ref({});
const inversionesModal = ref([]);
const clienteActual = ref("");
const mostrarModal = ref(false);
const paginacion = ref({});
const BaseURL = import.meta.env.VITE_BASE_URL + "/reporteReversion";
const header = getHeaderRequest();

onMounted(async () => {
  await obtenerDatos();
});

const obtenerDatos = async (page = 1) => {
  try {
    const { data } = await axios.get(`${BaseURL}?page=${page}`, header);
    console.log(data);
    // Asegúrate de que cada cliente tiene una clave 'inversiones'
    Object.keys(data.inversionesPorCliente).forEach(cliente => {
      if (!Array.isArray(data.inversionesPorCliente[cliente])) {
        data.inversionesPorCliente[cliente] = [];
      }
    });
    inversionesPorCliente.value = data.inversionesPorCliente;
    paginacion.value = data.paginacion;
  } catch (error) {
    console.error(error);
  }
};

const calcularMontoRecaudado = (inversiones) => {
  if (!Array.isArray(inversiones)) {
    return 0; // Si no es un array, retorna 0
  }
  return inversiones.reduce((total, inversion) => {
    const monto = parseFloat(inversion.monto);
    return total + (isNaN(monto) ? 0 : monto); // Sumar solo si el monto es un número válido
  }, 0);
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

.footer {
  margin-top: 1rem;
}

.pagination {
  margin-top: 1rem;
  z-index: 1;
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
</style>
