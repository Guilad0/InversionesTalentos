<template>
     <main>
          <div v-if="props.activeTabCli == 0 && props.results[0].estado_inversion == 'Inicial' || props.results[0].estado_inversion == 'Pendiente'">
               <div class="d-flex flex-wrap container">
                    <div class="col">
                         <h3 class="text-center mb-3">
                              Detalles Inversion <br>
                              <label class="fs-6" v-if="props.results[0].estado_inversion == 'Pendiente'">( Proceso de
                                   Recaudacion {{ ((props.results[0].monto - props.results[0].monto_faltante) /
                                        props.results[0].monto * 100).toFixed(2) }}% )</label>
                         </h3>
                         <div class="d-flex justify-content-between ">
                              <div class="col-5">
                                   <strong class="me-2 my-1">Motivo</strong><br> {{ props.results[0].nombre }}<br>
                                   <strong class="me-2 my-1">Descripcion</strong> <br>{{ props.results[0]?.descripcion }}<br>
                                   <strong class="me-2 my-1">Cantidad Solicitada</strong><br> {{ props.results[0].monto
                                   }} USDT<br>
                                 
                                   <strong class="me-2 my-1">Periodo de Recaudacion</strong> <br>{{
                                        props.results[0].fecha_inicio_recaudacion.slice(0, 10) }} - {{
                                        props.results[0].fecha_inicio_recaudacion.slice(0, 10) }}<br>
                                   <strong class="me-2 my-1">Periodo de Devolucion</strong><br>{{
                                        props.results[0].fecha_inicio_pago.slice(0, 10) }} - {{
                                        props.results[0].fecha_fin_pago.slice(0, 10) }} <br>
                              </div>
                              <div class="col-5 ">
                                   <p v-if="props.results[0].estado_inversion != 'Inicial'" class="m-0"><strong
                                             class="me-2 my-1">Cantidad Recaudada</strong> <br> {{
                                                  props.results[0].monto_recaudado }} USDT</p>
                                   <p class="m-0"><strong class="me-2 my-1">Estado de solicitud</strong> <br> {{
                                        props.results[0].aprobado }} &nbsp;
                                        <i v-if="props.results[0].aprobado == 'Aprobado'"
                                             class="fa fa-check text-success" aria-hidden="true"></i>
                                        <i v-if="props.results[0].aprobado == 'Pendiente'" class="fa-regular  fa-clock"
                                             aria-hidden="true"></i>

                                   </p>
                                   <p class="m-0"><strong class="me-2 my-1">Porcentaje de Interes</strong> <br> {{
                                        props.results[0].porcentaje_interes }} %

                                   </p>
                                   <p class="m-0"><strong class="me-2 my-1">Cantidad de Cuotas</strong> <br> {{
                                        props.results[0].cantidad_pagos }}

                                   </p>
                                   <strong class="me-2 my-1">Cantidad a cancelar</strong><br> {{ (parseFloat(props.results[0].monto) * parseFloat(props.results[0].porcentaje_interes/100))+ parseFloat(props.results[0].monto)
                                   }} USDT<br>
                                   <p v-if="props.results[0].estado_inversion != 'Inicial' && currentDate >= new Date(props.results[0].fecha_inicio_recaudacion) " class="m-0"><strong
                                             class="me-2 my-1">Estado de inversion</strong> <br>
                                        <label v-if="props.results[0].estado_inversion == 'Pendiente'">Etapa de
                                             Recaudacion</label>
                                        <label v-if="props.results[0].estado_inversion == 'Proceso'">Etapa de
                                             Devolucion</label>
                                   </p>
                              </div>
                         </div>
                    </div>
                    <div v-if="props.results[0].estado_inversion != 'Inicial'" class="col text-center">
                         <h3 class="mb-3 text-center">
                              Lista de Inversores
                         </h3>
                         <div class="d-flex justify-content-center flex-wrap ">
                              <div class=" col ">
                                   <button v-if="props.results[0].inversores.length > 0"
                                        class="btn  btn-gray rounded-5 btn-sm mb-3 position-relative m-auto px-2"
                                        type="button" @click="toggleCollapse" :aria-expanded="isCollapsed.toString()"
                                        aria-controls="collapseExample">
                                        {{ isCollapsed ? 'Inversores' : 'Cerrar' }}
                                        <span v-if="props.results[0].inversores.length > 0"
                                             class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-orange">
                                             {{ props.results[0].inversores.length }}
                                        </span>
                                   </button>
                                   <label v-else>Actualmente, no dispone de inversores.</label>
                                   <div class="collapse text-start ms-4" :id="collapseId"
                                        v-bind:class="{ show: !isCollapsed }">
                                        <div class="border border-1 p-3 rounded-3 "
                                             v-for="inv in props.results[0].inversores" :key="inv">
                                             <strong class="me-2 my-1">Inversor:</strong> {{ inv.nombre }} <br>
                                             <strong class="me-2 my-1">Monto Bonificado:</strong> {{ inv.monto }} <br>
                                             <strong class="me-2 my-1">Fecha de deposito:</strong> {{ inv.fecha_deposito
                                             }}
                                             <br>
                                        </div>
                                   </div>
                              </div>

                         </div>

                    </div>
               </div>
               <div v-if="props.results[0].aprobado == 'Pendiente' && props.results[0].estado_inversion == 'Inicial'"
                    class="text-center mt-3">
                    <button :disabled="isLoading == true" class="btn btn-gray rounded-5 btn-sm me-2" type="button"
                         @click="aceptarInversion">
                         Aprobar Inversion
                    </button>
                    <button :disabled="isLoading == true" class="btn btn-gray rounded-5 btn-sm" type="button"
                         @click="cancelarInversion">
                         Cancelar Inversion
                    </button>
               </div>
               <div v-if="currentDay >= fechaInv && props.results[0].estado_inversion == 'Pendiente' "
                    class="text-center mt-3">
                    <button :disabled="isLoading == true" class="btn btn-gray rounded-5 btn-sm" type="button"
                         @click="revertirInversion">
                         Revertir Inversion
                    </button>
               </div>
          </div>
          <div v-if="props.activeTabCli == 0 && props.results[0].estado_inversion == 'Proceso'"
               class="animate__animated animate__fadeIn">
               <h3 class="text-center mb-3">
                    Plan de Pagos de Inversión ({{ porcentaje }}%)
               </h3>
               <div class="container-custom animate__animated  animate__fadeIn ">
                    <div class="m-auto text-center">
                         <label> <strong>Total de Pagos: </strong> {{ pagos.length }} </label> <br>
                         <label> <strong>Pagos Realizados: </strong> ({{ pagados }}/{{ pagos.length }}) </label> <br>
                         <label> <strong>Monto Pagado: </strong> ( {{ parseFloat(cantidadPagada) }}/{{
                              parseFloat(cantidadFinal) }}) USDT </label> <br>
                         <label> <strong>Siguiente pago: </strong> #{{ sigPago }} </label> <br>
                         <label> <strong>Saldo Disponible: </strong> {{ saldo }} USDT</label>
                    </div>
                    <p class="text-center mb-0 mt-2">Inicio de Pagos</p>
                    <div class="timeline ">
                         <div v-for="(pago, index) in pagos" :key="pago"
                              class="d-flex justify-content-center  timeline-item  m-auto">
                              <div class="col-6 ">
                                   <div class="card my-3 shadow"
                                        :class="{ 'bg-degrade text-light': pago.estado_pago == 'Pagado' }">
                                        <div class="card-body  ">
                                             <p class="card-text m-0 text-center fw-semibold">Pago {{ index + 1 }}</p>
                                             <div class="d-flex justify-content-center">
                                                  <div class="col">
                                                       <p class="card-text m-0"><strong>Monto:</strong> {{
                                                            parseFloat(pago.monto_pago) }}</p>
                                                       <p class="card-text m-0"><strong>Fecha limite:</strong> {{
                                                            pago.fecha_programada.slice(0, 10) }}</p>
                                                       <p class="card-text m-0"><strong>Estado: </strong>
                                                            <label v-if="pago.estado_pago == 'Pagado'"> Pagado <i
                                                                      class="fa-regular fa-circle-check text-success"></i>
                                                            </label>
                                                            <label v-if="pago.estado_pago == 'Pendiente'"> Pendiente <i
                                                                      class="fa-regular fa-clock text-danger"></i></label>
                                                       </p>
                                                       <p class="card-text m-0"><strong>Fecha Cancelada: </strong>
                                                            <label v-if="pago.fecha_pagada == null">No
                                                                 Disponible</label>
                                                            <label v-else>{{ pago.fecha_pagada.slice(0, 10) }}</label>
                                                       </p>
                                                  </div>
                                                  <div class="col text-end m-auto">
                                                       <button v-if="sigPago == (index + 1)"
                                                            :disabled="loadingButton == true"
                                                            class="btn btn-orange btn-sm rounded-5"
                                                            @click="pagar(pago)">Pagar</button>
                                                       <button v-else class="btn btn-orange btn-sm rounded-5" disabled>
                                                            <label v-if="pago.estado_pago == 'Pendiente'"> No Disponible
                                                            </label>
                                                            <label v-if="pago.estado_pago == 'Pagado'"> Pagado </label>
                                                       </button>

                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                    </div>
                    <p class="text-center">Fin de Pagos</p>
               </div>
          </div>
          <div v-if="props.activeTabCli == 1">
               <h3 class="text-center mb-3">
                    Inversiones Finalizadas ({{ props.results.length }})
               </h3>
               <div class="containter">
                    <div class="d-flex justify-content-evenly gap-3">
                         <div class="col-5" v-for="inv in props.results" :key="inv">
                              <div class="card card-body shadow">
                                   <div class="d-flex">
                                        <div class="col">
                                             <strong class="me-2 my-1">Titulo</strong><br> {{ inv.nombre }}<br>
                                             <strong class="me-2 my-1">Motivo</strong><br> {{ inv.descripcion }}<br>
                                             <strong class="me-2 my-1">Cantidad Solicitada:</strong><br> {{ inv.monto
                                             }} USDT<br>
                                             <strong class="me-2 my-1">Periodo de Recaudacion</strong> <br>{{
                                                  inv.fecha_inicio_recaudacion.slice(0, 10) }} - {{
                                                  inv.fecha_inicio_recaudacion.slice(0, 10) }}<br>
                                             <strong class="me-2 my-1">Periodo de Devolucion</strong><br>{{
                                                  inv.fecha_inicio_pago.slice(0, 10) }} - {{
                                                  inv.fecha_fin_pago.slice(0, 10) }} <br>
                                        </div>
                                        <div class="col mb-2">
                                             <strong class="me-2 my-1">Motivo de la reversion</strong><br> {{ inv.nombre
                                             }}<br>
                                             <strong class="me-2 my-1">Porcentaje de interes</strong><br>
                                             {{ inv.porcentaje_interes }}<br>
                                             <strong class="me-2 my-1">Monto Recaudado</strong><br>
                                             {{ inv.monto_recaudado }} USDT<br>
                                             <strong class="me-2 my-1">Estado de Recaudacion</strong><br>
                                             {{ ((inv.monto - inv.monto_faltante) / inv.monto * 100).toFixed(2) }}%<br>
                                             <strong class="me-2 my-1">Cantidad Pagada</strong><br>
                                             {{ parseInt(inv.monto*(inv.porcentaje_interes/100))+parseInt(inv.monto) }} USDT<br>

                                        </div>
                                   </div>
                                   <button class="btn btn-gray btn-sm rounded-5 position-relative w-25 m-auto">
                                        Inversores
                                        <span v-if="props.results[0].inversores.length > 0"
                                             class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-orange">
                                             {{ props.results[0].inversores.length }}
                                        </span>
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div v-if="props.activeTabCli == 2">
               <h3 class="text-center mb-3">
                    Inversiones Revertidas ({{ props.results.length }})
               </h3>
               <div class="containter">
                    <div class="d-flex justify-content-center gap-3">
                         <div class="col-5" v-for="inv in props.results" :key="inv">
                              <div class="card card-body">
                                   <div class="d-flex">
                                        <div class="col">
                                             <strong class="me-2 my-1">Titulo</strong><br> {{ inv.nombre }}<br>
                                             <strong class="me-2 my-1">Motivo</strong><br> {{ inv.descripcion }}<br>
                                             <strong class="me-2 my-1">Cantidad Solicitada:</strong><br> {{ inv.monto
                                             }} USDT<br>
                                             <strong class="me-2 my-1">Periodo de Recaudacion</strong> <br>{{
                                                  inv.fecha_inicio_recaudacion.slice(0, 10) }} - {{
                                                  inv.fecha_inicio_recaudacion.slice(0, 10) }}<br>
                                             <strong class="me-2 my-1">Periodo de Devolucion</strong><br>{{
                                                  inv.fecha_inicio_pago.slice(0, 10) }} - {{
                                                  inv.fecha_fin_pago.slice(0, 10) }} <br>
                                        </div>
                                        <div class="col">
                                             <strong class="me-2 my-1">Motivo de la reversion</strong><br> {{ inv.nombre
                                             }}<br>
                                             <strong class="me-2 my-1">Porcentaje de interes</strong><br>
                                             {{ inv.porcentaje_interes }}<br>
                                             <strong class="me-2 my-1">Monto Recaudado</strong><br>
                                             {{ inv.monto_recaudado }}<br>
                                             <strong class="me-2 my-1">Estado de la Recaudacion</strong><br>
                                             {{ ((inv.monto - inv.monto_faltante) / inv.monto * 100).toFixed(2) }}%<br>

                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div v-if="props.activeTabCli == 3">
               <h3 class="text-center mb-3">
                    Solicitudes Rechazadas ({{ props.results.length }})
               </h3>
               <div class="containter">
                    <div class="d-flex justify-content-center gap-3">
                         <div class="col-5" v-for="inv in props.results" :key="inv">
                              <div class="card card-body">
                                   <div class="d-flex">
                                        <div class="col">
                                             <strong class="me-2 my-1">Titulo</strong><br> {{ inv.nombre }}<br>
                                             <strong class="me-2 my-1">Motivo</strong><br> {{ inv.descripcion }}<br>
                                             <strong class="me-2 my-1">Cantidad Solicitada:</strong><br> {{ inv.monto }}
                                             USDT<br>
                                             <strong class="me-2 my-1">Fecha de solicitud:</strong><br> {{ inv.monto }}
                                             USDT<br>

                                        </div>
                                        <div class="col">
                                             <strong class="me-2 my-1">Motivo del rechazo</strong><br> {{ inv.nombre
                                             }}<br>
                                             <strong class="me-2 my-1">Porcentaje de interes</strong><br>
                                             {{ inv.porcentaje_interes }}<br>
                                             <strong class="me-2 my-1">Rechazado por:</strong><br>
                                             {{ inv.porcentaje_interes }}<br>

                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <label v-if="props.results[0].aprobado == 'Pendiente'" class="ms-2 mt-3"> <strong>Nota: </strong>La solicitud
               será automáticamente aprobada por el sistema hasta el {{
                    getFechaAutomaticaDeAprobacion(props.results[0].fecha_solicitud) }} </label>
     </main>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios';
