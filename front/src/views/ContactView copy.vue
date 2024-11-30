<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="container d-flex justify-content-center align-items-center custom-font">
    <form class="card shadow p-5 w-50 m-5 animate__animated animate__fadeIn custom-card">
        <h3 class="text-center py-2 text-form-title">
          Déjanos tu comentario llenando este formulario
        </h3>
  
        <div class="mb-3">
          <label for="nombre" class="form-label text-form-contact"
            >Nombres<span class="text-danger"><strong>*</strong></span></label
          >
          <input
            type="text"
            class="form-control"
            id="nombre"
            v-model="nombre"
            v-bind:class="{ 'is-valid': nombreVal, 'is-invalid': errors.nombre }"
            placeholder="Escriba sus nombres"
            @input="validarCampo('nombre')"
            required
          />
          <span v-if="errors.nombre" class="position-absolute text-danger">
            <i class="bi bi-x-circle"></i>
          </span>
          <span class="text-danger">{{ errors.nombre }}</span>
        </div>
  
        <div class="mb-3">
          <label for="apellido" class="form-label text-form-contact"
            >Apellidos<span class="text-danger"><strong>*</strong></span></label
          >
          <input
            type="text"
            class="form-control"
            id="apellido"
            v-model="apellido"
            v-bind:class="{ 'is-valid': apellidoVal, 'is-invalid': errors.apellido }"
            placeholder="Escriba sus apellidos"
            @input="validarCampo('apellido')"
            required
          />
          <span v-if="errors.apellido" class="position-absolute text-danger">
            <i class="bi bi-x-circle"></i>
          </span>
          <span class="text-danger">{{ errors.apellido }}</span>
        </div>
  
        <div class="mb-3">
          <label for="correo" class="form-label text-form-contact"
            >E-mail<span class="text-danger"><strong>*</strong></span></label
          >
          <input
            type="email"
            class="form-control"
            id="correo"
            v-model="email"
            v-bind:class="{ 'is-valid': emailVal, 'is-invalid': errors.email }"
            placeholder="Escriba su correo"
            @input="validarCampo('email')"
            required
          />
          <span v-if="errors.email" class="position-absolute text-danger">
            <i class="bi bi-x-circle"></i>
          </span>
          <span class="text-danger">{{ errors.email }}</span>
        </div>
  
        <div class="mb-3">
          <label for="telefono" class="form-label text-form-contact">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            class="form-control"
            placeholder="123-456-7890"
            v-model="telefono"
          />
        </div>
  
        <div class="mb-3">
          <label class="form-label text-form-contact">Comentarios</label>
          <textarea class="form-control mb-3" v-model="comentarios"></textarea>
        </div>
  
        <div class="text-center">
          <button
            type="submit"
            @click="registerComment($event)"
            class="btn btn-form-contact btn-gray rounded-5 w-75"
          >
            Enviar
          </button>
        </div>
      </form>
      <!-- <div>
      <Unete />
    </div> -->
    </div>
  </div>
  
  
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import iziToast from "izitoast";
import {successAlert, errorAlert} from "../helpers/iziToast";
import { useRouter } from "vue-router";
import Unete from "../components/Unete.vue";
const route = useRouter();
console.log(route.currentRoute.value.path);

// const baseURL = "https://apitalentos.pruebasdeploy.online/contact";
const baseURL = import.meta.env.VITE_BASE_URL+"/contact";

const nombre = ref("");
const apellido = ref("");
const email = ref("");
const comentarios = ref("");
const telefono = ref("");

const errors = ref({});
const nombreVal = ref(false);
const apellidoVal = ref(false);
const emailVal = ref(false);

