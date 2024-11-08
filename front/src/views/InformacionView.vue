<template>
  <div class="d-flex justify-content-center align-items-center container">
    <div class="container col-md-6 mt-5 mb-5">
      <form @submit.prevent="registrarInformacion">
        <div class="card shadow">
          <div class="card-body py-5 align-items-center">
            <label class="fw-bold text-center d-block w-100">¡Bienvenid@ {{ nombre }} completa tu registro!</label>
            <h5 class="fw-bold text-center mb-3 custom-color">Registra tu talento</h5>

            <div class="row mb-3">
            
              <div class="col-md-6">
                <label for="ocupacion" class="form-label">Ocupación</label>
                <input
                  type="text"
                  v-model="ocupacion"
                  id="ocupacion"
                  class="form-control"
                  required
                />
              </div>
              
              <div class="col-md-6">
                <label for="descripcion" class="form-label">Descripción</label>
                <input
                  type="text"
                  v-model="descripcion"
                  id="descripcion"
                  class="form-control text-dark"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              
              <div class="col-md-6">
                <label for="monto_inversion" class="form-label">Monto de <br> inversión</label>
                <input
                  type="text"
                  v-model="monto_inversion"
                  id="monto_inversion"
                  class="form-control text-dark"
                  required
                />
              </div>

              <div class="col-md-6">
                <label for="cantidad_maxima_inversiones" class="form-label">Cantidad máxima de inversiones</label>
                <input
                  type="text"
                  v-model="cantidad_maxima_inversiones"
                  id="cantidad_maxima_inversiones"
                  class="form-control text-dark"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              
              <div class="col-md-6">
                <label for="preparacion" class="form-label">Preparación</label>
                <input
                  type="text"
                  v-model="preparacion"
                  id="preparacion"
                  class="form-control text-dark"
                  required
                />
              </div>

              <div class="col-md-6">
                <label for="estudios" class="form-label">Estudios</label>
                <input
                  type="text"
                  v-model="estudios"
                  id="estudios"
                  class="form-control text-dark"
                  required
                />
              </div>
            </div>

            <div class="mb-3">
              <label for="vision" class="form-label">Visión</label>
              <textarea
                v-model="vision"
                id="vision"
                class="form-control text-dark"
                rows="3"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn custom-button rounded-3">
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const cliente_id = ref(""); 
const ocupacion = ref("");
const descripcion = ref("");
const monto_inversion = ref("");
const cantidad_maxima_inversiones = ref("");
const preparacion = ref("");
const estudios = ref("");
const vision = ref("");
const nombre = ref("Usuario");

// Cliente_id desde localStorage
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("usuario"));
  console.log(user);
  if (user) {
    cliente_id.value = user.usuario_id;
    nombre.value = user.nombre; 
  } else {
    alert("Error: No se encontró el cliente_id en localStorage.");
  }
});

// Función registro de información
const registrarInformacion = async () => {
  const datos = {
      
      cliente_id: cliente_id.value,
      ocupacion: ocupacion.value,
      descripcion: descripcion.value,
      monto_inversion: monto_inversion.value,
      cantidad_maxima_inversiones: cantidad_maxima_inversiones.value,
      preparacion: preparacion.value,
      estudios: estudios.value,
      vision: vision.value
    };
console.log(datos);
try {
  const response = await axios.post("http://localhost:3000/users/info", datos);
    alert('Información registrada correctamente');
} catch (error) {
  console.error(error);
  alert("Error al registrar");
}
    
    // Mover la creación de 'datos' dentro de la función para que esté en el alcance adecuado
   
 
};

  
</script>

<style scoped>
.custom-background {
  background-color: var(--violet-2-color);
  height: 100vh;
}

.custom-card {
  background-color: #34312d;
  border: none;
  color: #d9c5b2;
}

.custom-text {
  color: #d9c5b2;
}

.custom-button {
  background-color: #17223B;
  color: #F3F3F4;
  border: none;
}

.custom-button:hover {
  background-color: #F37926;
  color: #fff;
}

input,
textarea {
  background-color: #7e7f8352;
  color: #ffffff;
  border: none;
}

input::placeholder {
  color: #d9c5b2;
}

.form-check-label span {
  color: #14110f;
}

.custom-link {
  color: #14110f;
}

.custom-link:hover {
  color: #7e7f83;
  text-decoration: underline;
}

.custom-color {
  color: rgba(44, 43, 43, 0.753) !important;
}

.d-block {
  text-align: center;
}
</style>
