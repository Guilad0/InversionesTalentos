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
      </div>  -->

      <form @submit.prevent="registrarExperiencia" novalidate>
        <div class="row mb-3">
          <div class="col-12">
            <div class="input-container">
              <label for="nombre" class="label">
                Motivo<strong class="text-danger">*</strong>
              </label>
              <input
                id="nombre"
                v-model="nombre"
                @input="eliminarEspacioInicio('nombre')"
                ref="refNombre"
                type="text"
                class="input form-control"
                required
              />
            </div>
          </div>
          <div class="col">
            <div class="input-container">
              <label for="descripcion" class="label">
                Descripción <strong class="text-danger">*</strong>
              </label>
              <textarea
                id="descripcion"
                ref="refDescripcion"
                v-model="descripcion"
                @input="eliminarEspacioInicio('descripcion')"
                class="input form-control"
                rows="3"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <div class="input-container position-relative">
              <label for="fecha_inicio_recaudacion" class="label">
                Fecha Inicio Recaudación<strong class="text-danger">*</strong>
              </label>
              <input
                id="fecha_inicio_recaudacion"
                v-model="fecha_inicio_recaudacion"
                type="date"
                class="input form-control"
                :min="fecha_inicio_rec"
                required
              />
              <label
                for="fecha_inicio_recaudacion"
                class="mt-2 mb-0 p-0 custom-abs"
              >
                Fecha de recaudacion apartir de {{ fecha_inicio_rec }}
              </label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-container">
              <label for="fecha_fin_recaudacion" class="label">
                Fecha Final Recaudación<strong class="text-danger">*</strong>
              </label>
              <input
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
          <div class="col-md-4">
            <div class="input-container">
              <label for="monto" class="label">
                Monto<strong class="text-danger">* </strong>
                <i
                  class="fa-regular fa-circle-question"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="custom-tooltip"
                  :data-bs-title="msg"
                >
                </i>
              </label>

              <input
                id="monto"
                v-model="monto"
                @input="formatearMonto"
                type="text"
                class="input form-control no-spin"
                required
              />
              <div v-if="monto" class="text-sm text-gray-600 mt-1">
                Equivalente: {{ montoCalculado.usdt }}
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-container">
              <label class="label">Porcentaje de Interés</label>
              <input
                v-model="porcentajeInteresFormateado"
                type="text"
                class="input form-control"
                readonly
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-container">
              <label for="cantidad_pagos" class="label">
                Cantidad Pagos<strong class="text-danger">* </strong>
                <i
                  class="fa-regular fa-circle-question"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="custom-tooltip"
                  data-bs-title="Plazo maximo de hasta 24 cuotas"
                >
                </i>
              </label>
              <input
                id="cantidad_pagos"
                v-model.number="cantidad_pagos"
                type="number"
                class="input form-control no-spin"
                required
              />
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <div class="input-container">
              <label for="fecha_inicio_pago" class="label">
                Fecha Inicio Pago<strong class="text-danger">*</strong>
              </label>
              <input
                id="fecha_inicio_pago"
                v-model="fecha_inicio_pago"
                type="date"
                :min="fecha_fin_recaudacion"
                class="input form-control"
                required
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-container">
              <label for="fecha_fin_pago" class="label">
                Fecha Fin Inversión
              </label>
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

        <div class="row mb-3">
          <div class="col-md-6">
            <div class="input-container">
              <label class="label">Pago Mensual</label>
              <input
                v-model="pagoMensual"
                type="text"
                class="input form-control"
                readonly
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-container">
              <label class="label">Monto Total a Pagar</label>
              <input
                v-model="montoTotal"
                type="text"
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
import { ref, onMounted, watchEffect, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import iziToast from "izitoast";
import { successAlert, errorAlert } from "../helpers/iziToast";
import { initializeTooltips } from "@/helpers/utilities";
import Swal from "sweetalert2";

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
const valor_token = ref(0);
const refMinDate = ref("");
const refDescripcion = ref("");
const refMonto = ref("");
const refNombre = ref("");
const refMaxDate = ref("");
// Obtener el cliente_id desde localStorage al montar el componente
const user = ref(JSON.parse(localStorage.getItem("usuario")));

const fechaActual = ref(new Date().toISOString().split("T")[0]);
const porcentajeInteres = ref(0);
const porcentajeGananciaPlataforma = ref(0);
const pagoMensual = ref("");
const montoTotal = ref("");
const fecha_inicio_rec = ref(new Date());
onMounted(async () => {
  fecha_inicio_rec.value = new Date(
    fecha_inicio_rec.value.setDate(fecha_inicio_rec.value.getDate() + 2)
  )
    .toISOString()
    .split("T")[0];
  await obtenetPorcentajeGananciaPlataforma();
  await obtenerPorcentajeInteres();
  console.log(user.value);
  fecha_inicio_recaudacion.value = fecha_inicio_rec.value;
  if (user) {
    cliente_id.value = user.value.usuario_id;
    initializeTooltips();
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

const obtenetPorcentajeGananciaPlataforma = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/ajustes`
    );
    porcentajeGananciaPlataforma.value =
      data.results[0].comision_porcentual_ganancia;
    valor_token.value = data.results[0].valor_token;
    console.log(
      "el valor del token es:",
      valor_token.value,
      "el porcentaje de ganancia de la plataforma es:",
      porcentajeGananciaPlataforma.value
    );
  } catch (error) {
    console.error(
      "Error al obtener el porcentaje de ganancia de la plataforma:",
      error
    );
  }
};
const rangoMin = ref(0);
const rangoMax = ref(0);
const msg = ref("");
const obtenerPorcentajeInteres = async () => {
  if (user.value) {
    cliente_id.value = user.value.usuario_id;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/categories/user/${cliente_id.value}`
      );
      console.log(response);
      msg.value = `Capital permitida para este rubro a partir de ${response.data.monto_minimo_inversion}$ a ${response.data.monto_maximo_inversion}$.`;
      rangoMin.value = response.data.monto_minimo_inversion;
      rangoMax.value = response.data.monto_maximo_inversion;
      porcentajeInteres.value = (
        parseFloat(response.data.porcentaje_interes).toFixed(2) * 1 +
        parseFloat(porcentajeGananciaPlataforma.value).toFixed(2) * 1
      ).toFixed(2);
      console.log(
        "interes total",
        porcentajeInteres.value,
        porcentajeGananciaPlataforma.value
      );
    } catch (error) {
      console.error("Error al obtener el porcentaje de interés:", error);
    }
  }
};
const montoCalculado = computed(() => {
  if (!monto.value) return { usd: "$0", usdt: "0 USDT" };

  const montoNumerico = parseFloat(monto.value.replace(/[^0-9.-]+/g, ""));

  return {
    usd: montoNumerico.toLocaleString("es-EC", {
      style: "currency",
      currency: "USD",
    }),
    usdt: (montoNumerico * valor_token.value).toFixed(2) + " USDT",
  };
});

