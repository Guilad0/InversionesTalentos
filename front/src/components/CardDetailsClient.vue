<template>
  <div class="col-7 row col-xl-8 col-md-12 col-sm-10 d-none d-md-block">
    <p class="m-0 pb-3">
      <RouterLink to="/marketplace" class="custom-link">Marketplace</RouterLink> |
      <label>{{ client.rol }}</label>
    </p>
    <div class="card m-auto shadow mb-5">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <img src="https://slicetokenfrontendassets.s3.amazonaws.com/players/img_white/61.webp"
              class="card-img-top rounded-3" />
          </div>
          <div class="col">
            <h3 class="card-title">{{ client.nombre }}</h3>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="mx-1">{{ client.pais_residencia }} |</li>
                <li class="mx-1">{{ client.edad }} |</li>
                <li class="mx-1">{{ client.categoria }}</li>
              </ol>
            </nav>
            <label>Bio:</label>
            <p class="descripcion">
              {{
                client.descripcion == null
                  ? `Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha
              sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T.
              persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal
              manera que logró hacer un libro de textos especimen`
                  : client.descripcion
              }}
            </p>
            <div class="row justify-content-between align-items-center mb-3">
              <div class="col">
                <p class="token m-0">
                  Precio por token USD $
                  {{
                    client.monto_inversion == null
                      ? "00.00"
                      : client.monto_inversion
                  }}
                </p>
              </div>
              <div class="col-4">
                <button class="border-custom btn-sm available rounded-3">
                  0 Disponibles
                </button>
              </div>
            </div>

            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed bg-light rounded-2 p-2" type="button"
                    data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false"
                    aria-controls="flush-collapseOne">
                    Detalles Token
                  </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">Detalles.</div>
                </div>
              </div>
            </div>

            <div class="row px-3 mt-4">
              <button class="btn btn-gray" @click="isAuthenticatedAlert()">
                Fondear mi billetera
              </button>
              <button class="btn btn-gray" data-bs-toggle="modal" data-bs-target="#modalInversion">Invertir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Inversión -->
    <div class="modal fade" id="modalInversion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Datos de la Inversión
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                              <label for="cliente_id" class="form-label">Cliente</label><br>
                              <p>{{ client.nombre }}</p>
                            </div>
                          </div>
                        </div>

                        <div class="row d-flex justify-content-around">
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label for="monto_tokens_invertir" class="form-label">Tokens a invertir</label>
                              <input type="number" v-model="monto_tokens_invertir" id="monto_tokens_invertir"
                                class="form-control" @change="calcularGanancias()" required />
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

                        <hr>
                        <div class="text-center">
                          <button type="button" @click="inversionistaInvertir()" class="btn btn-secondary"
                            data-bs-dismiss="modal">Invertir</button>
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

import { useRouter, useRoute } from 'vue-router';
import axios from 'axios'
import { ref, onMounted } from 'vue'
import Swal from "sweetalert2";
const route = useRoute();
const userId = ref('')

const client = ref({});

const getUser = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/users/getUserById/' + userId.value)
    client.value = data.results[0];
    console.log(client.value);
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  userId.value = route.query.user;
  getUser();
});

let baseURL = 'http://localhost:3000/billetera/';

const tokens = ref(0);
const monto_tokens_invertir = ref(0);
const ganancia_estimada = ref(0);
const cliente_Invertir_ID = ref('');
const inversionista_ID = ref('');
const usuario = JSON.parse(localStorage.getItem("usuario"));
const usuario_id = ref(usuario.usuario_id);
const usuario_rol = ref(usuario.rol);
if (usuario_rol.value == 'Inversionista') {
  inversionista_ID.value = usuario_id.value;
}
const tiempo_inversion = ref(0);
const porcentaje_inversion = ref(0);
const ganancia_tokens_inv = ref(0);
const calcularGanancias = async () => {
  try {
    const { data } = await axios.get(baseURL + 'valores');
    monto_tokens_invertir.value = parseFloat(monto_tokens_invertir.value);
    console.log(monto_tokens_invertir.value);
    tiempo_inversion.value = parseInt(data.data[0].tiempo_inversion);
    porcentaje_inversion.value = parseFloat(data.data[0].porcentaje_inversion);
    console.log(porcentaje_inversion.value);
    ganancia_tokens_inv.value = monto_tokens_invertir.value * (porcentaje_inversion.value / 100);
  } catch (error) {
    console.log(error);
  }
};

