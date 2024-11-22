<template>
  <div class="d-flex justify-content-center bgf">
    <div class="card login-card">
      <div class="card-body login-card-body">
        <div class="text-center">
          <h3 class="login-text-color">Iniciar Sesión</h3>
        </div>
        <div class="mb-3 login-text-color">
          <label for="correo">E-mail</label>
          <input type="email" v-model="correo" id="correo" class="form-control" />
        </div>
        <div class="mb-3 login-text-color">
          <label for="password">Contraseña</label>
          <input type="password" v-model="password" id="password" class="form-control" />
        </div>
        <div class="mb-3 login-text-color">
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
          <div class="mb-3 login-text-color">
            <RouterLink to="/forgot-password" class="nav-link registrar-link">
              ¿Olvidaste tu contraseña?
            </RouterLink>
          </div>
          <div class="mb-3">
            <button type="button" @click="ingresar()" class="btn btn-ingresar w-100">Ingresar</button>
          </div>
          <div class="mb-3">
            <GoogleLogin :callback="callback"/>
          </div>
        </div>

        <div class="mb-3">
          <div class="row text-center w-70">
            <div class="col"><h5 class="login-text-color">¿No tienes cuenta?</h5></div>
            <div class="col">
              <RouterLink to="/registrarse" class="nav-link registrar-link">
                Regístrate Gratis
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
import {successAlert,errorAlert} from "@/helpers/iziToast";

const switchValue = ref(false);

const route = useRouter();

const correo = ref("");
const password = ref("");
// let baseURL = "https://apitalentos.pruebasdeploy.online/auth";
let baseURL = import.meta.env.VITE_BASE_URL+"/auth";


const ingresar = async () => {
  if (correo.value == "" || password.value == "") {
    // Swal.fire({
    //   title: "¡Error!",
    //   text: "Ingrese sus credenciales",
    //   icon: "error",
    //   allowOutsideClick: true,
    //   allowEscapeKey: true,
    //   color: 'var(--gray-color)',
    //   confirmButtonColor: 'var(--yellow-orange)', 
    // });
    errorAlert('ingrese sus credenciales', 'Error!!')
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
    
    // Swal.fire({
    //   title: "Bienvenido!",
    //   text: "Estás de regreso :)" + data.user.nombre + data.user.apellido,
    //   icon: "success",
    //   showConfirmButton: false,
    //   allowOutsideClick: true,
    //   allowEscapeKey: true,
    //   color: 'var(--gray-color)',      
    //   timer: 1000,
    // });
    successAlert("Estás de regreso :)" + data.user.nombre + data.user.apellido,'center')


    setTimeout(() => {
      route.push({ path: "/" });
    }, 1000);
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    // Swal.fire({
    //   title: "¡Error!",
    //   text: error.response.data.message,
    //   icon: "error",
    //   allowOutsideClick: true,
    //   allowEscapeKey: true,
    //   color: 'var(--gray-color)',
    //   confirmButtonColor: 'var(--yellow-orange)', 
    // });
    errorAlert(error.response.data.message, 'Error!!')
  }
};

//login con google
const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}
</script>

<style scoped>
.bgf {
  background-color: #f9f9fa;
}
.login-card {
  width: 30rem;
  padding: 2rem;
  margin-top: 5%;
  margin-bottom: 5%;
  background-color: var(--smoky-dark-color) !important;
}
.login-text-color{
  color: var(--white-anti-flash-color);
}

.login-card-body{
  background-color: var(--smoky-dark-color);
}

.btn-ingresar{
 background-color: var(--dun-color) !important;
 color: var(--jet-color) !important;
 font-weight: 600 !important;
}
.btn-ingresar:hover{
 background-color: var(--gray-color) !important;
 color: var(--dun-color) !important;
 font-weight: 800 !important;
}
.registrar-link{
  color: var(--dun-color) !important;
}
.registrar-link:hover{
  color: var(--white-anti-flash-color) !important;
  font-weight: 600 !important;
}
</style>