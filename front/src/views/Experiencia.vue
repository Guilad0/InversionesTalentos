<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="form">
      <div class="title">¡Bienvenid@ {{ nombre }}!</div>
      <div class="subtitle">Completa tu registro</div>
      
      <form @submit.prevent="registrarExperiencia">
        <div class="row mb-3">
          <div class="col mb-6">
            <div class="input-container">
              <label for="institucion" class="label">Institución</label>
              <input
                id="institucion"
                v-model="institucion"
                type="text"
                class="input"
                required
              />
            </div>
          </div>

          <div class="col mb-6">
            <div class="input-container">
              <label for="cargo" class="label">Cargo</label>
              <input
                id="cargo"
                v-model="cargo"
                type="text"
                class="input"
                required
              />
            </div>
          </div>
          
        </div>
       
        <div class="input-container2">
          <label for="actividades" class="label">Actividades</label>
          <textarea
            id="actividades"
            v-model="actividades"
            class="input"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="row mb-3">
          <div class="col mb-6">
            <div class="input-container">
              <label for="fecha_inicio" class="label">Fecha inicio</label>
              <input
                id="fecha_inicio"
                v-model="fecha_inicio"
                type="date"
                class="input"
                required
              />
            </div>
          </div>
          <div class="col mb-6">
            <div class="input-container">
              <label for="fecha_final" class="label">Fecha final</label>
              <input
                id="fecha_final"
                v-model="fecha_final"
                type="date"
                class="input"
                required
              />
            </div>
          </div>
        </div>
             
        <button type="submit" class="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter(); 
const cliente_id = ref(""); 
const institucion = ref("");
const cargo = ref("");
const actividades = ref("");
const nombre = ref("");
const fecha_inicio = ref("");
const fecha_final = ref("");

// Cliente_id desde localStorage
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("usuario"));
  if (user) {
    cliente_id.value = user.usuario_id;
    nombre.value = user.nombre; 
  } else {
    alert("Error: No se encontró el cliente_id en localStorage.");
  }
});

const registrarExperiencia = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/experiencia", {
      cliente_id: cliente_id.value,
      institucion: institucion.value,
      cargo: cargo.value,
      actividades: actividades.value,
      fecha_inicio: fecha_inicio.value,
      fecha_final: fecha_final.value
    });
    alert(response.data.message);
    router.push({ name: 'perfil' });
  } catch (error) {
    console.error(error);
    alert("Error al registrar");
  }
};
</script>

<style scoped>

.background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  position: relative;
  background-image: url('@/assets/images/otro-fondo3.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(4, 4, 4, 0.563);; /* Fondo negro con opacidad del 50% */
  z-index: 1; /* Asegura que la capa de opacidad esté encima de la imagen */
}
.form {
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.877);
  border-radius: none;
  box-sizing: border-box;
  padding: 30px;
  width: 500px;
  z-index: 2; 
}

.title {
  color: #17223B;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 10px;
  text-align: center;
}

.subtitle {
  color: #17223B;
  font-family: sans-serif;
  font-size: 26px;
  font-weight: 600;
  margin-top: 5px;
  text-align: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
}

.label {
  color: #17223B;
  font-family: sans-serif;
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
}

.input {
  background-color: rgba(44, 46, 51, 0.8);
  color: #F3F3F4;
  border-radius: 12px;
  border: none;
  font-size: 18px;
  padding: 8px 20px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  height: 38px; /* Altura fija para los inputs */
}

.submit {
  background-color: #17223B;
  border-radius: 12px;
  border: none;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  text-align: center;
  width: 100%;
}
textarea.input {
  height: auto; 
}
.submit:active {
  background-color: #F37926;
}
.input:focus {
  background-color: white; 
  color: black; /* Fondo blanco cuando el campo está en foco */
  border-color: #80bdff;    /* Color del borde */
  outline: none;            /* Elimina el contorno */
}
</style>
