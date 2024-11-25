<template>
  <div class="custom-background">
    <div class="container form-container">
      <div class="container col-md-6 mt-5 mb-5">
        <form @submit.prevent="registrarLogro">
          <div class="card custom-card shadow">
            <div class="card-body py-5 align-items-center">
              <h5 class="fw-bold text-center mb-3 custom-title">Registra Tu Logro</h5>
              <!-- Botón para volver al Perfil -->
              <div class="back-button1">
                <router-link to="/perfil" class="btn-back">
                  Volver a Perfil
                </router-link>
              </div>
             

              <div class="col mb-3">
                <div class="col-md-6 custom-subtitle input-container ic1">
                  <label for="date" class="form-label custom-subtitle">Fecha</label>
                  <input type="date" v-model="fecha" id="date" class="form-control text-dark inputF" required
                    :min="minDate" :max="maxDate" />
                </div>
                <br>

                <div class="col-md-6 custom-subtitle input-container ic2">
                  <label for="description" class="form-label custom-subtitle">Logros</label>
                  <textarea v-model="descripcion" id="description" class="form-control input" rows="3"
                    required></textarea>
                </div>
              </div>



              <button type="submit" class="btn custom-button rounded-3">
                Registrar Logro
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
import { useRouter } from 'vue-router';
import iziToast from 'izitoast';

const router = useRouter();
const cliente_id = ref("");
const descripcion = ref("");
const fecha = ref("");
const minDate = "01-01-1990";
const maxDate = new Date().toISOString().split("T")[0];

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("usuario"));
  console.log(user);
  if (user) {
    cliente_id.value = user.usuario_id;
  } else {
    iziToast.error({
      title: 'Error',
      message: 'No se encontró el "cliente_id" en localStorage.',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#FF3B30', // Color de fondo rojo para el error
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    });
  }
});

// Función para registrar el logro
const registrarLogro = async () => {
  try {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + "/logros", {
      cliente_id: cliente_id.value,
      descripcion: descripcion.value,
      fecha: fecha.value,
    });

    descripcion.value = "";
    fecha.value = "";

    // Alerta de éxito con iziToast
    iziToast.success({
      title: '¡Éxito!',
      message: 'Logro registrado correctamente.',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#198754', // Color verde para éxito
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    });

    // Redirigir al perfil
    router.push({ name: 'perfil' });
  } catch (error) {
    console.error(error);

    // Alerta de error con iziToast
    iziToast.error({
      title: 'Error',
      message: 'Hubo un problema al registrar el logro.',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#FF3B30', // Color rojo para el error
      closeOnEscape: true,
      progressBarColor: '#FFFFFF'
    });
  }

  // Datos para depuración (console.log)
  const datos = {
    cliente_id: cliente_id.value,
    descripcion: descripcion.value,
    fecha: fecha.value,
  };
  console.log(datos);
};
</script>



<style scoped>
.custom-background {
  background-image: url("@/assets/images/otro-fondo3.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: rgba(0, 0, 0, 0.563);
  /* Color con opacidad */
  background-blend-mode: overlay;
  /* Combina el color y la imagen */
  min-height: 100vh;
  display: flex;
  align-items: center;
  /* Centra verticalmente el formulario */
  justify-content: center;
  /* Centra horizontalmente el formulario */
}


.custom-card {
  background-color: rgba(255, 255, 255, 0.877);
  border-radius: 20px;
  box-sizing: border-box;
  height: 575px;
  padding: 20px;
  width: 520px;
}

.custom-title {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
  font-size: 32px;
  font-weight: 700;
  margin-top: -50px;
  text-transform: uppercase;
}

.custom-subtitle {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
  font-size: 24px;
  font-weight: 700;
  margin-top: 2px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 45px;
}

.ic2 {
  margin-top: 45px;
}

.inputF {
  background-color: rgba(44, 46, 51, 0.8);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #FFFFFF !important;
  font-size: 18px;
  height: 80%;
  outline: 0;
  padding: 4px 20px 0;
  width: 40%;
}

.inputF:focus {
  color: #000000 !important;
  background-color: var(--white-color);
  border: 2px solid #F37926;
  outline: none;
  box-shadow: none;
}

.input {
  background-color: rgba(44, 46, 51, 0.8);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: var(--white-color);
  font-size: 18px;
  height: 150px;
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
  margin-top: 170px;
}

.custom-button:hover {
  background-color: #F37926;
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
