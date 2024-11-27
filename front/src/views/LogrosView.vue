<template>
  <div class="custom-background">
    <div class="container form-container">
      <div class="container col-md-6 mt-5 mb-5">
        <form @submit.prevent="registrarLogro" novalidate>
          <div class="card custom-card shadow">
            <div class="card-body py-5 align-items-center">
              <h5 class="fw-bold text-center mb-3 custom-title">¡Bienvenid@ {{ user?.nombre }} completa tu
                registro!</h5>
              <!-- Botón para volver al Perfil -->
              <!-- <div class="back-button1">
                <router-link to="/perfil" class="btn-back">
                  Volver a Perfil
                </router-link>
              </div> -->
              <div class="col mb-3">
                <div class="col-md-6 custom-subtitle input-container ic1">
                  <label for="date" class="form-label custom-subtitle">Fecha</label>
                  <input type="date" v-model="fecha" id="date" class="form-control text-dark inputF" required ref="refFecha"  />
                  <div class="invalid-feedback fs-custom">Campo requerido</div>
                </div>
                <br>
                <div class="col-md-6 custom-subtitle input-container ic2">
                  <label for="description" class="form-label custom-subtitle">Logros</label>
                  <textarea v-model="descripcion" id="description" class="form-control input" rows="3" ref="refDescripcion"
                    required></textarea>
                  <div class="invalid-feedback fs-custom">Campo requerido</div>
                </div>
              </div>
            </div>
             <div class="text-center">
              <button :disabled="loading" type="submit" class="btn custom-button rounded-3">
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
import {successAlert, errorAlert} from "../helpers/iziToast";

const router = useRouter();
const cliente_id = ref("");
const descripcion = ref("");
const fecha = ref("");
const minDate = ref("1970-01-01");
const maxDate = ref(new Date().toISOString().split("T")[0]);
const user = ref(JSON.parse(localStorage.getItem("usuario")));


const validarFormulario = (event) => {
  const form = event.target.closest("form");
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated");
    return false;
  }
  return true;
};


onMounted(() => {
  console.log(user);
  if (user) {
    cliente_id.value = user.value.usuario_id;
  } else {
    errorAlert ('Usuario no valido para esta seccion.','Error')
  }
});


const refDescripcion = ref('')
const refFecha = ref('')
const loading = ref(false)
const registrarLogro = async (event) => {
  console.log(fecha.value);
  if (!validarFormulario(event)) return;
  if( fecha.value > maxDate.value || fecha.value < minDate.value){
    refFecha.value.focus()
    errorAlert('Fecha no permitida', 'Error');
    fecha.value = ''
    return
  }
  if (descripcion.value && descripcion.value.trim().replace(/[^A-Za-z]/g, "").length <= 5) {
    descripcion.value = (descripcion.value.trim() =='')? '': descripcion.value;
    refDescripcion.value.focus()
  errorAlert('El campo cargo  debe contener más de 5 letras.', 'Error');
  return;
}
  const data = {
       cliente_id: cliente_id.value,
       descripcion: descripcion.value.trim(),
       fecha: fecha.value,
  }
  console.log(data); 


  try {
    loading.value = true
    await axios.post(import.meta.env.VITE_BASE_URL + "/logros", data);
    successAlert ('Logro registrado correctamente.','¡Éxito!')
    descripcion.value = "";
    fecha.value = "";
    router.push({ name: 'perfil' });
  } catch (error) {
    errorAlert ('Hubo un problema al registrar el logro.')
  }finally{
    loading.value = false
  }


};
</script>



<style scoped>
.fs-custom{
  font-size: 0.7rem;
}
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Asegura que los elementos se alineen desde arriba */
  min-height: 500px; /* Asegura que tenga suficiente altura */
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
  padding: 12px 20px;
  margin-top: auto; /* Empuja el botón hacia el fondo */
  border-radius: 5px;
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

@media (max-width: 768px) {
  .custom-card {
    width: 90%; /* Ajusta el ancho del formulario en pantallas pequeñas */
    padding: 15px;
    min-height: auto; /* Ajusta la altura de la tarjeta en pantallas pequeñas */
  }

  .custom-title {
    font-size: 24px; /* Ajusta el tamaño del título */
    margin-top: 0;
  }

  .inputF, .input {
    width: 100%; /* Ajusta el tamaño de los campos de entrada */
  }

  
  .custom-button {
      margin-top: 50px; /* Más espacio en pantallas más pequeñas */
      width: 100%; /* Hace que el botón ocupe el 100% del ancho */
      height: 45px;
    }
  

  .back-button1 {
    margin-top: 5px; /* Ajusta el margen del botón de volver */
  }

}

@media (max-width: 360px) {
  .custom-card {
    width: 100%; /* Asegura que la tarjeta ocupe el 100% en pantallas pequeñas */
    padding: 10px;
  }

  .inputF, .input {
    height: 40px; /* Ajusta la altura de los inputs en pantallas pequeñas */
    font-size: 16px; /* Reduce el tamaño de la fuente */
  }

  .custom-title {
    font-size: 20px; /* Ajusta el tamaño del título en pantallas pequeñas */
  }

  .custom-button {
    margin-top: 50px; /* Ajusta el margen en pantallas aún más pequeñas */
    width: 100%;
  }
}

/* Ajustes específicos para iPhones */
@media (max-width: 375px) { /* iPhone X, 11, SE */
  .custom-card {
    width: 90%; /* Ajustar el ancho */
    padding: 15px; /* Reducir el padding */
    min-height: 500px; /* Asegura que haya suficiente altura */
  }

  .inputF, .input {
    font-size: 16px; /* Reducir tamaño de fuente */
    height: 40px; /* Ajustar la altura de los inputs */
  }

  .custom-button {
    margin-top: 30px; /* Agregar más margen si es necesario */
    width: 100%; /* Hacer que el botón ocupe todo el ancho */
    height: 45px; /* Ajustar la altura del botón */
  }
}

@media (max-width: 414px) { /* iPhone 6/7/8 Plus */
  .custom-card {
    width: 90%;
    min-height: 500px;
  }

  .inputF, .input {
    font-size: 16px;
    height: 40px;
  }

  .custom-button {
    margin-top: 40px;
    width: 100%;
    height: 45px;
  }
}
@media (max-width: 428px) { /* iPhone 14 plus*/
  .custom-card {
    width: 90%;
    min-height: 500px;
  }

  .inputF, .input {
    font-size: 16px;
    height: 40px;
  }

  .custom-button {
    margin-top: 40px;
    width: 100%;
    height: 45px;
  }
}

/* Para pantallas muy pequeñas */
@media (max-width: 320px) { /* iPhone SE 2020 */
  .custom-card {
    width: 90%; /* Ajuste del ancho */
    min-height: 400px;
  }

  .inputF, .input {
    font-size: 14px; /* Reducir el tamaño de la fuente aún más */
    height: 35px; /* Reducir la altura de los inputs */
  }

  .custom-button {
    margin-top: 20px; /* Reducir el margen para pantallas más pequeñas */
    height: 40px;
  }
}
</style>
