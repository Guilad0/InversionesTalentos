<template>
  <div class="custom-background" >
    <div class="container animate__animated animate__fadeIn">
      <div class="container col-md-6 d-flex justify-content-center">
        <form @submit.prevent="addInfoInversionista" novalidate>
          <div class="card custom-card shadow">
            <div class="card-body py-5 align-items-center">
              <label class="fw-bold text-center d-block w-100 custom-subtitle-up">¡Bienvenid@ {{ user?.nombre }} completa tu
                registro!</label>
              <br>
              <h5 class="fw-bold text-center mb-3 custom-color custom-title">Registra tus datos</h5>

              <div class="row mb-4">
                <div class="col-md-6 custom-subtitle input-container ic1">
                  <label for="nombre_completo" class="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    v-model="nombre_completo"
                    id="nombre_completo"
                    pattern="^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*.{3,}$"
                     @input="validarCampoNombre"
                    class="form-control text-dark input"
                    required />
                    <div v-if="errorNombre" class="invalid-feedback fs-custom">{{ errorNombre }}</div>
                </div>
                

                <div class="col-md-6 custom-subtitle input-container ic2">
                  <label for="tipo_dni" class="form-label ">Tipo de Documento</label>
                  <select v-model="tipo_dni" class="form-select input-select" aria-label="Default select example" required>
                    <option value="ci" class="btn-gray ">CI</option>
                    <option value="pasaporte" class="btn-gray ">Pasaporte</option>
                  </select>
                  <div  class="invalid-feedback fs-custom">Debes seleccionar un tipo de DNI</div>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-md-6 custom-subtitle input-container ic3">
                  <label for="dni" class="form-label">Número de Documento</label>
                  <input
                    type="text"
                    v-model="dni"
                    pattern="^[A-Za-z0-9]{7,9}$"
                    id="dni"
                    class="form-control text-dark input"
                    required />
                <div  class="invalid-feedback fs-custom">{{ errorDni }}</div>
                </div>
                <div class="col-md-6 custom-subtitle input-container ic4">
                  <label for="domicilio" class="form-label">Dirección</label>
                  <input
                    type="text"
                    v-model="domicilio"
                    pattern="^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*.{10,}$"
                    id="domicilio"
                    class="form-control text-dark input"
                    required />
                <div  class="invalid-feedback fs-custom">Minimo 10 caracteres </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 custom-subtitle input-container ic5">
                  <label for="ciudad" class="form-label">Ciudad</label>
                  <input
                    type="text"
                    v-model="ciudad"
                    id="ciudad"
                    pattern="^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*.{10,}$"
                    class="form-control text-dark input"
                    required />
                <div  class="invalid-feedback fs-custom">Minimo 10 caracteres </div>
                </div>

                <div class="col-md-6 custom-subtitle input-container ic6">
                  <label for="fuente_de_ingresos" class="form-label">Fuente de Ingresos</label>
                  <input
                    type="text"
                    pattern="^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*.{10,}$"
                    v-model="fuente_de_ingresos"
                    id="fuente_de_ingresos"
                    class="form-control text-dark input"
                    required />
                <div  class="invalid-feedback fs-custom">Minimo 10 caracteres </div>
                </div>


                <!-- botones de radio -->
               
              </div>

              <div class="row pt-2">
              <div class="col">
                <div class="col-md-12">
                  <br>
                  <label class="form-label custom-subtitle">Situación Laboral</label>
                  <div class="form-check">
                    <input type="radio" v-model="situacion_laboral" id="empleado" value="Profesional" 
                      class="form-check-input" />
                    <label class="form-check-label" for="empleado">Profesional</label>
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
                    <input type="radio" v-model="situacion_laboral" id="desempleado" value="Desempleado"
                      class="form-check-input" />
                    <label class="form-check-label" for="desempleado">Desempleado</label>
                  </div>
                </div>
              </div>
            </div>


            <div class="text-center d-flex justify-content-center align-content-center mt-2 ">
              <button  type="submit" class="btn custom-button rounded-3 m-auto">
                <label v-if="loading">Registrar</label>
                <label v-else>Registrar</label>
              </button>
            </div>
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
import { successAlert, errorAlert } from "../helpers/iziToast";
import { getUser, validarNombre } from "@/helpers/utilities";
const errorNombre = ref('')
const errorDni = ref('Solo se permiten letras y numeros')
const validarCampoNombre = () => {
  errorNombre.value = validarNombre(nombre_completo.value);
};

