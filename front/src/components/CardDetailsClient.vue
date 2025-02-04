<template>
  <div class="col-7 col-xl-9 col-md-12 col-sm-10 d-none d-md-block">
    <!-- Botón para volver al Marketplace -->
    <div class="back-button1">
      <router-link to="/marketplace" class="btn-back">
        Volver al Marketplace
      </router-link>
    </div>

    <div class="card banner-card z-1 bg-degrade text-white">
      <!-- Imagen superior (ej. imagen de fondo) -->
      <img
        src="../assets/images/ejemplodeperfil.jpg"
        class="card-img-top"
        alt="Background Image"
      />

      <!-- Imagen de perfil -->
      <div class="card-body p-5">
        <div class="profile-section">
          <img
            :src="client.imagen || '../assets/images/fotoperfil.png'"
            class="profile-image"
            alt="Profile Image"
          />
        </div>
        <!-- nombre y datos -->
        <div class="mt-5">
          <div class="row">
            <div class="col-8">
              <h2 class="card-title" style="text-transform: capitalize">
                {{ client.nombre }} {{ client.apellido }}
              </h2>

              <h5>{{ client.ocupacion }}</h5>

              <h6>{{ client.pais_residencia }}</h6>
            </div>

            <div class="col-4 text-end">
              <div>
                <span v-if="prom">{{ prom }}</span>
              </div>

              <div>
                <span class="stars" v-html="generarEstrellas(prom)"></span>
                <label class="fs-6 p-2"
                  >Inversion desde
                  <strong
                    >{{ client.monto_inversion * 1 }} Tokens</strong
                  ></label
                >
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <button
              :disabled="loadingValues"
              class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-3"
              data-bs-toggle="modal"
              data-bs-target="#modalVideoPresentacion"
            >
              <i class="fas fa-video"></i> Video Presentación<span></span>
            </button>

            <button
              :disabled="loadingValues"
              class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2"
              :class="{ 'active-button': mostrarInformacion }"
              @click="toggleInformacion()"
            >
              <i class="fas fa-info-circle"></i> Información<span></span>
            </button>

            <button
              :disabled="loadingValues"
              class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2"
              :class="{ 'active-button': mostrarLogros }"
              @click="toggleLogros()"
            >
              <i class="fas fa-trophy"></i> Logros<span></span>
            </button>

            <button
              :disabled="loadingValues"
              class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2"
              :class="{ 'active-button': mostrarExperiencia }"
              @click="toggleExperiencia()"
            >
              <i class="fas fa-briefcase"></i> Experiencia<span></span>
            </button>

            <button
              :disabled="loadingValues"
              v-if="user.rol !== 'Admin'"
              class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-3"
              @click="irBilletera"
            >
              <i class="fas fa-wallet"></i> Fondear mi Billetera<span></span>
            </button>

            <button
              :disabled="
                loadingValues ||
                loadingInvertir == true ||
                tokensCompradosInversionista - tokensInvertidosInversionista <=
                  0 ||
                inv.monto == inv.total_recaudado
              "
              v-if="user.rol !== 'Admin'"
              class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2"
              data-bs-toggle="modal"
              data-bs-target="#modalInversion"
              :title="
                tokensCompradosInversionista - tokensInvertidosInversionista <=
                0
                  ? 'No tienes tokens suficientes para invertir'
                  : '' || inv.monto == inv.total_recaudado
                  ? 'El proyecto ha alcanzado su objetivo'
                  : ''
              "
            >
              <i class="fas fa-dollar-sign"></i>
              <label v-if="!loadingValues || loadingInvertir == true"
                >Invertir</label
              >
              <label v-else>..cargando</label>
              <span></span>
            </button>
          </div>

          <div
            class="mt-3 animate__animated animate__fadeInUp animate__slow"
            v-if="!loadingValues"
          >
            <h5 class="title text-center text-light mb-3">
              Descripción del Proyecto
            </h5>

            <div class="card bg-degrade-light p-1 rounded-4">
              <div class="card-body row text-black justify-content-between">
                <div class="col-md-6">
                  <p class="font col">
                    <strong>Inversión</strong> <br />{{ inv.nombre }}
                  </p>
                  <p class="font col">
                    <strong>Objetivo de la inversión </strong> <br />{{
                      inv.descripcion
                    }}
                  </p>
                  <p class="font col">
                    <strong>Período de recaudación (Inicio - Fin) </strong>
                    <br />
                    {{ inv.fecha_inicio_recaudacion }} -
                    {{ inv.fecha_fin_recaudacion }}
                  </p>
                  <p class="font col">
                    <strong>Cantidad total de pagos </strong> <br />{{
                      inv.cantidad_pagos
                    }}
                  </p>
                  <p class="font col">
                    <strong>Interes </strong> <br />{{ inv.porcentaje_interes }}
                    %
                  </p>

                  <p class="font col">
                    <strong>Inicio de pago de intereses</strong> <br />{{
                      inv.fecha_inicio_pago
                    }}
                  </p>
                  <p class="font col">
                    <strong>Último pago de intereses</strong> <br />{{
                      inv.fecha_fin_pago
                    }}
                  </p>
                </div>

                <div class="col-md-6 text-center">
                  <br /><br /><br /><br /><br />
                  <p class="font col fs-5">
                    <strong>TOKENS REQUERIDOS </strong>
                    <span class="text-primary fw-bold fs-5 text-center"
                      ><br />
                      {{ inv.monto }}
                    </span>
                  </p>
                  <div class="col-md-12 row">
                    <p class="font col text-start">
                      <strong>Acumulado </strong>
                      <span class="text-primary fw-bold"
                        ><br />
                        {{ inv.total_recaudado }}
                      </span>
                    </p>
                    <p class="font col text-end">
                      <strong>Faltante </strong>
                      <span class="text-primary fw-bold"
                        ><br />
                        {{ inv.monto_restante }}
                      </span>
                    </p>
                  </div>

                  <!-- Barra de progreso para los tokens acumulados -->
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      :style="
                        'width: ' +
                        (inv.total_recaudado / inv.monto) * 100 +
                        '%'
                      "
                      :aria-valuenow="(inv.total_recaudado / inv.monto) * 100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {{
                        ((inv.total_recaudado / inv.monto) * 100).toFixed(1)
                      }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="mt-3 text-center align-middle m-auto">
            cargando
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="mostrarInformacion"
      class="card banner-card mt-3 fade-in bg-degrade text-white"
    >
      <div class="card-body p-5 text-center">
        <h3>Información</h3>

        <h6 class="mt-3">
          <i class="fas fa-dollar-sign"></i>
          <strong>Monto de inversión:</strong> ${{ client.monto_inversion }}
        </h6>
        <h6 class="mt-3">
          <i class="fas fa-tags"></i> Categoría: {{ client.categoria }}
        </h6>
        <h6 class="mt-3">
          <i class="fas fa-graduation-cap"></i> <strong>Estudios:</strong>
          {{ client.estudios }}
        </h6>
        <h6 class="mt-3">
          <i class="fas fa-info-circle"></i> <strong>Descripción:</strong>
          {{ client.descripcion }}
        </h6>
        <h6 class="mt-3">
          <i class="fas fa-calendar-alt"></i> <strong>Edad:</strong>
          {{ client.edad }}
        </h6>
        <h6 class="mt-3">
          <i class="fas fa-venus-mars"></i> <strong>Género:</strong>
          {{ client.genero }}
        </h6>
        <h6 class="mt-3">
          <i class="fas fa-phone"></i> <strong>Número de teléfono:</strong>
          {{ client.numero_telefono }}
        </h6>
      </div>
    </div>

    <div
      v-if="mostrarLogros"
      class="card banner-card mt-3 fade-in bg-degrade text-white"
    >
      <div class="card-body p-5">
        <h3 class="text-center">Logros</h3>

        <div class="row">
          <div class="col-12" v-for="logro in logros" :key="logro">
            <div class="card mb-3">
              <div class="card-body bg-degrade-inverso text-center text-white">
                <h5>{{ logro.descripcion }}</h5>
                <p>
                  <strong>Fecha: </strong
                  >{{ new Date(logro.fecha).toLocaleDateString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="mostrarExperiencia"
      class="card banner-card mt-3 fade-in bg-degrade text-white"
    >
      <div class="card-body p-5">
        <h3 class="text-center">Experiencia</h3>

        <div
          class="card p-4 bg-degrade-inverso text-white text-center mt-3"
          v-for="exp in experiencia"
          :key="exp.id"
        >
          <h4 class="text-uppercase">{{ exp.institucion }}</h4>
          <h6><strong>Cargo:</strong> {{ exp.cargo }}</h6>
          <h6><strong>Actividades:</strong> {{ exp.actividades }}</h6>
          <h6>
            <strong>Fecha de Inicio:</strong>
            {{ new Date(exp.fecha_inicio).toLocaleDateString() }}
          </h6>
          <h6>
            <strong>Fecha Final:</strong>
            {{ new Date(exp.fecha_final).toLocaleDateString() }}
          </h6>
        </div>
      </div>
    </div>

    <!-- Modal Video Presentación -->
    <!-- <div class="modal fade" id="modalVideoPresentacion" tabindex="-1" aria-labelledby="videoModalLabel"
      aria-hidden="true" @shown.bs.modal="playVideo">  -->
    <div
      class="modal fade"
      id="modalVideoPresentacion"
      tabindex="-1"
      aria-labelledby="videoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content bg-degrade text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="videoModalLabel">
              {{ client.nombre }} {{ client.apellido }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body text-center">
            <video ref="video" class="video-presentacion" controls>
              <source v-if="url" :src="url" type="video/mp4" />
              <!-- Asegúrate de que el tipo de video sea correcto -->
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="animate__animated animate__fadeInUp animate__slow btn-6 btn-7 col-3"
              data-bs-dismiss="modal"
              @click="pauseVideo()"
            >
              Cerrar <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Inversión -->
    <div
      class="modal fade"
      id="modalInversion"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
      >
        <div class="modal-content bg-degrade-inverso text-white">
          <div class="modal-header">
            <h1 class="m-auto modal-title fs-5" id="staticBackdropLabel">
              Datos de la Inversión
            </h1>
          </div>
          <div class="modal-body">
            <!-- Primera fila con una columna -->
            <div class="row">
              <div class="col text-center">
                <p>
                  Estás invirtiendo en el talento {{ client.nombre }} que tiene
                  como objetivo recaudar
                  <strong>{{ inv.monto * valorTokens }}</strong> tokens.
                </p>
                <p>
                  Puedes invertir hasta el:
                  <strong>{{ inv.fecha_fin_recaudacion }}</strong>
                </p>
              </div>
            </div>
            <br />
            <br />
            <form action="#" class="needs-validation" novalidate>
              <!-- Segunda fila con tres columnas -->
              <div class="row">
                <div class="col">
                  <p class="text-center">
                    Tokens Disponibles:
                    <strong>{{ tokensDisponibles }}</strong>
                  </p>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="monto_tokens_invertir" class="form-label"
                      >Tokens a Invertir</label
                    >
                    <input
                      type="number"
                      v-model="monto_tokens_invertir"
                      id="monto_tokens_invertir"
                      class="form-control mb-2"
                      @input="calcularGanancias()"
                      required
                    />
                    <label
                      for="monto_tokens_invertir"
                      :class="{ 'text-danger': bandMinimo }"
                      >Monto minimo de inversion:
                      <strong>{{ rangoMinimo }}</strong>
                    </label>
                    <label
                      for="monto_tokens_invertir"
                      :class="{ 'text-danger': bandMaximo }"
                      >Monto maximo de inversion:
                      <strong>{{ inv.monto_restante }}</strong>
                    </label>
                  </div>
                </div>
                <div class="col text-center">
                  <label class="form-label"
                    >Ganancia del {{ porcentaje_inversion }}%</label
                  >
                  <p class="text-center">
                    <strong>{{ ganancia_tokens_inv }} USDT</strong>
                  </p>
                </div>
              </div>
              <br />
              <!-- Tercera fila con tres columnas -->
              <div class="row">
                <div class="col">
                  <div class="mb-3 text-center">
                    <label class="form-label">Fecha inicio de pago</label>
                    <p>{{ fechaInicioPago }}</p>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3 text-center">
                    <label class="form-label">Fecha fin de pago</label>
                    <p>{{ fechaFinPago }}</p>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3 text-center">
                    <label class="form-label">Cantidad de pagos</label>
                    <p>{{ cantidadPagos }}</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              :disabled="
                monto_tokens_invertir > inv.monto_restante ||
                tokensDisponibles < 0 ||
                bandMinimo != false ||
                loadingInvertir == true
              "
              type="button"
              @click="inversionistaInvertir()"
              class="animate__animated animate__fadeInUp animate__slow btn-6"
              data-bs-dismiss="modal"
            >
              Invertir<span></span>
            </button>
            <button
              type="button"
              class="animate__animated animate__fadeInUp animate__slow btn-6 btn-7"
              data-bs-dismiss="modal"
              @click="closeModal"
            >
              Cerrar<span></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="back-button2">
      <router-link to="/marketplace" class="btn-back">
        Volver al Marketplace
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { ref, onMounted, watch, computed } from "vue";
import Swal from "sweetalert2";
import {
  errorAlert,
  infoAlert,
  successAlert,
  successAlertAcept,
} from "@/helpers/iziToast";
const route = useRoute();
const router = useRouter();
const userId = ref("");
const client = ref({});
const url = ref("");
const prom = ref("");
const user = ref(JSON.parse(localStorage.getItem("usuario")));

const getUser = async () => {
  try {
    const { data } = await axios.get(
      // "https://apitalentos.pruebasdeploy.online/users/getUserById/" + userId.value
      import.meta.env.VITE_BASE_URL + "/users/getUserById/" + userId.value
    );
    client.value = data.results[0];
    console.log("clienteeeeeeeeeeeeeeeeee", client.value);
    // url.value = 'https://apitalentos.pruebasdeploy.online/categories/video/' + client.value.usuario_id
    url.value =
      import.meta.env.VITE_BASE_URL +
      "/categories/video/" +
      client.value.usuario_id;
  } catch (error) {
    console.log(error);
  }
};

const inv = ref({});
const getInversion = async () => {
  try {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/users/getSolInvById/" + userId.value
    );
    inv.value = data.results;
    console.log(inv.value);
  } catch (error) {}
};

const logros = ref([]);
const experiencia = ref([]);

const obtenerLogros = async () => {
  try {
    // const { data } = await axios.get("https://apitalentos.pruebasdeploy.online/logros/logrosFechas/" + userId.value);
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/logros/logrosFechas/" + userId.value
    );
    logros.value = data.data || [];
    console.log(logros.value, "logros");
  } catch (error) {
    console.log(error);
  }
};

const obtenerExperiencia = async () => {
  try {
    // const { data } = await axios.get("https://apitalentos.pruebasdeploy.online/logros/experiencia/" + userId.value);
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/logros/experiencia/" + userId.value
    );
    experiencia.value = data.data || [];
  } catch (error) {
    console.log(error);
  }
};

