<template>
  <div class="container form-container">
    <div class="container col-md-6 mt-5 mb-5">
      <form @submit.prevent="registrarLogro">
        <div class="card shadow">
          <div class="card-body py-5 align-items-center">
            <h5 class="fw-bold text-center mb-3 custom-color">Registra tu logro</h5>
            <div class="mb-3">
              <label for="date" class="form-label">Fecha</label>
              <input
                type="date"
                v-model="fecha"
                id="date"
                class="form-control text-dark"
                required
                :min="minDate"
                :max="maxDate"
              />
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Logros</label>
              <textarea
                v-model="descripcion"
                id="description"
                class="form-control"
                rows="3"
                placeholder="Ingresa tus logros"
                required
              ></textarea>
            </div>

            <button type="submit" class="btn custom-button rounded-3">
              Registrar Logro
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
import { useRouter } from 'vue-router';
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
    alert("Error: No se encontró el 'cliente_id' en localStorage.");
  }
});

// Función para registrar el logro
const registrarLogro = async () => {
  try {
    const response = await axios.post("http://localhost:3000/logros", {
      cliente_id: cliente_id.value,
      descripcion: descripcion.value,
      fecha: fecha.value,
    });
    descripcion.value = "";
    fecha.value = "";
    alert('logro regsitrado')
    router.push({ name: 'perfil' });
  } catch (error) {
    console.error(error);
    alert("Error al registrar");
  }
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
  background-color: #17223b;
  color: #f3f3f4;
  border: none;
}

.custom-button:hover {
  background-color: #f37926;
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