const validarCampo = (field) => {
  switch (field) {
    case "nombre":
      nombreVal.value = !!nombre.value;
      if (!nombreVal.value) {
        errors.value.nombre = "Este campo es requerido";
      } else if (nombre.value.trim().length < 3) {
        nombreVal.value = false;
        errors.value.nombre = "El nombre debe tener al menos 3 caracteres";
      } else if (!/^[A-Za-z\s]+$/.test(nombre.value)) {
        nombreVal.value = false;
        errors.value.nombre = "El nombre solo puede contener letras";
      } else {
        nombreVal.value = true;
        errors.value.nombre = "";
      }
      break;

    case "apellido":
      apellidoVal.value = !!apellido.value;
      if (!apellidoVal.value) {
        errors.value.apellido = "Este campo es requerido";
      } else if (apellido.value.trim().length < 2) {
        apellidoVal.value = false;
        console.log(errors.value);
        errors.value.apellido = "El apellido debe tener al menos 3 caracteres";
      } else if (!/^[A-Za-z\s]+$/.test(apellido.value)) {
        apellidoVal.value = false;
        errors.value.apellido = "El apellido solo puede contener letras";
      } else {
        apellidoVal.value = true;
        errors.value.apellido = "";
      }
      break;

    case "email":
      emailVal.value = !!email.value;
      if (!emailVal.value) {
        errors.value.email = "Este campo es requerido";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email.value)) {
        emailVal.value = false;
        errors.value.email = "Introduce un correo electrónico válido";
      } else {
        emailVal.value = true;
        errors.value.email = "";
      }
      break;
  }
};

const registerComment = async () => {
  event.preventDefault();
  /**
  validarCampo('nombre');
  validarCampo('apellido');
  validarCampo('email');
  */

  if (nombreVal.value == false || apellidoVal.value == false || emailVal.value == false) {
  /*   iziToast.error({
      // class: "test",
      title: "ERROR",
      message: "Debe ingresar todos los campos obligatorios",
      position: "topRight",
      //messageColor: "red",
      // titleColor: "red",
      backgroundColor: "red",
    }); */

    errorAlert('Debe ingresar todos los campos obligatorios','Error')
    return;
  }
  const datos = {
    nombre: nombre.value.trim(),
    apellido: apellido.value.trim(),
    email: email.value,
    telefono: telefono.value,
    comentarios: comentarios.value,
  };
  iziToast.question({
    timeout: 20000,
    close: false,
    overlay: true,
    displayMode: "once",
    id: "question",
    zindex: 999,
    title: "Confirmación",
    message: "¿Estás seguro de enviar tu comentario?",
    position: "center",
    maxWidth: 400,
    buttons: [
      [
        "<button><b>SI</b></button>",
        async function (instance, toast) {
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");

          try {
            const { data } = await axios.post(baseURL, datos);
            console.log(data);
            successAlert('Tu comentario ha sido enviado con éxito, espera nuestra respuesta', 'Felicidades')
            resetForm();
          } catch (error) {
            console.error(error);
            /* iziToast.error({
              title: "Error",
              message: "Hubo un problema al registrar tu comentario, intenta de nuevo.",
            }); */
            errorAlert('Hubo un problema al registrar tu comentario, intenta de nuevo.', 'Error')
          }
        },
        true,
      ],
      [
        "<button>NO</button>",
        function (instance, toast) {
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");
        },
      ],
    ],
  });
};

const resetForm = () => {
  nombre.value = "";
  apellido.value = "";
  email.value = "";
  telefono.value = "";
  comentarios.value = "";
  errors.value = {};
  nombreVal.value = false;
  apellidoVal.value = false;
  emailVal.value = false;
};
</script>

<style scoped>

.background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh; /* Reduce la altura del fondo a un 90% de la altura de la ventana */
  width: 100vw; /* Ancho completo de la ventana */
  margin: 0;
  padding: 0;
  position: relative;
  background-image: url('@/assets/images/otro-fondo2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Asegura que el overlay cubra toda la altura del fondo */
  background-color: rgba(4, 4, 4, 0.563); /* Fondo negro con opacidad */
  z-index: 1; /* Asegura que el overlay esté debajo del formulario */
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  width: 100vw;
  padding: 0;
  max-height: 90vh; /* Limita la altura del contenedor */
}
.custom-card {
  padding: 2rem; /* Reduce el padding para menos altura */
  width: 100vw; /* Ahora ocupa el 100% del ancho de la pantalla */
  max-width: 100vw; /* Asegura que el formulario no se limite en ancho */
  margin: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1s ease;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.95); /* Fondo blanco */
  z-index: 2;
  box-sizing: border-box;
  height: auto; /* Asegura que el alto del formulario sea dinámico */
}
.card {
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.871);
  border-radius: none;
  box-sizing: border-box;
  padding: 10px;
  width: 1000px;
  z-index: 2; /* Asegura que el formulario esté encima del overlay */
}

