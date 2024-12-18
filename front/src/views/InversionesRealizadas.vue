<template>
          
        </div>
        <div v-else>
          <p>No hay detalles disponibles para mostrar.</p>
        </div>

        <div v-if="dataContainer3.length > 0" class="timeline">
          <h4>Total recaudado: ${{ item.totalRecaudado }}</h4>
          <h4>Restante a recaudar: ${{ item.restanteRecaudar }}</h4>
        </div>
      </div>
    </div>

    <!-- Contenedor Derecho -->
    <div class="col-4 container2">
      <div class="content-container">
        <h2>Bienvenido</h2>
        <p>Aquí puedes gestionar tus datos, revisar inversiones y más.</p>
        <!-- Añade más contenido aquí -->
      </div>
    </div>
    <div class="col-4 container3">
      <div class="content-container">
        <h2>Bienvenido</h2>
        <p>Aquí puedes gestionar tus datos, revisar inversiones y más.</p>
        <!-- Añade más contenido aquí -->
      </div>
    </div>
  </div>
</template>

<script setup>

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


<style scoped>
/* Estilos para la tabla y línea de tiempo */
.sidebar-container {
  margin-left: 40px;
  width: 350px; /* Aumenta el ancho del sidebar */
  padding: 15px; /* Aumenta el relleno para mejorar el aspecto */
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.content-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

}
</style>
