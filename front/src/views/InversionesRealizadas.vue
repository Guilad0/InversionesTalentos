<template>
  <div class="row my-4">
    <!-- Contenedor Izquierdo (Sidebar) -->
    <div class="col-3 ms-4 sidebar-container">
      <SidebarProfile :user="user" :currentPath="currentPath" />
    </div>

    <!-- Contenedor Derecho 1 -->
    <div class="col-4 container2">
      <div class="content-container">
        <h2>Bienvenido {{ user?.nombre }} {{ user?.apellido }}</h2>
        <div v-if="dataContainer2.length > 0">
          <ul>
            <li v-for="item in dataContainer2" :key="item.inversion_id">
              <p>Cliente ID: {{ item.cliente_id }}</p>
              <p>Nombre Cliente: {{ item.nombre_cliente }}</p>
              <p>Monto de inversión: ${{ item.monto }}</p>
              <p>Fecha de inversión: {{ item.fecha_inversion }}</p>
              <p>Fecha de retorno: {{ item.fecha_retorno }}</p>
              <p>Estado: {{ item.estado === 1 ? 'Activo' : 'Inactivo' }}</p>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No hay datos disponibles para mostrar.</p>
        </div>
      </div>
    </div>

    <!-- Contenedor Derecho 2 -->
    <div class="col-4 container3">
      <div class="content-container">
        <h2>Detalles de Talento Inversión</h2>
        <!-- <div v-if="dataContainer3.length > 0"> -->
          <ul>
            <li v-for="item in dataContainer3.data" :key="item.inversion_id">
              <h4>{{ item.nombre_cliente}}</h4>
              <p>Descripción: {{ item.talento_inversion.descripcion }}</p>
              <p>Monto Total: ${{ item.monto }}</p>
              <p>Cantidad de pagos: {{ item.talento_inversion.cantidad_pagos }}</p> -->
              <p>Fecha de inicio recaudación: {{ item.talento_inversion.fecha_inicio_recaudacion }}</p>
              <p>Fecha de fin recaudación: {{ item.talento_inversion.fecha_fin_recaudacion }}</p>
            </li>
          </ul>
        </div>

        <div v-if="dataContainer3.length > 0" class="timeline">
          <h4>Total recaudado: ${{ item.totalRecaudado }}</h4>
          <h4>Restante a recaudar: ${{ item.restanteRecaudar }}</h4>
        </div>
      </div>
    </div>

</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import SidebarProfile from "@/components/SidebarProfile.vue"; // Importación del componente

const route = useRoute();
const currentPath = route.name;
const user = ref(null);

const dataContainer2 = ref([]); // Datos para el contenedor 2 (Inversiones)
const dataContainer3 = ref([]); // Datos para el contenedor 3 (Detalles de talento inversión)

// Función para cargar datos del API
const loadData = async () => {
  try {
    const responseContainer2 = await axios.get(
      "http://localhost:3000/inversionesRetiros/inversionista/148"
    );
    const responseContainer3 = await axios.get(
      "http://localhost:3000/inversionesRetiros/inversionista/148"
    );

    // Verificar la respuesta de la API
    console.log("Respuesta API Container 2:", responseContainer2.data);
    console.log("Respuesta API Container 3:", responseContainer3.data);

    // Almacenar los datos obtenidos en las variables reactivas
    dataContainer2.value = responseContainer2.data;
    dataContainer3.value = responseContainer3.data;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
  }
};

const totalRecaudado = computed(() => {
  let total = 0;
  for (const item of dataContainer3.value) {
    total += parseFloat(item.talento_inversion.total_recaudado) || 0; // Sumar total_recaudado si existe
  }
  return total;
});

const restanteRecaudar = computed(() => {
  let total = 0;
  for (const item of dataContainer3.value) {
    total += parseFloat(item.talento_inversion.restante_recaudado) || 0; // Sumar restante_recaudado si existe
  }
  return total;
});

// Cargar los datos cuando el componente se monta
onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser); // Guardar en la variable reactiva
  } else {
    console.log("No se encontró el usuario en localStorage");
  }

  loadData(); // Asegúrate de cargar los datos al montar el componente
});
</script>

<style scoped>
/* Estilos para la tabla y línea de tiempo */
.sidebar-container {
  margin-left: 40px;
  width: 300px; /* Aumenta el ancho del sidebar */
  padding: 15px; /* Aumenta el relleno para mejorar el aspecto */
  background-color:none;
  border-radius: 8px;
  box-shadow: none;
}

.content-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.timeline {
  margin-top: 20px;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: none;
}

.timeline h4 {
  margin: 5px 0;
}

.container2, .container3 {
  margin-top: 40px;
}

.custom-card {
  background-color: #f9f7f4;
  box-shadow: none;
  border-radius: 10px;
  margin-left: 0;
  margin-top: 40px;
  text-align: center;
}
</style>

