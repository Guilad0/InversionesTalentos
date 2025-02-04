<script setup>

import axios from "axios";
import { onMounted, ref, watch } from "vue";
import ModalPagosInversor from "./ModalPagosInversor.vue";
const props = defineProps({
  results: {
    required: true,
    type: Object,
  },
  activeTabCli: {
    required: true,
    type: Number,
  },
  isLoading: {
    required: true,
    type: Boolean,
  },
  tipoMoneda: {
    required: true,
    type: String,
  },
});
console.log('props.results:', props.results);
// Función para formatear fechas
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Devuelve solo la parte de fecha (AAAA-MM-DD)
};
// Función para obtener la descripción del estado
const getEstadoDescripcion = (estadoInversion) => {
  if (estadoInversion === "Pendiente") {
    return "Estado de recaudación";
  } else if (estadoInversion === "Proceso") {
    return "Estado de devolución (procesando pagos)";
  } else {
    return "Estado desconocido";
  }
};
const modalRef = ref(null);
onMounted(() => {
  modalRef.value = document.getElementById("pagosInversor");
});
const idInv = ref(null);
const montoInvInversor = ref(null);
const interesInversion = ref(null);
const interesPagina = ref(null);
const gananciaAproximada = ref(null);
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Muestra el modal con los pagos de una inversión
 *
 * @param {number} id - ID de la inversión
 * @param {number} monto_inv - Monto invertido
 * @param {number} interesInv - Porcentaje de interés de la inversión
 * @param {number} interesPag - Porcentaje de interés que se va a pagar
 * @param {number} gananciaAprox - Ganancia aproximada que se va a recibir
/******  63db47ca-81fa-4203-8862-0881325e1909  *******/const mostrarGanacias = async (
  id,
  monto_inv,
  interesInv,
  interesPag,
  gananciaAprox
) => {
  const modal = new bootstrap.Modal(modalRef.value);
  modal.show();
  idInv.value = id;
  montoInvInversor.value = monto_inv;
  interesInversion.value = interesInv;
  interesPagina.value = interesPag;
  gananciaAproximada.value = gananciaAprox;
  await obtenerPagos();
};
watch(
  () => props.activeTabCli,
  (newVal, oldVal) => {}
);

const laodingPagos = ref(false);
const pagos = ref([]);
const obtenerPagos = async () => {
  laodingPagos.value = true;
  try {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL +
        "/inversionesRetiros/getPagosInversor?id=" +
        idInv.value
    );
    pagos.value = data.results;
  } catch (error) {
    console.log(error);
  } finally {
    laodingPagos.value = false;
  }
};


</script>

<style scoped>
.timeline .content h2 {
     font-size: 12px !important; /* Ajusta el tamaño según lo necesites */
   }
.infoClient{
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  margin-top: 50px;
}

.infoData{
     margin-top: 2px; 
  margin-bottom: 2px; 
}
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
   .custom-abs{
    position: absolute;
    right: 0;
   }

