<template>
  <div class="custom-background">
    <div class="container form-container">
      <div class="container col-md-6 mt-5 mb-5">
        <form @submit.prevent="registrarLogro">
          <div class="card custom-card shadow">
            <div class="card-body py-5 align-items-center">
              <h5 class="fw-bold text-center mb-3 custom-title">Registra tu logro</h5>

              <div class="col mb-3">
                <div class="col-md-6 custom-subtitle input-container ic1">
                  <label for="date" class="form-label custom-subtitle">Fecha</label>
                  <input type="date" v-model="fecha" id="date" class="form-control text-dark inputF" required :min="minDate"
                    :max="maxDate" />
                </div>

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
    const response = await axios.post("https://apitalentos.pruebasdeploy.online/logros", {
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
  background-image: url("@/assets/images/otro-fondo3.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  align-items: center;
  /* Centra verticalmente el formulario */
  justify-content: center;
  /* Centra horizontalmente el formulario */
}

.custom-card {
  background-color: var(--white-color);
  border-radius: 20px;
  box-sizing: border-box;
  height: 450px;
  padding: 20px;
  width: 520px;
}

.custom-title {
  color: var(--gray-color);
  font-family: sans-serif;
  font-size: 30px;
  font-weight: 600;
  margin-top: -50px;
}

.custom-subtitle {
  color: var(--gray-color);
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-top: 5px;
}
.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 35px;
}

.ic2 {
  margin-top: 35px;
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
  margin-top: 150px;
}

.custom-button:hover {
  background-color: #F37926;
  color: #fff;
}
</style>
