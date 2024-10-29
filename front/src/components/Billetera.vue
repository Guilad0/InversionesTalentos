<template>
<div>

  <div class="container mx-auto p-4" v-if="usuario_rol == 'Cliente'">
      <h1 class="text-2xl font-bold mb-4">Balance de Fondos</h1>
      <div class="bg-zinc-100 p-4 rounded-lg mb-6">
        <p class="text-xl">Total de Inversiones (USD):{{ total }} </p>
      </div>

      <div class="d-flex justify-content-center mb-6">
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalSolicitud">Solicitar
          Retiro</button>
        <!-- <button class="btn btn-dark">Copy address</button> -->
      </div>
      <br>
      <div class="bg-zinc-100 p-4 rounded-lg mb-6">
        <h2 class="text-xl font-bold mb-4">Inversiones & Retiros</h2>
        <div class="row">
          <div class="col-6">
            <div class="bg-white p-4 rounded-lg shadow-md" v-for="inversion in inversiones" :key="inversion">
              <p class="text-lg font-semibold">Inversion: {{ inversion.inversion_id }}</p>
              <p class="text-sm text-zinc-500">Monto: ${{ inversion.monto }}</p>
              <p class="text-sm text-zinc-500">Fecha: {{ new Date(inversion.fecha_deposito).toLocaleDateString() }}</p>
            </div>
          </div>
          <div class="col-6">
            <div class="bg-white p-4 rounded-lg shadow-md" v-for="solicitud_retiro in solicitudes_retiro"
              :key="solicitud_retiro">
              <p class="text-lg font-semibold">Solicitud: {{ solicitud_retiro.retiro_id }}</p>
              <p class="text-sm text-zinc-500">Monto: ${{ solicitud_retiro.monto_recibir }}</p>
              <p class="text-sm text-zinc-500">Fecha: {{ new Date(solicitud_retiro.fecha_solicitud).toLocaleDateString()  }}</p>
              <p class="text-sm text-zinc-500">Estado: {{ solicitud_retiro.estado }}</p>
              <p class="text-sm text-zinc-500" v-if="solicitud_retiro.estado == 'Aprobado'">Fecha Aprobación: {{
                solicitud_retiro.fecha_aprobacion }}</p>
            </div>
          </div>
        </div>
      </div>
  </div>

  <div class="container mx-auto p-4" v-if="usuario_rol == 'Inversionista'">
    <h1 class="text-2xl font-bold mb-4">Balance de Fondos</h1>
    <div class="bg-zinc-100 p-4 rounded-lg mb-6">
      <p class="text-xl">Total de Inversiones (USD): </p>
    </div>

    <div class="d-flex justify-content-around mb-6">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalInversion">Invertir</button>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalSolicitud">Solicitar
        Retiro</button>

    </div>
    <br>
    <div class="bg-zinc-100 p-4 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">Inversiones & Retiros</h2>

      <div class="bg-zinc-100 p-4 rounded-lg mb-6">
        <!-- Contenedor de tabs -->
        <div class="tabs">
          <button v-for="(tab1, index) in tabs1" :key="index" :class="{ active: activeTab1 === index }"
            @click="activeTab1 = index" class="btn-6">
            {{ tab1 }}
          </button>
        </div>
      </div>

      <!-- Contenido de los tabs -->
      <div class="tab-content" v-if="activeTab1 === 0">
        <!-- Inversiones -->
        <div class="bg-white p-4 rounded-lg shadow-md" v-for="inversion in inversiones" :key="inversion">
          <p class="text-lg font-semibold">Inversion: {{ inversion.inversion_id }}</p>
          <p class="text-sm text-zinc-500">Cliente: {{ inversion.nombre_cliente }}</p>
          <p class="text-sm text-zinc-500">Monto: ${{ inversion.monto }}</p>
          <p class="text-sm text-zinc-500">Fecha: {{ inversion.fecha_deposito }}</p>
          <p class="text-sm text-zinc-500">Estado: {{ inversion.estado }}</p>
          <hr>
        </div>
      </div>

      <div class="tab-content" v-if="activeTab1 === 1">
        <!-- Lista de solicitudes de retiro -->
        <div class="bg-white p-4 rounded-lg shadow-md" v-for="solicitud_retiro in solicitudes_retiro" :key="solicitud_retiro">
          <p class="text-lg font-semibold">Solicitud: {{ solicitud_retiro.retiro_id }}</p>
          <p class="text-sm text-zinc-500">Monto: ${{ solicitud_retiro.monto_recibir }}</p>
          <p class="text-sm text-zinc-500">Fecha: {{ solicitud_retiro.fecha_solicitud }}</p>
          <p class="text-sm text-zinc-500">Estado: {{ solicitud_retiro.estado }}</p>
          <p class="text-sm text-zinc-500" v-if="solicitud_retiro.estado == 'Aprobado'">Fecha Aprobación: {{
            solicitud_retiro.fecha_aprobacion }}</p>
        </div>
      </div>

    </div>

  </div>

  <div class="container mx-auto p-4" v-if="usuario_rol == 'Admin'">
    <h1 class="text-2xl font-bold mb-4">Administrador</h1>
    <div class="bg-zinc-100 p-4 rounded-lg mb-6">
      <!-- Contenedor de tabs -->
      <div class="tabs">
        <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
          @click="activeTab = index" class="tab-button">
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Contenido de los tabs -->
    <div class="tab-content" v-if="activeTab === 0">
      <!-- Tabla de Movimientos -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Inversionista</th>
            <th>Cliente</th>
            <th>Fecha Solicitud</th>
            <th>Fecha Desembolso</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movimiento) in movimientos" :key="movimiento">
            <td>{{ movimiento.id }}</td>
            <td>{{ movimiento.inversionista }}</td>
            <td>{{ movimiento.cliente }}</td>
            <td>{{ movimiento.fecha_solicitud }}</td>
            <td>{{ movimiento.fecha_desembolso }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tab-content" v-if="activeTab === 1">
      <!-- Lista de solicitudes de retiro -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Solicitud ID</th>
            <th>Solicitante</th>
            <th>Nombre</th>
            <th>Monto de solicitud</th>
            <th>Monto a retirar</th>
            <th>Fecha de solicitud</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(solicitud) in solicitudes" :key="solicitud">
            <td>{{ solicitud.retiro_id }}</td>
            <td>{{ solicitud.tipo }}</td>
            <td>{{ solicitud.nombre_usuario }}</td>
            <td>{{ solicitud.monto_solicitud }}</td>
            <td>{{ solicitud.monto_recibir }}</td>
            <td>{{ solicitud.fecha_solicitud }}</td>
            <td>{{ solicitud.estado }}</td>
            <td>
              <button class="btn btn-primary" @click="aprobarSolicitud(solicitud)">Aprobar</button>
              <button class="btn btn-danger" @click="rechazarSolicitud(solicitud)">Rechazar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal Inversión -->
  <div class="modal fade" id="modalInversion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
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

                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="cliente_id" class="form-label">Cliente</label><br>
                            <select v-model="cliente_id" id="cliente_id" class="form-select" required>
                              <option disabled>Seleccione un Cliente</option>
                              <option v-for="cliente in clientes" :key="cliente" :value="usuario.id">
                                {{ usuario.nombre + '-' + usuario.apellido }}
                              </option>
                            </select>
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="tipo_ganancia" class="form-label">Tipo de Ganancia</label><br>
                            <select v-model="tipo_ganancia" id="tipo_ganancia" class="form-select" required>
                              <option disabled>Seleccione un Tipo de Ganancia</option>
                              <option value="Monto fijo">Monto Fijo</option>
                              <option value="Porcentual">Porcentual</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row d-flex justify-content-around">
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="monto" class="form-label">Monto</label>
                            <input type="text" v-model="monto" id="monto" class="form-control" required />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="ganancia_estimada" class="form-label">Ganancia Estimada</label>
                            <input type="text" v-model="ganancia_estimada" id="ganancia_estimada" class="form-control"
                              required />
                          </div>
                        </div>

                      </div>

                      <hr>
                      <div class="text-center">
                        <button type="button" @click="registrarInversion()" class="btn btn-success">Guardar</button>
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

  <!-- Modal Solicitud Retiro -->
  <div class="modal fade" id="modalSolicitud" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Datos del Retiro
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

                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="monto_solicitud" class="form-label">Monto de Solicitud</label>
                            <input type="text" v-model="monto_solicitud" id="monto_solicitud" class="form-control"
                              required />
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="tipo_ganancia" class="form-label">Tipo de Ganancia</label><br>
                            <select v-model="tipo_ganancia" id="tipo_ganancia" class="form-select" required>
                              <option disabled>Seleccione un Tipo de Ganancia</option>
                              <option value="Monto fijo">Monto Fijo</option>
                              <option value="Porcentual">Porcentual</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row d-flex justify-content-around">
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="monto" class="form-label">Monto</label>
                            <input type="text" v-model="monto" id="monto" class="form-control" required />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="ganancia_estimada" class="form-label">Ganancia Estimada</label>
                            <input type="text" v-model="ganancia_estimada" id="ganancia_estimada" class="form-control"
                              required />
                          </div>
                        </div>

                      </div>

                      <hr>
                      <div class="text-center">
                        <button type="button" @click="registrarInversion()" class="btn btn-success">Guardar</button>
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

import { ref, onMounted } from 'vue';
import axios from 'axios';

import Swal from "sweetalert2";
import { useRouter } from "vue-router";
const route = useRouter();


const tabs = ref(['Movimientos', 'Solicitudes de Retiro']);
const tabs1 = ref(['Inversiones', 'Retiro']);


let baseURL = 'http://localhost:3000/inversiones/';

const usuario_rol = 'Cliente';
const solicitudes_retiro = ref([]);
const inversiones = ref([]);
const clientes = ref([]);
var activeTab = ref(0);
var activeTab1 = ref(2);

onMounted(() => {
  obtenerInversiones_Inversionista();  
  obtenerSolicitudes_retiro();
  obtenerInversionesClientes();
  obtenerSolicitudes_retiroClientes();
});

const obtenerInversiones_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + 'inversionista/1');
    console.log(data);
    inversiones.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerSolicitudes_retiro = async () => {
  try {
    const { data } = await axios.get(baseURL + 'solicitudes_retiro/1',);
    console.log(data);
    solicitudes_retiro.value = data.data;
  } catch (error) {
    console.log(error);

  }
};

