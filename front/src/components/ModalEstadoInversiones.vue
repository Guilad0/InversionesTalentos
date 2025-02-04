<template>
     <div class="modal fade" id="modalEstadoInversion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header ">
        <h1 class="modal-title fs-5 m-auto" id="staticBackdropLabel">Detalles de la Inversion</h1>
        
      </div>
      <div  class="modal-body">
        <div v-if="loading == false" class="d-flex justify-content-center m-auto text-center p-3">
          <div class="col">
            <p class=""> <strong>Solicitante de la Inversion</strong> <br> <label class="py-2">{{ props.inversionSeleccionada.nombre }} </label></p>
            </div>
          <div class="col">
            <p  class=""> <strong>Inversores ({{ inversores.length }}) </strong>  <br> 
              <label  v-for="(inv, i) in inversores" :key="i" class="d-block pt-2">
              {{ inv.nombre }} {{ inv.apellido }}  {{ inv.monto }} -  
              <strong v-if="props.inversionSeleccionada.estado_inversion == 'Pendiente'" >Proceso de Recaudacion)</strong>
              <strong v-if="props.inversionSeleccionada.estado_inversion == 'Proceso'" >Proceso de Devolucion</strong>
              <strong v-if="props.inversionSeleccionada.estado_inversion == 'Finalizado'" >liquidada</strong>
              <strong v-if="props.inversionSeleccionada.estado_inversion == 'Reversion'" >Revertido</strong>
              </label> <br>
              
             </p>
            </div>
          <div class="col">
            <p class="mb-0"> <strong>Estado de la Recaudacion ({{ porcentajeInversion }})%</strong> <br> 
             </p>
                <label class="py-2 " > <strong>Tokens Requeridos:</strong>  {{ tokensRequeridos }} </label> <br>
                <label class="pb-2" > <strong>Tokens Recaudados:</strong>  {{ totalInvertido }} </label> <br>
                <!-- <label class="pb-2" > <strong>Estado:</strong>  {{ props.inversionSeleccionada.estado_inversion }} </label> <br> -->
                <label class="pb-2" > <strong>Periodo Restante: </strong>  
                <label v-if="props.inversionSeleccionada.estado_inversion == 'Proceso' || props.inversionSeleccionada.estado_inversion == 'Pendiente  '" > {{ periodoRestanmte }} Dias </label>
                <label v-else> 0 Dias</label>
                </label> <br>
                <label v-if="props.inversionSeleccionada.estado_inversion !=='Finalizado'"> <strong>Finaliza en: </strong> {{ props.inversionSeleccionada.fecha_fin_recaudacion?.slice(0,10) }} </label>
                <label v-else> <strong>Finalizo en: </strong> {{ props.inversionSeleccionada.fecha_fin_recaudacion?.slice(0,10) }} </label>
                
            </div>
            <div class="col ">
            <p class="mb-2"> <strong>Finalizado/Revertido</strong> <br></p>
           
              <div v-if="props.inversionSeleccionada.estado_inversion == 'Finalizado'" >
                <label  class="" >   Finalizado en  <br>{{ props.inversionSeleccionada.fecha_fin_recaudacion?.slice(0,10) }}</label> <br>
              </div>
              <div v-if="props.inversionSeleccionada.estado_inversion == 'Reversion'" >
                <label  class="" >  Revertido en <br> {{ props.inversionSeleccionada.fecha_fin_recaudacion?.slice(0,10) }} </label> <br>
              </div>
              <div v-if="props.inversionSeleccionada.estado_inversion == 'Proceso'" >
                <label  class="" > En Proceso de Devolucion</label> <br>
              </div>
              <div v-if="props.inversionSeleccionada.estado_inversion == 'Pendiente'" >
                <label  class="" > En Proceso de Recaudacion</label> <br>
              </div>
            
            </div>
        </div>
          <div v-else class="custom-body d-flex justify-content-center align-content-center">
            <div class="m-auto">
              Cargando ...
            </div>
          </div>
      </div>
      <div class="modal-footer d-flex justify-content-center p-2">
        <button type="button" class="btn btn-gray  rounded-2 border" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import axios from 'axios';
import { watch, ref} from 'vue'

const props = defineProps({
     inversionSeleccionada:{
          required:true
     }
})



const baseUrl = import.meta.env.VITE_BASE_URL
const inversores = ref([])
const totalInvertido = ref(0);
const porcentajeInversion = ref(0)
const tokensRequeridos = ref(0)
const periodoRestanmte = ref(0)
const getInversores = async ( ) =>{
    try {
      console.log(props.inversionSeleccionada.id);
      const {data} = await axios.get( baseUrl+'/solicitudesInversion/getInversoresDeSolicitud/'+props.inversionSeleccionada.id )
      inversores.value = data.results;
      totalInvertido.value = data.totalInvertido
      console.log('dataaaaaaaaaaaaaaaaaaa',inversores.value);
      tokensRequeridos.value = parseInt(props.inversionSeleccionada.monto) * parseInt(ajustes.value.valor_token);
      console.log('Total Requerido',porcentajeInversion.value);
      porcentajeInversion.value = (totalInvertido.value / tokensRequeridos.value  ) *100;
      console.log('Total invertido',totalInvertido.value);
      porcentajeInversion.value = porcentajeInversion.value.toFixed(2)
      console.log('porcentajeeeeeeeeeeeeeeeeee',porcentajeInversion.value);
      const hoy = new Date();
      const fechaLimite = new Date(props.inversionSeleccionada.fecha_fin_pago);
      console.log(props.inversionSeleccionada.fecha_fin_pago);
      const diferenciaSegundos = fechaLimite - hoy;
      periodoRestanmte.value = Math.ceil(diferenciaSegundos / (1000 * 60 * 60 * 24));
      console.log('Periodo restante en diasaaaaaaaaa', periodoRestanmte.value);
    } catch (error) {
      
    }
}

const ajustes = ref({})
const getAjustes =async () =>{
  try {
    const {data} = await axios.get(baseUrl+'/ajustes/ajustesTokens')
    ajustes.value = data.results;
  } catch (error) {
    
  }
}
const loading = ref(false)
watch(
      () => props.inversionSeleccionada,
      async (newValue, oldValue) => {
        if (newValue !== oldValue) {
          if (newValue) {
            try {
              loading.value = true
              await getAjustes()
              await getInversores();
            } catch (error) {
              console.error(error);
            }finally{
              setTimeout(() => {
                loading.value = false
              }, 500);
            }
          }
        }
      }
    );


</script>

<style setup> 
.custom-body{
  height: 170px;
}
li{
  list-style: none;
}
</style>