import { errorAlert } from '@/helpers/iziToast';
const props = defineProps({
     results: {
          required: true,
          type: Object
     },
     activeTabCli: {
          required: true,
          type: Number
     },
     isLoading: {
          required: true,
          type: Boolean
     },
})

const user = ref(JSON.parse(localStorage.getItem('usuario')));
const currentDate =  ref(new Date())
const getFechaAutomaticaDeAprobacion = (fecha) => {
     const date = new Date(fecha);
     date.setDate(date.getDate() + 4);
     return date.toISOString().slice(0, 10)
}

const saldo = ref(0)
const getTokensCliente = async () => {
     try {
          const { data } = await axios.get(import.meta.env.VITE_BASE_URL + '/billetera/totalTokens/' + props.results[0].cliente_id);
          saldo.value = data.data[0].token - data.data[1].token;
     } catch (error) {
          console.log(error);
     }
}

const aceptarInversion = async () => {
     const { isConfirmed } = await Swal.fire({
          text: `El monto final a recaudar será de ${parseInt(props.results[0].monto) + parseInt(props.results[0].monto * (props.results[0].porcentaje_interes) / 100)} USDT, 
    considerando un porcentaje de interés del ${props.results[0].porcentaje_interes}% aplicado al monto solicitado de ${parseInt(props.results[0].monto)} USDT.
¿Deseas aceptar los términos e iniciar la inversión?  
    `,
          position: 'top',
          showClass: {
               popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
          },
          hideClass: {
               popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
          },
          grow: 'row',
          showConfirmButton: true,
          showCloseButton: true,
          confirmButtonColor: "#FE8330",
          cancelButtonColor: "#1A253F",
          confirmButtonText: "Aceptar",
          cancelButtonText: 'Cancelar',
          showCancelButton: true,
     })
     if (isConfirmed == true) {
          console.log(isCollapsed);
          try {
               console.log(import.meta.env.VITE_BASE_URL + '/solicitudesInversion/procesarInversionByIUser/' + props.results[0].id + '?tipoAccion=acepto');
               await axios.put(import.meta.env.VITE_BASE_URL + '/solicitudesInversion/procesarInversionByIUser/' + props.results[0].id + '?tipoAccion=acepto');
               emit('inversionAceptada')
          } catch (error) {
               console.log(error);
          }
     } else {
          console.log('cerrado');
     }
}

