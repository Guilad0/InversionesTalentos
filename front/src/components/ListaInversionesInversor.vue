<template>
     <main class="container">
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
                     <p class="mb-1"><strong>Nombre:</strong> {{ inv.nombre }}</p>
                     <p class="mb-1"><strong>Apellido:</strong> {{ inv.apellido }}</p>
                     <p class="mb-1">
                       <strong>Estado de la inversión:</strong> {{ inv.estado_inversion }}
                     </p>
                     <p class="mb-1"><strong>Monto invertido:</strong> {{ inv.monto_invertido }}</p>
                     <p class="mb-1">
                       <strong>Fecha depósito:</strong> {{ formatDate(inv.fecha_deposito) }}
                     </p>
                     <p class="mb-1">
                       <strong>Cantidad de pagos:</strong> {{ inv.cantidad_pagos }}
                     </p>
                     <p class="mb-1">
                       <strong>Porcentaje de interés:</strong> {{ inv.porcentaje_interes }}%
                     </p>
                     <p class="mb-1">
                       <strong>Ganancia aproximada:</strong> {{ inv.gananciaAproximada }}
                     </p>
                     <p class="mb-1"><strong>Monto a recibir:</strong> {{ inv.monto_mas_ganancia }}</p>
   
                     <button
                       v-if="inv.estado_inversion == 'Pendiente'"
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
                   <div class="col-md-3">
                    <div class="timeline">
                         <div class="container left">
                           <div class="content">
                             <h2>Inicio de recaudación:</h2>
                             <span>{{ formatDate(inv.fecha_inicio_recaudacion) }}</span>
                             
                           </div>
                         </div>
                         <div class="container right">
                           <div class="content">
                             <h2 class="font">Fin de recaudación:</h2>
                             <span>{{ formatDate(inv.fecha_fin_recaudacion)}}</span>
                             
                           </div>
                         </div>
                       </div>
                  </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
   
       <div v-if="props.activeTabCli == 1">
         <div class="card">
           <div class="card-body">finalizados</div>
         </div>
       </div>
       <div v-if="props.activeTabCli == 2">
         <div class="card">
           <div class="card-body">reversiones</div>
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

.container-custom {
  max-height: 45vh;
  overflow-y: auto;
}

   /* Set a background color */
   body {
     background-color: #474e5d;
     font-family: var(--font-montserrat-semibold);
     font-size: 15px;
   }
   
   /* The actual timeline (the vertical ruler) */
   .timeline {
     position: relative;
  max-width: 100%; /* Ajustar al ancho de la card */
 
  padding: 0;      /* Remover padding innecesario */
  overflow-x: hidden; /* Evitar que el timeline se desborde */
   }
   .timeline::before {
     content: "";
     position: absolute;
     width: 2px;
     background-color: #ff6b00; /* Color de la línea */
     top: 0;
     bottom: 0;
     left: 5%; /* Ajusta según sea necesario para que quede dentro del contenedor */
     transform: none; /* Elimina transformaciones innecesarias */
   }
   
   /* The actual timeline (the vertical ruler) */
   .timeline::after {
     content: '';
     position: absolute;
     width: 6px;
     background-color: white;
     top: 0;
     bottom: 0;
     left: 50%;
     margin-left: -150px;
   }
   
   /* Container around content */
   .container {
     padding: 10px 40px;
     position: relative;
     background-color: inherit;
     width: 100%;
   }
   
   /* The circles on the timeline */
   .container::after {
     content: '';
     position: absolute;
     margin-top: 23px;
     width: 25px;
     height: 25px;
     right: 185px;
     background-color: white;
     border: 4px solid #FF9F55;
     top: 15px;
     border-radius: 50%;
     z-index: 1;
   }
   
   /* Place the container to the left */
   .left {
     left: 0;
   }
   
   /* Place the container to the right */
   .right {
     left: 0%;
   }
   
   /* Add arrows to the left container (pointing right) */
   .left::before {
     content: " ";
     height: 0;
     position: absolute;
     top: 22px;
     width: 0;
     z-index: 1;
     right: 30px;
     border: medium solid white;
     border-width: 10px 0 10px 10px;
     border-color: transparent transparent transparent white;
   }
   
   /* Add arrows to the right container (pointing left) */
   .right::before {
     content: " ";
     height: 0;
     position: absolute;
     top: 30px;
     width: 0;
     z-index: 1;
     left: 30px;
     border: medium solid white;
     border-width: 10px 10px 10px 0;
     border-color: transparent white transparent transparent;
   }
   
   /* Fix the circle for containers on the right side */
   .right::after {
     left: 0px;
   }
   
   /* The actual content */
   .content {
     padding: 20px 30px;
     background-color: white;
     position: relative;
     border-radius: 6px;
     width: 100%;
   }
   .timeline-event {
     position: relative;
     margin: 10px 0; /* Reduce el margen */
     padding: 10px;
     background-color: #fff;
     border: 1px solid #ddd;
     border-radius: 5px;
     max-width: 90%; /* Limitar el ancho dentro de la card */
   }
   .timeline-event::before {
     content: "";
     position: absolute;
     width: 10px;
     height: 10px;
     background-color: #ff6b00; /* Color del punto */
     border-radius: 50%;
     top: 10px;
     left: -15px; /* Ajustar para que quede dentro del contenedor */
   }
   
   .timeline-content {
     text-align: left;
     word-wrap: break-word; /* Romper texto largo */
     font-size: 14px;
   }
   .timeline .container {
    position: relative;
    margin: 10px 0;
    padding: 20px;
  }
  

  
  .timeline .container.left::before {
    left: -20px; /* Posición de la bolita en el lado izquierdo */
  }
  
  .timeline .container.right::before {
    right: -20px; /* Posición de la bolita en el lado derecho */
  }
   
   /* Media queries - Responsive timeline on screens less than 600px wide */
   @media screen and (max-width: 600px) {
   /* Place the timelime to the left */
     .timeline::after {
       left: 31px;
     }
   
   /* Full-width containers */
     .container {
       width: 100%;
       padding-left: 70px;
       padding-right: 25px;
     }
   
   /* Make sure that all arrows are pointing leftwards */
     .container::before {
       left: 60px;
       border: medium solid white;
       border-width: 10px 10px 10px 0;
       border-color: transparent white transparent transparent;
     }
   
   /* Make sure all circles are at the same spot */
     .left::after, .right::after {
       left: 15px;
     }
   
   /* Make all right containers behave like the left ones */
     .right {
       left: 0%;
     }
   }
</style>
