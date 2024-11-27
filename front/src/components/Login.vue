<template>
  <main
    class="d-flex justify-content-center py-3 animate__animated animate__fadeInLeftr background-container " @keypress.enter="ingresar()"
  >
    <div class="card login-card shadow">
      <div class="card-body login-card-body">
        <div class="text-center">
          <h3 class="login-text-color title">Iniciar Sesión</h3>
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
              ¿Olvidaste tu Contraseña?
            </RouterLink>
          </div>
          <div class="mb-3">
            <button :disabled="loading" type="button" @click="ingresar()" class="btn btn-gray rounded-5 w-75" >
              Ingresar
            </button>
          </div>
          <div class="mb-3">
            <GoogleLogin :callback="callback" prompt/>
          </div>

        </div>

        <div class="mb-3">
          <div class="row text-center w-70">
            <div class="col"><h5 class="login-text-color">¿No Tienes Cuenta?</h5></div>
            <div @click="$emit('changePage')" class="col cursor">
              <a class="nav-link registrar-link"> Regístrate Gratis </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import iziToast from "izitoast";
import Swal from 'sweetalert2'
import { useRouter } from "vue-router";
import { decodeCredential } from "vue3-google-login";
import {successAlert, errorAlert} from "../helpers/iziToast";

import BasicToggleSwitch from "../components/toggle-switch.vue";

const switchValue = ref(false);

const route = useRouter();

const correo = ref("");
const password = ref("");
const  edIn = ref(false);
const user = ref(null);

// let baseURL = "https://apitalentos.pruebasdeploy.online/auth";
let baseURL = import.meta.env.VITE_BASE_URL+"/auth";
const loading = ref(false);
const ingresar = async () => {
  if (correo.value == "" || password.value == "") {
    // iziToast.show({
    //   title: "Hey",
    //   message: "What would you like to add?",
    // });

    // Swal.fire({
    //   title: "¡Error!",
    //   text: "Ingrese sus credenciales",
    //   icon: "error",
    //   allowOutsideClick: true,
    //   allowEscapeKey: true,
    //   color: 'var(--gray-color)',
    //   confirmButtonColor: 'var(--yellow-orange)', 
      
    // });
    iziToast.error({
      title: 'Error',
      message: 'Ingrese sus credenciales',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#f00', 

    })


  }

  var datos = {
    correo: correo.value,
    password: password.value,
    storeCredentials: switchValue.value,
  };

  try {
    loading.value = true
    const { data } = await axios.post(baseURL + "/", datos);
    console.log(data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.user));
    console.log(data.user);

    // Swal.fire({
    //   title: "Bienvenido!",
    //   text: "Estás de regreso :) " + data.user.nombre + " " + data.user.apellido,
    //   icon: "success",
    //   showConfirmButton: false,
    //   allowOutsideClick: true,
    //   allowEscapeKey: true,
    //   color: 'var(--gray-color)',
    //   timer: 1000,
    // });

    /* iziToast.success({
      title: 'Bienvenido!',
      message: 'Estas de regreso :) ' + data.user.nombre + ' ' + data.user.apellido,
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#5ce65c',
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
          }) */
         successAlert('Estas de regreso '+data.user.nombre+ ''+ data.user.apellido, 'Bienvenid@')
    setTimeout(() => {
      route.push({ path: "/" });
    }, 1000);

    setTimeout(() => {
      route.push({ path: "/" });
    }, 1000);
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.msg;
    // Swal.fire({ 
    //   title: "¡Error!", 
    //   text: errorMessage, 
    //   icon: "warning",
    //   allowOutsideClick: true,
    //   allowEscapeKey: true,
    //   color: 'var(--gray-color)',
    //   confirmButtonColor: 'var(--yellow-orange)', 
    // });
    iziToast.error({
      title: 'Error',
      message: errorMessage,
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#f00',
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    })

  }finally{
    loading.value = false;
    password.value = ''
  }
};


//login con google
const callback =async (response) => {
  console.log("Logged in", response);
  try {
    const { data } = await axios.post(baseURL + "/google-login", { token: response.credential });
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.user));
    user.value = data.user;
    route.push({ path: "/" });
  } catch (error) {
    console.log(error);
    let errorMessage = 'Error al autenticar con Google';
    if (error.response?.data?.msg) {
      errorMessage = error.response.data.msg;
    } else if (error.message.includes('NetworkError')) {
      errorMessage = 'Error de red al intentar autenticar con Google. Por favor, inténtalo de nuevo.';
    }
    iziToast.error({
      title: 'Error',
      message: errorMessage,
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#f00',
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    });
  }
};

</script>

<style scoped>

.title {
  font-family: var(--font-montserrat-bold); /* Variante bold */
  font-weight: 700; /* Asegura que sea bold */
  font-size: 26px; /* Tamaño predefinido */
  color: var( --white-anti-flash-color); 
  text-transform: uppercase;
}

.background-container {
  background-color: rgb(163, 12, 93);
  background-image: url("../assets/images/iniciar_sesion2.png");
  /*background-image: url("'@/assets/images/registrar_usuario.png'");*/
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 2rem; /* Ajusta el espacio alrededor del formulario */
  border-radius: 8px; /* Opcional: agrega bordes redondeados */
}

.login-card {
  width: 30rem;
  padding: 2rem;
  height: 40rem;
  margin-top: 5%;
  margin-bottom: 5%;
  background-color: rgba(0, 0, 0, 0.705);
}
.login-text-color {
  color: var(--white-anti-flash-color);
}

.btn-ingresar {
  background-color: var(--dun-color) !important;
  color: var(--jet-color) !important;
  font-weight: 600 !important;
}
.btn-ingresar:hover {
  background-color: var(--gray-color) !important;
  color: var(--dun-color) !important;
  font-weight: 800 !important;
}
.registrar-link {
  color: var(--dun-color) !important;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.registrar-link:hover {
  color: var(--white-anti-flash-color) !important;
  font-weight: 600 !important;
}

main {
  
  background-size: cover;
  background-repeat: no-repeat;
}
.swal-button-confirm {
  background-color: #4caf50;
  color: white;
}
.swal-button-cancel {
  background-color: #f44336;
  color: white;
}
</style>
