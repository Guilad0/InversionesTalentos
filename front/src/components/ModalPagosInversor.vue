<template>
     <div class="modal fade" id="pagosInversor" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
          aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-scrollable">
               <div class="modal-content">
                    <div class="modal-header ">
                         <h3 class="text-center m-auto">Pagos Programados </h3>
                    </div>
                    <div v-if="laodingPagos == false" class="modal-body">
                         <h5 class="card-title text-center">
                              Pagos en proceso ({{ props.pagos.filter(pago => pago.estado_pago == 'Pagado').length }}/{{
                              props.pagos.length }}) 
                         </h5>
                         <div class="d-flex justify-content-center flex-wrap gap-3">

                              <div v-for="pago in pagos" :key="pago"
                                   class=" border border-secondary my-1 ps-3 pb-2 rounded-3 col-5">
                                   <h6 class="card-title text-center mt-2">Pago #{{ pago.num_pago }}</h6>
                                   <div class="">
                                        <strong>
                                             <label v-if="pago.estado_pago == 'Pagado'">Monto pagado:</label>
                                             <label v-if="pago.estado_pago == 'Pendiente'">Monto aproximado de
                                                  pago:</label>
                                        </strong> {{ props.gananciaAproximada }} {{ props.tipoMoneda }}<br>
                                        <strong>Estado:</strong> {{ pago.estado_pago }} &nbsp;
                                        <i v-if="pago.estado_pago == 'Pagado'"
                                             class="fa-regular fa-circle-check text-success"></i>
                                        <i v-if="pago.estado_pago == 'Pendiente'"
                                             class="fa-regular fa-hourglass-half text-light"></i>
                                        <br>
                                        <strong>
                                             <label v-if="pago.estado_pago == 'Pendiente'">Fecha estimada de
                                                  pago:</label>
                                             <label v-if="pago.estado_pago == 'Pagado'">Fecha de pago:</label>
                                        </strong> {{ pago.fecha_programada.slice(0, 10) }} <br>
                                   </div>

                              </div>
                         </div>
                    </div>
                    <div class="modal-body" v-else>
                         ...cargando data
                    </div>
                    <div class="modal-footer ">
                         <div class="m-auto">
                              <button type="button" class="btn btn-orange  border" data-bs-dismiss="modal">Cerrar</button>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>
<script setup>

const props = defineProps({
     pagos: {
          required: true,
          type: Object
     },

     laodingPagos: {
          required: true,
          type: Boolean
     },
     montoInvInversor: {
          type: Number,
     },
     interesInversion: {
          type: String,
     },
     interesPagina: {
          type: String,
     },
     gananciaAproximada: {
          type: String,
     },
     tipoMoneda: {
          type: String,
     },
})

</script>