const porcentajeInteresFormateado = computed(() => {
  return porcentajeInteres.value ? `${porcentajeInteres.value}%` : "0%";
});
const calcularMontos = () => {
  if (monto.value && cantidad_pagos.value > 0) {
    const montoNumerico = parseFloat(monto.value.replace(/[^0-9.-]+/g, ""));

    // Calcular con 2 decimales
    const interes = (montoNumerico * (porcentajeInteres.value / 100)).toFixed(
      2
    );
    const total = (parseFloat(montoNumerico) + parseFloat(interes)).toFixed(2);

    montoTotal.value = `$${parseFloat(total).toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    const mensual = (total / cantidad_pagos.value).toFixed(2);
    pagoMensual.value = `$${parseFloat(mensual).toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  } else {
    montoTotal.value = "";
    pagoMensual.value = "";
  }
};
// Función para registrar la experiencia
const registrarExperiencia = async () => {
  if (!validarCampos()) return;

  const datos = {
    cliente_id: cliente_id.value,
    nombre: nombre.value,
    descripcion: descripcion.value,
    monto: parseFloat(
      monto.value.replace(/[^0-9.-]+/g, "") * valor_token.value
    ),
    cantidad_pagos: cantidad_pagos.value,
    fecha_inicio_recaudacion: fecha_inicio_recaudacion.value,
    fecha_fin_recaudacion: fecha_fin_recaudacion.value,
    fecha_inicio_pago: fecha_inicio_pago.value,
    fecha_fin_pago: fecha_fin_pago.value,
    porcentaje_interes: porcentajeInteres.value,
  };

  try {
    await axios.post(
      import.meta.env.VITE_BASE_URL + "/solicitudesInversion",
      datos
    );
    successAlert("Solicitud de Inversión registrada correctamente", "¡Éxito!");

    if (
      monto.value.replace(/[^0-9.-]+/g, "") > rangoMax.value ||
      monto.value.replace(/[^0-9.-]+/g, "") < rangoMin.value
    ) {
      Swal.fire({
        title: "Monto exedido",
        icon: "warning",
        text: `El monto solicitado supera los límites establecidos para el rubro actual, con un rango de ${rangoMin.value}$ a ${rangoMax.value}$. Su solicitud será revisada por administración antes de ser aprobada.`,
        confirmButtonColor: "#D95C00",
        draggable: true,
        allowOutsideClick: false,
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({ name: "perfil" });
        }
      });
    }
    limpiarCampos();
    router.push({ name: "perfil" });
  } catch (error) {
    errorAlert("Error al registrar la Solicitud de Inversión.", "Error");
  }
};

