<template>
  <div class="d-flex justify-content-center align-items-center container">
    <div class="container col-md-6 mt-5 mb-5">
      <form @submit.prevent="registrarExperiencia">
        <div class="card shadow">
          <div class="card-body py-5 align-items-center">
            <label class="fw-bold text-center d-block w-100">¡Bienvenid@ {{ nombre }} completa tu registro!</label>
            <h5 class="fw-bold text-center mb-3 custom-color">Registra tu cargo</h5>
  
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="institucion" class="form-label">Institución</label>
                <input
                  type="text"
                  v-model="institucion"
                  id="institucion"
                  class="form-control"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="cargo" class="form-label">Cargo</label>
                <input
                  type="text"
                  v-model="cargo"
                  id="cargo"
                  class="form-control text-dark "
                  required
                />
              </div>
            </div>
  
            <div class="mb-3">
              <label for="actividades" class="form-label">Actividades</label>
              <textarea
                v-model="actividades"
                id="actividades"
                class="form-control text-dark"
                rows="3"
                required
              ></textarea>
            </div>
  
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="fecha_inicio" class="form-label">Fecha inicio</label>
                <input
                  type="date"
                  v-model="fecha_inicio"
                  id="fecha_inicio"
                  class="form-control custom-font p-1 text-dark"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="fecha_final" class="form-label">Fecha final</label>
                <input
                  type="date"
                  v-model="fecha_final"
                  id="fecha_final"
                  class="form-control custom-font p-1 text-dark"
                  required
                />
              </div>
            </div>

            <button type="submit" class="btn custom-button rounded-3">
              Registrar
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
  console.log(user);
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
  } catch (error) {
    console.error(error);
    alert("Error al registrar");
  }

  const datos = {
    cliente_id: cliente_id.value,
    institucion: institucion.value,
    cargo: cargo.value,
    actividades: actividades.value,
    fecha_inicio: fecha_inicio.value,
    fecha_final: fecha_final.value
  };
  console.log(datos);
}
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
