<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="form animate__animated animate__fadeIn">
      <div class="title">¡Bienvenid@ {{ user?.nombre }}!</div>
      <div class="subtitle">Solicitud de Inversión</div>
      <br />
      <!-- Botón para volver al Perfil -->
      <!-- <div class="back-button1">
        <router-link to="/perfil" class="btn-back">
          Volver a Perfil
        </router-link>
      </div> -->

      <form @submit.prevent="registrarExperiencia" novalidate>
        <div class="row mb-3">
          <div class="col mb-6">
            <div class="input-container">
              <label for="nombre" class="label"
                >Motivo<strong class="text-danger">*</strong></label
              >
              <input
                id="nombre"
                v-model="nombre"
                ref="refNombre"
                type="text"
                class="input form-control"
                required
              />
              <div class="ms-2 invalid-feedback fs-custom">
                Debes Completar este Campo
              </div>
            </div>
          </div>
        </div>

        <div class="input-container2">
          <label for="descripcion" class="label"
            >Descripción <strong class="text-danger">*</strong></label
          >
          <textarea
            id="descripcion"
            ref="refDescripcion"
            v-model="descripcion"
            pattern="^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*.{3,}$"
            class="input form-control"
            rows="3"
            required
          ></textarea>
          <div class="ms-2 invalid-feedback fs-custom">
            Debes Completar este Campo
          </div>
        </div>
        <div class="row mb-3">
          <div class="col mb-6">
            <div class="input-container">
              <label for="fecha_inicio_recaudacion" class="label"
                >Fecha Inicio Recaudación<strong class="text-danger"
                  >*</strong
                ></label
              >
              <input
                id="fecha_inicio_recaudacion"
                v-model="fecha_inicio_recaudacion"
                type="date"
                :min="fechaActual"
                class="input form-control"
                required
              />
            </div>
          </div>
          <div class="col mb-6">
            <div class="input-container">
              <label for="fecha_fin_recaudacion" class="label"
                >Fecha Final Recaudación<strong class="text-danger"
                  >*</strong
                ></label
              >
              <input
                ref="refMaxDate"
                id="fecha_fin_recaudacion"
                v-model="fecha_fin_recaudacion"
                type="date"
                :min="fechaActual"
                class="input form-control"
                required
              />
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col mb-6">
            <div class="input-container">
              <label for="monto" class="label"
                >Monto<strong class="text-danger">*</strong></label
              >
              <input
                id="monto"
                v-model.number="monto"
                ref="refMonto"
                type="number"
                class="input form-control no-spin"
                required
              />
              <div class="ms-2 invalid-feedback fs-custom">
                Campo requerido, ingresar un valor mayor a 0
              </div>
            </div>
          </div>
          <div class="col mb-6">
            <div class="input-container">
              <label for="cantidad_pagos" class="label"
                >Cantidad Pagos<strong class="text-danger">*</strong></label
              >
              <input
                id="cantidad_pagos"
                v-model.number="cantidad_pagos"
                ref="refCantidadPagos"
                type="number"
                class="input form-control no-spin"
                required
              />
              <div class="ms-2 invalid-feedback fs-custom">
                Campo requerido, ingresar un valor mayor a 0
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col mb-6">
            <div class="input-container">
              <label for="fecha_inicio_pago" class="label"
                >Fecha Inicio Pago<strong class="text-danger">*</strong></label
              >
              <input
                id="fecha_inicio_pago"
                v-model="fecha_inicio_pago"
                type="date"
                :min="fechaActual"
                class="input form-control"
                required
              />
            </div>
          </div>
          <div class="col mb-6">
            <div class="input-container">
              <label for="fecha_fin_pago" class="label"
                >Fecha Fin Inversión<strong class="text-danger"
                  >*</strong
                ></label
              >
              <input
                id="fecha_fin_pago"
                v-model="fecha_fin_pago"
                type="date"
                class="input form-control"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn-gray mt-3 btn">Registrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import iziToast from "izitoast";
import { successAlert, errorAlert } from "../helpers/iziToast";

