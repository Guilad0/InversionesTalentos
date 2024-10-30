<template>
  <div>
    <div class="container mx-auto p-4" v-if="usuario_rol == 'Cliente'">

      <div class="bg-zinc-100 p-4 rounded-lg mb-6">
        <h2 class="text-xl font-bold mb-4">Inversiones & Retiros</h2>
        <div class="bg-zinc-100 p-4 rounded-lg mb-6">
          <!-- Contenedor de tabs -->
          <div class="tabs">
            <button v-for="(tab, index) in tabs" :key="index"
              :class="['btn', 'btn-primary', { active: activeTab === index }]" @click="activeTab = index">
              {{ tab }}
            </button>
          </div>
        </div>

        <!-- Contenido de los tabs -->
        <div class="tab-content" v-if="activeTab === 0">
          <!-- Inversiones -->
          <div class="bg-white p-4 rounded-lg shadow-md" v-for="inversion_recibida in inversiones_recibidas" :key="inversion_recibida">
            <p class="text-lg font-semibold">Inversion: {{ inversion_recibida.inversion_id }}</p>
            <p class="text-sm text-zinc-500">Inversionista: {{ inversion_recibida.nombre_inversor }}</p>
            <p class="text-sm text-zinc-500">Monto: ${{ inversion_recibida.monto }}</p>
            <p class="text-sm text-zinc-500">Fecha: {{ inversion_recibida.fecha_deposito }}</p>
            <p class="text-sm text-zinc-500">Estado: {{ inversion_recibida.estado }}</p>
            <hr>
          </div>
        </div>

        <div class="tab-content" v-if="activeTab === 1">
          <!-- Lista de solicitudes de retiro -->
          <div class="bg-white p-4 rounded-lg shadow-md" v-for="cliente_retiro in clientes_retiros"
            :key="cliente_retiro">
            <p class="text-lg font-semibold">Solicitud: {{ cliente_retiro.retiro_id }}</p>
            <p class="text-sm text-zinc-500">Monto: ${{ cliente_retiro.monto_recibir }}</p>
            <p class="text-sm text-zinc-500">Fecha: {{ cliente_retiro.fecha_solicitud }}</p>
            <p class="text-sm text-zinc-500">Estado: {{ cliente_retiro.estado }}</p>
            <p class="text-sm text-zinc-500" v-if="cliente_retiro.estado == 'Aprobado'">Fecha Aprobación: {{
              cliente_retiro.fecha_aprobacion }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto p-4" v-if="usuario_rol == 'Inversionista'">

      <div class="bg-zinc-100 p-4 rounded-lg mb-6">
        <h2 class="text-xl font-bold mb-4">Inversiones & Retiros</h2>
        <div class="bg-zinc-100 p-4 rounded-lg mb-6">
          <!-- Contenedor de tabs -->
          <div class="tabs">
            <button v-for="(tab, index) in tabs" :key="index"
              :class="['btn', 'btn-primary', { active: activeTab === index }]" @click="activeTab = index">
              {{ tab }}
            </button>
          </div>
        </div>

        <!-- Contenido de los tabs -->
        <div class="tab-content" v-if="activeTab === 0">
          <!-- Inversiones -->
          <div class="bg-white p-4 rounded-lg shadow-md" v-for="inversion in inversiones" :key="inversion">
            <p class="text-lg font-semibold">Inversion: {{ inversion.inversion_id }}</p>
            <p class="text-sm text-zinc-500">Cliente: {{ inversion.nombre_cliente }}</p>
            <p class="text-sm text-zinc-500">Tokens: {{ inversion.monto }}</p>
            <p class="text-sm text-zinc-500">Fecha: {{ inversion.fecha_deposito }}</p>
            <p class="text-sm text-zinc-500">Estado: {{ inversion.estado }}</p>
            <hr>
          </div>
        </div>

        <div class="tab-content" v-if="activeTab === 1">
          <!-- Lista de solicitudes de retiro -->
          <div class="bg-white p-4 rounded-lg shadow-md" v-for="inversionista_retiro in inversionistas_retiros"
            :key="inversionista_retiro">
            <p class="text-lg font-semibold">Solicitud: {{ inversionista_retiro.retiro_id }}</p>
            <p class="text-sm text-zinc-500">Monto: ${{ inversionista_retiro.monto_recibir }}</p>
            <p class="text-sm text-zinc-500">Fecha: {{ inversionista_retiro.fecha_solicitud }}</p>
            <p class="text-sm text-zinc-500">Estado: {{ inversionista_retiro.estado }}</p>
            <p class="text-sm text-zinc-500" v-if="inversionista_retiro.estado == 'Aprobado'">Fecha Aprobación: {{
              inversionista_retiro.fecha_aprobacion }}</p>
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
const tabs = ref(['Inversiones', 'Retiro']);
console.log(tabs.value);
var activeTab = ref(0);

let baseURL = 'http://localhost:3000/inversionesRetiros/';

const cliente_ID = ref('');
const inversionista_ID = ref('');
const usuario = JSON.parse(localStorage.getItem("usuario"));
const usuario_id = ref(usuario.usuario_id);
const usuario_rol = ref(usuario.rol);
console.log(usuario_rol.value);
console.log(usuario_id.value);
if(usuario_rol.value == 'Inversionista'){
  inversionista_ID.value = usuario_id.value;
  console.log(inversionista_ID.value);
}
else
{
  cliente_ID.value = usuario_id;
}

const inversiones = ref([]);
const inversionistas_retiros = ref([]);
const inversiones_recibidas = ref([]);
const clientes_retiros = ref([]);

onMounted(() => {
  obtenerInversiones_Inversionista();
  obtenerInversionista_retiro();
  obtenerInversiones_Clientes();
  obtenerCliente_retiro();
});

const obtenerInversiones_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + 'inversionista/' + inversionista_ID.value);
    console.log(data);
    inversiones.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerInversionista_retiro = async () => {
  try {
    const { data } = await axios.get(baseURL + 'inversionista_retiros/' + inversionista_ID.value,);
    console.log(data);
    inversionistas_retiros.value = data.data;
  } catch (error) {
    console.log(error);

  }
};

const obtenerInversiones_Clientes = async () => {
  try {
    const { data } = await axios.get(baseURL + 'cliente/' + cliente_ID.value);
    console.log(data);
    inversiones_recibidas.value = data.data;
  } catch (error) {
    console.log(error);

  }
};

const obtenerCliente_retiro = async () => {
  try {
    const { data } = await axios.get(baseURL + 'cliente_retiros/' + cliente_ID.value,);
    console.log(data);
    clientes_retiros.value = data.data;
  } catch (error) {
    console.log(error);

  }
};
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
  color: #1a1aff;
  /* Equivalente a 'tint($btn-color)' en Sass */
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
  background-color: #000033;
  /* Equivalente a 'shade($btn-color, 40%)' */
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.btn-6:hover {
  color: #b3b3ff;
  /* Equivalent to 'tint($btn-color, 75%)' */
}

.btn-6:hover span {
  width: 225%;
  height: 225%;
}

.btn-6:active {
  background-color: darkblue;
}

.active {
  background-color: #007bff;
  /* Ajusta el estilo para la clase active si es necesario */
  color: white;
}
</style>
