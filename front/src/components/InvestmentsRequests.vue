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
      <h4 class="d-block my-2 text-center title pt-4">Solicitudes de Inversiones</h4>
      <!--<button @click="tryRevert">Comprobar reversion de solicitudes</button> -->
      <div class="table-responsive col-md-10 offset-md-1">
        <div class="d-flex justify-content-start gap-3 position-relative my-4">
          <div class="card text-bg-secondary mb-3 rounded-5 cursor hover-custom " style="max-width: 18rem"
            @click="filtrarInv('General')">
            <div class="card-header" :class="filtro == 'General' ? 'shadow' : ''">
              <i class="fa-solid fa-list-check"></i> <strong>Total</strong> {{ totalSolicitudes }} &nbsp;
            </div>
          </div>

          <div class="card text-bg-success mb-3 rounded-5 cursor hover-custom" style="max-width: 18rem"
            @click="filtrarInv('Aprobado')">
            <div class="card-header text-white" :class="filtro == 'Aprobado' ? 'shadow' : ''">
              <i class="fa-regular fa-circle-check"></i><strong> Aprobados</strong> {{ solicitudesAprobados }}
              &nbsp;
            </div>
          </div>
          <div class="card text-bg-orange mb-3 rounded-5 cursor hover-custom" style="max-width: 18rem"
            @click="filtrarInv('Pendiente')">
            <div class="card-header text-white" :class="filtro == 'Pendiente' ? 'shadow' : ''">
              <i class="fa-solid fa-triangle-exclamation"></i><strong> Pendientes</strong> {{ solicitudesPendientes }}
              &nbsp;
            </div>
          </div>
          <div class="card text-bg-danger mb-3 rounded-5 cursor hover-custom" style="max-width: 18rem"
            @click="filtrarInv('Rechazado')">
            <div class="card-header text-white" :class="filtro == 'Rechazado' ? 'shadow' : ''">
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
        <div v-if="solicitudes.length > 0" class="table-container">
          <table class="table overflow-x-scroll animate__animated animate__fadeIn">
            <thead>
              <tr class="table-secondary">
                <th class="td-custom align-middle custom-size">ID</th>
                <th class="td-custom align-middle custom-size">Motivo</th>
                <th class="td-custom align-middle custom-size">Descripcion</th>
                <th class="td-custom align-middle custom-size">Periodo de Recaudacion</th>
                <th class="td-custom align-middle custom-size">Periodo de Pagos</th>
                <th class="td-custom align-middle custom-size">Monto $</th>
                <th class="td-custom align-middle custom-size">Cantidad Pago</th>
                <th class="td-custom align-middle custom-size">% Interes</th>
                <th class="td-custom align-middle custom-size">Estado</th>
                <th class="td-custom align-middle custom-size">Aprobar Rechazar</th>
                <!-- <th class="td-custom align-middle custom-size">Finalizar Revertir</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in solicitudes" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.nombre }}</td>
                <td class="text-center align-middle">{{ item.descripcion }}</td>
                <td class="text-center align-middle">{{ new Date(item.fecha_inicio_recaudacion).toLocaleDateString() }}
                  - {{ new Date(item.fecha_fin_recaudacion).toLocaleDateString() }}</td>
                  <td class="text-center align-middle">{{ new Date(item.fecha_inicio_pago).toLocaleDateString() }} - {{
                    new Date(item.fecha_fin_pago).toLocaleDateString() }}</td>
                <td class="text-center align-middle">{{ item.monto }}</td>
                <td class="text-center align-middle">{{ item.cantidad_pagos }}</td>
                <td class="text-center align-middle">{{ item.porcentaje_interes }}</td>
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
                  <span v-if="item.aprobado == 'Inicial'" class="badge text-bg-secondary text-light">{{
                    item.aprobado
                  }}</span>
                </td>
                <td class="text-center align-middle">
                  <div v-if="item.aprobado == 'Inicial'" class="d-flex justify-content-center">
                    <button class="border-0 m-auto hover-button  mx-1"
                      @click="procesarSolicitud(item.id, 'Pendiente', item.monto, item.nombre, item.cliente_id,item.porcentaje_interes)">
                      <i class="fa-regular fa-circle-check text-success cursor"></i>

                    </button>
                    <button class="border-0 m-auto hover-button  mx-1" @click="procesarSolicitud(item.id, 'Rechazado')">
                      <i class="fa-solid fa-ban text-danger"></i>
                    </button>
                  </div>
                  <i v-if="item.aprobado == 'Aprobado' && currentDate >= new Date(item.fecha_inicio_recaudacion)" class="fa-solid fa-eye text-secondary fs-6 cursor"
                    @click="openModal(item)"></i>
                  <label v-if="item.aprobado == 'Rechazado'">Sin acciones</label>
                </td>


                <!-- <td class="text-center align-middle ">
                  <span v-if="item.estado_inversion == 'Finalizado'" class="badge bg-success text-light"
                    @click="openModal(item)">Finalizado</span>
                  <label v-if="item.estado_inversion == 'Reversion'" class="badge bg-danger text-light"
                    @click="openModal(item)">Revertido</label>
                  <div v-if="item.estado_inversion == 'Proceso'">
                    <button class="border-0 m-auto hover-button  mx-1" @click="procesarInversion(item.id, 'Finalizado')">
                      <i class="fa-regular fa-circle-check text-success "></i>

                    </button>
                    <button class="border-0 m-auto hover-button  mx-1" @click="procesarInversion(item.id, 'Reversion')">
                      <i class="fa-solid fa-ban text-danger"></i>
                    </button>
                  </div>
                </td> -->
              </tr>
            </tbody>
          </table>
          <label class="pb-3">
          <strong>Nota:</strong> Las solicitudes en estado inicial serán aprobadas automáticamente dentro de un plazo máximo de 72 horas.</label>
          <!-- Modal Aprobar Inv -->
          <div class="modal fade" id="aprobarInv" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5 m-auto" id="staticBackdropLabel"> Aprobar inversion </h1>
                </div>
                <div class="modal-body">
                  <p class="text-justify px-2">
                    {{ msgAprobacion }}
                  </p>

                  <div class="d-flex gap-2 flex-wrap justify-content-center">
                    <div class="col-5">
                     Cantidad minima de inversion
                    </div>
                    <div class="col-5">
                      <input type="number" v-model="minInv" class="form-control montoInvCustom"
                        placeholder="Monto minimo de inversion">
                    </div>
                    <div class="col-5">
                      <label for="porcentaje_interes" class="my-2" >Interes de la solicitud %</label>

                    </div>
                    <div class="col-5">
                      <input type="number" id="porcentaje_interes"  class="form-control mb-2 montoInvCustom" v-model="porcentaje_interes">

                    </div>
                 
                  </div>
                  <div class="col px-5 row">
                  </div>
                  <p class="mt-2 mb-1 text-justify px-2">Cantida final con el interes actual
                     {{ montoFinal }} <strong>$</strong> equivalente a {{ ((montoFinal*(porcentaje_interes/100))+montoFinal)*ajustes.valor_token }} <strong>{{ ajustes.tipo_moneda }}</strong> <br>
                    Los parámetros establecidos no podrán ser modificados durante
                    el proceso de recaudación.
                   </p>
                </div>
                <div class="modal-footer d-flex justify-content-center  ">
                  <button type="button" class="rounded-3 btn-gray btn border" data-bs-dismiss="modal"
                    @click="closeModal">Cancelar</button>
                  <button :disabled="loading" type="button" class="rounded-3 btn-gray btn border"
                    @click="aprobar">Aprobar</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal rechazo solicitud -->
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5 m-auto" id="staticBackdropLabel"> Rechazar inversion</h1>
                </div>
                <div class="modal-body">
                  <label for="obs" class="mb-3">Por favor, indique el motivo del rechazo de la inversion para que sea
                    enviado al solicitante.</label>
                  <textarea id="obs" v-model="observaciones" class="form-control mb-3" placeholder=""></textarea>

                </div>
                <div class="modal-footer d-flex justify-content-center  ">
                  <button type="button" class="rounded-3 btn-gray btn border" data-bs-dismiss="modal"
                    @click="closeModal">Cancelar</button>
                  <button :disabled="loading" type="button" class="rounded-3 btn-gray btn border"
                    @click="rechazar">Enviar</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal revertir -->
          <div class="modal fade" id="revertirInv" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5 m-auto" id="staticBackdropLabel"> Revertir Inversion</h1>
                </div>
                <div class="modal-body">
                  <label for="obs" class="mb-3">Por favor, indique el motivo de la reversion de la inversion para
                    notificar a los inversores.</label>
                  <textarea id="obs" v-model="observaciones" class="form-control mb-3" placeholder=""></textarea>

                </div>
                <div class="modal-footer d-flex justify-content-center  ">
                  <button :disabled="loadingRev" type="button" class="rounded-3 btn-gray btn border" data-bs-dismiss="modal"
                    @click="closeModal">Cancelar</button>
                  <button :disabled="loadingRev" type="button" class="rounded-3 btn-gray btn border" @click="revertir">Enviar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div v-else class="animate__animated animate__fadeIn mt-2 ">
        <div class="alert alert-orange-custom text-center rounded-3" role="alert">
          <h4 class="alert-heading ">No se encontraron resultados</h4>
          <p> Intenta ajustar los filtros.</p>

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
    <ModalEstadoInversiones :inversionSeleccionada="inversionSeleccionada" />
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import ModalEstadoInversiones from './ModalEstadoInversiones.vue'
import axios from "axios";
import { errorAlert, successAlert } from "@/helpers/iziToast";