const loadingValues = ref(false);
onMounted(async () => {
  loadingValues.value = true;
  userId.value = route.query.user;
  await getUser();
  if (user.value.rol !== "Admin") {
    await obtenerTokens_Inversionista();
    await obtenerTokens_Inversionista_Invertidos();
  }
  await obtenerLogros();
  await obtenerExperiencia();
  await obtenerPromedio();
  await cargaValoresIniciales();
  await getInversion();
  await obtenerFechasPagos();
  loadingValues.value = false;
});

// let baseURL = "https://apitalentos.pruebasdeploy.online/billetera/";
let baseURL = import.meta.env.VITE_BASE_URL + "/billetera/";

const valorTokens = ref(0);
const monto_tokens_invertir = ref(0);
const ganancia_estimada = ref(0);
const cliente_Invertir_ID = ref("");
const inversionista_ID = ref("");
const usuario = JSON.parse(localStorage.getItem("usuario"));
const usuario_id = ref(usuario.usuario_id);
const usuario_rol = ref(usuario.rol);
if (usuario_rol.value == "Inversionista") {
  inversionista_ID.value = usuario_id.value;
}
const tiempo_inversion = ref(0);
const porcentaje_inversion = ref(0);
const ganancia_tokens_inv = ref(0);
const tokensCompradosInversionista = ref(0);
const tokensInvertidosInversionista = ref(0);
const rangoMinimo = ref(0);
const rangoMaximo = ref(0);
const loadingValores = ref(false);
const solInvId = ref(null);
const cargaValoresIniciales = async () => {
  try {
    loadingValores.value = true;

    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/categories/user/" + userId.value
    );
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/billetera/valores"
    );
    const data1 = response.data;
    const response2 = await axios.get(
      import.meta.env.VITE_BASE_URL +
        "/informacion/informacionId/" +
        userId.value
    );
    const data2 = response2.data;
    console.log(data2.results);
    const response3 = await axios.get(
      import.meta.env.VITE_BASE_URL +
        "/solicitudesInversion/getSolicitudByClienteId/" +
        userId.value
    );
    const data3 = response3.data;
    console.log(data3.results);
    let montoTotal = 0;
    // Obtener el id de data3 y asignarlo a inv.value.id
    if (data3.results) {
      inv.value.id = data3.results.id; // Asigna el id correctamente
      montoTotal = data3.results.monto;
    }
    const response4 = await axios.get(
      import.meta.env.VITE_BASE_URL +
        "/solicitudesInversion/getInversoresDeSolicitud/" +
        inv.value.id
    );
    const data4 = response4.data;
    console.log(data4.results);
    let totalInvertido = 0;
    if (data4.results) {
      totalInvertido = data4.totalInvertido;
    }

    // Acceder a las propiedades de data1
    valorTokens.value = parseInt(data1.data[0].valor_token);
    // tiempo_inversion.value = parseInt(data[0].tiempo_inversion);
    // valorTokens.value = parseInt(data[0].valor_token);
    // monto_tokens_invertir.value = client.value.monto_inversion;
    //rangoMinimo.value = data.monto_minimo_inversion;
    rangoMinimo.value = data2.results[0].monto_inversion;
    console.log(valorTokens.value);
    console.log(montoTotal);
    console.log(totalInvertido);
    rangoMaximo.value = montoTotal * valorTokens.value - totalInvertido;
    console.log(rangoMaximo.value, "rangoMaximo.value");
    porcentaje_inversion.value = parseFloat(data.porcentaje_interes);

    loadingValores.value = false;
  } catch (error) {
    console.log(error);
  }
};

