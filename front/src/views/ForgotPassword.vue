<template>
  <main class="d-flex justify-content-center bgf py-3 animate__animated   animate__fadeInLeft">
    <div class="card login-card shadow">
      <div class="card-body login-card-body">
        <div class="text-center">
          <h3 class="orange-text-color">Recupera tu Contraseña</h3>
        </div>
        <form @submit.prevent="forgotPassword">
          <div class="mb-3 login-text-color">
            <label class="p-4 text-center" for="correo">Ingresa el Correo Electrónico con el que te registraste:</label>
            <input type="email" v-model="correo" id="correo" class="form-control" />
          </div>
          <div class="row text-center" v-if="!emailSent">
            <div class="mb-3">
              <button type="submit" class="btn btn-ingresar w-100">Enviar</button>
            </div>
          </div>
        </form>
        <p class="login-text-color text-center p-3" v-if="message">{{ message }}</p>
        <RouterLink v-if="showBackLink" to="/sign-login" class="text-center orange-text-color w-100 p-3 d-block">Volver a Inicio de Sesión</RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const correo = ref('');
const message = ref('');
const emailSent = ref(false);
const showBackLink = ref(false);

const forgotPassword = async () => {
  try {
    // const { data } = await axios.post('https://apitalentos.pruebasdeploy.online/auth/forgot-password', {
      const { data } = await axios.post(import.meta.env.VITE_BASE_URL+'/auth/forgot-password', {
      correo: correo.value
    });
    message.value = 'Correo enviado correctamente. Revisa tu bandeja de entrada.';
    emailSent.value = true; // Oculta el botón y muestra el mensaje
  } catch (error) {
    console.log(error);
    message.value = error.response.data.error || 'Ocurrió un error';
    showBackLink.value = true; // Muestra el enlace para volver
  }
};
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

  background-color: rgba(0, 0, 0, 0.705);

  

}
.login-text-color{
  color: var(--white-anti-flash-color);
}
.orange-text-color{
  color: var(--yellow-orange)!important;
}


.btn-ingresar{
 background-color: var(--dun-color) !important;
 color: var(--jet-color) !important;
 font-weight: 600 !important;
}
.btn-ingresar:hover{
 background-color: var(--yellow-orange) !important;
 color: var(--dun-color) !important;
 font-weight: 800 !important;
}
.registrar-link{
  color: var(--yellow-orange) !important;
  text-decoration:  underline;
  text-underline-offset: 4px;
}
.registrar-link:hover{
  color: var(--white-anti-flash-color) !important;
  font-weight: 600 !important;
}

main{
    background-image: url('../assets/images/1.png');
    background-size: cover;
    background-repeat: no-repeat;
    

}


</style>