const inversionistaInvertir = async () => {

  if (monto_tokens_invertir.value > 0) {
    console.log(inversionista_ID.value);
    cliente_Invertir_ID.value = parseInt(userId.value)
    console.log(cliente_Invertir_ID.value);
    console.log(userId.value);
    ganancia_estimada.value = monto_tokens_invertir.value + ganancia_tokens_inv.value;
    const fecha_devolucion = ref('');
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() + tiempo_inversion.value);
    fecha_devolucion.value = new Date(fecha).toISOString().slice(0, 10);
    console.log(fecha_devolucion.value);
    const datos = {
      token: monto_tokens_invertir.value,
      usuario_id: inversionista_ID.value,
      cliente_id: cliente_Invertir_ID.value,
      inversor_id: inversionista_ID.value,
      tipo: 'Egreso',
      descripcion: 'Tokens invertidos',
      monto: monto_tokens_invertir.value,
      ganancia_estimada: ganancia_estimada.value,
      fecha_devolucion: fecha_devolucion.value
    };
    console.log(datos);
    try {
      await axios.post(baseURL + 'invertirTokens', datos);
      Swal.fire({
        title: "¡Felicidades!",
        text: "Inversión realizada exitosamente",
        icon: "success",
        allowOutsideClick: true,
        allowEscapeKey: true,
        color: 'var(--gray-color)',
        confirmButtonColor: 'var(--yellow-orange)',   
      }); 
      var myModalEl = document.getElementById('modalInversion');
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
    } catch (error) {
      console.error('Error al invertir los tokens:', error);
    }
    monto_tokens_invertir.value = 0;
  }
  else{
    Swal.fire({
    title: "¡Error!",
    text: "Por favor, ingrese una cantidad de tokens a invertir",
    icon: "error",
    allowOutsideClick: true,
    allowEscapeKey: true,
    color: 'var(--gray-color)',
    confirmButtonColor: 'var(--yellow-orange)', 
  });
  }

};

</script>
<style scoped>
.profile {
  height: 70vh;
  width: 100%;
}

li {
  font-size: 0.8rem;
}

.descripcion {
  font-size: 0.9rem;
}

.custom-link {
  text-decoration: none;
  color: var(--smoky-dark-color);
  font-size: 0.9rem;
}

.custom-link:hover {
  text-decoration: underline;
}

.token {
  font-size: 0.9rem;
}

.available {
  font-size: 0.7rem;
}

.border-custom {
  border: 1px solid var(--gray-color) !important;
}

.accordion-button:focus {
  box-shadow: 0 0 0 0.1rem var(--gray-color) !important;
  border-color: var(--gray-color) !important;
}

.accordion-button.collapsed .collapsed {
  border: 1px solid var(--gray-color);
}

.accordion-button {
  border: 1px solid var(--gray-color);
}

.accordion-body {
  border-radius: 0 0 10px 10px;
  border: 1px solid var(--gray-color);
  border-top: none !important;
}

p {
  font-size: 1rem;
  color: var(--gray-color);
  margin-right: 15px;
}

.btn-primary {
  background-color: var(--primary);
  color: var(--yellow-orange);
  border-color: var(--yellow-orange);
}

.btn-secondary {
  background-color: var(--secondary);
  color: var(--yellow-orange);
  border-color: var(--yellow-orange);
}

.btn-secondary:hover {
  background-color: var(--gray-color);
  color: var(--white-color);
  border-color: var(--white-color);
}


.btn-danger {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

input {
  border-color: var(--input);
  background-color: var(--background);
}
</style>
