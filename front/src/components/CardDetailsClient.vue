<template>

  <div class="col-7 col-xl-9 col-md-12 col-sm-10 d-none d-md-block">

    <div class="card banner-card z-1 bg-degrade text-white">
      <!-- Imagen superior (ej. imagen de fondo) -->
      <img src="../assets/images/ejemplodeperfil.png" class="card-img-top" alt="Background Image" />

      <!-- Imagen de perfil -->
      <div class="card-body p-5">

        <div class="profile-section">

          <img :src="client.imagen || '../assets/images/fotoperfil.png'" class="profile-image" alt="Profile Image" />

        </div>
        <!-- nombre y datos -->
        <div class="mt-5 ">

          <h2 class="card-title">{{ client.nombre }} {{ client.apellido }}</h2>
          <h5>{{ client.ocupacion }}</h5>
          <h6>{{ client.pais_residencia }}</h6>

          <div class="row">

            <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-3" data-bs-toggle="modal"
              data-bs-target="#modalVideoPresentacion">
              <i class="fas fa-video"></i> Video presentación<span></span>
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

            <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-3"
              @click="isAuthenticatedAlert()">
              <i class="fas fa-wallet"></i> Fondear mi billetera<span></span>
            </button>

            <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2" data-bs-toggle="modal"
              data-bs-target="#modalInversion">
              <i class="fas fa-dollar-sign"></i> Invertir<span></span>
            </button>

          </div>

          <div class="mt-3">

            <h5 class="title text-center">Descripcion</h5>
            <p class="font">{{ client.vision }}</p>

          </div>

        </div>

      </div>

    </div>

    <div v-if="mostrarInformacion" class="card banner-card mt-2 fade-in bg-degrade text-white">

      <div class="card-body p-5 text-center">

        <h3>Información</h3>

        <h6 class="mt-3"><i class="fas fa-dollar-sign"></i> Monto de inversión: ${{ client.monto_inversion }}</h6>
        <h6 class="mt-3"><i class="fas fa-tags"></i> Categoría: {{ client.categoria }}</h6>
        <h6 class="mt-3"><i class="fas fa-graduation-cap"></i> Estudios: {{ client.estudios }}</h6>
        <h6 class="mt-3"><i class="fas fa-info-circle"></i> Descripción: {{ client.descripcion }}</h6>
        <h6 class="mt-3"><i class="fas fa-calendar-alt"></i> Edad: {{ client.edad }}</h6>
        <h6 class="mt-3"><i class="fas fa-venus-mars"></i> Género: {{ client.genero }}</h6>
        <h6 class="mt-3"><i class="fas fa-phone"></i> Número de teléfono: {{ client.numero_telefono }}</h6>
        <h6 class="mt-3"><i class="fas fa-envelope"></i> Correo: {{ client.correo }}</h6>

      </div>

    </div>

    <div v-if="mostrarLogros" class="card banner-card mt-2 fade-in bg-degrade text-white">

      <div class="card-body p-5">

        <h3 class="text-center">Logros</h3>

        <table class="table table-striped table-bordered">

          <thead class="table-dark">

            <tr>

              <th>Descripción</th>
              <th>Fecha</th>

            </tr>

          </thead>

          <tbody>

            <tr v-for="logro in logros" :key="logro.id">

              <td class="font">{{ logro.descripcion }}</td>
              <td class="font">{{ convertirFecha(logro.fecha) }}</td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

    <div v-if="mostrarExperiencia" class="card banner-card mt-2 fade-in bg-degrade text-white">

      <div class="card-body p-5">

        <h3 class="text-center">Experiencia</h3>

        <div class="card p-4" v-for="exp in experiencia" :key="exp.id">

          <h4 class="">{{ exp.institucion }}</h4>
          <h6>Cargo: {{ exp.cargo }}</h6>
          <h6>Actividades: {{ exp.actividades }}</h6>
          <h6>Fecha de inicio: {{ convertirFecha(exp.fecha_inicio) }}</h6>
          <h6>Fecha final: {{ convertirFecha(exp.fecha_final) }}</h6>

        </div>

      </div>

    </div>

    <!-- <div class="card banner-card mt-2">
      <div class="card-body">
        {{ client }}
      </div>
    </div> -->

    <!-- Modal Video Presentación -->
    <div class="modal fade" id="modalVideoPresentacion" tabindex="-1" aria-labelledby="videoModalLabel"
      aria-hidden="true">

      <div class="modal-dialog modal-dialog-centered modal-lg">

        <div class="modal-content bg-degrade text-white">

          <div class="modal-header">
            <h5 class="modal-title" id="videoModalLabel">
              {{ client.nombre }} {{ client.apellido }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">

            <video width="100%" height="500" controls>
              <source src="../assets/images/video_presentacion.webm" type="video/webm">
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          <div class="modal-footer">
            <button type="button" class="animate__animated animate__fadeInUp animate__slow btn-6 col-3"
              data-bs-dismiss="modal" @click="pauseVideo()">Cerrar <span></span></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Inversión -->
    <div class="modal fade" id="modalInversion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content bg-degrade text-white">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Datos de la Inversión
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="#" class="needs-validation" novalidate>
              <div class="container text-center">
                <div class="col-md-12">
                  <div class="card m-1 modal-card">
                    <div class="card-body">
                      <div class="form">
                        <div class="row d-flex justify-content-around">
                          <div class="col-md-8">
                            <div class="mb-3">
                              <label for="cliente_id" class="form-label fs-5 fw-bold">Cliente</label><br />
                              <p class="fs-4 fw-bolder">{{ client.nombre }}</p>
                            </div>
                          </div>
                        </div>

                        <div class="row d-flex justify-content-around">
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label for="monto_tokens_invertir" class="form-label">Tokens a invertir</label>
                              <input type="number" v-model="monto_tokens_invertir" id="monto_tokens_invertir"
                                class="form-control text-center" @change="calcularGanancias()" required />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label class="form-label">Meses de Inversión</label>
                              <p>{{ tiempo_inversion }}</p>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label class="form-label">Ganancia del {{ porcentaje_inversion }}%</label>
                              <p>{{ ganancia_tokens_inv }}</p>
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div class="text-center">
                          <button type="button" @click="inversionistaInvertir()"
                            class="animate__animated animate__fadeInUp animate__slow btn-6 col-3"
                            data-bs-dismiss="modal">
                            Invertir <span></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-2"></div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="animate__animated animate__fadeInUp animate__slow btn-6 col-3"
              data-bs-dismiss="modal">
              Cerrar <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import iziToast from "izitoast";
const route = useRoute();
const userId = ref("");

const client = ref({});

const getUser = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/users/getUserById/" + userId.value
    );
    client.value = data.results[0];
    console.log(client.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  userId.value = route.query.user;
  getUser();
});

