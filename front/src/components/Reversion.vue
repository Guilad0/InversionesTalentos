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
const inversionesModal = ref([]);
const clienteActual = ref("");
const mostrarModal = ref(false);
const paginacion = ref({});
const BaseURL = import.meta.env.VITE_BASE_URL + "/reporteReversion";

onMounted( async () => {
await obtenerDatos();
modalRef.value = document.getElementById('staticBackdrop');
});

const closeModal = () =>{
  cleanFields()
}

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