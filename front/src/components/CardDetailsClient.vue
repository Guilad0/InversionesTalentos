<template>
  <div class="col-7 col-xl-8 col-md-12 col-sm-10 d-none d-md-block">
    <p class="m-0 pb-3">
      <RouterLink to="/marketplace" class="custom-link">Marketplace</RouterLink> |
      <label>{{ client.rol }}</label>
    </p>

    <div class="card banner-card z-1">
      <!-- Imagen superior (ej. imagen de fondo) -->
      <img
        src="../assets/images/ejemplodeperfil.png"
        class="card-img-top"
        alt="Background Image"
      />

      <!-- Imagen de perfil -->
      <div class="card-body">
        <div class="profile-section">
          <img
            src="../assets/images/fotoperfil.png"
            class="profile-image"
            alt="Profile Image"
          />
        </div>
        <!-- nombre y datos -->
        <div class="mt-5">
          <h3 class="card-title">{{ client.nombre }} {{ client.apellido }}</h3>

          <div>
            <button class="btn btn-outline-graygit m-2" @click="toggleInformacion()">
              <i class="fas fa-info-circle"></i> Información
            </button>

            <button class="btn btn-outline-graygit m-2" @click="toggleLogros()">
              <i class="fas fa-trophy"></i> Logros
            </button>

            <button class="btn btn-outline-graygit m-2" @click="toggleExperiencia()">
              <i class="fas fa-briefcase"></i> Experiencia
            </button>

            <button class="btn btn-outline-graygit m-2" @click="isAuthenticatedAlert()">
              <i class="fas fa-wallet"></i> Fondear mi billetera
            </button>

            <button
              class="btn btn-outline-graygit m-2"
              data-bs-toggle="modal"
              data-bs-target="#modalInversion"
            >
              <i class="fas fa-dollar-sign"></i> Invertir
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mostrarInformacion" class="card banner-card mt-2 fade-in">
      <div class="card-body">
        <h3 class="text-center">Información</h3>
        <h6>Edad: {{ client.edad }}</h6>
        <h6>Número de teléfono: {{ client.numero_telefono }}</h6>
        <h6>Correo: {{ client.correo }}</h6>
        <h6>Género: {{ client.genero }}</h6>
        <h6>Ocupación: {{ client.ocupacion }}</h6>
        <h6>Descripción: {{ client.descripcion }}</h6>
        <h6>Estudios: {{ client.estudios }}</h6>
        <h6>Monto de inversión: {{ client.monto_inversion }}</h6>
        <h6>Categoría: {{ client.categoria }}</h6>
      </div>
    </div>

    <div v-if="mostrarLogros" class="card banner-card mt-2 fade-in">
      <div class="card-body">
        <h3 class="text-center">Logros</h3>

        <table class="table table-striped table-bordered">
          <thead class="table-dark">
            <tr>
              <th>Descripción</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Reconocimiento por aportes en Google</td>
              <td>2024-08-01</td>
            </tr>

            <tr>
              <td>Reconocimiento por aportes en Meta</td>
              <td>2024-08-08</td>
            </tr>

            <tr>
              <td>Reconocimiento por aportes en SpaceX</td>
              <td>2024-08-15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="mostrarExperiencia" class="card banner-card mt-2 fade-in">
      <div class="card-body">
        <h3 class="text-center">Experiencia</h3>

        <div class="card p-3">
          <h4 class="">L. Orias Corp</h4>
          <h6>Cargo: Desarrollador</h6>
          <h6>Actividades: Desarrollo de Software</h6>
          <h6>Fecha de inicio: 2020-01-01</h6>
          <h6>Fecha final: 2024-01-01</h6>
        </div>
      </div>
    </div>

    <!-- <div class="card banner-card mt-2">
      <div class="card-body">
        {{ client }}
      </div>
    </div> -->

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
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Datos de la Inversión
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="#" class="needs-validation" novalidate>
              <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                  <div class="card m-1">
                    <div class="card-body">
                      <div class="form">
                        <div class="row d-flex justify-content-around">
                          <div class="col-md-8">
                            <div class="mb-3">
                              <label for="cliente_id" class="form-label">Cliente</label
                              ><br />
                              <p>{{ client.nombre }}</p>
                            </div>
                          </div>
                        </div>

                        <div class="row d-flex justify-content-around">
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label for="monto_tokens_invertir" class="form-label"
                                >Tokens a invertir</label
                              >
                              <input
                                type="number"
                                v-model="monto_tokens_invertir"
                                id="monto_tokens_invertir"
                                class="form-control"
                                @change="calcularGanancias()"
                                required
                              />
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
                              <label class="form-label"
                                >Ganancia del {{ porcentaje_inversion }}%</label
                              >
                              <p>{{ ganancia_tokens_inv }}</p>
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div class="text-center">
                          <button
                            type="button"
                            @click="inversionistaInvertir()"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Invertir
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
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
              Cerrar
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
      Swal.fire({
        title: "¡Felicidades!",
        text: "Inversión realizada exitosamente",
        icon: "success",
        allowOutsideClick: true,
        allowEscapeKey: true,
        color: "var(--gray-color)",
        confirmButtonColor: "var(--yellow-orange)",
      });
      var myModalEl = document.getElementById("modalInversion");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
    } catch (error) {
      console.error("Error al invertir los tokens:", error);
    }
    monto_tokens_invertir.value = 0;
  } else {
    Swal.fire({
      title: "¡Error!",
      text: "Por favor, ingrese una cantidad de tokens a invertir",
      icon: "error",
      allowOutsideClick: true,
      allowEscapeKey: true,
      color: "var(--gray-color)",
      confirmButtonColor: "var(--yellow-orange)",
    });
  }
};

const mostrarInformacion = ref(false);
const mostrarLogros = ref(false);
const mostrarExperiencia = ref(false);

const toggleInformacion = () => {
  mostrarInformacion.value = !mostrarInformacion.value;
};

const toggleLogros = () => {
  mostrarLogros.value = !mostrarLogros.value;
};

const toggleExperiencia = () => {
  mostrarExperiencia.value = !mostrarExperiencia.value;
};
</script>

<style scoped>
.banner-card {
  /* background-color: red; */
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
</style>