</style>
<template>
     <main class="">
       <div v-if="props.activeTabCli == 0">
         <h3 class="text-center mb-3">Mis inversiones</h3>
         <div
           v-for="inv in props.results"
           :key="inv.id"
           class="row d-flex justify-content-center"
         >
           <!-- Contenedor de la tarjeta -->
           <div class="col-md-10 mb-3">
             <div class="card shadow-sm">
               <div class="card-body bg-degrade-light">
                 <!-- Contenedor de tres columnas -->
                 <div class="row">
                   <!-- Columna 1: Imagen del perfil -->
                   <div class="col-md-3 d-flex justify-content-center align-items-center">
                     <img
                       :src="inv.imagen"
                       alt="Imagen de perfil"
                       class="img-fluid rounded-circle"
                       width="150"
                       height="150"
                     />
                   </div>
   
                   <!-- Columna 2: Información del inversor y botón Pagos -->
                   <div class="col-md-6 infoClient">
                     <p class="mb-1"><strong>Nombre del talento: </strong> {{ inv.nombre + ' '+ inv.apellido}}</p>
                     <p class="mb-1">
                       <strong>Estado de la inversión: </strong> 
                       <label v-if="inv.estado_inversion == 'Pendiente'"> En recaudacion</label>
                       <label v-if="inv.estado_inversion == 'Proceso'"> En proceso de devolucion</label>
                     </p>
                     <p class="mb-1"><strong>Monto invertido:</strong> {{ inv.monto_invertido }}</p>
                     <p class="mb-1">
                       <strong>Fecha depósito:</strong> {{ formatDate(inv.fecha_deposito) }}
                     </p>
                     <p class="mb-1">
                       <strong>Cantidad de pagos:</strong> {{ inv.cantidad_pagos }}
                     </p>
                     <p class="mb-1">
                       <strong>Porcentaje de interés:</strong> {{ Math.abs(inv.porcentaje_interes - inv.porcentajeGananciaPagina) }}%
                     </p>
                     <p class="mb-1"><strong>Monto a recibir:</strong> {{ inv.monto_mas_ganancia }}</p>
                     <p class="mb-1"><strong>Etapa de recaudacion:</strong>  {{ inv.fecha_inicio_recaudacion.slice(0,10) }} - {{ inv.fecha_fin_recaudacion.slice(0,10) }}</p>
                     <p class="mb-1"><strong>Etapa de devolucion:</strong> {{ inv.fecha_inicio_pago.slice(0,10) }} - {{ inv.fecha_fin_pago.slice(0,10) }}</p>
                     <button
                       v-if="inv.estado_inversion == 'Proceso'"
                       class="btn btn-gray btn-sm rounded-5"
                       @click="mostrarGanacias(
                         inv.id,
                         inv.monto_invertido,
                         inv.porcentaje_interes,
                         inv.porcentajeGananciaPagina,
                         inv.gananciaAproximada
                       )"
                     >
                       Pagos
                     </button>
                   </div>
   
                   <!-- Columna 3: Timeline -->
             <div class="col-md-3 m-auto">
                    <p class="text-center">Proceso de inversion</p>
                    <div class="timeline position-relative">
                          <p class="text-center pt-2 custom-abs" :class="{'fw-bold': inv.estado_inversion == 'Finalizado'}">Recaudacion</p>
                      <div class="timeline-item">
                      </div>
                      <div class="timeline-item position-relative">
                        <p class="text-center pt-2 custom-abs" :class="{'fw-bold': inv.estado_inversion == 'Reversion'}">Devolucion</p>
                      </div>
                    </div>
                    <p class="text-center">Fin de la inversion</p>
                  </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
   
       <div v-if="props.activeTabCli == 1">
  <div class="row"> <!-- Contenedor de filas -->
    <div v-for="inv in props.results" :key="inv" class="col-md-6 mb-2"> <!-- Cada tarjeta ocupa la mitad del ancho (6 columnas de 12) -->
      <div class="card d-flex justify-content-center gap-2">
        <div class="card-body">
          <p><strong>Fecha de depósito:</strong> {{ inv.fecha_deposito.slice(0,10) }}</p>
          <p><strong>Inversión:</strong> {{ inv.nombre }}</p>
          <p><strong>Descripción de la inversión:</strong> {{ inv.descripcion }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
       <div v-if="props.activeTabCli == 2">
        <div class="row"> <!-- Contenedor de filas -->
    <div v-for="inv in props.results" :key="inv" class="col-md-6 mb-2"> <!-- Cada tarjeta ocupa la mitad del ancho (6 columnas de 12) -->
      <div class="card d-flex justify-content-center gap-2">
        <div class="card-body">
          <p><strong>Fecha de depósito:</strong> {{ inv.fecha_deposito.slice(0,10) }}</p>
          <p><strong>Inversión:</strong> {{ inv.nombre }}</p>
          <p><strong>Descripción de la inversión:</strong> {{ inv.descripcion }}</p>
        </div>
      </div>
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
         :laodingPagos="laodingPagos"
       />
     </main>
   </template>