const cantidadPagos = ref(null);
const fechaInicioPago = ref(null);
const fechaFinPago = ref(null);
const obtenerFechasPagos = async () => {
  try {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL +
        "/solicitudesInversion/getSolicitudByClienteId/" +
        userId.value
    );

    if (data.results) {
      const solicitud = data.results; // Suponiendo que es un único resultado
      cantidadPagos.value = solicitud.cantidad_pagos;
      fechaInicioPago.value = solicitud.fecha_inicio_pago;
      fechaFinPago.value = solicitud.fecha_fin_pago;
    } else {
      console.log("No hay resultados disponibles.");
    }
  } catch (error) {
    console.log("Error al obtener los datos de pagos:", error);
  }
};

const controlTokens = ref(0);
const bandMinimo = ref(null);
const bandMaximo = ref(null);
const calcularGanancias = async () => {
  if (
    monto_tokens_invertir.value >= rangoMinimo.value &&
    monto_tokens_invertir.value <= rangoMaximo.value
  ) {
    try {
      bandMinimo.value = false;
      bandMaximo.value = false;
      controlTokens.value = monto_tokens_invertir.value;
      const { data } = await axios.get(baseURL + "valores");
      console.log(data);
      monto_tokens_invertir.value = parseFloat(monto_tokens_invertir.value);
      console.log(monto_tokens_invertir.value);
      tiempo_inversion.value = parseInt(data.data[0].tiempo_inversion);
      //porcentaje_inversion.value = parseFloat(data.data[0].porcentaje_inversion);
      //console.log(porcentaje_inversion.value);
      ganancia_tokens_inv.value =
        monto_tokens_invertir.value * (porcentaje_inversion.value / 100);
    } catch (error) {
      console.log(error);
    }
  } else {
    if (monto_tokens_invertir.value <= rangoMinimo.value) {
      // timerAlert(`La cantidad minima de inversion es ${rangoMinimo.value}`, 'center', 2500, 'error')
      bandMinimo.value = true;
      bandMaximo.value = false;
      ganancia_tokens_inv.value = 0;
    }
    if (monto_tokens_invertir.value >= rangoMaximo.value) {
      // timerAlert(`La cantidad maxima de inversion es ${rangoMaximo.value}`, 'center', 2500, 'error')
      bandMaximo.value = true;
      bandMinimo.value = false;
      ganancia_tokens_inv.value = 0;
    }
  }
};

