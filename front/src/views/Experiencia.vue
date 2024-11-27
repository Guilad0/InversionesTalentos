<template>
  <div class="background">
    <div class="overlay  "></div>
    <div class="form animate__animated animate__fadeIn">
      <div class="title">¡Bienvenid@ {{ user?.nombre }}!</div>
      <div class="subtitle">Completa tu Registro</div>
      <br>
      <!-- Botón para volver al Perfil -->
      <!-- <div class="back-button1">
        <router-link to="/perfil" class="btn-back">
          Volver a Perfil
        </router-link>
      </div> -->


      <form @submit.prevent="registrarExperiencia" novalidate >
        <div class="row mb-3">
          <div class="col mb-6">
            <div class="input-container">
              <label for="institucion" class="label">Institución</label>
              <input
                id="institucion"
                v-model="institucion"
                ref="refInstitucion"
                type="text"
                class="input form-control"
                required />
                <div class="ms-2 invalid-feedback fs-custom">
                    Campo requerido, minimo 5 caracteres
                  </div>
            </div>
          </div>

          <div class="col mb-6">
            <div class="input-container">
              <label for="cargo" class="label">Cargo</label>
              <input
                id="cargo"
                v-model="cargo"
                ref="refCargo"
                type="text"
                class="input form-control"
                required />
                <div class="ms-2 invalid-feedback fs-custom">
                    Campo requerido, minimo 5 caracteres
                  </div>
            </div>
          </div>

        </div>

        <div class="input-container2">
          <label for="actividades" class="label">Actividades</label>
          <textarea
            id="actividades"
            ref="refActividades"
            v-model="descripcion"
            pattern="^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*.{3,}$"
            class="input form-control"
            rows="3"
            required></textarea>
            <div class="ms-2 invalid-feedback fs-custom">
                    Campo requerido, minimo 5 caracteres
                  </div>
        </div>
        <div class="row mb-3">
          <div class="col mb-6">
            <div class="input-container">
              <label for="fecha_inicio" class="label">Fecha Inicio</label>
              <input ref="refMinDate" id="fecha_inicio" v-model="fecha_inicio" type="date" class="input form-control" required />
            </div>
          </div>
          <div class="col mb-6">
            <div class="input-container">
              <label for="fecha_final" class="label">Fecha Final</label>
              <input ref="refMaxDate" id="fecha_final" v-model="fecha_final" type="date" class="input form-control" required />
            </div>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn-gray mt-3 btn">Registrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
import iziToast from 'izitoast';
import {successAlert, errorAlert} from "../helpers/iziToast";

const router = useRouter();
const cliente_id = ref("");
const descripcion = ref("");
const institucion = ref("");
const cargo = ref("");
const fecha_inicio = ref("");
const fecha_final = ref("");
const refMinDate = ref("");
const refActividades = ref("");
const refCargo = ref("");
const refInstitucion = ref("");
const refMaxDate = ref("");
const minDate = ref("1970-01-01");
const maxDate = ref(new Date().toISOString().split("T")[0]);

// Obtener el cliente_id desde localStorage al montar el componente
const user = ref(JSON.parse(localStorage.getItem("usuario")));
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


onMounted(() => {
  console.log(user.value);
  if (user) {
    cliente_id.value = user.value.usuario_id;
  } else {
    // Alerta de error si no se encuentra el cliente_id en localStorage
    iziToast.error({
      title: 'Error',
      message: 'Usuario no valido para esta seccion',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#FF3B30', // Color de fondo rojo para el error
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    });

  }
});