.form-control {
  border-radius: 12px;
  background-color: rgba(44, 46, 51, 0.8); /* Color de fondo personalizado */
  color: #F3F3F4;
}

.text-form-title{
  font-size: 28px;
  font-weight: bold;
  color:  #17223B;

}

.text-form-contact {
  font-size: 18px;
  font-weight: bold;
  color:  #17223B; /* Personaliza según tu tema */
}

.is-valid {
  border-color: green;
}

.is-invalid {
  border-color: red;
}

.text-danger {
  font-size: 0.8rem;
}

.form-control::placeholder {
  color: #F3F3F4; /* Color claro para el placeholder */
}

/* Smartphones y dispositivos pequeños */
@media (max-width: 768px) {

  .card {
    width: 100%; /* Asegura que el formulario ocupe todo el ancho */
    height: 50%;
    margin: 0;
  }

  .custom-card {
      width: 100%; /* Asegura que el formulario ocupe todo el ancho */
      height: 50%;
      padding: 1.5rem; /* Menos padding en pantallas pequeñas */
    
  }

  .text-form-title {
    font-size: 24px;
    text-align: center;
  }

  .form-control {
    font-size: 16px;
    padding: 10px;
  }

  .btn-form-contact {
    width: 90%;
    font-size: 16px;
  }
  
}
@media (max-width: 428px) {
  .card {
    width: 100% !important; /* El contenedor principal ocupa todo el ancho */
    height: auto; /* Ajustamos la altura para que se adapte al contenido */
    margin: 0 !important; /* Eliminamos márgenes */
    margin-top: 0 !important;
    padding: 0 !important; /* Eliminamos padding innecesario */
  }

  .custom-card {
    width: 90% !important; /* La tarjeta ocupa el 100% */
    padding: 1rem;
    border-radius: 8px;
  }

  .text-form-title {
    font-size: 18px;
    text-align: center;
    margin-left: 15px; 
    margin-right: 15px;
    margin-top: 15px;
  }

  .text-form-contact {
    font-size: 12px;
  }

  .form-control {
    font-size: 12px;
    padding: 6px;
    width: 80% !important; /* Los campos ocupan todo el ancho disponible */
    box-sizing: border-box; /* Aseguramos que no se desborden */
    margin-left: 15px;
  }

  .btn-form-contact {
    font-size: 12px;
    padding: 8px 10px; 
    width: 30% !important; /* El botón ocupa todo el ancho disponible */
    box-sizing: border-box; /* Evitamos que se desborde */
    margin-bottom: 15px;
  }

  .form-group {
    margin-bottom: 0.5rem !important; /* Ajusta los márgenes entre los elementos */
  }
  label {
    margin-left: 15px; /* Esto agrega margen a la izquierda de los labels (títulos) */
    font-size: 14px; /* Puedes ajustar el tamaño del texto si es necesario */
  }
}


/* Smartphones pequeños (Android y iPhone SE, Galaxy A01) */
@media (max-width: 480px) {
  .card {
    width: 100% !important; /* El contenedor principal ocupa todo el ancho */
    height: auto; /* Ajustamos la altura para que se adapte al contenido */
    margin: 0 !important; /* Eliminamos márgenes */
    margin-top: 0 !important;
    padding: 0 !important; /* Eliminamos padding innecesario */
  }

  .custom-card {
    width: 90% !important; /* La tarjeta ocupa el 100% */
    padding: 1rem;
    border-radius: 8px;
  }

  .text-form-title {
    font-size: 18px;
    text-align: center;
    margin-left: 15px; 
    margin-right: 15px;
    margin-top: 15px;
  }

  .text-form-contact {
    font-size: 12px;
  }

  .form-control {
    font-size: 12px;
    padding: 6px;
    width: 80% !important; /* Los campos ocupan todo el ancho disponible */
    box-sizing: border-box; /* Aseguramos que no se desborden */
    margin-left: 15px;
  }

  .btn-form-contact {
    font-size: 12px;
    padding: 8px 10px; 
    width: 30% !important; /* El botón ocupa todo el ancho disponible */
    box-sizing: border-box; /* Evitamos que se desborde */
    margin-bottom: 15px;
  }

  .form-group {
    margin-bottom: 0.5rem !important; /* Ajusta los márgenes entre los elementos */
  }
  label {
    margin-left: 20px; /* Esto agrega margen a la izquierda de los labels (títulos) */
    font-size: 14px; /* Puedes ajustar el tamaño del texto si es necesario */
  }
}

