<template>
  <div class="custom-background">
    <main class="d-flex justify-content-center bgf py-3 animate__animated   animate__fadeInLeft">
      <div class="card login-card shadow">
        <div class="card-body login-card-body">
          <div class="text-center">
            <h3 class="custom-title">Recupera tu Contraseña</h3>
          </div>
          <form @submit.prevent="forgotPassword">
            <div class="mb-3 login-text-color">
              <label class="text-center d-block" for="correo">Ingresa el Correo Electrónico con el que te
                registraste:</label>
              <input type="email" v-model="correo" id="correo" class="form-control input" />
            </div>
            <div class="row text-center" v-if="!emailSent">
              <div class="col-12">
                <button type="submit" class="btn btn-ingresar  custom-button">Enviar</button>
              </div>
            </div>
          </form>
          <p class="login-text-color text-center p-3" v-if="message">{{ message }}</p>
          <RouterLink v-if="showBackLink" to="/sign-login" class="text-center orange-text-color w-100 p-3 d-block">
            Volver a Inicio de Sesión</RouterLink>
        </div>
      </div>
    </main>
  </div>
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
    const { data } = await axios.post(import.meta.env.VITE_BASE_URL + '/auth/forgot-password', {
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
.custom-background {
  background-image: url("@/assets/images/otro-fondo3.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: rgba(0, 0, 0, 0.563);
  background-blend-mode: overlay;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem; 
}



.login-card {
  background-color: rgba(255, 255, 255, 0.877);
  border-radius: 20px;
  box-sizing: border-box;
  width: 90%;
  max-width: 30rem; 
  padding: 2rem;
  margin: 5% auto; 
}


.custom-title {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 10px;
  text-transform: uppercase;
}

.login-text-color {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
  font-size: 1rem;
  font-weight: 700;
  margin-top: 2px;
}

@media (max-width: 576px) {
  .custom-title {
    font-size: 1.5rem; /* Tamaño reducido en móviles */
  }

  .login-text-color {
    font-size: 0.9rem; /* Tamaño reducido en móviles */
  }
}


.input {
  background-color: rgba(44, 46, 51, 0.8);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: var(--white-color);
  font-size: 18px;
  height: 3rem;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.input:focus {
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
  padding: 12px 20px;
  margin-top: 1.3rem;
  border-radius: 5px;
  width: 100%; 
}

.custom-button:hover {
  background-color: #F37926;
  color: #fff;
}


/* .orange-text-color {
  color: var(--yellow-orange) !important;
} */


/* .btn-ingresar {
  background-color: var(--dun-color) !important;
  color: var(--jet-color) !important;
  font-weight: 600 !important;
}

.btn-ingresar:hover {
  background-color: var(--yellow-orange) !important;
  color: var(--dun-color) !important;
  font-weight: 800 !important;
} */

/* .registrar-link {
  color: var(--yellow-orange) !important;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.registrar-link:hover {
  color: var(--white-anti-flash-color) !important;
  font-weight: 600 !important;
} */
/* 
main {
  background-image: url('../assets/images/1.png');
  background-size: cover;
  background-repeat: no-repeat;
} */
</style>