let BaseURL = import.meta.env.VITE_BASE_URL + "/solicitudesInversion";
const modalRef = ref('')
const modalRefEstadoInv = ref('')
const modalRefRevertir = ref('')
const modalAprobarInv = ref('')
const solicitudes = ref([]);
const paginacion = ref({});
const minInv = ref(1);
const maxInv = ref(0);
const currentNav = ref("General");
const totalSolicitudes = ref(0);
const solicitudesPendientes = ref(0);
const solicitudesAprobados = ref(0);
const solicitudesRechazados = ref(0);
const observaciones = ref('');
const msgAprobacion = ref('');
const idClient = ref(null)
const loadingTabla = ref(false) 
const porcentaje_interes = ref(0)
const idInv = ref('');
const actInv = ref('');
const loading = ref(false);
const loadingRev = ref(false);
const ajustes = ref({});
const currentDate = ref(new Date)
const baseUrlAjustes = import.meta.env.VITE_BASE_URL;

onMounted(async () => {
  loadingTabla.value = true
  await obtenerDatos();
  await obtenerTotales();
  await getAjustes();
  modalRef.value = document.getElementById('staticBackdrop');
  modalRefEstadoInv.value = document.getElementById('modalEstadoInversion');
  modalRefRevertir.value = document.getElementById('revertirInv');
  modalAprobarInv.value = document.getElementById('aprobarInv');
  loadingTabla.value = false
});