let baseURL = "http://localhost:3000/billetera/";

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
const calcularGanancias = async () => {
  try {
    const { data } = await axios.get(baseURL + "valores");
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
};

const inversionistaInvertir = async () => {
  if (monto_tokens_invertir.value > 0) {
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
    try {
      await axios.post(baseURL + "invertirTokens", datos);
      // Swal.fire({
      //   title: "¡Felicidades!",
      //   text: "Inversión realizada exitosamente",
      //   icon: "success",
      //   allowOutsideClick: true,
      //   allowEscapeKey: true,
      //   color: "var(--gray-color)",
      //   confirmButtonColor: "var(--yellow-orange)",
      // });
      iziToast.success({
        title: "¡Felicidades!",
        message: "Inversión realizada exitosamente",
        position: "topRight",
        theme: "dark",
        progressBarColor: "#FFFFFF",
        messageColor: "#FFFFFF",
        iconColor: "#FFFFFF",
        color: "#5ce65c",
        closeOnEscape: true,
      });
      var myModalEl = document.getElementById("modalInversion");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
    } catch (error) {
      console.error("Error al invertir los tokens:", error);
    }
    monto_tokens_invertir.value = 0;
  } else {
    // Swal.fire({
    //   title: "¡Error!",
    //   text: "Por favor, ingrese una cantidad de tokens a invertir",
    //   icon: "error",
    //   allowOutsideClick: true,
    //   allowEscapeKey: true,
    //   color: "var(--gray-color)",
    //   confirmButtonColor: "var(--yellow-orange)",
    // });
    iziToast.error({
      title: "¡Error!",
      message: "Por favor, ingrese una cantidad de tokens a invertir",
      position: "topRight",
      theme: "dark",
      progressBarColor: "#FFFFFF",
      messageColor: "#FFFFFF",
      iconColor: "#FFFFFF",
      color: "#f00",
      closeOnEscape: true,
    });
  }
};

const mostrarInformacion = ref(false);
const mostrarLogros = ref(false);
const mostrarExperiencia = ref(false);
const logros = ref([]);
const experiencia = ref([]);


const toggleInformacion = () => {
  mostrarInformacion.value = !mostrarInformacion.value;
  mostrarLogros.value = false;
  mostrarExperiencia.value = false;
};

const toggleLogros = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/logros/logrosfechas/${userId.value}`);
    console.log(data);
    logros.value = data.data;
  } catch (error) {
    console.log(error);
  }
  mostrarInformacion.value = false;
  mostrarLogros.value = !mostrarLogros.value;
  mostrarExperiencia.value = false;
};

const toggleExperiencia = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/logros/experiencia/${userId.value}`);
    console.log(data);
    experiencia.value = data.data;
  } catch (error) {
    console.log(error);
  }
  mostrarInformacion.value = false;
  mostrarLogros.value = false;
  mostrarExperiencia.value = !mostrarExperiencia.value;
};

const convertirFecha = (fecha) => {
  const fechaFinal = new Date(fecha).toISOString().slice(0, 10);
  return fechaFinal;

}

const pauseVideo = () => {
  const videoElement = document.querySelector('#modalVideoPresentacion video');
  if (videoElement) {
    videoElement.pause();
  }
};

</script>

<style scoped>

.bg-degrade {
  background: linear-gradient(to right, var(--gray-color), rgb(101, 126, 197));
}

.font {
  font-size: 0.8rem
}

.custom-link {
  text-decoration: none;
  color: black;
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

/* Estilos para la tabla de logros */
.table-striped {
  background-color: #f8f9fa; /* Color de fondo claro */
  border-radius: 5px; /* Añadir radio a la tabla */
  overflow: hidden; /* Asegura que el radio se aplique correctamente */
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #e9ecef; /* Color de fondo para filas impares */
}

.table-striped tbody tr:hover {
  background-color: #d1e7dd; /* Color de fondo al pasar el mouse */
}

.table-dark {
  background-color: #343a40; /* Color de fondo oscuro para el encabezado */
  color: white; /* Color de texto blanco para el encabezado */
}

.table-dark th {
  background-color: #495057; /* Color de fondo para las celdas del encabezado */
}
</style>