const obtenerInversionesClientes = async () => {
  try {
    const { data } = await axios.get(baseURL + 'clientes/inversion');
    console.log(data);
    inversiones_cliente.value = data.data;
  } catch (error) {
    console.log(error);

  }
};

const obtenerSolicitudes_retiroClientes = async () => {
  try {
    const { data } = await axios.get(baseURL + 'clientes/retiro',);
    console.log(data);
    solicitudes_retiro.value = data.data;
  } catch (error) {
    console.log(error);

  }
};

const calcularTotal = async () => {
  try {
    const { data } = await axios.get(baseURL + 'clientes/inversion');
    inversiones_cliente.value = data.data;

    // Calcular el total de las inversiones
    const total = inversiones_cliente.value.reduce((sum, inversion) => {
      return sum + inversion.monto;
    }, 0);

    console.log(`Total de Inversiones: ${total}`);
  } catch (error) {
    console.log(error);
  }};

  const agregarInversion = (item) => {

if (cliente_id.value == '' || total.value == '' || descuento.value == '' || fecha.value == '' || detalles.value.length == 0) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Todos los campos son obligatorios'
  })
  return;
}

const det = {
  producto_id: item.id,
  nombre: item.codigo + ' - ' + item.nombre,
  costo: item.costo,
  cantidad: 1,
};