/* Smartphones extra pequeños (Android muy básicos y iPhone 4/5) */
@media (max-width: 360px) {

  .card {
    width: 100% !important; /* El contenedor principal ocupa todo el ancho */
    height: auto; /* Ajustamos la altura para que se adapte al contenido */
    margin: 0 !important; /* Eliminamos márgenes */
    margin-top: 0 !important;
    padding: 0 !important; /* Eliminamos padding innecesario */
  }

  .custom-card {
    width: 85% !important; /* La tarjeta ocupa el 100% */
    padding: 1rem;
    border-radius: 8px;
  }

  .text-form-title {
    font-size: 18px;
    text-align: center;
    margin-left: 20px; 
    margin-right: 15px;
    margin-top: 15px;
  }

  .text-form-contact {
    font-size: 12px;
  }

  .form-control {
    font-size: 12px;
    padding: 6px;
    width: 85% !important; /* Los campos ocupan todo el ancho disponible */
    box-sizing: border-box; /* Aseguramos que no se desborden */
    margin-left: 20px;
    display: block; /* Hace que el input se comporte como un bloque */
 
  }

  .btn-form-contact {
    font-size: 12px;
    padding: 8px 10px; 
    width: 30% !important; /* El botón ocupa todo el ancho disponible */
    box-sizing: border-box; /* Evitamos que se desborde */
    margin-bottom: 15px;
    text-align: center;
  }

  .form-group {
    margin-bottom: 0.5rem !important; /* Ajusta los márgenes entre los elementos */
  }
  label {
    margin-left: 25px; /* Esto agrega margen a la izquierda de los labels (títulos) */
    font-size: 14px; /* Puedes ajustar el tamaño del texto si es necesario */
  }

}

@media (max-width: 375px) {

  .card {
    width: 100% !important; /* El contenedor principal ocupa todo el ancho */
    height: auto; /* Ajustamos la altura para que se adapte al contenido */
    margin: 0 !important; /* Eliminamos márgenes */
    margin-top: 0 !important;
    padding: 0 !important; /* Eliminamos padding innecesario */
  }

  .custom-card {
    width: 90% !important; /* La tarjeta ocupa el 100% */
    padding: 1rem;
    border-radius: 8px;
  }

  .text-form-title {
    font-size: 18px;
    text-align: center;
    margin-left: 15px; 
    margin-right: 15px;
    margin-top: 15px;
  }

  .text-form-contact {
    font-size: 12px;
  }

  .form-control {
    font-size: 12px;
    padding: 6px;
    width: 80% !important; /* Los campos ocupan todo el ancho disponible */
    box-sizing: border-box; /* Aseguramos que no se desborden */
    margin-left: 15px;
  }

  .btn-form-contact {
    font-size: 12px;
    padding: 8px 10px; 
    width: 30% !important; /* El botón ocupa todo el ancho disponible */
    box-sizing: border-box; /* Evitamos que se desborde */
    margin-bottom: 15px;
  }

  .form-group {
    margin-bottom: 0.5rem !important; /* Ajusta los márgenes entre los elementos */
  }
  label {
    margin-left: 15px; /* Esto agrega margen a la izquierda de los labels (títulos) */
    font-size: 14px; /* Puedes ajustar el tamaño del texto si es necesario */
  }

}



</style>
