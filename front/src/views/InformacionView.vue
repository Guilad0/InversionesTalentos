<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="container col-md-6 mt-5 mb-5">
        <form @submit.prevent="registrarInformacion" class="was-validated" >
          <div class="card shadow">
            <div class="card-body py-2 align-items-center">
              <label class="fw-bold text-center d-block w-100">¡Bienvenid@ {{ nombre }} completa tus datos!</label>
              <h5 class="fw-bold text-center mb-3">Registra tu Talento</h5>
              <br>
              <!-- Botón para volver al Perfil -->
              <div class="back-button1">
                <router-link to="/perfil" class="btn-back">
                  Volver a Perfil
                </router-link>
              </div>

              <div class="row mb-3">

                <div class="col-md-6">
                  <label for="ocupacion" class="form-label">Ocupación *</label>
                  <input type="text" v-model="ocupacion" id="ocupacion" class="form-control input" required />
                  <div class="invalid-feedback">
                    Por favor, llene este campo requerido
                  </div>
                </div>

                <div class="col-md-6">
                  <label for="categoria_persona_id" class="form-label">Categoría *</label>
                  <select id="categoria_persona_id" v-model="categoria_persona_id"
                    class="form-select form-select-sm p-1 input" aria-label="Multiple select example" required>
                    <option disabled selected value="">Selecciona tu Categoría</option>
                    <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                      {{ categoria.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    Por favor, seleccione una opción
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-12">
                  <label for="descripcion" class="form-label">Descripción *</label>
                  <input type="text" v-model="descripcion" id="descripcion" class="form-control input" required />
                  <div class="invalid-feedback">
                    Por favor, llene este campo requerido
                  </div>
                </div>
              </div>
              <div class="row mb-3">

                <div class="col-md-6">
                  <label for="monto_inversion" class="form-label">Cantidad Mínima de Tokens *</label>
                  <input type="text" v-model="monto_inversion" id="monto_inversion" class="form-control input"
                    required />
                  <div class="invalid-feedback">
                    Por favor, llene este campo requerido
                  </div>
                </div>

                <div class="col-md-6">
                  <label for="cantidad_maxima_inversiones" class="form-label">Cantidad Máxima de Tokens *</label>
                  <input type="text" v-model="cantidad_maxima_inversiones" id="cantidad_maxima_inversiones"
                    class="form-control input" required />
                  <div class="invalid-feedback">
                    Por favor, llene este campo requerido
                  </div>
                </div>
              </div>

              <div class="row mb-3">

                <div class="col-md-6">
                  <label for="preparacion" class="form-label">Preparación *</label>
                  <input type="text" v-model="preparacion" id="preparacion" class="form-control input" required />
                  <div class="invalid-feedback">
                    Por favor, llene este campo requerido
                  </div>
                </div>

                <div class="col-md-6">
                  <label for="estudios" class="form-label">Estudios *</label>
                  <input type="text" v-model="estudios" id="estudios" class="form-control input" required />
                  <div class="invalid-feedback">
                    Por favor, llene este campo requerido
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="vision" class="form-label">Visión</label>
                <textarea v-model="vision" id="vision" class="form-control input" rows="3" required></textarea>
                <div class="invalid-feedback">
                  Por favor, llene este campo requerido
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
/* ===== IMPORTACIONES ===== */
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
import iziToast from 'izitoast';

/* ===== PARA VALIDAR ===== */

// Example starter JavaScript for disabling form submissions if there are invalid fields
import {successAlert, errorAlert} from "../helpers/iziToast";

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

/* ===== OBTENER CATEGORÍAS ===== */
const obtenerCategorias = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + '/categories');
    console.log(response.data.results);
    categorias.value = response.data.results;
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
const registrarInformacion = async () => {
  const minimo = parseFloat(monto_inversion.value);
  const maximo = parseFloat(cantidad_maxima_inversiones.value);
  if (minimo > maximo) {
    iziToast.error({
  if(minimo > maximo) {
    /* iziToast.error({
      title: 'Error',
      message: 'La cantidad mínima de tokens debe ser menor a la cantidad máxima de tokens.',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#f00',
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    }); */
    errorAlert('La cantidad mínima de tokens debe ser menor a la cantidad máxima de tokens.','Error')
    return;
  }

  const datos = {
    cliente_id: cliente_id.value,
    ocupacion: ocupacion.value,
    descripcion: descripcion.value,
    monto_inversion: monto_inversion.value,
    cantidad_maxima_inversiones: cantidad_maxima_inversiones.value,
    preparacion: preparacion.value,
    estudios: estudios.value,
    vision: vision.value,
    categoria_persona_id: categoria_persona_id.value
  };

  console.log(datos);

  try {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/info", datos);
    console.log(response.data);

    iziToast.success({
      title: 'Éxito',
      message: 'Información registrada correctamente.',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#198754',
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    });
      /* iziToast.success({
        title: 'Éxito',
        message: 'Información registrada correctamente.',
        messageColor: 'white',
        position: 'topRight',
        theme: 'dark',
        color: '#198754',
        closeOnEscape: true,
        progressBarColor: '#FFFFFF'
      }); */
      successAlert ('Información registrada correctamente.', 'Éxito')

    router.push({ name: 'perfil' });
  } catch (error) {
    console.error(error);

    iziToast.error({
      title: 'Error',
      message: 'Hubo un problema al registrar la información.',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#f00',
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    });
  }

      /* iziToast.error({
        title: 'Error',
        message: 'Hubo un problema al registrar la información.',
        messageColor: 'white',
        position: 'topRight',
        theme: 'dark',
        color: '#f00',
        closeOnEscape: true,
        progressBarColor: '#FFFFFF'
      }); */
      errorAlert ('Hubo un problema al registrar la información.','Error')
    }
  
};
</script>

<style scoped>
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
  font-size: 16px;
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
