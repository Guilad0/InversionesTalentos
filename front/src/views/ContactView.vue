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

import { useRouter } from "vue-router";
import Unete from "../components/Unete.vue";
const route = useRouter();
console.log(route.currentRoute.value.path);

const baseURL = "https://apitalentos.pruebasdeploy.online/contact";

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
    iziToast.error({
      // class: "test",
      title: "ERROR",
      message: "Debe ingresar todos los campos obligatorios",
      position: "topRight",
      //messageColor: "red",
      // titleColor: "red",
      backgroundColor: "red",
    });
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
            iziToast.success({
              title: "Felicidades!!",
              message:
                "Tu comentario ha sido enviado con éxito, espera nuestra respuesta",
              position: "topRight",
            });
            resetForm();
          } catch (error) {
            console.error(error);
            iziToast.error({
              title: "Error",
              message: "Hubo un problema al registrar tu comentario, intenta de nuevo.",
            });
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
  height: 100vh; /* Corregir el error de sintaxis */
  margin: 0;
  position: relative; /* Asegura que el overlay se posicione bien dentro de este contenedor */
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
  font-family: sans-serif; /* Asegúrate de definir tu fuente personalizada */
}

.custom-card {
  padding: 3rem;
  width: 50%;
  margin: 3rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1s ease;
}

.card {
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.871);
  border-radius: none;
  box-sizing: border-box;
  padding: 30px;
  width: 500px;
  z-index: 2; /* Asegura que el formulario esté encima del overlay */
}

.form-control {
  border-radius: 12px;
  background-color: rgba(44, 46, 51, 0.8); /* Color de fondo personalizado */
  color: #F3F3F4;
}

.text-form-title{
  font-size: 26px;
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



</style>
