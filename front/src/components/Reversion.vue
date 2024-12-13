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
              <th class="td-custom align-middle custom-size">Inversion Id</th>
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
                <td class="text-center align-middle">{{ inversion.inversion_id }}</td>
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
      <!-- <Pagination
        :page="page"
        :prev="prev"
        :next="next"
        myRol="usuario"
        :isLoading="isLoading"
        @nextAction="nextAction"
        @prevAction="prevAction"
        :total="total"
      /> -->
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { errorAlert, successAlert } from "@/helpers/iziToast";
const modalRef = ref('')
const inversionesPorCliente = ref([]);
const paginacion = ref({});
// let BaseURL = "https://apitalentos.pruebasdeploy.online/reporteReversion";
let BaseURL = import.meta.env.VITE_BASE_URL + "/reporteReversion";

onMounted( async () => {
await obtenerDatos();
modalRef.value = document.getElementById('staticBackdrop');
});

const closeModal = () =>{
  cleanFields()
}

const obtenerDatos = async () => {
  try {
    const { data } = await axios.get(`${BaseURL}/`);
    console.log(data);
    inversionesPorCliente.value = data.inversionesPorCliente;
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

</style>
