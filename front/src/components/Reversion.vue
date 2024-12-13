<template>
  <main class="bg-light">
    <div  class="content">
      <h4 class="d-block text-start mb-2 text-center title">Reversion</h4>
      <div class="d-flex justify-content-between  mt-2 mb-3">
      </div>
      <div class="table-container" >
        <table class="table overflow-x-scroll">
          <thead>
            <tr class="table-secondary">
              <th class="td-custom align-middle custom-size">Cliente</th>
              <th class="td-custom custom-size">Monto Recaudado</th>  
              <th class="td-custom align-middle custom-size">Monto</th>
              <th class="td-custom align-middle custom-size">Fecha Deposito</th>
              <th class="td-custom align-middle custom-size">Inversor</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(cliente, clienteIndex) in Object.keys(inversionesPorCliente)" :key="clienteIndex">
              <!-- Fila principal para el cliente -->
              <tr class="bg-secondary text-white">
                <td class="text-start fw-bold">
                  {{ clienteIndex + 1 }}. {{ cliente }}
                </td>
                <td class="text-center align-middle fw-bold">
                  ${{ calcularMontoRecaudado(inversionesPorCliente[cliente].inversiones).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                </td>
                <td colspan="6"></td>
              </tr>
              <!-- Filas para las inversiones del cliente -->
              <tr
                v-for="(inversion, inversionIndex) in inversionesPorCliente[cliente].inversiones"
                :key="inversionIndex"
              >
                <td class="text-center align-middle">{{ cliente }}</td>
                <td class="text-center align-middle"></td>
                <td class="text-center align-middle">${{ inversion.monto }}</td>
                <td class="text-center align-middle">{{ new Date(inversion.fecha_deposito).toLocaleDateString()  }}</td>
                <td class="text-center align-middle">{{ inversion.inversor_nombre }} {{ inversion.inversor_apellido }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="footer">
      <div class="d-flex justify-content-center">
          <nav v-if="paginacion.total > 0" aria-label="Page navigation example">
            <!-- Los botones de paginación se mantienen, pero se asegura que pase el filtro -->
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
              <li v-for="page in paginacion.pages" :key="page" class="page-item"
                :class="paginacion.current === page ? 'active' : ''">
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
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const inversionesPorCliente = ref([]);
const paginacion = ref({});
// let BaseURL = "https://apitalentos.pruebasdeploy.online/reporteReversion";
let BaseURL = import.meta.env.VITE_BASE_URL + "/reporteReversion";

onMounted( async () => {
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
    console.log(error);
  }
};

const calcularMontoRecaudado = (inversiones) => {
  return inversiones.reduce((total, inversion) => total + parseFloat(inversion.monto || 0), 0);
};

</script>
<style scoped>
.custom-size {
font-size: 0.8rem;
font-weight: 630;
}

.footer {
  height: 10vh;
}

main {
  height: 90vh;
}

td {
  font-size: 0.9rem;
}

.eye {
  cursor: pointer;
}

.btn:hover {
  background-color: rgba(136, 136, 136, 0.76) !important;
}

.custom-abs-search{
    position: absolute;
    right: 0;
}

.table-container {
max-height: 60vh;
overflow-y: auto;
margin-bottom: 1rem;
}

.table {
width: 100%;
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
</style>
