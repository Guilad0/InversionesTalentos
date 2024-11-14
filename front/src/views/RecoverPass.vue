<template>
  <div class="custom-background">
    <div class="d-flex justify-content-center align-items-center container">
      <div class="container col-md-6 mt-5 mb-5">
        <form @submit.prevent="guardarCambios">
          <div class="card custom-card shadow">
            <div class="card-body py-5 align-items-center">
              <h5 class="fw-bold text-center mb-3 custom-color custom-title">Introduzca su nueva contraseña</h5>

              <div class="row mb-3">
                <div class="col-md-6 custom-subtitle input-container ic1">
                  <label for="new_pass" class="form-label ">Nueva contraseña</label>
                  <input type="password" v-model="new_pass" id="new_pass" class="form-control input" required />
                  <p v-if="mensajeError" class="text-danger">{{ mensaje }} </p>
                </div>

                <div class="col-md-6 custom-subtitle input-container ic2">
                  <label for="repeat_pass" class="form-label "> Repetir contraseña </label>
                  <input type="password" v-model="repeat_pass" id="repeat_pass" class="form-control text-dark input"
                    required />
                  <p v-if="mensajeErrorRepetir" class="text-danger"> Las contraseñas no coinciden</p>
                </div>

              </div>

              <button type="submit" class="btn custom-button rounded-3">
                Guardar cambios
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

const new_pass = ref("");
const repeat_pass = ref("");

const mensaje = ref('No se pudo actualizar la contraseña');
const mensajeError = ref(false);
const mensajeErrorRepetir = ref(false);

const validPass = () => {
  if (new_pass.value !== repeat_pass.value) {
    return false;
  } else {
    return true;
  }
}

const guardarCambios = () => {
  if (!validPass()) { alert('Las contraseñas no coinciden'); return; }

  const datos = {
    new_pass: new_pass.value,
    repeat_pass: repeat_pass.value,
  };
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
  justify-content: center;
}

.custom-card {
  background-color: var(--white-color);
  border-radius: 20px;
  box-sizing: border-box;
  height: 300px;
  padding: 20px;
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
  margin-top: 10px;
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
  margin-top: 55px;
}

.custom-button:hover {
  background-color: #F37926;
  color: #fff;
}
</style>
