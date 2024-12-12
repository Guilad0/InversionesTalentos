<template>
  <main class="bg-light pt-4 ps-4">
    <div class="d-flex">
      <!-- <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li :class="{ 'active-button': currentNav === 'General' }" @click="setActive('General')"
            class="nav-link mx-2">
            <label>General</label>
          </li>
          <li :class="{ 'active-button': currentNav === 'Pendiente' }" @click="setActive('Pendiente')"
            class="nav-link mx-2">
            <label>Pendientes</label>
          </li>
          <li :class="{ 'active-button': currentNav === 'Aprobado' }" @click="setActive('Aprobado')"
            class="nav-link mx-2">
            <label>Aprobados</label>
          </li>
          <li :class="{ 'active-button': currentNav === 'Rechazado' }" @click="setActive('Rechazado')"
            class="nav-link mx-2">
            <label>Rechazados</label>
          </li>
        </ol>
      </nav> -->
    </div>
    <div class="content">
      <h4 class="d-block mb-2 text-center title">Solicitudes de Inversiones</h4>
      <div class="table-responsive col-md-10 offset-md-1">
        <div class="d-flex justify-content-start gap-3 position-relative my-4">
          <div class="card text-bg-secondary mb-3 rounded-5" style="max-width: 18rem">
            <div class="card-header">
              <i class="fa-solid fa-list-check"></i> <strong>Total</strong> {{ totalSolicitudes }} &nbsp;
            </div>
          </div>
       
          <div class="card text-bg-success mb-3 rounded-5" style="max-width: 18rem">
            <div class="card-header text-white">
              <i class="fa-regular fa-circle-check"></i><strong> Aprobados</strong> {{ solicitudesAprobados }}
              &nbsp;
            </div>
          </div>
          <div class="card text-bg-orange mb-3 rounded-5" style="max-width: 18rem">
            <div class="card-header text-white">
              <i class="fa-solid fa-triangle-exclamation"></i><strong> Pendientes</strong> {{ solicitudesPendientes }}
              &nbsp;
            </div>
          </div>
          <div class="card text-bg-danger mb-3 rounded-5" style="max-width: 18rem">
            <div class="card-header text-white">
              <i class="fa-solid fa-ban"></i> <strong> Rechazados</strong> {{ solicitudesRechazados }}
              &nbsp;
            </div>
          </div>
          <div class="custom-abs-search">
            <div class="position-relative">
              <!-- <input name="search" type="text" v-model="search"
                class="form-control border-1 border-secondary border-primary rounded-5 float" placeholder="Buscar ..."
                @input="obtenerDatos(1, search)" /> -->
            </div>
          </div>
        </div>
        <div class="table-container">
          <table class="table overflow-x-scroll">
            <thead>
              <tr class="table-secondary">
                <th class="td-custom align-middle custom-size">ID</th>
                <th class="td-custom align-middle custom-size">Nombre Usuario</th>
                <th class="td-custom align-middle custom-size">Descripcion</th>
                <th class="td-custom align-middle custom-size">Fecha Inicio Recaudacion</th>
                <th class="td-custom align-middle custom-size">Fecha Fin Recaudacion</th>
                <th class="td-custom align-middle custom-size">Monto USD</th>
                <th class="td-custom align-middle custom-size">Cantidad Pago</th>
                <th class="td-custom align-middle custom-size">Fecha Inicio Pago</th>
                <th class="td-custom align-middle custom-size">Fecha Fin Pago</th>
                <th class="td-custom align-middle custom-size">Estado</th>
                <th v-if="currentNav !== 'Aprobado'" class="td-custom align-middle custom-size">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in solicitudes" :key="item.id">
                <td>{{ item.id}}</td>
                <td>{{ item.nombre }}</td>
                <td class="text-center align-middle">{{ item.descripcion }}</td>
                <td class="text-center align-middle">{{ new Date(item.fecha_inicio_recaudacion).toLocaleDateString() }}</td>
                <td class="text-center align-middle">{{ new Date(item.fecha_fin_recaudacion).toLocaleDateString() }}</td>
                <td class="text-center align-middle">{{ item.monto }}</td>
                <td class="text-center align-middle">{{ item.cantidad_pagos }}</td>
                <td class="text-center align-middle">{{ new Date(item.fecha_inicio_pago).toLocaleDateString() }}</td>
                <td class="text-center align-middle">{{ new Date(item.fecha_fin_pago).toLocaleDateString() }}</td>
                <td class="text-center align-middle">
                  <span v-if="item.aprobado == 'Pendiente'" class="badge text-bg-warning text-dark ">{{
                    item.aprobado
                  }}</span>
                  <span v-if="item.aprobado == 'Aprobado'" class="badge text-bg-success text-light ">{{
                    item.aprobado
                  }}</span>
                  <span v-if="item.aprobado == 'Rechazado'" class="badge text-bg-danger text-light">{{
                    item.aprobado
                  }}</span>
                </td>
                <td v-if="item.aprobado == 'Pendiente'" class="text-center align-middle">
                  <div class="d-flex">
                    <button class="border-0 m-auto hover-button  mx-1" @click="procesarSolicitud(item.id,'Aprobado')">
                      <i class="fa-regular fa-circle-check text-success "></i>

                    </button>
                    <button class="border-0 m-auto hover-button  mx-1" @click="procesarSolicitud(item.id,'Rechazado')">
                      <i class="fa-solid fa-ban text-danger"></i>
                    </button>
                  </div>
                </td>
                <td v-if="item.aprobado == 'Aprobado'" class="text-center align-middle font-custom">
                  <!-- Botones específicos para el estado Aprobado -->
                  Sin acciones
                </td>
                <td v-if="item.aprobado == 'Rechazado'" class="text-center align-middle font-custom">
                  <!-- <div class="d-flex">
                    <button class="btn btn-warning btn-sm mx-1" @click="pendiente(item.id)">
                    <i class="fa fa-clock"></i>
                  </button>
                  <button class="btn bg-white text-danger color-danger border-danger btn-sm mx-1"
                    @click="eliminado(item.id)">
                    <i class="fa fa-trash"></i>
                  </button>
                  </div> -->
                  Sin acciones
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Modal rechazo solicitud -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5 m-auto" id="staticBackdropLabel"> Rechazar inversion</h1>
                  </div>
                  <div class="modal-body">
                    <label for="obs" class="mb-3">Por favor, indique el motivo del rechazo de la inversion para que sea enviado al solicitante.</label>
                  <textarea id="obs" v-model="observaciones" class="form-control mb-3" placeholder=""></textarea>

                  <div class="modal-footer d-flex justify-content-center mt-3 pb-0">
                    <button :disabled="loading" type="button" class="rounded-3 btn-gray border-1 border" data-bs-dismiss="modal" @click="closeModal">Cancelar</button>
                    <button :disabled="loading" type="button" class="rounded-3 btn-gray border-1 border" @click="rechazar">Enviar</button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <!-- paginacion -->
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
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { errorAlert, successAlert } from "@/helpers/iziToast";
const modalRef = ref('')
const solicitudes = ref([]);
const paginacion = ref({});
// let BaseURL = "https://apitalentos.pruebasdeploy.online/solicitudes";
let BaseURL = import.meta.env.VITE_BASE_URL + "/solicitudesInversion";
const currentNav = ref("General");
const totalSolicitudes = ref(0);
const solicitudesPendientes = ref(0);
const solicitudesAprobados = ref(0);
const solicitudesRechazados = ref(0);
const observaciones = ref('');

