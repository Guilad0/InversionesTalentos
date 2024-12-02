<template>
  <div class="custom-background">
    <div class="d-flex justify-content-center align-items-center container">
      <div class="container col-md-6 mt-5 mb-5">
        <form @submit.prevent="guardarCambios">
          <div class="card shadow">
            <div class="card-body py-5 align-items-center">
              <h5 class="fw-bold text-center mb-3 custom-color custom-title">
                Cambiar Contraseña
              </h5>
              <div class="back-button1">
                <router-link to="/perfil" class="btn-back"> Volver a Perfil </router-link>
              </div>

              <div class="row mb-3">
                <div class="col-md-12 custom-subtitle ic1">
                  <label for="correo" class="form-label">
                    Ingresa el correo con el que te registraste
                  </label>
                  <input type="email" v-model="correo" id="correo" class="form-control input" required />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-8 custom-subtitle ic2">
                  <label for="old_pass" class="form-label">Ingresa tu Contraseña actual</label>
                  <input type="password" v-model="old_pass" id="old_pass" class="form-control input" required />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-8 custom-subtitle ic2">
                  <label>Ingresa tu nueva Contraseña <label class="text-danger">*</label></label>
                  <input
                    :type="typeInput"
                    @input="handlePassword"
                    v-model="new_pass"
                    @invalid="handleInvalid"
                    id="new_pass"
                    class="form-control input"
                    required
                    :class="{ 'is-invalid': new_pass_error, 'is-valid': !new_pass_error && new_pass.length > 0 }"
                    style="height: 40px;"
                    placeholder=""
                  />
                  <i
                    v-if="typeInput === 'text'"
                    class="fa-solid fa-eye-slash cursor custom-abs-icon-eye"
                    @click="showPass"
                  ></i>
                  <i
                    v-if="typeInput === 'password'"
                    class="fa fa-eye custom-abs-icon-eye cursor"
                    @click="showPass"
                  ></i>
                  <div class="invalid-feedback">
                    <ul class="text-danger">
                      <li v-if="new_pass.length < 8">Debe tener más de 7 caracteres</li>
                      <li v-if="!haveLetter(new_pass)">Debe contener al menos una letra minúscula</li>
                      <li v-if="!haveLetterCapital(new_pass)">Debe contener al menos una letra mayúscula</li>
                      <li v-if="!tieneNumero(new_pass)">Debe contener al menos un número</li>
                      <li v-if="!tieneCaracterEspecial(new_pass)">Debe contener al menos un caracter especial</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-8 custom-subtitle ic2">
                  <label>Confirmar Contraseña <label class="text-danger">*</label></label>
                  <input
                    :type="typeInput"
                    v-model="repeat_pass"
                    id="repeat_pass"
                    :class="{ 'is-invalid': new_pass !== repeat_pass && repeat_pass.length > 0, 'is-valid': new_pass === repeat_pass && repeat_pass.length > 0 }"
                    class="form-control input"
                    @invalid="handleInvalid"
                    @input="validatePasswordsMatch"
                    required
                    style="height: 40px;"
                    placeholder=""
                  />
                  <p v-if="mensajeErrorRepetir" class="text-danger">Las Contraseñas No Coinciden</p>
                </div>
              </div>

              <button type="submit" class="btn custom-button rounded-3">Guardar Cambios</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { successAlert, errorAlert } from "../helpers/iziToast";
import { haveLetter, haveLetterCapital, tieneNumero, tieneCaracterEspecial, validatePassword } from '@/helpers/validatorsForm';

const route = useRouter();
const baseUrl = import.meta.env.VITE_BASE_URL + "/auth/update-password";
const old_pass = ref("");
const new_pass = ref("");
const repeat_pass = ref("");
const correo = ref("");

const typeInput = ref('password');
const controlPassword = ref(null);
const new_pass_error = ref(false);
const mensajeErrorRepetir = ref(false);

const handleInvalid = (event) => {
  event.target.setCustomValidity('Por favor, completa este campo');
};

const handlePassword = () => {
  new_pass_error.value = !validatePassword(new_pass.value);
  controlPassword.value = !new_pass_error.value;
};

const showPass = () => {
  typeInput.value = (typeInput.value === 'password') ? 'text' : 'password';
};

const validatePasswordsMatch = () => {
  mensajeErrorRepetir.value = new_pass.value !== repeat_pass.value;
};

const validPass = () => {
  validatePasswordsMatch();
  handlePassword();
  return !new_pass_error.value && !mensajeErrorRepetir.value;
};

const guardarCambios = async () => {
  if (!validPass()) {
    errorAlert("Las contraseñas no coinciden o no cumplen con los requisitos", "Error");
    return;
  }

  const datos = {
    correo: correo.value,
    oldPassword: old_pass.value,
    newPassword: new_pass.value,
  };
  
  try {
    const response = await axios.post(baseUrl, datos);
    successAlert("Contraseña actualizada correctamente", "Exito");
    setTimeout(() => {
      route.push({ path: "/" });
    }, 1000);
  } catch (error) {
    if (error.response.status === 404) {
      errorAlert("Usuario no encontrado", "Error");
    } else if (error.response.status === 400) {
      errorAlert("Contraseña antigua incorrecta", "Error");
    } else {
      errorAlert("Error al actualizar la contraseña", "Error");
    }
  }
};
</script>

<style scoped>
.custom-background {
  background-image: url("@/assets/images/otro-fondo3.png");
  background-color: rgba(0, 0, 0, 0.563);
  background-blend-mode: overlay;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-card {
  background-color: rgba(255, 255, 255, 0.877);
  border-radius: 20px;
  box-sizing: border-box;
  height: 330px;
  padding: 20px;
  width: 520px;
}

.custom-title {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
  font-size: 28px;
  font-weight: 700;
  margin-top: -20px;
  text-transform: uppercase;
}

.custom-subtitle {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
  font-size: 18px;
  font-weight: 600;
  margin-top: 5px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 50%;
}

.ic1 {
  margin-top: 10px;
}

.ic2 {
  margin-top: 20px;
}

.input {
  background-color: rgba(44, 46, 51, 0.8);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: var(--white-color) !important;
  font-size: 18px;
  height: 40px; /* Altura coherente para todos los campos */
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.input:focus {
  color: #17223b !important;
  background-color: var(--white-color);
  border: 2px solid #f37926;
  outline: none;
  box-shadow: none;
  color: black;
}

.custom-button {
  background-color: #17223b;
  color: #f3f3f4;
  border: none;
  margin-top: 55px;
}

.custom-button:hover {
  background-color: #f37926;
  color: #fff;
}

.back-button1 {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  margin-top: 1px;
}

.btn-back {
  padding: 10px 20px;
  background-color: #17223b;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
}

.btn-back:hover {
  background-color: #f37926;
  color: #fff;
}

</style>
