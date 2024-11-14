<template>
  <div class="custom-background">
    <div class="d-flex justify-content-center align-items-center container">
      <div class="container col-md-6 mt-5 mb-5">
        <form @submit.prevent="addInfoInversionista">
          <div class="card custom-card shadow">
            <div class="card-body py-5 align-items-center">
              <label class="fw-bold text-center d-block w-100 custom-subtitle-up">¡Bienvenid@ {{ nombre }} completa tu
                registro!</label>
              <br>
              <h5 class="fw-bold text-center mb-3 custom-color custom-title">Registra tus datos</h5>

              <div class="row mb-3">
                <div class="col-md-6 custom-subtitle input-container ic1">
                  <label for="nombre_completo" class="form-label">Nombre completo</label>
                  <input type="text" v-model="nombre_completo" id="nombre_completo" class="form-control text-dark input"
                    required />
                </div>

                <div class="col-md-6 custom-subtitle input-container ic2">
                  <label for="tipo_dni" class="form-label ">Tipo de DNI</label>
                  <select v-model="tipo_dni" class="form-select" aria-label="Default select example" required>
                    <option value="ci">CI</option>
                    <option value="pasaporte">Pasaporte</option>
                  </select>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 custom-subtitle input-container ic3">
                  <label for="dni" class="form-label">Dni</label>
                  <input type="text" v-model="dni" id="dni" class="form-control text-dark input" required />
                </div>

                <div class="col-md-6 custom-subtitle input-container ic4">
                  <label for="domicilio" class="form-label">Dirección</label>
                  <input type="text" v-model="domicilio" id="domicilio" class="form-control text-dark input" required />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 custom-subtitle input-container ic5">
                  <label for="ciudad" class="form-label">Ciudad</label>
                  <input type="text" v-model="ciudad" id="ciudad" class="form-control text-dark input" required />
                </div>

                <div class="col-md-6 custom-subtitle input-container ic6">
                  <label for="fuente_de_ingresos" class="form-label">Fuente de ingresos</label>
                  <input type="text" v-model="fuente_de_ingresos" id="fuente_de_ingresos"
                    class="form-control text-dark input" required />
                </div>


                <!-- botones de radio -->
                <div class="col-md-6 mt-3">
                  <div class="col-md-12">
                    <br>
                    <label class="form-label custom-subtitle">Situación laboral</label>
                    <div class="form-check">
                      <input type="radio" v-model="situacion_laboral" id="empleado" value="Empleado"
                        class="form-check-input" />
                      <label class="form-check-label" for="empleado">Empleado</label>
                    </div>
                    <div class="form-check">
                      <input type="radio" v-model="situacion_laboral" id="independiente" value="Independiente"
                        class="form-check-input" />
                      <label class="form-check-label" for="independiente">Independiente</label>
                    </div>
                    <div class="form-check">
                      <input type="radio" v-model="situacion_laboral" id="estudiante" value="Estudiante"
                        class="form-check-input" />
                      <label class="form-check-label" for="estudiante">Estudiante</label>
                    </div>
                    <div class="form-check">
                      <input type="radio" v-model="situacion_laboral" id="desempleado" value="desempleado"
                        class="form-check-input" />
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

  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
const router = useRouter();
const id_inversionista = ref("");
const nombre_completo = ref("");
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
    router.push({ name: 'perfil' });
  } catch (error) {
    console.error(error);
    alert("Error al registrar");
  }
};
</script>

<style scoped>
.custom-background {
  background-image: url("@/assets/images/otro-fondo3.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  align-items: center;
  /* Centra verticalmente el formulario */
  justify-content: center;
  /* Centra horizontalmente el formulario */
}

.custom-card {
  background-color: var(--white-color);
  border-radius: 20px;
  box-sizing: border-box;
  height: 640px;
  padding: 15px 20px;
  width: 520px;
}

.custom-title {
  color: var(--gray-color);
  font-family: sans-serif;
  font-size: 28px;
  font-weight: 600;
  margin-top: -20px;
}

.custom-subtitle {
  color: var(--gray-color);
  font-family: sans-serif;
  font-size: 15px;
  font-weight: 600;
  margin-top: -15px;
}

.custom-subtitle-up {
  color: var(--gray-color);
  font-family: sans-serif;
  font-size: 15px;
  font-weight: 600;
  margin-top: -15px;
}


.input-container {
  height: 50px;
  position: relative;
  width: 50%;
}

.ic1 {
  margin-top: 15px;
}

.ic2 {
  margin-top: 15px;
}

.ic3 {
  margin-top: 15px;
}

.ic4 {
  margin-top: 15px;
}

.ic5 {
  margin-top: 15px;
}

.ic6 {
  margin-top: 15px;
}

.input {
  background-color: rgba(44, 46, 51, 0.8);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: var(--white-color) !important;
  font-size: 18px;
  height: 80%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.input:focus {
  color: #17223B !important;
  background-color: var(--white-color);
  border: 2px solid #F37926; 
  outline: none; 
  box-shadow: none;
  color: black;
}


.custom-button {
  background-color: #17223B;
  color: #F3F3F4;
  border: none;
  margin-top: 25px;
}

.custom-button:hover {
  background-color: #F37926;
  color: #fff;
}
</style>