const closeModal = () => {
  bandMaximo.value = null;
  bandMinimo.value = null;
  monto_tokens_invertir.value = 0;
  ganancia_tokens_inv.value = 0;
};

const obtenerTokens_Inversionista = async () => {
  try {
    const { data } = await axios.get(
      baseURL + "tokensInversionistaComprados/" + inversionista_ID.value
    );
    tokensCompradosInversionista.value = data.data[0].totalTokensComprados;
  } catch (error) {
    console.log(error);
  }
};

const obtenerTokens_Inversionista_Invertidos = async () => {
  try {
    const { data } = await axios.get(
      baseURL + "tokensInversionistaInvertidos/" + inversionista_ID.value
    );
    tokensInvertidosInversionista.value =
      data.data[0].totalTokensInvertidos || 0;
    console.log(tokensInvertidosInversionista.value);
  } catch (error) {
    console.log(error);
  }
};

const loadingInvertir = ref(false);
const inversionistaInvertir = async () => {
  const tokensInversionista =
    parseFloat(tokensCompradosInversionista.value) -
    parseFloat(tokensInvertidosInversionista.value);
  if (
    monto_tokens_invertir.value > 0 &&
    monto_tokens_invertir.value <= tokensInversionista
  ) {
    loadingInvertir.value = true;
    console.log(inversionista_ID.value);
    cliente_Invertir_ID.value = parseInt(userId.value);
    console.log(cliente_Invertir_ID.value);
    ganancia_estimada.value =
      monto_tokens_invertir.value + ganancia_tokens_inv.value;
    const fecha_devolucion = ref("");
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() + tiempo_inversion.value);
    fecha_devolucion.value = new Date(fecha).toISOString().slice(0, 10);
    const datos = {
      token: monto_tokens_invertir.value,
      usuario_id: inversionista_ID.value,
      cliente_id: cliente_Invertir_ID.value,
      inversor_id: inversionista_ID.value,
      tipo: "Egreso",
      descripcion: "Tokens invertidos",
      monto: monto_tokens_invertir.value,
      ganancia_estimada: ganancia_estimada.value,
      fecha_devolucion: fecha_devolucion.value,
      id_inv: inv.value.id,
    };
    try {
      await axios.post(baseURL + "invertirTokens", datos);
      await obtenerTokens_Inversionista();
      await obtenerTokens_Inversionista_Invertidos();
      await cargaValoresIniciales();
      await obtenerTokens_Inversionista();
      await obtenerTokens_Inversionista_Invertidos();
      await cargaValoresIniciales();
      await obtenerLogros();
      await obtenerExperiencia();
      await obtenerPromedio();
      await getInversion();
      await obtenerFechasPagos();
      successAlert("Inversion realizada exitosamente", "Felicidades!!!");
      var myModalEl = document.getElementById("modalInversion");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
    } catch (error) {
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: error.response.data.message,
          confirmButtonText: "Aceptar",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        return;
      }
      errorAlert("Error al invertir los tokens", "Transaccion fallida");
    } finally {
      loadingInvertir.value = false;
    }
    monto_tokens_invertir.value = 0;
  } else {
    errorAlert(
      "Por favor, ingrese una cantidad valida de tokens a invertir",
      "Error!!"
    );
  }
};
watch(loadingInvertir, (newValue, oldValue) => {});

