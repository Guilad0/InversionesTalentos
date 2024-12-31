<template>
     <main class="container">
          <div v-if="props.activeTabCli == 0">
               <h3 class="text-center mb-3">Mis inversiones  </h3>
               <div v-for="inv in props.results" :key="inv" class="d-flex justify-content-center">
                    <div class="col mb-2">
                         <div class="card">
                              <div class="card-body">
                                   {{ inv.estado_inversion }} <strong>poner la informaicon dela inversion y del ivnersor
                                        OJO</strong>
                                   {{ inv }}
                                   <div class="">
                                        <button v-if="inv.estado_inversion == 'Pendiente'"
                                             class="btn btn-gray btn-sm rounded-5" @click="mostrarGanacias(inv.id,inv.monto_invertido,inv.porcentaje_interes, inv.porcentajeGananciaPagina,inv.gananciaAproximada)">
                                             Pagos
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div v-if="props.activeTabCli == 1">
               <div class="card">
                    <div class="card-body">
                         finalizados
                    </div>
               </div>
          </div>
          <div v-if="props.activeTabCli == 2">
               <div class="card">
                    <div class="card-body">
                         reversiones
                    </div>
               </div>
          </div>
      
          <ModalPagosInversor
            :pagos="pagos"
            :montoInvInversor="montoInvInversor"
            :interesInversion="interesInversion"
            :interesPagina="interesPagina"
            :gananciaAproximada="gananciaAproximada"
            :tipoMoneda="props.tipoMoneda"
            :laodingPagos="laodingPagos" />
            
     </main>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue'
import ModalPagosInversor from './ModalPagosInversor.vue';
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
     tipoMoneda: {
          required: true,
          type: String
     },
})

const modalRef = ref(null)
onMounted(() => {
     modalRef.value = document.getElementById('pagosInversor');
})
const idInv = ref(null)
const montoInvInversor = ref(null)
const interesInversion = ref(null)
const interesPagina = ref(null)
const gananciaAproximada = ref(null)
const mostrarGanacias = async (id, monto_inv,interesInv, interesPag,gananciaAprox) => {
     const modal = new bootstrap.Modal(modalRef.value);
     modal.show();
     idInv.value = id;
     montoInvInversor.value = monto_inv;
     interesInversion.value = interesInv;
     interesPagina.value = interesPag;
     gananciaAproximada.value = gananciaAprox;
     await obtenerPagos()
}
watch(
     () => props.activeTabCli,
     (newVal, oldVal) => {

     }
)
const laodingPagos = ref(false)
const pagos = ref([])
const obtenerPagos = async () => {
     laodingPagos.value = true
     try {
          const { data } = await axios.get(import.meta.env.VITE_BASE_URL + '/inversionesRetiros/getPagosInversor?id=' + idInv.value)
          pagos.value = data.results;
     } catch (error) {
          console.log(error);
     } finally {
          laodingPagos.value = false
     }
}

</script>