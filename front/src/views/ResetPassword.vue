<template>
   <main class="d-flex justify-content-center bgf py-3 animate__animated   animate__fadeInLeft">
    <div class="card login-card shadow">
      <div class="card-body login-card-body">
        <div class="text-center">
          <h3 class="orange-text-color title">Reestablece tu Contraseña</h3>
        </div>
        <form @submit.prevent="resetPassword"> 
          <div class="mb-3 login-text-color">
            <label class="p-3" for="password">Nueva Contraseña:</label> 
            <input type="password" v-model="password" id="password" class="form-control" required /> 
          </div>

          <div class="row text-center">
            <div class="mb-3">
              <button v-if="!success" type="submit" class="btn btn-ingresar w-100">Reestablecer</button>
            </div>
          </div>
        </form>
        <p class="login-text-color text-center" v-if="message">{{ message }}</p>
        <button v-if="success" @click="goToHomePage" class="btn btn-ingresar w-100 mt-3">Ir a la Página Principal</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'; 
import axios from 'axios'; 
import { useRoute, useRouter } from 'vue-router'; 

const password = ref(''); 
const message = ref(''); 
const route = useRoute(); 
const success = ref(false);
const router = useRouter();

const resetPassword = async () => {
  try { 

    // const {data} = await axios.post(`https://apitalentos.pruebasdeploy.online/auth/reset-password/${route.params.token}`, { password: password.value });
    const {data} = await axios.post(import.meta.env.VITE_BASE_URL+`/auth/reset-password/${route.params.token}`, { password: password.value });
    message.value = data.message; 
    success.value = true; // Establece el indicador de éxito en true
  } catch (error) {
    console.log(error); 
    message.value = error.response?.data?.error || 'Ocurrió un error'; 
  } 
}; 
const goToHomePage = () => { 
  router.push('/'); 
  };
</script>


<style scoped>
.title {
  font-family: var(--font-montserrat-bold); 
  font-weight: 600; 
  font-size: 24px; 
  color: var( --gray-color); 
  text-transform: uppercase;
}
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

