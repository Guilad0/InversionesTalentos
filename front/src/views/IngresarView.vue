<template>
  <div class="d-flex justify-content-center bgf">
    <div class="card">
      <div class="card-body">
        <h3>Inversiones</h3>
        <div class="mb-3">
          <label for="correo">E-mail</label>
          <input type="email" v-model="correo" id="correo" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="password">Contraseña</label>
          <input type="password" v-model="password" id="password" class="form-control" />
        </div>
        <div class="mb-3">
          <div class="form-check">
            <div class="row">
              <div class="col-md-2">
                <basic-toggle-switch v-model="switchValue" />
              </div>
              <div class="col-md-10">
                <p>Recuérdame</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row text-center">
          <div class="mb-3">
            <h5>¿Olvidaste tu contraseña?</h5>
          </div>
          <div class="mb-3">
            <button @click="ingresar()" class="btn btn-primary w-100">Ingresar</button>
          </div>
          <div class="mb-3">
            <GoogleLogin :callback="callback" />
            <!-- <button :callback="callback" class="btn btn-primary w-100">Ingresar con google</button> -->
          </div>
        </div>

        <div class="mb-3">
          <div class="row text-center w-70">
            <div class="col"><h5>¿No tienes cuenta?</h5></div>
            <div class="col">
              <RouterLink to="/registrar" class="nav-link">
                Regístrate gratis
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

import { useRouter } from "vue-router";

import BasicToggleSwitch from "../components/toggle-switch.vue";

const switchValue = ref(true);

const route = useRouter();

const correo = ref("");
const password = ref("");
let baseURL = "http://localhost:3000/auth";


const ingresar = async () => {
  if (correo.value == "" || password.value == "") {
    Swal.fire({
      title: "¡Error!",
      text: "Ingrese sus credenciales",
      icon: "error",
    });
  }

  var datos = {
    correo: correo.value,
    password: password.value,
    storeCredentials: switchValue.value
  };

  try {
    const { data } = await axios.post(baseURL + "/", datos);
    console.log(data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.user));
    console.log(data.user);
    
    Swal.fire({
      title: "Bienvenido!",
      text: "Estás de regreso :)" + data.user.nombre + data.user.apellido,
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      route.push({ path: "/" });
    }, 1000);
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    Swal.fire({
      title: "¡Error!",
      text: error.response.data.message,
      icon: "error",
    });
  }
};
</script>

<style scope>
.bgf {
  background-color: #f9f9fa;
}
.card {
  width: 30rem;
  padding: 2rem;

  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