const tokensDisponibles = computed(() => {
  return (
    tokensCompradosInversionista.value -
    tokensInvertidosInversionista.value -
    monto_tokens_invertir.value
  );
});

const irBilletera = () => {
  router.push("/billetera");
};

const mostrarInformacion = ref(false);
const mostrarLogros = ref(false);
const mostrarExperiencia = ref(false);

const toggleInformacion = () => {
  mostrarInformacion.value = !mostrarInformacion.value;
  mostrarLogros.value = false;
  mostrarExperiencia.value = false;
};

const toggleLogros = () => {
  mostrarInformacion.value = false;
  mostrarLogros.value = !mostrarLogros.value;
  mostrarExperiencia.value = false;
};

const toggleExperiencia = () => {
  mostrarInformacion.value = false;
  mostrarLogros.value = false;
  mostrarExperiencia.value = !mostrarExperiencia.value;
};

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const obtenerPromedio = async () => {
  try {
    // const { data } = await axios.get("https://apitalentos.pruebasdeploy.online/preview/" + userId.value);
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/preview/" + userId.value
    );
    // prom.value = data.data[0]?.promedio || 0;
    prom.value = (data.data[0]?.promedio || 0).toFixed(1).replace(/\.0$/, "");
  } catch (error) {
    console.log(error);
  }
};