const validarCampos = () => {
  if (!nombre.value.trim()) {
    errorAlert("El campo 'Motivo' es obligatorio.", "Error");
    return false;
  }
  if (!descripcion.value.trim()) {
    errorAlert("El campo 'Descripción' es obligatorio.", "Error");
    return false;
  }
  if (monto.value <= 0) {
    errorAlert("El monto debe ser mayor a 0.", "Error");
    return false;
  }
  if (cantidad_pagos.value < 0 || cantidad_pagos.value > 24) {
    errorAlert("La cantidad de pagos debe estar entre 1 y 24 meses.", "Error");
    return false;
  }
  if (fecha_inicio_recaudacion.value < fecha_inicio_rec.value) {
    errorAlert(`Inversiones a partir de  ${fecha_inicio_rec.value}`, "Error");
    return false;
  }
  if (
    !fecha_inicio_recaudacion.value ||
    fecha_inicio_recaudacion.value < fechaActual.value
  ) {
    errorAlert(
      "La fecha de inicio de recaudación debe ser igual o posterior a hoy.",
      "Error"
    );
    return false;
  }
  if (
    !fecha_fin_recaudacion.value ||
    fecha_fin_recaudacion.value <= fecha_inicio_recaudacion.value
  ) {
    errorAlert(
      "La fecha final de recaudación debe ser posterior a la fecha de inicio.",
      "Error"
    );
    return false;
  }
  if (
    !fecha_inicio_pago.value ||
    fecha_inicio_pago.value <= fecha_fin_recaudacion.value
  ) {
    errorAlert(
      "La fecha de inicio de pago debe ser posterior a la fecha final de recaudación.",
      "Error"
    );
    return false;
  }
  return true;
};

const eliminarEspacioInicio = (campo) => {
  if (campo === "nombre") {
    nombre.value = nombre.value.replace(/^\s+/, ""); // Elimina los espacios al inicio de 'nombre'
  } else if (campo === "descripcion") {
    descripcion.value = descripcion.value.replace(/^\s+/, ""); // Elimina los espacios al inicio de 'descripcion'
  }
};

const formatearMonto = () => {
  let montoStr = monto.value.replace(/[^0-9]/g, "");

  if (montoStr.length > 0) {
    const montoNumerico = parseInt(montoStr);
    monto.value = `$${montoNumerico}`;
  } else {
    monto.value = "";
  }
};

const limpiarCampos = () => {
  nombre.value = "";
  descripcion.value = "";
  monto.value = "";
  cantidad_pagos.value = "";
  fecha_inicio_recaudacion.value = "";
  fecha_fin_recaudacion.value = "";
  fecha_inicio_pago.value = "";
  fecha_fin_pago.value = "";
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
  calcularMontos();
  calcularFechaFinInversion();
});
</script>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 60px 0;
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
  width: 700px;
  z-index: 2;
  margin: 20px auto;
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

.row {
  margin-bottom: 0.5rem !important;
}

/*resposividad*/
@media (max-width: 768px) {
  .background {
    padding: 40px 0;
  }

  .form {
    width: 90%;
    padding: 15px;
    margin: 10px auto;
  }

  .row {
    margin-bottom: 0.25rem !important;
  }

  .input-container {
    margin-top: 8px;
  }

  .title {
    font-size: 22px;
    margin-top: 0;
  }

  .subtitle {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 10px;
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
  .background {
    padding: 20px 0;
  }

  .form {
    width: 95%;
    padding: 10px;
  }

  .input-container {
    margin-top: 5px;
  }

  .row {
    margin-bottom: 0.15rem !important;
  }

  .title {
    font-size: 20px;
  }

  .subtitle {
    font-size: 18px;
  }

  .label {
    font-size: 14px;
    margin-bottom: 2px;
  }

  .input {
    font-size: 14px;
    padding: 6px 12px;
    height: 35px;
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

.custom-abs {
  position: absolute;
  bottom: -22px;
}
</style>
