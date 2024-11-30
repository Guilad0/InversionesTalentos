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
      <img src="../assets/images/ejemplodeperfil.jpg" class="card-img-top" alt="Background Image" />

      <!-- Imagen de perfil -->
      <div class="card-body p-5">

        <div class="profile-section">

          <img :src="client.imagen || '../assets/images/fotoperfil.png'" class="profile-image" alt="Profile Image" />

        </div>
        <!-- nombre y datos -->
        <div class="mt-5 ">

          <div class="row">

            <div class="col-8">

              <h2 class="card-title">{{ client.nombre }} {{ client.apellido }}</h2>

              <h5>{{ client.ocupacion }}</h5>

              <h6>{{ client.pais_residencia }}</h6>

            </div>

            <div class="col-4 text-end">

              <div>

                <span v-if="prom">{{ prom }}</span>

              </div>

              <div>

                <span class="stars" v-html="generarEstrellas(prom)"></span>

              </div>

            </div>

          </div>

          <div class="row">

            <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-3" data-bs-toggle="modal"
              data-bs-target="#modalVideoPresentacion">
              <i class="fas fa-video"></i> Video Presentación<span></span>
            </button>

            <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2"
              :class="{ 'active-button': mostrarInformacion }" @click="toggleInformacion()">
              <i class="fas fa-info-circle"></i> Información<span></span>
            </button>

            <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2"
              :class="{ 'active-button': mostrarLogros }" @click="toggleLogros()">
              <i class="fas fa-trophy"></i> Logros<span></span>
            </button>

            <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2"
              :class="{ 'active-button': mostrarExperiencia }" @click="toggleExperiencia()">
              <i class="fas fa-briefcase"></i> Experiencia<span></span>
            </button>

            <button v-if="user.rol !== 'Admin'" class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-3" @click="irBilletera">
              <i class="fas fa-wallet"></i> Fondear mi Billetera<span></span>
            </button>

            <button :disabled="loadingInvertir" v-if="user.rol !== 'Admin'"
              class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2" data-bs-toggle="modal"
              data-bs-target="#modalInversion">
              <i class="fas fa-dollar-sign"></i>
              <label v-if="!loadingInvertir">Invertir</label>
              <label v-if="loadingInvertir">..cargando</label>
              <span></span>
            </button>

          </div>

          <div class="mt-3">

            <h5 class="title text-center text-light">Descripción</h5>
            <p class="font">{{ client.vision }}</p>

          </div>

        </div>

      </div>

    </div>

    <div v-if="mostrarInformacion" class="card banner-card mt-3 fade-in bg-degrade text-white">

      <div class="card-body p-5 text-center">

        <h3>Información</h3>

        <h6 class="mt-3"><i class="fas fa-dollar-sign"></i> <strong>Monto de inversión:</strong> ${{ client.monto_inversion }}</h6>
        <h6 class="mt-3"><i class="fas fa-tags"></i> Categoría: {{ client.categoria }}</h6>
        <h6 class="mt-3"><i class="fas fa-graduation-cap"></i> <strong>Estudios:</strong> {{ client.estudios }}</h6>
        <h6 class="mt-3"><i class="fas fa-info-circle"></i> <strong>Descripción:</strong> {{ client.descripcion }}</h6>
        <h6 class="mt-3"><i class="fas fa-calendar-alt"></i> <strong>Edad:</strong> {{ client.edad }}</h6>
        <h6 class="mt-3"><i class="fas fa-venus-mars"></i> <strong>Género:</strong> {{ client.genero }}</h6>
        <h6 class="mt-3"><i class="fas fa-phone"></i> <strong>Número de teléfono:</strong> {{ client.numero_telefono }}</h6>
        <h6 class="mt-3"><i class="fas fa-envelope"></i> <strong>Correo:</strong> {{ client.correo }}</h6>

      </div>

    </div>

    <div v-if="mostrarLogros" class="card banner-card mt-3 fade-in bg-degrade text-white">

      <div class="card-body p-5">

        <h3 class="text-center">Logros</h3>

        <div class="row">
          <div class="col-12" v-for="logro in logros" :key="logro">
            <div class="card mb-3">
              <div class="card-body bg-degrade-inverso text-center text-white">
                <h5>{{ logro.descripcion }}</h5>
                <p><strong>Fecha: </strong>{{ new Date(logro.fecha).toLocaleDateString() }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div v-if="mostrarExperiencia" class="card banner-card mt-3 fade-in bg-degrade text-white">

      <div class="card-body p-5">

        <h3 class="text-center">Experiencia</h3>

        <div class="card p-4 bg-degrade-inverso text-white text-center mt-3" v-for="exp in experiencia" :key="exp.id">

          <h4 class="text-uppercase">{{ exp.institucion }}</h4>
          <h6><strong>Cargo:</strong> {{ exp.cargo }}</h6>
          <h6><strong>Actividades:</strong> {{ exp.actividades }}</h6>
          <h6><strong>Fecha de Inicio:</strong> {{ new Date(exp.fecha_inicio).toLocaleDateString() }}</h6>
          <h6><strong>Fecha Final:</strong> {{ new Date(exp.fecha_final).toLocaleDateString() }}</h6>

        </div>

      </div>

    </div>

    <!-- Modal Video Presentación -->
    <!-- <div class="modal fade" id="modalVideoPresentacion" tabindex="-1" aria-labelledby="videoModalLabel"
      aria-hidden="true" @shown.bs.modal="playVideo">  -->
      <div class="modal fade" id="modalVideoPresentacion" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">

      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content bg-degrade text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="videoModalLabel">
              {{ client.nombre }} {{ client.apellido }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body text-center">
            <video ref="video" class="video-presentacion" controls>
              <source v-if="url" :src="url" type="video/mp4"> <!-- Asegúrate de que el tipo de video sea correcto -->
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          <div class="modal-footer">
            <button type="button" class="animate__animated animate__fadeInUp animate__slow btn-6 btn-7 col-3"
              data-bs-dismiss="modal" @click="pauseVideo()">Cerrar <span></span></button>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal Inversión -->
    <div class="modal fade" id="modalInversion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">

      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">

        <div class="modal-content bg-degrade-inverso text-white">

          <div class="modal-header">

            <h1 class="modal-title fs-5" id="staticBackdropLabel">Datos de la Inversión</h1>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

          </div>

          <div class="modal-body">

            <p class="text-xl text-center">Tokens Disponibles: {{ tokensCompradosInversionista -
              tokensInvertidosInversionista - monto_tokens_invertir }}</p>

            <form action="#" class="needs-validation" novalidate>
              <div class="d-flex justify-content-center p-0 ">
                <div class="col row justify-content-center m-auto">
                  <div class="mb-3">

                    <label for="monto_tokens_invertir" class="form-label">Tokens a Invertir</label>

                    <input type="number" v-model="monto_tokens_invertir" id="monto_tokens_invertir"
                      class="form-control mb-2" @input="calcularGanancias()" required />
                    <label for="monto_tokens_invertir" :class="{ 'text-danger': bandMinimo }">Monto minimo de inversion:
                      {{ rangoMinimo }} </label>
                    <label for="monto_tokens_invertir" :class="{ 'text-danger': bandMaximo }">Monto maximo de inversion:
                      {{ rangoMaximo }} </label>

                  </div>
                </div>
                <div class="col row justify-content-center m-auto">
                  <!-- Cliente -->
                  <div class="mb-3 text-center">

                    <label for="cliente_id" class="form-label">Cliente</label>

                    <p>{{ client.nombre }}</p>

                  </div>
                  <!-- Tokens, Meses y Ganancia -->

                </div>
                <div class="col row justify-content-center m-auto">
                  <div class="text-center">

                    <div class="mb-3">

                      <label class="form-label">Meses de Inversión</label>

                      <p class="text-center m-auto">{{ tiempo_inversion }}</p>

                    </div>

                  </div>
                  <div class=" mb-3 text-center">

                    <label class="form-label">Ganancia del {{ porcentaje_inversion }}%</label>

                    <p class="text-center">{{ ganancia_tokens_inv }}</p>

                  </div>
                </div>
              </div>


            </form>

          </div>

          <div class="modal-footer">

            <button :disabled="bandMaximo || bandMinimo" type="button" @click="inversionistaInvertir()"
              class="animate__animated animate__fadeInUp animate__slow btn-6" data-bs-dismiss="modal">
              Invertir<span></span>
            </button>

            <button type="button" class="animate__animated animate__fadeInUp animate__slow btn-6 btn-7"
              data-bs-dismiss="modal" @click="closeModal">Cerrar<span></span></button>

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
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { errorAlert, successAlert } from "@/helpers/iziToast";
import { timerAlert } from "@/helpers/sweetAlerts";
const route = useRoute();
const router = useRouter();
const userId = ref("");
const client = ref({});
const url = ref("");
const prom = ref("");
const user = ref(JSON.parse(localStorage.getItem('usuario')))

const getUser = async () => {
  try {
    const { data } = await axios.get(
      // "https://apitalentos.pruebasdeploy.online/users/getUserById/" + userId.value
      import.meta.env.VITE_BASE_URL + "/users/getUserById/" + userId.value
    );
    client.value = data.results[0];
    console.log(client.value);
    // url.value = 'https://apitalentos.pruebasdeploy.online/categories/video/' + client.value.usuario_id
    url.value = import.meta.env.VITE_BASE_URL + '/categories/video/' + client.value.usuario_id
  } catch (error) {
    console.log(error);
  }
};

const logros = ref([]);
const experiencia = ref([]);

const obtenerLogros = async () => {
  try {
    // const { data } = await axios.get("https://apitalentos.pruebasdeploy.online/logros/logrosFechas/" + userId.value);
    const { data } = await axios.get(import.meta.env.VITE_BASE_URL + "/logros/logrosFechas/" + userId.value);
    logros.value = data.data || [];
    console.log(logros.value, "logros");
  } catch (error) {
    console.log(error);
  }
};

const obtenerExperiencia = async () => {
  try {
    // const { data } = await axios.get("https://apitalentos.pruebasdeploy.online/logros/experiencia/" + userId.value);
    const { data } = await axios.get(import.meta.env.VITE_BASE_URL + "/logros/experiencia/" + userId.value);
    experiencia.value = data.data || [];
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  
  userId.value = route.query.user;
  await getUser();
  if( user.value.rol !== 'Admin' ){
    await obtenerTokens_Inversionista();
    await obtenerTokens_Inversionista_Invertidos();
  }
  await obtenerLogros();
  await obtenerExperiencia();
  await obtenerPromedio();
  await cargaValoresIniciales();
});

// let baseURL = "https://apitalentos.pruebasdeploy.online/billetera/";
let baseURL = import.meta.env.VITE_BASE_URL + "/billetera/";
console.log(baseURL);

const tokens = ref(0);
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
const rangoMinimo = ref(0)
const rangoMaximo = ref(0)
const loadingValores = ref(false)
const cargaValoresIniciales = async () => {
  try {
    loadingValores.value = true;
    const { data } = await axios.get(baseURL + "valores");
    tiempo_inversion.value = parseInt(data.data[0].tiempo_inversion);
    // monto_tokens_invertir.value = client.value.monto_inversion;
    rangoMinimo.value = client.value.monto_inversion;
    rangoMaximo.value = client.value.cantidad_maxima_inversiones;

    loadingValores.value = false;
  } catch (error) {
    console.log(error);
  }

}

const controlTokens = ref(0)
const bandMinimo = ref(false)
const bandMaximo = ref(false)
const calcularGanancias = async () => {
  if (monto_tokens_invertir.value >= rangoMinimo.value && monto_tokens_invertir.value <= rangoMaximo.value) {
    try {
      bandMinimo.value = false
      bandMaximo.value = false
      controlTokens.value = monto_tokens_invertir.value
      const { data } = await axios.get(baseURL + "valores");
      console.log(data);
      monto_tokens_invertir.value = parseFloat(monto_tokens_invertir.value);
      console.log(monto_tokens_invertir.value);
      tiempo_inversion.value = parseInt(data.data[0].tiempo_inversion);
      porcentaje_inversion.value = parseFloat(data.data[0].porcentaje_inversion);
      console.log(porcentaje_inversion.value);
      ganancia_tokens_inv.value =
        monto_tokens_invertir.value * (porcentaje_inversion.value / 100);
    } catch (error) {
      console.log(error);
    }
  } else {
    if (monto_tokens_invertir.value <= rangoMinimo.value) {
      // timerAlert(`La cantidad minima de inversion es ${rangoMinimo.value}`, 'center', 2500, 'error')
      bandMinimo.value = true
      bandMaximo.value = false
      ganancia_tokens_inv.value = 0
    }
    if (monto_tokens_invertir.value >= rangoMaximo.value) {
      // timerAlert(`La cantidad maxima de inversion es ${rangoMaximo.value}`, 'center', 2500, 'error')
      bandMaximo.value = true
      bandMinimo.value = false
      ganancia_tokens_inv.value = 0
    }
  }
};

const closeModal = () => {
  bandMaximo.value = false;
  bandMinimo.value = false;
  monto_tokens_invertir.value = 0
  ganancia_tokens_inv.value = 0
}

const obtenerTokens_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensInversionistaComprados/' + inversionista_ID.value);
    tokensCompradosInversionista.value = data.data[0].totalTokensComprados;
    console.log(tokensCompradosInversionista.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTokens_Inversionista_Invertidos = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensInversionistaInvertidos/' + inversionista_ID.value);
    tokensInvertidosInversionista.value = data.data[0].totalTokensInvertidos || 0;
    console.log(tokensInvertidosInversionista.value);
  } catch (error) {
    console.log(error);
  }
};

const loadingInvertir = ref(false)
const inversionistaInvertir = async () => {

  const tokensInversionista = parseFloat(tokensCompradosInversionista.value) - parseFloat(tokensInvertidosInversionista.value);;
  if (monto_tokens_invertir.value > 0 && monto_tokens_invertir.value <= tokensInversionista) {
    loadingInvertir.value = true
    console.log(inversionista_ID.value);
    cliente_Invertir_ID.value = parseInt(userId.value);
    console.log(cliente_Invertir_ID.value);
    console.log(userId.value);
    ganancia_estimada.value = monto_tokens_invertir.value + ganancia_tokens_inv.value;
    const fecha_devolucion = ref("");
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() + tiempo_inversion.value);
    fecha_devolucion.value = new Date(fecha).toISOString().slice(0, 10);
    console.log(fecha_devolucion.value);
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
    };
    console.log(datos);
    console.log(baseURL + "invertirTokens", datos);
    try {
      await axios.post(baseURL + "invertirTokens", datos);
      await obtenerTokens_Inversionista();
      await obtenerTokens_Inversionista_Invertidos();
      await cargaValoresIniciales();
      await obtenerTokens_Inversionista()
      await obtenerTokens_Inversionista_Invertidos()
      await cargaValoresIniciales()
      successAlert('Inversion realizada exitosamente', 'Felicidades!!!');
      var myModalEl = document.getElementById("modalInversion");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
    } catch (error) {
      console.error("Error al invertir los tokens:", error);
    } finally {
      loadingInvertir.value = false
    }
    monto_tokens_invertir.value = 0;
  } else {
    errorAlert('Por favor, ingrese una cantidad valida de tokens a invertir', 'Error!!')
  }
};

const irBilletera = () => {
  router.push('/billetera')
}

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
  return new Date(date).toISOString().split('T')[0];
};

const obtenerPromedio = async () => {
  try {
    // const { data } = await axios.get("https://apitalentos.pruebasdeploy.online/preview/" + userId.value);
    const { data } = await axios.get(import.meta.env.VITE_BASE_URL + "/preview/" + userId.value);
    // prom.value = data.data[0]?.promedio || 0;
    prom.value = (data.data[0]?.promedio || 0).toFixed(1).replace(/\.0$/, '');
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

.font {
  font-size: 1rem
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
  background-color: rgb(187, 184, 181)
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
  background-color: #17223B;
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