const generarEstrellas = (promedio) => {
  const cantidadEstrellas = Math.round(promedio);
  const estrellas = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= cantidadEstrellas) {
      estrellas.push("★");
    } else {
      estrellas.push("☆");
    }
  }
  return estrellas.join("");
};

// const playVideo = () => {
//   const video = $refs.video; // Accede al elemento de video
//   if (video) {
//     video.play(); // Reproduce el video
//   }
// };

const pauseVideo = () => {
  const video = $refs.video; // Accede al elemento de video
  if (video) {
    video.pause(); // Pausa el video
  }
};
</script>

<style scoped>
.bg-degrade {
  background: linear-gradient(to right, var(--gray-color), rgb(101, 126, 197));
}

.bg-degrade-inverso {
  background: linear-gradient(to left, var(--gray-color), rgb(101, 126, 197));
  border-radius: 10px;
}

.bg-degrade-light {
  background: linear-gradient(to right, rgb(248, 248, 248), rgb(187, 209, 233));
}

.font {
  font-size: 1rem;
}

.custom-link {
  text-decoration: none;
  color: black;
}

.video-presentacion {
  width: 500px;
  height: auto;
  border-radius: 20px;
}

.table-radius {
  border-radius: 10px;
  overflow: hidden;
}

button {
  color: rgb(128, 159, 245);
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 25px;
  transition: background-color 0.3s, transform 0.3s;
}