onMounted( async () => {
await obtenerDatos();
await obtenerTotales();
modalRef.value = document.getElementById('staticBackdrop');
});

// const setActive = (estado) => {
// currentNav.value = estado; onMounted(() => {
//   obtenerDatos(); // Carga los datos iniciales de solicitudes
//   obtenerTotales(); // Carga los totales iniciales
// });

// obtenerDatos(1, "", estado);
// };

const closeModal = () =>{
  cleanFields()
}
const cleanFields = () =>{
  observaciones.value = '';
  idInv.value = '';
  actInv.value = ''
}
const obtenerDatos = async (page = 1, search = "", filtro = "") => {
try {
  let url = `${BaseURL}?page=${page}`;
  if (filtro && filtro !== "General") {
    url += `&estado=${filtro}`;
  }

  const { data } = await axios.get(url);
  totalSolicitudes.value = data.paginacion.total;
  solicitudes.value = data.data;
  console.log(solicitudes.value);
  paginacion.value = data.paginacion;
  console.log(paginacion.value);
} catch (error) {
  console.log(error);
}
};
const obtenerTotales = async () => {
try {
  const { data } = await axios.get(`${BaseURL}/getTotals/totals`);
  console.log(data.results);
  solicitudesPendientes.value = data.results[2].total
  solicitudesAprobados.value = data.results[0].total
  solicitudesRechazados.value = data.results[1].total
  
} catch (error) {
  console.log("Error al obtener totales:", error);
}
};
const idInv = ref('')
const actInv = ref('')
const procesarSolicitud = async (id, action) => {

  
  if( action == 'Aprobado' ){
    observaciones.value = ''
    const band = confirm('Aprobar la inversion con el identificador '+id+' ?');
    if( band ){
      try {
  await axios.patch(BaseURL + "/aprobar/" +id+'?action='+action+'&observaciones='+observaciones.value);
  // Al aprobar, se vuelve a cargar la lista de pendientes
  await obtenerDatos(paginacion.value.current, "", "");
  await obtenerTotales();
} catch (error) {
  console.log(error);
  errorAlert('Error al procesar la solicitud', 'Error')
}
    }
  }else{
    idInv.value = id;
    actInv.value = action;
    const modal = new bootstrap.Modal(modalRef.value);
    modal.show();
  }
};