const router = useRouter();
const id_inversionista = ref("");
const nombre_completo = ref("");
const dni = ref("");
const tipo_dni = ref("");
const domicilio = ref("");
const ciudad = ref("");
const situacion_laboral = ref("Profesional");
const fuente_de_ingresos = ref("");
const baseURL = import.meta.env.VITE_BASE_URL;
const user = ref(null)
// Cliente_id desde localStorage
onMounted(async() => {
  user.value =await getUser()
  if (user) {
    id_inversionista.value = user.value.usuario_id;
    nombre_completo.value = user.value.nombre;
  } else {
    alert("Error: No se encontró el cliente_id en localStorage.");
  }
});

// Función para validar el formulario
const validarFormulario = (event) => {
  const form = event.target.closest("form");
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated");
    return false;
  }
  return true;
};

const loading = ref(false)
const addInfoInversionista = async (event) => {
  if (!validarFormulario(event)) return;
  if ( tipo_dni.value == 'ci' && !/^\d{8}$/.test(dni.value)) {
  errorAlert('La cédula de identidad debe tener exactamente 8 dígitos numéricos.','Error')
  dni.value = ''
  errorDni.value = 'Formato no valido'
  return;
}
  if ( tipo_dni.value == 'pasaporte' && !/^[A-Z]\d{8}$/.test(dni.value)) {
      dni.value = ''
  errorDni.value = 'Formato no valido'
    errorAlert('El número de pasaporte debe comenzar con una letra mayuscula, seguida de 8 dígitos numéricos.', 'Error');
    return;
}
  const datos = {
    id_inversionista: id_inversionista.value,
    nombre_completo: nombre_completo.value.trim(),
    dni: dni.value,
    tipo_dni: tipo_dni.value,
    domicilio: domicilio.value.trim(),
    ciudad: ciudad.value.trim(),
    situacion_laboral: situacion_laboral.value,
    fuente_de_ingresos: fuente_de_ingresos.value.trim(),
  };

  console.log(datos);
  loading.value = true
  try {
    await axios.post(baseURL + "/clients/addInfoInversionista", datos);
    setTimeout(() => {
      loading.value = false
    }, 500);
    successAlert("Información registrada correctamente", "Felicidades");
    router.push({ name: "perfil" });
  } catch (error) {
    console.error(error);
    errorAlert("Error al registrar, intente de nuevo", "Error");
  }

  
};
</script>

<style scoped>
.fs-custom{
  font-size: 0.6rem;
}
.custom-background {
  background-image: url("@/assets/images/otro-fondo3.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: rgba(0, 0, 0, 0.563);
  background-blend-mode: overlay;
  min-height: 100vh;
  display: flex;
  align-items: center;
  /* Centra verticalmente el formulario */
  justify-content: center;
  /* Centra horizontalmente el formulario */
}

.custom-card {
  background-color: rgba(255, 255, 255, 0.877);
  border-radius: 20px;
  box-sizing: border-box;
  height: 640px;
  padding: 15px 20px;
  width: 520px;
}

.custom-title {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
  font-size: 32px;
  font-weight: 700;
  margin-top: -20px;
  text-transform: uppercase;
}

.custom-subtitle {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
  font-size: 15px;
  font-weight: 700;
  margin-top: -15px;
}

.custom-subtitle-up {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
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

.input-select {
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

.input-select:focus {
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
  font-family: var(--font-montserrat);
  font-size: 18px;
}

.custom-button:hover {
  background-color: #F37926;
  color: #fff;
}

input[type="checkbox"]:checked {
  background-color: #F37926;
  border-color: #F37926;
}

.form-check-input:checked {
  background-color: #F37926;
  border-color: #F37926;
}
</style>