const router = useRouter();
const cliente_id = ref("");
const descripcion = ref("");
const nombre = ref("");
const monto = ref("");
const cantidad_pagos = ref("");
const fecha_inicio_pago = ref("");
const fecha_inicio_recaudacion = ref("");
const fecha_fin_recaudacion = ref("");
const fecha_fin_pago = ref("");
const refMinDate = ref("");
const refDescripcion = ref("");
const refMonto = ref("");
const refNombre = ref("");
const refMaxDate = ref("");
// Obtener el cliente_id desde localStorage al montar el componente
const user = ref(JSON.parse(localStorage.getItem("usuario")));

const fechaActual = ref(new Date().toISOString().split("T")[0]);


onMounted(() => {
  console.log(user.value);
  if (user) {
    cliente_id.value = user.value.usuario_id;
  } else {
    // Alerta de error si no se encuentra el cliente_id en localStorage
    iziToast.error({
      title: "Error",
      message: "Usuario no valido para esta seccion",
      messageColor: "white",
      position: "topRight",
      theme: "dark",
      color: "#FF3B30", // Color de fondo rojo para el error
      closeOnEscape: true,
      progressBarColor: "#FFFFFF",
    });
  }
});

// Función para registrar la experiencia
const registrarExperiencia = async (event) => {
  nombre.value = nombre.value.trim();
  descripcion.value = descripcion.value.trim();
  if (!nombre.value || !descripcion.value || monto.value <= 0 || cantidad_pagos.value <= 0) {
    errorAlert("Todos los campos obligatorios deben ser completados correctamente", "Error");
    return;
  }
  /* if (nombre.value && nombre.value.trim().replace(/[^A-Za-z]/g, "").length <= 5) {
    nombre.value = nombre.value.trim() == "" ? "" : nombre.value;
    refNombre.value.focus();
    errorAlert("El campo motivo debe contener más de 5 letras.", "Error");
    return;
  }
  if (monto.value && monto.value.trim().replace(/[^A-Za-z]/g, "").length <= 5) {
    monto.value = monto.value.trim() == "" ? "" : monto.value;
    refMonto.value.focus();
    errorAlert("El campo monto  debe contener más de 5 letras.", "Error");
    return;
  }

  if (
    descripcion.value &&
    descripcion.value.trim().replace(/[^A-Za-z]/g, "").length <= 5
  ) {
    descripcion.value = descripcion.value.trim() == "" ? "" : descripcion.value;
    refDescripcion.value.focus();
    errorAlert("La descripción no puede estar vacía ni contener solo espacios.", "Error");
    return;
  }
  if (fecha_inicio_recaudacion.value <= minDate.value) {
    errorAlert("Fecha de inicio no valida.", "Error");
    refMinDate.value.focus();
    return;
  }
  if (fecha_fin_recaudacion.value > maxDate.value) {
    errorAlert("Fecha de inicio no valida.", "Error");
    refMaxDate.value.focus();
    return;
  }
  if (fecha_inicio_recaudacion.value >= fecha_fin_recaudacion.value) {
    errorAlert("La fecha de inicio no puede ser mayor a la fecha final.", "Error");
    refMinDate.value.focus();
    return;
  } */
  const datos = {
    cliente_id: cliente_id.value,
    descripcion: descripcion.value,
    fecha_inicio_recaudacion: fecha_inicio_recaudacion.value,
    fecha_fin_recaudacion: fecha_fin_recaudacion.value,
    monto: monto.value,
    nombre: nombre.value,
    cantidad_pagos: cantidad_pagos.value,
    fecha_inicio_pago: fecha_inicio_pago.value,
    fecha_fin_pago: fecha_fin_pago.value,
  };
  console.log(datos);
  try {
    await axios.post(
      import.meta.env.VITE_BASE_URL + "/solicitudesInversion",
      datos
    );
    // Limpiar los campos después de registrar
    descripcion.value = "";
    fecha_inicio_recaudacion.value = "";
    fecha_fin_recaudacion.value = "";
    monto.value = "";
    nombre.value = "";
    cantidad_pagos.value = "";
    fecha_inicio_pago.value = "";
    fecha_fin_pago.value = "";
    successAlert("Solicitud de Inversión registrada correctamente", "¡Éxito!");
    // Redirigir al perfil
    router.push({ name: "perfil" });
  } catch (error) {
    console.error(error);
    errorAlert(
      "Hubo un problema al registrar la Solicitud de Inversión.",
      "Error"
    );
    // window.location.reload();
  }
};

