<template>
  <div class="d-flex justify-content-center align-items-center container">
    <div class="container col-md-6 mt-5 mb-5">
      <form @submit.prevent="guardarCambios">
        <div class="card shadow">
          <div class="card-body py-5 align-items-center">
            <h5 class="fw-bold text-center mb-3 custom-color">Introduzca su nueva contraseña</h5>

            <div class="row mb-3">
            
              <div class="col-md-6">
                <label for="new_pass" class="form-label">Nueva contraseña</label>
                <input
                  type="password"
                  v-model="new_pass"
                  id="new_pass"
                  class="form-control"
                  required
                />
                <p v-if="mensajeError" class="text-danger">{{ mensaje }} </p>
              </div>
              
              <div class="col-md-6">
                <label for="repeat_pass" class="form-label"> Repetir contraseña </label>
                <input
                  type="password"
                  v-model="repeat_pass"
                  id="repeat_pass"
                  class="form-control text-dark"
                  required
                />
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
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const new_pass = ref(""); 
const repeat_pass = ref("");


// // Cliente_id desde localStorage
// onMounted(() => {
//   const user = JSON.parse(localStorage.getItem("usuario"));
//   console.log(user);
//   if (user) {
//     cliente_id.value = user.usuario_id;
//     nombre.value = user.nombre; 
//   } else {
//     alert("Error: No se encontró el cliente_id en localStorage.");
//   }
// });

// Función registro de información

const mensaje = ref('No se pudo actualizar la contraseña');

const mensajeError = ref(false);
const mensajeErrorRepetir = ref(false);
const validPass = () => {
  if (new_pass.value !== repeat_pass.value) {
    console.log("Las contraseñas no coinciden");
    return false;
  } else {
    console.log("Las contraseñas coinciden");
    return true;
}
  
}
const guardarCambios = () => {

if (!validPass()) {alert('Las contraseñas no coinciden');return;} 

const datos = {
      
    new_pass: new_pass.value,
    repeat_pass: repeat_pass.value,
    };
console.log(datos);
// try {
//   const response = await axios.post("http://localhost:3000/perfil/changePass", datos);
//     alert('Cambios registrados correctamente');
// } catch (error) {
//   console.error(error);
//   alert("Error al registrar");
// }
    
    // Mover la creación de 'datos' dentro de la función para que esté en el alcance adecuado
   
 
};

  
</script>

<style scoped>
.custom-background {
  background-color: var(--violet-2-color);
  height: 100vh;
}

.custom-card {
  background-color: #34312d;
  border: none;
  color: #d9c5b2;
}

.custom-text {
  color: #d9c5b2;
}

.custom-button {
  background-color: #17223B;
  color: #F3F3F4;
  border: none;
}

.custom-button:hover {
  background-color: #F37926;
  color: #fff;
}

input,
textarea {
  background-color: #7e7f8352;
  color: #ffffff;
  border: none;
}

input::placeholder {
  color: #d9c5b2;
}

.form-check-label span {
  color: #14110f;
}

.custom-link {
  color: #14110f;
}

.custom-link:hover {
  color: #7e7f83;
  text-decoration: underline;
}

.custom-color {
  color: rgba(44, 43, 43, 0.753) !important;
}

.d-block {
  text-align: center;
}
</style>
