<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="container col-md-6 mt-5 mb-5">
        <form @submit.prevent="registrarInformacion" novalidate >
          <div class="card shadow">
            <div class="card-body py-2 align-items-center">
              <label class="fw-bold text-center d-block w-100">¡Bienvenid@ {{ nombre }} completa tus datos!</label>
              <h5 class="fw-bold text-center mb-3">Registra tu Talento</h5>
              <br>
              <!-- Botón para volver al Perfil -->
              <!-- <div class="back-button1">
                <router-link to="/perfil" class="btn-back">
                  Volver a Perfil
                </router-link>
              </div> -->

              <div class="row mb-3">

                <div class="col-md-6">
                  <label for="ocupacion" class="form-label">Ocupación <code>*</code> </label>
                  <input
                    type="text"
                    v-model="ocupacion"
                    id="ocupacion"
                    class="form-control input"
                    required
                    pattern="^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*.{5,}$"

                    />
                  <div class="invalid-feedback fs-custom">Campo requerido, minimo 5 caracteres</div>
                </div>

                <div class="col-md-6">
                  <label for="categoria_persona_id" class="form-label">Categoría <code>*</code></label>
                  <select id="categoria_persona_id" v-model="categoria_persona_id"
                    class="form-select form-select-sm p-1 input" aria-label="Multiple select example" required>
                    <option disabled selected value="" >Selecciona tu Categoría</option>
                    <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.categoria_persona_id" class="btn-grayz">
                      {{ categoria.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback fs-custom">
                    Campo requerido, minimo 5 caracteres
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-12">
                  <label for="descripcion" class="form-label">Descripción <code>*</code></label>
                  <input
                    type="text"
                    v-model="descripcion"
                    id="descripcion"
                    class="form-control input"
                    required
                    pattern="^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*.{5,}$"                    />
                  <div class="invalid-feedback fs-custom">
                    Campo requerido, minimo 5 caracteres
                  </div>
                </div>
              </div>
              <div class="row mb-3">

                <div class="col-md-6">
                  <label for="monto_inversion" class="form-label">Cantidad Mínima de Tokens <code>*</code></label>
                  <input type="number" v-model="monto_inversion" id="monto_inversion" class="form-control input"
                    required min="0"  ref="minRef"/>
                  <div class="invalid-feedback fs-custom">
                    Campo requerido
                  </div>
                </div>

                <div class="col-md-6">
                  <label for="cantidad_maxima_inversiones" class="form-label">Cantidad Máxima de Tokens <code>*</code></label>
                  <input ref="maxRef" type="number" v-model="cantidad_maxima_inversiones" id="cantidad_maxima_inversiones"
                    class="form-control input" required min="0" />
                  <div class="invalid-feedback fs-custom">
                    Campo requerido
                  </div>
                </div>
              </div>

              <div class="row mb-3">

                <div class="col-md-6">
                  <label for="preparacion" class="form-label">Preparación <code>*</code></label>
                  <input
                    type="text"
                    v-model="preparacion"
                    id="preparacion"
                    pattern="^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*.{5,}$"
                    class="form-control input"
                    required />
                  <div class="invalid-feedback fs-custom">
                    Campo requerido, minimo 5 caracteres
                  </div>
                </div>

                <div class="col-md-6">
                  <label for="estudios" class="form-label">Estudios <code>*</code></label>
                  <input
                    type="text"
                    v-model="estudios"
                    id="estudios"
                    pattern="^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*.{5,}$"
                    class="form-control input"
                    required />
                  <div class="invalid-feedback fs-custom">
                    Campo requerido, minimo 5 caracteres
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="vision" class="form-label">Visión <code>*</code></label>
                <textarea ref="visionRef"   v-model="vision" id="vision" pattern="^(?!\s*$)([A-Za-z]+(\s[A-Za-z]+)*){15,}$" class="form-control " rows="3"  required ></textarea>
                <div v-if="visionError" class="invalid-feedback">
                El campo debe contener al menos 15 caracteres y no solo espacios.
              </div>
              </div>
             <div class="text-center mt-4">
              <button :disabled="loading" type="submit" class="btn custom-button rounded-3">
                Registrar
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
/* ===== IMPORTACIONES ===== */
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
import iziToast from 'izitoast';

/* ===== PARA VALIDAR ===== */

// Example starter JavaScript for disabling form submissions if there are invalid fields
import {successAlert, errorAlert} from "../helpers/iziToast";
const visionError = ref(false)
const errMin = ref('Campo requerido')

/* ===== VARIABLES Y REFERENCIAS ===== */
const router = useRouter();
const cliente_id = ref("");
const ocupacion = ref("");
const descripcion = ref("");
const monto_inversion = ref("");
const cantidad_maxima_inversiones = ref("");
const preparacion = ref("");
const estudios = ref("");
const vision = ref("");
const nombre = ref("Usuario");
const categoria_persona_id = ref(""); // Referencia para categoría
const categorias = ref([]); // Array para almacenar las categorías

/* ===== OBTENER CLIENTE DESDE LOCALSTORAGE ===== */
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("usuario"));
  console.log(user);
  if (user) {
    cliente_id.value = user.usuario_id;
    nombre.value = user.nombre;
  } else {
    /* iziToast.error({
      title: 'Error',
      message: 'No se encontró el cliente_id en localStorage.',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#f00',
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    }); */
    errorAlert('No se encontró el cliente_id en localStorage.', 'Error')
  }
  obtenerCategorias();
});

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