// Función para registrar la experiencia
const registrarExperiencia = async ( event ) => {
  if (!validarFormulario(event)) return;
  if (institucion.value && institucion.value.trim().replace(/[^A-Za-z]/g, "").length <= 5) {
  institucion.value = (institucion.value.trim() =='')? '': institucion.value;
  refInstitucion.value.focus();
  errorAlert('La institución debe contener más de 5 letras.', 'Error');
  return;
}
  if (cargo.value && cargo.value.trim().replace(/[^A-Za-z]/g, "").length <= 5) {
    cargo.value = (cargo.value.trim() =='')? '': cargo.value;
    refCargo.value.focus()
  errorAlert('El campo cargo  debe contener más de 5 letras.', 'Error');
  return;
}

  if (descripcion.value && descripcion.value.trim().replace(/[^A-Za-z]/g, "").length <= 5) {
    descripcion.value = (descripcion.value.trim() =='')? '': descripcion.value;
    refActividades.value.focus();
    errorAlert('La descripción no puede estar vacía ni contener solo espacios.', 'Error')
  return
} 
  if( fecha_inicio.value <= minDate.value ){
    errorAlert('Fecha de inicio no valida.', 'Error')
    refMinDate.value.focus()
    return
  }
  if( fecha_final.value > maxDate.value ){
    errorAlert('Fecha de inicio no valida.', 'Error')
    refMaxDate.value.focus()
    return
  }
  if( fecha_inicio.value >= fecha_final.value ){
    errorAlert('La fecha de inicio no puede ser mayor a la fecha final.', 'Error')
    refMinDate.value.focus()
    return
  }

  const datos = {
    cliente_id: cliente_id.value,
    actividades: descripcion.value.trim(),
    fecha_inicio: fecha_inicio.value,
    fecha_final: fecha_final.value,
    cargo: cargo.value.trim(),
    institucion: institucion.value.trim()
  };
  console.log(datos);
  try {
      await axios.post(import.meta.env.VITE_BASE_URL + "/experiencia", datos);
    // Limpiar los campos después de registrar
    descripcion.value = "";
    fecha_inicio.value = "";
    fecha_final.value = "";
    cargo.value = "";
    institucion.value = "";
    successAlert('Experiencia registrada correctamente','¡Éxito!')
    // Redirigir al perfil
    router.push({ name: 'perfil' });
  } catch (error) {
    console.error(error);
    errorAlert('Hubo un problema al registrar la experiencia.', 'Error')
    window.location.reload();
  }

};
</script>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  position: relative;
  background-image: url('@/assets/images/otro-fondo3.png');
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
  background-color: rgba(4, 4, 4, 0.563);
  ;
  /* Fondo negro con opacidad del 50% */
  z-index: 1;
  /* Asegura que la capa de opacidad esté encima de la imagen */
}

.form {
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.877);
  border-radius: none;
  box-sizing: border-box;
  padding: 30px;
  width: 500px;
  z-index: 2;
}

.title {
  color: #17223B;
  font-family: var(--font-montserrat-bold);
  font-size: 30px;
  font-weight: 700;
  margin-top: 10px;
  text-align: center;
}

.subtitle {
  color: #17223B;
  font-family: sans-serif;
  font-size: 26px;
  font-weight: 600;
  margin-top: 5px;
  text-align: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
}

.label {
  color: #17223B;
  font-family: sans-serif;
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
}

.input {
  background-color: rgba(44, 46, 51, 0.8);
  color: #F3F3F4;
  border-radius: 12px;
  border: none;
  font-size: 18px;
  padding: 8px 20px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  height: 38px;
  /* Altura fija para los inputs */
}

.input:focus {
  background-color: var(--white-color);
  border: 2px solid #F37926 !important;
  outline: none;
  box-shadow: none;
  color: black;
}

.submit {
  background-color: #17223B;
  border-radius: 12px;
  border: none;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  text-align: center;
  width: 100%;
}

.submit:hover {
  background-color: #F37926;
  color: #fff;
}

textarea.input {
  height: auto;
}

.submit:active {
  background-color: #F37926;
}

.input:focus {
  background-color: white;
  color: black;
  /* Fondo blanco cuando el campo está en foco */
  border-color: #80bdff;
  /* Color del borde */
  outline: none;
  /* Elimina el contorno */
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
/*resposividad*/
@media (max-width: 768px) {
  .form {
    width: 80%;
    padding: 20px;
  }

  .title {
    font-size: 24px;
  }

  .subtitle {
    font-size: 22px;
  }

  .input {
    font-size: 16px;
    padding: 6px 10px;
  }

  .submit {
    font-size: 16px;
    height: 45px;
  }

  .back-button1 {
    margin: 5px;
  }
}

@media (max-width: 480px) {
  .form {
    width: 85%;
    padding: 15px;
  }

  .title {
    font-size: 20px;
  }

  .subtitle {
    font-size: 18px;
  }

  .input {
    font-size: 14px;
  }

  .submit {
    font-size: 14px;
    height: 40px;
  }

  .back-button1 {
    margin: 5px;
  }

  .btn-back {
    font-size: 14px;
    padding: 8px 16px;
  }
}

@media (max-width: 360px) {
  .form {
    width: 95%;
    padding: 15px;
  }

  .title {
    font-size: 18px;
  }

  .subtitle {
    font-size: 16px;
  }

  .input {
    font-size: 14px;
    padding: 6px 10px;
  }

  .submit {
    font-size: 14px;
    height: 40px;
  }

  .back-button1 {
    margin: 5px;
  }
}

@media (max-height: 600px) {
  .form {
    padding: 10px;
    width: 100%;
    height: auto;
  }

  .title {
    font-size: 18px;
  }

  .subtitle {
    font-size: 14px;
  }

  .submit {
    height: 40px;
    font-size: 14px;
  }

  .input {
    height: 35px;
  }

  .back-button1 {
    margin: 5px;
  }

  .input-container {
    margin-top: 10px;
  }
}
</style>