const cancelarInversion = async () => {
     const { value: reason } = await Swal.fire({
          title: 'Cancelar la solicitud',
          input: 'text',
          inputPlaceholder: 'Escribe el motivo/razon de la cancelación...',
          showCancelButton: true,
          cancelButtonText: 'Cerrar',
          confirmButtonColor: "#FE8330",
          cancelButtonColor: "#1A253F",
          confirmButtonText: 'Enviar',
     });

     if (reason) {
          await axios.put(import.meta.env.VITE_BASE_URL + '/solicitudesInversion/procesarInversionByIUser/' + props.results[0].id + '?tipoAccion=cancelo&reason=' + reason);
          emit('inversionAceptada')
     } else {
          console.log('Cancelación sin motivo proporcionado');
     }
}

const revertirInversion = async () => {
     const { value: reason, isConfirmed } = await Swal.fire({
          title: 'Revertir la solicitud',
          text: 'Todos los pagos de los inversores se revertirán',
          input: 'text',
          inputPlaceholder: 'Escribe el motivo/razón de la reversión...',
          showCancelButton: true,
          cancelButtonText: 'Cerrar',
          confirmButtonColor: "#FE8330",
          cancelButtonColor: "#1A253F",
          confirmButtonText: 'Enviar',
          preConfirm: (inputValue) => {
               if (!inputValue) {
                    errorAlert('El motivo/razon es requerido', 'Campo requerido')
                    return false;
               }
               return inputValue;
          },
     });

     if (isConfirmed) {
          if (reason) {
               await axios.put(import.meta.env.VITE_BASE_URL + "/solicitudesInversion/revertirInversion/" + props.results[0].id + '?observaciones=' + reason);
               emit('inversionAceptada');
          }
     } else {
          errorAlert('Error al realizar al procesar la solicitud', 'Error')

     }

}