.animate__slow {
  animation-duration: 5s;
}

.btn-6 {
  position: relative;
  display: block;
  overflow: hidden;
  text-transform: uppercase;
  border: 1px solid currentColor;
  color: var(--gray-color);
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
}

.btn-6 span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: var(--gray-color);
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.btn-6:hover {
  color: var(--white-anti-flash-color);
}

.btn-6:hover span {
  width: 225%;
  height: 562.5px;
}

.btn-7 span {
  background-color: var(--yellow-orange) !important;
}

.banner-card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.profile-section {
  position: relative;
  margin-top: -30px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid #fff;
  position: absolute;
  top: -50px;
  left: 15px;
}

.stars {
  color: rgb(206, 206, 12);
}

.card-title {
  margin-top: 100px;
  font-weight: bold;
}

.card-text {
  margin-bottom: 0;
}

.card {
  position: relative;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.02);
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.modal-card {
  background-color: rgb(187, 184, 181);
}

.active-button {
  background-color: var(--gray-color);
  color: white;
}

.col-4 {
  font-size: 40px;
}

/*Boton de regreso a marketplace*/
.back-button1 {
  text-align: left;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 20px;
}

.back-button2 {
  text-align: left;
  display: inline-block;
  margin-right: 10px;
  margin-top: 20px;
}

.btn-back {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #17223b;
  color: var(--white-color);
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-back:hover {
  background-color: var(--yellow-orange);
  color: var(--white-anti-flash-color);
}

.btn-back:active {
  transform: scale(0.95);
}
</style>
