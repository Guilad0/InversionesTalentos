<template>
     <main>
          <div v-if="props.activeTabCli == 0">
               <div class="d-flex flex-wrap container">
                    <div class="col">
                         <h3 class="text-center mb-3">
                              Detalles Inversion 
                              <label v-if="props.results[0].estado_inversion == 'Pendiente'">( Proceso de Recaudacion {{ ((props.results[0].monto - props.results[0].monto_faltante) / props.results[0].monto * 100).toFixed(2) }}% )</label>
                         </h3>
                         <div class="d-flex justify-content-between ">
                              <div class="col-5">
                                   <strong class="me-2 my-1">Titulo</strong><br> {{ props.results[0].nombre }}<br>
                                   <strong class="me-2 my-1">Motivo</strong> <br>{{ props.results[0]?.descripcion }}<br>
                                   <strong class="me-2 my-1">Cantidad Solicitada:</strong><br> {{ props.results[0].monto
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
                                   <p class="m-0"><strong class="me-2 my-1">Estado de Inversion</strong> <br> {{
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
                                   <p v-if="props.results[0].estado_inversion != 'Inicial'" class="m-0"><strong
                                             class="me-2 my-1">Estado de Solicitud</strong> <br>
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
                                   <button class="btn  btn-gray rounded-5 btn-sm mb-3 position-relative m-auto px-2"
                                        type="button" @click="toggleCollapse" :aria-expanded="isCollapsed.toString()"
                                        aria-controls="collapseExample">
                                        {{ isCollapsed ? 'Inversores' : 'Cerrar' }}
                                        <span v-if="props.results[0].inversores.length > 0"
                                             class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-orange">
                                             {{ props.results[0].inversores.length }}
                                        </span>
                                   </button>
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
               <div v-if="props.results[0].aprobado == 'Aprobado' && props.results[0].estado_inversion == 'Inicial'"
                    class="text-center mt-3">
                    <button :disabled="isLoading == true" class="btn btn-gray rounded-5 btn-sm me-2" type="button"
                         @click="aceptarInversion">
                         Iniciar Inversion
                    </button>
                    <button :disabled="isLoading == true" class="btn btn-gray rounded-5 btn-sm" type="button"
                         @click="cancelarInversion">
                         Cancelar Inversion
                    </button>
               </div>
               <div v-if="currentDay >= fechaInv && props.results[0].estado_inversion == 'Pendiente'"
                    class="text-center mt-3">
                    <button :disabled="isLoading == true" class="btn btn-gray rounded-5 btn-sm" type="button"
                         @click="revertirInversion">
                         Revertir Inversion
                    </button>
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
                                        <div class="col">
                                             <strong class="me-2 my-1">Motivo de la reversion</strong><br> {{ inv.nombre
                                             }}<br>
                                             <strong class="me-2 my-1">Porcentaje de interes</strong><br>
                                             {{ inv.porcentaje_interes }}<br>
                                             <strong class="me-2 my-1">Monto Recaudado</strong><br>
                                             {{ inv.monto_recaudado }} USDT<br>
                                             <strong class="me-2 my-1">Estado de la Recaudacion</strong><br>
                                             {{ ((inv.monto - inv.monto_faltante) / inv.monto * 100).toFixed(2) }}%<br>

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
                                             <strong class="me-2 my-1">Cantidad Solicitada:</strong><br> {{ inv.monto }} USDT<br>
                                             <strong class="me-2 my-1">Fecha de solicitud:</strong><br> {{ inv.monto }} USDT<br>
                                       
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
     </main>
</template>
<script setup>
import { ref, watch } from 'vue'
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



const aceptarInversion = async () => {
     const { isConfirmed } = await Swal.fire({
          text: `El monto final a recaudar será de ${parseInt(props.results[0].monto) + parseInt(props.results[0].monto * (props.results[0].porcentaje_interes) / 100)}, 
    considerando un porcentaje de interés del ${props.results[0].porcentaje_interes}% aplicado al monto solicitado de ${parseInt(props.results[0].monto)}.
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



watch(
     () => props.activeTabCli,
     (newVal, oldVal) => {


     }
)
const collapseId = ref('collapseExample')
const isCollapsed = ref(true)

const toggleCollapse = () => {
     isCollapsed.value = !isCollapsed.value
}
</script>
<style scoped>
.custom-border {
     border-right: 1px solid var(--yellow-orange);
}
</style>