const emit = defineEmits(['inversionAceptada']);
const currentDay = ref(new Date()); // Timestamp de la fecha actual
const fechaInv = ref(new Date(props.results[0].fecha_inicio_recaudacion));
const pagos = ref([])
const sigPago = ref(0)
const porcentaje = ref(0)
const cantidadPagada = ref(0)
const cantidadFinal = ref(0)
const comision_porcentual = ref(0)

onMounted(async () => {
     if (!props.results || props.results.length === 0) {
          console.error("Error: No se encontraron resultados.");
     } else if (props.results[0].estado_inversion === 'Proceso') {
          try {
               await getTokensCliente()
               console.log(import.meta.env.VITE_BASE_URL + '/planPagos/getPlanPagosByIdSolicitud/' + props.results[0].id+'?catId='+user.value.categoria_persona_id);
               const { data } = await axios.get(import.meta.env.VITE_BASE_URL + '/planPagos/getPlanPagosByIdSolicitud/' + props.results[0].id+'?catId='+user.value.categoria_persona_id)
               pagos.value = data.results;
               pagados.value = data.pagados;
               sigPago.value = data.sigPago;
               porcentaje.value = data.porcentaje;
               cantidadPagada.value = data.cantidadPagada;
               comision_porcentual.value = data.comision_porcentual_ganancia;
               cantidadFinal.value = (parseFloat(props.results[0].monto) * (parseFloat(props.results[0].porcentaje_interes / 100))) + parseFloat(props.results[0].monto)
          } catch (error) {
               console.log(error);
          }
     }
})