const loading = ref(false)
const rechazar = async () => {
  if( observaciones.value.trim() == '' ){
      errorAlert('El campo es requerido', 'error')
    return
  }
  try {
      loading.value = true
      await axios.patch(BaseURL + "/aprobar/" +idInv.value+'?action='+actInv.value+'&observaciones='+observaciones.value);
      await obtenerDatos(paginacion.value.current, "", "");
      await obtenerTotales();
      // const modal = new bootstrap.Modal(modalRef.value);
      var modal = bootstrap.Modal.getInstance(modalRef.value) || new bootstrap.Modal(modalRef.value);
      console.log(modal);
      modal.hide()
      successAlert('La inversion fue rechazada', 'Solicitud finalizada')
    
    } catch (error) {
        errorAlert('Error al rechazar solicitud', 'Error')
    }finally{
      cleanFields()
      loading.value = false
    }
};

const pendiente = async (id) => {
try {
  const { data } = await axios.patch(BaseURL + "/pendientes/" + id);
  // Al poner en pendiente, se recarga la lista de rechazados
  obtenerDatos(1, "", "Rechazado");
} catch (error) {
  console.log(error);
}
};

const eliminado = async (id) => {
try {
  const { data } = await axios.delete(BaseURL + "/:id" + id);
  // Al eliminar, recargar la lista de pendientes
  obtenerDatos(1, "", "Pendiente");
} catch (error) {
  console.log(error);
}
};
</script>

<style scoped>
.font-custom{
  font-size: 0.8rem;
}
.title {
font-family: var(--font-montserrat-bold);
font-weight: 700;
font-size: 30px;
color: var(--gray-color);
text-transform: uppercase;
}

textarea::placeholder{
  font-size: 0.9rem;
}

.custom-size {
font-size: 0.8rem;
font-weight: 630;
}

.content {
height: 70vh;
width: 100%;
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

.active-button {
font-weight: 500;
border-bottom: 1px solid var(--gray-color);
text-decoration: underline !important;
}

li {
cursor: pointer !important;
}

label:hover {
font-weight: 500;
}

.custom-abs-search {
position: absolute;
right: 0;
}
</style>
