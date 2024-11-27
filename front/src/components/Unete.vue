<template>
  <div class="container-fluid">
    <div class="d-flex custom-row">
      <div class="col-12 col-md-6 d-flex flex-column align-items-center p-0 m-0">
        <div class="card border-0 text-center position-relative rounded-start">
          <img
            src="../assets/images/unete1.png"
            alt="Profesionales"
            class="rounded-start"
          />

          <div
            class="overlay flex-column justify-content-center text-white position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
          >
            <h5 class="card-title">¿Eres un profesional en busca de tu primer capital?</h5>

            <button
              class="animate__animated animate__fadeInUp animate__slow btn-6"
   @click="handleRol('Cliente')"
            >
              Únete Ahora
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 d-flex flex-column align-items-center p-0 m-0">
        <div class="card border-0 text-center position-relative rounded-end">
          <img
            src="../assets/images/unete2.png"
            alt="Inversor"
            class="rounded-end"
          />

          <div
            class="overlay flex-column justify-content-center text-white position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
          >
            <h5 class="card-title">¿Buscas profesionales para invertir?</h5>

            <button
              class="animate__animated animate__fadeInUp animate__slow btn-6 border-0"
              @click="handleRol('Inversionista')"
            >
              Únete Ahora
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");

.container-fluid {
  width: 100%;
  padding: 0;
}

.custom-row {
  width: 100%;
  margin: 0;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

img {
  width: 100%;
  height: 100%;
}

button {
  color: white;
  font-size: 1.2em;
  padding: 10px 20px;
  border-radius: 25px;
  transition: background-color 0.3s, transform 0.3s;
}

.animate__slow {
  animation-duration: 3s;
}

.btn-6 {
  position: relative;
  display: block;
  overflow: hidden;
  text-transform: uppercase;
  border: 1px solid currentColor;
  color: var(--gray-color);
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
}

.btn-6 span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: var(--gray-color);
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.btn-6:hover {
  color: var(--white-anti-flash-color);
}

.btn-6:hover span {
  width: 225%;
  height: 562.5px;
}


@media screen and (max-width: 428px) {
  .custom-row {
    flex-direction: column;
  }

  .card {
    width: 100%;
    margin-bottom: 1rem;
  }

  .card-title {
    font-size: 1.2rem;
    padding: 0 1rem;
  }

  .btn-6 {
    font-size: 1rem;
    padding: 8px 16px;
  }

  img {
    height: 300px;
    object-fit: cover;
  }
}


@media screen and (max-width: 412px) {
  .card-title {
    font-size: 1.1rem;
  }

  img {
    height: 280px;
  }
}

@media screen and (max-width: 411px) {
  img {
    height: 275px;
  }
}
</style>

<script setup >
import Swal from "sweetalert2";
import { confirmAlert, loadingAlert, messageAlert, timerAlert } from "@/helpers/sweetAlerts";
import axios from 'axios'
import { getUser } from '../helpers/utilities';
import {ref, onMounted} from 'vue'
import { useRouter,useRoute  } from 'vue-router';
import { errorAlert, successAlert } from "@/helpers/iziToast";
import iziToast from "izitoast";
const user = ref(null)
const router = useRouter()
const route = useRoute()

onMounted( async ()=>{
  user.value =await getUser()
  console.log(user.value);
  console.log(route.name)
})

const doubleCheckIcon =
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="32" fill="#71717a" style="border: none;">
  <path d="M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
</svg>`;

const handleRol = async (role) => {
  console.log(user.value);
  if( user.value != null){
    const result = await confirmAlert(`¿Está seguro de que desea seleccionar este rol? Su rol se actualizará a ${role}.`,'question',doubleCheckIcon);

if (result.isConfirmed) {
  loadingAlert('Procesando datos','Por favor espere mientras actualizamos su rol.')
  const datos = {
    usuario_id: user.value.usuario_id,
    rol: role,
  };
  try {
    // await axios.put('https://apitalentos.pruebasdeploy.online/clients/changeRol/user', datos);
    await axios.put(import.meta.env.VITE_BASE_URL+'/clients/changeRol/user', datos);
    // const { data } = await axios.get(`https://apitalentos.pruebasdeploy.online/clients/getUserById/user/?id=${user.value.usuario_id}`);
    const { data } = await axios.get(import.meta.env.VITE_BASE_URL+`/clients/getUserById/user/?id=${user.value.usuario_id}`);
    const updatedUser = data.results[0];  
    localStorage.setItem("usuario", JSON.stringify(updatedUser));      
    Swal.close();
    Swal.fire({
      title: "Proceso terminado",
      text: "Tu rol actual es " + role,
      icon: "success",
      confirmButtonColor: "#17223B",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed && route.name == 'perfil') {
        window.location.reload()
      }else{
        router.push('perfil')
      }
    });
  } catch (error) {
    Swal.close();
    console.error("Error al actualizar el rol:", error);
    
    // messageAlert('Error al procesar la accion','Un error ocurrio durante el cambio de rol', 'error')
    errorAlert('Error al procesar la accion','Un error ocurrio durante el cambio de rol', 'Error!!!')
  }
}
  }else{
    Swal.fire({
  title: "iniciar sesion",
  text: "Primero debe registrarte o iniciar sesion con tu cuenta!",
  icon: "warning",
  
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Aceptar"
}).then((result) => {
  if (result.isConfirmed) {
    router.push('sign-login')
  }
});
  }
};
</script>