const tryRevert = async ()  => {
  try {
    // reporteSolicitudesInversion
    const response = await axios.get(import.meta.env.VITE_BASE_URL+'/reporteSolicitudesInversion/tryRevert');
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}

const getAjustes = async () => {
  try {
    const { data } = await axios.get(baseUrlAjustes + '/ajustes/ajustesTokens')
    ajustes.value = data.results;
    console.log(ajsutes.value);
  } catch (error) {

  }
}

const procesarInversion = async (idInversion, action) => {
  if (action == 'Finalizado') {
    const band = confirm( '¿Finalizar la inversion con el ID ' + idInversion+' ?' )
    if( band == true ){
      try {
      await axios.put(BaseURL + '/finalizarInversion/' + idInversion);
      await obtenerDatos(paginacion.value.current, "", "");
      await obtenerTotales();
    } catch (error) {
      console.log(error);
    }
    }
    
  } else {
    idInv.value = idInversion;
    const modal = new bootstrap.Modal(modalRefRevertir.value);
    modal.show();
  }
}

const closeModal = () => {
  cleanFields()
}

const inversionSeleccionada = ref({})
const openModal = (inv) => {
  const modalInv = new bootstrap.Modal(modalRefEstadoInv.value);
  modalInv.show();
  inversionSeleccionada.value = inv;
}

const filtrarInv = async (tipoInversion) => {
  filtro.value = tipoInversion;
  paginacion.value.current = 1;
  console.log(paginacion.value.current);
  await obtenerDatos(paginacion.value.current, "", "");

}

const cleanFields = () => {
  observaciones.value = '';
  idInv.value = '';
  actInv.value = '';
  minInv.value = 0;
  maxInv.value = 0;
  porcentaje_interes.value = 0
}
const montoFinal = ref(0)
const filtro = ref('General')
const obtenerDatos = async (page = 1, search = "") => {
  try {
    let url = `${BaseURL}?page=${page}&filtro=${filtro.value}`;
    const { data } = await axios.get(url);
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
    console.log('Totalessssssssssssssssssssssssss',data.results);
    console.log('Totalessssssssssssssssssssssssss',data.results[0]);
    totalSolicitudes.value = data.results[0]?.total || 0
    solicitudesPendientes.value = data.results[0]?.Pendiente || 0
    solicitudesAprobados.value = data.results[0]?.Aprobado || 0
    solicitudesRechazados.value = data.results[0]?.Rechazado || 0

  } catch (error) {
    console.log("Error al obtener totales:", error);
  }
};

const procesarSolicitud = async (id, action, monto, nombreUser, userId,interes) => {
  if (action == 'Pendiente') {
    montoFinal.value += Number(monto) 
    porcentaje_interes.value = interes
    observaciones.value = '';
    idClient.value = userId;
    const valorTokens = monto * ajustes.value.valor_token;
    idInv.value = id;
    actInv.value = action;
    msgAprobacion.value = `La inversion con el identificador ${id} referente a  ${nombreUser}, con un monto a requerir de ${parseInt(monto)}$
    equivalente a ${valorTokens}${ajustes.value.tipo_moneda}, sera aprobado despues de configurar los parametros de inversion.`;
    const modal = new bootstrap.Modal(modalAprobarInv.value);
    modal.show();
  } else {
    idInv.value = id;
    actInv.value = action;
    const modal = new bootstrap.Modal(modalRef.value);
    modal.show();
  }
};

const rechazar = async () => {
  if (observaciones.value.trim() == '') {
    errorAlert('El campo es requerido', 'error')
    return
  }
  try {
    loading.value = true
    await axios.put(BaseURL + "/aprobar/" + idInv.value + '?action=' + actInv.value + '&observaciones=' + observaciones.value);
    await obtenerDatos(paginacion.value.current, "", "");
    await obtenerTotales();
    var modal = bootstrap.Modal.getInstance(modalRef.value) || new bootstrap.Modal(modalRef.value);
    console.log(modal);
    modal.hide()
    successAlert('La inversion fue rechazada', 'Solicitud finalizada')

  } catch (error) {
    errorAlert('Error al rechazar solicitud', 'Error')
  } finally {
    cleanFields()
    loading.value = false
  }
};


const aprobar = async () => {
  if (minInv.value < 0) {
    errorAlert('La cantidad minima de inversion no pouede ser menor a cero', 'Error')
    return
  }
  if (porcentaje_interes.value > 100 || porcentaje_interes.value < 0) {
    errorAlert('El porcentaje debe estar entre 0 a 100%', 'Error')
    return
  }
  try {
    await axios.put(BaseURL + "/aprobar/" + idInv.value + '?action=' + actInv.value + '&observaciones=' + observaciones.value + `&idCliente=${idClient.value}&minInv=${minInv.value}&porcentaje_interes=${porcentaje_interes.value}`);
    console.log('paginacionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',paginacion.value.current);
    await obtenerDatos(paginacion.value.current, "", "");
    await obtenerTotales();
    var modal = bootstrap.Modal.getInstance(modalAprobarInv.value) || new bootstrap.Modal(modalAprobarInv.value);
    modal.hide()
    successAlert('La inversion aprobada con exito', 'Solicitud finalizada')
  } catch (error) {
    console.log(error);
    errorAlert('Error al procesar la solicitud', 'Error')
  }finally{
    cleanFields();
  }
}

const revertir =async () =>{
    if( observaciones.value.trim() ==''  ){
      errorAlert('El campo es requerido','Error');
      return
    }
    loadingRev.value = true;
    try {
    await axios.put(BaseURL + "/revertirInversion/" + idInv.value  +'?observaciones=' + observaciones.value);
     await obtenerDatos(paginacion.value.current, "", "");
     await obtenerTotales();
      var modal = bootstrap.Modal.getInstance(modalRefRevertir.value) || new bootstrap.Modal(modalRefRevertir.value);
      modal.hide()
      successAlert('La inversion revertida', 'Solicitud finalizada')
    } catch (error) {
      errorAlert('Error al revertir la operacion', 'Solicitud finalizadafallida')
      
    }finally{
      loadingRev.value = false;
      cleanFields()
    }
}

</script>

<style scoped>

.alert-orange-custom {
  background-color: var(--yellow-orange);
  color: white;
}

.montoInvCustom {
  

  font-size: 0.7rem;
}

.text-justify {
  text-align: justify !important;
}

.font-custom {
  font-size: 0.8rem;
}

.title {
  font-family: var(--font-montserrat-bold);
  font-weight: 700;
  font-size: 30px;
  color: var(--gray-color);
  text-transform: uppercase;
}

.hover-custom:hover {
  opacity: 0.8;
  transition: all 0.5s ease !important;
}

.hover-custom {
  opacity: 1;

}

textarea::placeholder {
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



.custom-abs-search {
  position: absolute;
  right: 0;
}
</style>
