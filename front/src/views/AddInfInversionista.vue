<template>
  <div class="d-flex justify-content-center align-items-center container">
    <div class="container col-md-6 mt-5 mb-5">
      <form @submit.prevent="addInfoInversionista">
        <div class="card shadow">
          <div class="card-body py-5 align-items-center">
            <label class="fw-bold text-center d-block w-100">¡Bienvenid@ {{ nombre }} completa tu registro!</label>
            <h5 class="fw-bold text-center mb-3 custom-color">Registra tus datos</h5>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="nombre_completo" class="form-label">Nombre completo</label>
                <input
                  type="text"
                  v-model="nombre_completo"
                  id="nombre_completo"
                  class="form-control text-dark"
                  required
                />
              </div>

              <div class="col-md-6">
                <label for="tipo_dni" class="form-label">Tipo de DNI</label>
                <select
                  v-model="tipo_dni"
                  class="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option value="ci">CI</option>
                  <option value="pasaporte">Pasaporte</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="dni" class="form-label">Dni</label>
                <input
                  type="text"
                  v-model="dni"
                  id="dni"
                  class="form-control text-dark"
                  required
                />
              </div>

              <div class="col-md-6">
                <label for="domicilio" class="form-label">Dirección</label>
                <input
                  type="text"
                  v-model="domicilio"
                  id="domicilio"
                  class="form-control text-dark"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="ciudad" class="form-label">Ciudad</label>
                <input
                  type="text"
                  v-model="ciudad"
                  id="ciudad"
                  class="form-control text-dark"
                  required
                />
              </div>
          
                <div class="col-md-6">
                  <label for="fuente_de_ingresos" class="form-label">Fuente de ingresos</label>
                  <input
                    type="text"
                    v-model="fuente_de_ingresos"
                    id="fuente_de_ingresos"
                    class="form-control text-dark"
                    required
                  />
                </div>
    

              <!-- botones de radio -->
            <div class="col-md-6 mt-3">
              <div class="col-md-12">
                <label class="form-label">Situación laboral</label>
                <div class="form-check">
                  <input
                    type="radio"
                    v-model="situacion_laboral"
                    id="empleado"
                    value="Empleado"
                    class="form-check-input"
                  />
                  <label class="form-check-label" for="empleado">Empleado</label>
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    v-model="situacion_laboral"
                    id="independiente"
                    value="Independiente"
                    class="form-check-input"
                  />
                  <label class="form-check-label" for="independiente">Independiente</label>
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    v-model="situacion_laboral"
                    id="estudiante"
                    value="Estudiante"
                    class="form-check-input"
                  />
                  <label class="form-check-label" for="estudiante">Estudiante</label>
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    v-model="situacion_laboral"
                    id="desempleado"
                    value="desempleado"
                    class="form-check-input"
                  />
                  <label class="form-check-label" for="desempleado">Desempleado</label>
                </div>
              </div>
            </div>
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

const id_inversionista = ref(""); 
const nombre_completo= ref("");
const dni = ref("");
const tipo_dni = ref("");
const domicilio = ref("");
const ciudad = ref("");
const situacion_laboral = ref("");
const fuente_de_ingresos = ref("");

// Cliente_id desde localStorage
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("usuario"));
  console.log(user);
  if (user) {
    id_inversionista.value = user.usuario_id;
    console.log(id_inversionista.value);
    nombre_completo.value = user.nombre; 
  } else {
    alert("Error: No se encontró el cliente_id en localStorage.");
  }
});

// Función registro de información
const addInfoInversionista = async () => {
  const datos = {
    id_inversionista: id_inversionista.value,
    nombre_completo: nombre_completo.value,
    dni: dni.value,
    tipo_dni: tipo_dni.value,
    domicilio: domicilio.value,
    ciudad: ciudad.value,
    situacion_laboral: situacion_laboral.value,
    fuente_de_ingresos: fuente_de_ingresos.value
  };
  console.log(datos);
  try {
    const response = await axios.post("http://localhost:3000/clients/addInfoInversionista", datos);
    alert('Información registrada correctamente');
  } catch (error) {
    console.error(error);
    alert("Error al registrar");
  }
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