const calcularFechaFinInversion = () => {
  if (fecha_inicio_pago.value) {
    const fechaInicio = new Date(fecha_inicio_pago.value);
    if (cantidad_pagos.value > 0) {
      const cantidadPagos = parseInt(cantidad_pagos.value, 10);
      const fechaFin = new Date(
        fechaInicio.setMonth(fechaInicio.getMonth() + cantidadPagos)
      );
      fecha_fin_pago.value = fechaFin.toISOString().split("T")[0];
    } else {
      fecha_fin_pago.value = fecha_inicio_pago.value;
    }
  }
};
watchEffect(() => {
  calcularFechaFinInversion();
});
</script>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  position: relative;
  background-image: url("@/assets/images/otro-fondo3.png");
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
  background-color: rgba(4, 4, 4, 0.563);
  /* Fondo negro con opacidad del 50% */
  z-index: 1;
  /* Asegura que la capa de opacidad esté encima de la imagen */
}

.form {
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.877);
  border-radius: none;
  box-sizing: border-box;
  padding: 30px;
  width: 800px;
  z-index: 2;
}

.title {
  color: #17223b;
  font-family: var(--font-montserrat-bold);
  font-size: 30px;
  font-weight: 700;
  margin-top: 10px;
  text-align: center;
}

.subtitle {
  color: #17223b;
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
  color: #17223b;
  font-family: sans-serif;
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
}

.input {
  background-color: rgba(44, 46, 51, 0.8);
  color: #f3f3f4;
  border-radius: 12px;
  border: none;
  font-size: 18px;
  padding: 8px 20px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  height: 38px;
  /* Altura fija para los inputs */
}

.input:focus {
  background-color: var(--white-color);
  border: 2px solid #f37926 !important;
  outline: none;
  box-shadow: none;
  color: black;
}

.submit {
  background-color: #17223b;
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

.submit:hover {
  background-color: #f37926;
  color: #fff;
}

textarea.input {
  height: auto;
}

.submit:active {
  background-color: #f37926;
}

.input:focus {
  background-color: white;
  color: black;
  /* Fondo blanco cuando el campo está en foco */
  border-color: #80bdff;
  /* Color del borde */
  outline: none;
  /* Elimina el contorno */
}

.back-button1 {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  margin-top: 1px;
}

.btn-back {
  padding: 10px 20px;
  background-color: #17223b;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
}

.btn-back:hover {
  background-color: #f37926;
  color: #fff;
}

/*resposividad*/
@media (max-width: 768px) {
  .form {
    width: 80%;
    padding: 20px;
  }

  .title {
    font-size: 24px;
  }

  .subtitle {
    font-size: 22px;
  }

  .input {
    font-size: 16px;
    padding: 6px 10px;
  }

  .submit {
    font-size: 16px;
    height: 45px;
  }

  .back-button1 {
    margin: 5px;
  }
}

@media (max-width: 480px) {
  .form {
    width: 85%;
    padding: 15px;
  }

  .title {
    font-size: 20px;
  }

  .subtitle {
    font-size: 18px;
  }

  .input {
    font-size: 14px;
  }

  .submit {
    font-size: 14px;
    height: 40px;
  }

  .back-button1 {
    margin: 5px;
  }

  .btn-back {
    font-size: 14px;
    padding: 8px 16px;
  }
}

@media (max-width: 360px) {
  .form {
    width: 95%;
    padding: 15px;
  }

  .title {
    font-size: 18px;
  }

  .subtitle {
    font-size: 16px;
  }

  .input {
    font-size: 14px;
    padding: 6px 10px;
  }

  .submit {
    font-size: 14px;
    height: 40px;
  }

  .back-button1 {
    margin: 5px;
  }
}

@media (max-height: 600px) {
  .form {
    padding: 10px;
    width: 100%;
    height: auto;
  }

  .title {
    font-size: 18px;
  }

  .subtitle {
    font-size: 14px;
  }

  .submit {
    height: 40px;
    font-size: 14px;
  }

  .input {
    height: 35px;
  }

  .back-button1 {
    margin: 5px;
  }

  .input-container {
    margin-top: 10px;
  }
}
.no-spin::-webkit-inner-spin-button,
.no-spin::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