/* ===== OBTENER CATEGORÍAS ===== */
const obtenerCategorias = async () => {

  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + '/categories');
    console.log(response.data.results);
    categorias.value = response.data.results;
    categorias.value = categorias.value.filter(categoria => categoria.nombre !== "sin categoria ");
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    /* iziToast.error({
      title: 'Error',
      message: 'No se pudieron cargar las categorías.',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#f00',
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    }); */
    errorAlert('No se pudieron cargar las categorías.','Error')
  }
};

/* ===== REGISTRAR INFORMACIÓN ===== */
const visionRef = ref(null)
const minRef = ref(null)
const maxRef = ref(null)
const loading = ref(false)
const registrarInformacion = async () => {
  // Validar valores numéricos
  if (!validarFormulario(event)) return;
  const minimo = parseFloat(monto_inversion.value);
  const maximo = parseFloat(cantidad_maxima_inversiones.value);

  if (isNaN(minimo) || isNaN(maximo)) {
    errorAlert("Los valores de inversión deben ser numéricos.", "Error");
    return;
  }
  
  if (minimo > maximo) {
    minRef.value.focus()
    errorAlert(
      "La cantidad mínima de tokens debe ser menor a la cantidad máxima de tokens.",
      "Error"
    );
    monto_inversion.value = ''
cantidad_maxima_inversiones.value = ''
    return;
  }
  if( vision.value.length < 16 ){
    visionRef.value.focus();
    errorAlert(
      "La vision debe tener al menos 15 caracteres.",
      "Error"
    );
  }

  const datos = {
    cliente_id: cliente_id.value,
    ocupacion: ocupacion.value.trim(),
    descripcion: descripcion.value.trim(),
    monto_inversion: monto_inversion.value,
    cantidad_maxima_inversiones: cantidad_maxima_inversiones.value,
    preparacion: preparacion.value.trim(),
    estudios: estudios.value.trim(),
    vision: vision.value.trim(),
    categoria_persona_id: categoria_persona_id.value,
  };

  console.log("Datos enviados:", datos);

  try {
    loading.value = true
    // Realizar solicitud POST
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/info`,
      datos
    );
    console.log("Respuesta del servidor:", response.data);

    // Mostrar mensaje de éxito
    successAlert("Información registrada correctamente.", "Éxito");

    // Redirigir al perfil
    router.push({ name: "perfil" });
  } catch (error) {
    console.error("Error en el registro:", error);

    // Mostrar mensaje de error
    errorAlert("Hubo un problema al registrar la información.", "Error");
  }finally{
    loading.value = false
  }
};

</script>

<style scoped>
.fs-custom{
  font-size: 0.8rem;
  color:red !important;
  
}
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Corregir el error de sintaxis */
  margin: 0;
  position: relative;
  /* Asegura que el overlay se posicione bien dentro de este contenedor */
  background-image: url('@/assets/images/otro-fondo4.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Asegura que el overlay cubra toda la altura del fondo */
  background-color: rgba(4, 4, 4, 0.563);
  /* Fondo negro con opacidad */
  z-index: 1;
  /* Asegura que el overlay esté debajo del formulario */
}

.card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  padding: 30px;
  z-index: 2;
}

.card-body {
  padding: 20px;
}

label {
  color: #17223B;
  font-family: sans-serif;
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: bold;
}

h5 {
  color: #17223B;
  font-family: sans-serif;
  font-size: 22px;
  margin-bottom: 15px;
}

input,
textarea,
select {
  background-color: rgba(44, 46, 51, 0.8);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: var(--white-color);
  font-size: 16px;
  height: 38px;
  outline: 0;
  padding: 8px 15px;
  width: 100%;
}

input:focus,
textarea:focus,
select:focus {
  background-color: var(--white-color);
  border: 2px solid #F37926;
  outline: none;
  box-shadow: none;
  color: black;
}

textarea {
  resize: none;
}

button {
  background-color: #17223B;
  color: #F3F3F4;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #F37926;
  color: #F3F3F4;
}

button:focus {
  outline: none;
}

.custom-color {
  color: rgba(44, 43, 43, 0.753);
}

.custom-link:hover {
  color: #F37926;
  text-decoration: underline;
}

.d-block {
  text-align: center;
  margin-top: 1px;
  font-size: 26px;
}

.back-button1 {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  margin-top: 1px;
}

.btn-back {
  padding: 10px 20px;
  background-color: #17223B;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
}

.btn-back:hover {
  background-color: #F37926;
  color: #fff;
}
</style>
