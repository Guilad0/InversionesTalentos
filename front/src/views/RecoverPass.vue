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
              <!-- Botón para volver al Perfil -->
              <div class="back-button1">
                <router-link to="/perfil" class="btn-back">
                  Volver a Perfil
                </router-link>
              </div>

              <div class="row mb-3">
                <div class="col-md-12 custom-subtitle ic1">
                  <label for="correo" class="form-label">Ingresa el correo con el que te registraste</label>
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
                  <label for="new_pass" class="form-label">Ingresa tu nueva Contraseña</label>
                  <input type="password" v-model="new_pass" id="new_pass" class="form-control input" required />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-8 custom-subtitle ic2">
                  <label for="repeat_pass" class="form-label">Repetir Contraseña</label>
                  <input type="password" v-model="repeat_pass" id="repeat_pass" class="form-control input" required />
                  <p v-if="mensajeErrorRepetir" class="text-danger">
                    Las Contraseñas No Coinciden
                  </p>
                </div>
              </div>

              <button type="submit" class="btn custom-button rounded-3">
                Guardar Cambios
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
import iziToast from "izitoast";
import { useRouter } from 'vue-router';
const route = useRouter();
const baseUrl = import.meta.env.VITE_BASE_URL + "/auth/update-password";
const old_pass = ref("");
const new_pass = ref("");
const repeat_pass = ref("");
const mensaje = ref("");
const mensajeError = ref(false);
const mensajeErrorRepetir = ref(false);
const correo = ref("");

const validPass = () => {
  if (new_pass.value !== repeat_pass.value) {
    return false;
  } else {
    return true;
  }
};

const guardarCambios = async () => {
  if (!validPass()) {
    iziToast.error({
      title: "Error",
      message: "Las contraseñas no coinciden",
      messageColor: "white",
      position: "topRight",
      theme: "dark",
      color: "#f00",
    });
    return;
  }

  const datos = {
    correo: correo.value,
    oldPassword: old_pass.value,
    newPassword: new_pass.value,
  };
  try {
    const response = await axios.post(baseUrl + "/", datos);
    mensaje.value = response.data.message;
    iziToast.success({
      title: "Success",
      message: "Contraseña actualizada correctamente",
      messageColor: "white",
      position: "topRight",
      theme: "dark",
      color: "#198754",
    });
    setTimeout(() => {
      route.push({ path: "/" });
    }, 1000);
  } catch (error) {
    if (error.response.status === 404) {
      iziToast.error({
        title: "Error",
        message: "Usuario no encontrado",
        messageColor: "white",
        position: "topRight",
        theme: "dark",
        color: "#f00",
      });
    } else if (error.response.status === 400) {
      iziToast.error({
        title: "Error",
        message: "Contraseña antigua incorrecta",
        messageColor: "white",
        position: "topRight",
        theme: "dark",
        color: "#f00",
      });
    } else {
      iziToast.error({
        title: "Error",
        message: "Error al actualizar la contraseña",
        messageColor: "white",
        position: "topRight",
        theme: "dark",
        color: "#f00",
      });
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
  height: 80%;
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