detalles.value.push(det);

calcularTotal();
};

document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".btn-6");

  buttons.forEach(function (button) {
    button.addEventListener("mouseenter", function (e) {
      var rect = button.getBoundingClientRect();
      var relX = e.pageX - rect.left - window.scrollX;
      var relY = e.pageY - rect.top - window.scrollY;
      var span = button.querySelector("span");
      if (span) {
        span.style.top = relY + "px";
        span.style.left = relX + "px";
      }
    });

    button.addEventListener("mouseout", function (e) {
      var rect = button.getBoundingClientRect();
      var relX = e.pageX - rect.left - window.scrollX;
      var relY = e.pageY - rect.top - window.scrollY;
      var span = button.querySelector("span");
      if (span) {
        span.style.top = relY + "px";
        span.style.left = relX + "px";
      }
    });
  });
});


</script>

<style scoped>
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --card: #ffffff;
  --card-foreground: #1a1a1a;
  --popover: #ffffff;
  --popover-foreground: #1a1a1a;
  --primary: #1a1a1a;
  --primary-foreground: #fafafa;
  --secondary: #f0f0f0;
  --secondary-foreground: #1a1a1a;
  --muted: #f0f0f0;
  --muted-foreground: #767676;
  --accent: #f0f0f0;
  --accent-foreground: #1a1a1a;
  --destructive: #e60000;
  --destructive-foreground: #fafafa;
  --border: #e0e0e0;
  --input: #e0e0e0;
  --ring: #1a1a1a;
  --radius: 0.5rem;
}

/* Estilos personalizados para el modo oscuro */
.dark-mode {
  --background: #1a1a1a;
  --foreground: #fafafa;
  --card: #1a1a1a;
  --card-foreground: #fafafa;
  --popover: #1a1a1a;
  --popover-foreground: #fafafa;
  --primary: #fafafa;
  --primary-foreground: #1a1a1a;
  --secondary: #2a2a2a;
  --secondary-foreground: #fafafa;
  --muted: #2a2a2a;
  --muted-foreground: #a0a0a0;
  --accent: #2a2a2a;
  --accent-foreground: #fafafa;
  --destructive: #993333;
  --destructive-foreground: #fafafa;
  --border: #2a2a2a;
  --input: #2a2a2a;
  --ring: #d1d1d1;
}

/* Aplicar los estilos usando las variables definidas */
body {
  background-color: var(--background);
  color: var(--foreground);
}

.card {
  background-color: var(--card);
  color: var(--card-foreground);
  border-radius: var(--radius);
}

.popover {
  background-color: var(--popover);
  color: var(--popover-foreground);
}

.btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.btn-secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.text-muted {
  color: var(--muted-foreground);
}

.btn-danger {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

input {
  border-color: var(--input);
  background-color: var(--background);
}

/* Bordes personalizados */
.border {
  border-color: var(--border);
}

.btn-6 {
  color: #1a1aff; /* Equivalente a 'tint($btn-color)' en Sass */
  position: relative;
  overflow: hidden;

  /* Default Button color */
  background-color: darkblue;
}

.btn-6 span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: #000033; /* Equivalente a 'shade($btn-color, 40%)' */
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.btn-6:hover {
  color: #b3b3ff; /* Equivalent to 'tint($btn-color, 75%)' */
}

.btn-6:hover span {
  width: 225%;
  height: 225%;
}

.btn-6:active {
  background-color: darkblue;
}

</style>