watch(
     () => props.activeTabCli,
     (newVal, oldVal) => {

     }
)
const loadingButton = ref(false)
const pagar = async (pago) => {
     console.log(pago);
     if (saldo.value < pago.monto_pago) {
          errorAlert('No dispone de los fondos necesarios para realizar la operación', 'Fondos insuficientes');
          return
     }
     loadingButton.value = true
     const data = {
          pago,
          totalPagos: pagos.value.length,
          inversores: props.results[0].inversores,
          numPago: sigPago.value,
          comision_porcentual:comision_porcentual.value
     }
      try {
           await axios.post(import.meta.env.VITE_BASE_URL+'/planPagos',data);
           if (sigPago.value == pagos.value.length) {
          Swal.fire({
               title: "Felicidades!!!",
               text: "El proceso de inversión ha finalizado exitosamente. Todas las cuotas han sido abonadas a sus respectivos inversores en su totalidad.",
               imageUrl: "https://cdn-icons-gif.flaticon.com/16072/16072637.gif",
               imageWidth: 300,
               imageHeight: 300,
               imageAlt: "Custom image",
               confirmButtonColor: "#FE8330",
               confirmButtonText: "Aceptar",
               allowOutsideClick: false,
               allowEscapeKey: false,   
          }).then((result) => {
               if (result.isConfirmed) {
                    loadingButton.value = false;
                    emit('inversionAceptada');
               }
          });
          return;
     }
           emit('inversionAceptada');
      } catch (error) {
           errorAlert('No dispone de los fondos necesarios para realizar la operación', error.response.data.msg);
      }finally{
           loadingButton.value = false
      }
  


  
}

const collapseId = ref('collapseExample')
const isCollapsed = ref(true)
const pagados = ref(0)

const toggleCollapse = () => {
     isCollapsed.value = !isCollapsed.value
}
</script>
<style scoped>
.custom-border {
     border-right: 1px solid var(--yellow-orange);
}

.timeline {
     position: relative;
     padding: 1rem 0;
}

.timeline::before {
     content: '';
     position: absolute;
     top: 0;
     bottom: 0;
     left: 50%;
     width: 2px;
     background-color: var(--yellow-orange);
     transform: translateX(-50%);
}

.timeline-item {
     position: relative;
     padding: 1rem 2rem;
     margin-bottom: 2rem;
}

.timeline-item::after {
     content: '';
     position: absolute;
     top: 0.5rem;
     left: 50%;
     width: 1rem;
     height: 1rem;
     background-color: var(--yellow-orange);
     border-radius: 50%;
     transform: translateX(-50%);
}

.container-custom {
     max-height: 45vh;
     overflow-y: auto;

}
</style>