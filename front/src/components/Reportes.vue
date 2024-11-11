<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Reportes</h2>

    <div class="row">
      <div class="col-sm-6 mb-3 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Cantidad de Usuarios</h5>
              <table class="table">
                <tbody v-for="(cantUsuario, index) in cantUsuarios" :key="index">
                  <tr>
                    <td>{{ cantUsuario.rol }}s: </td>
                    <td>{{ cantUsuario.cantidad }} </td>
                  </tr>                  
                </tbody>
              </table>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Inversiones</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Contenedor de tabs -->
    <nav class="navbar navbar-expand-lg custom-navbar bg-dark-custom z-3 shadow">
      <div class="container-fluid m-3">
        <div class="tabs me-auto mb-2 mb-lg-0">
          <button v-for="(tabCli, index) in tabsCli" :key="index"
            :class="['underline-dynamic', 'btn', 'tabs', { active: activeTabCli === index }]"
            @click="activeTabCli = index">
            {{ tabCli }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Contenido de los tabs -->
    <!-- Lista Inversiones -->
    <div class="tab-content" v-if="activeTabCli === 0">
      <div class="bg-white p-4  " v-for="inversion_recibida in inversiones_recibidas" :key="inversion_recibida">
        <div class="row">
          <div class="col-md-4">
            <p>Inversion ID: {{ inversion_recibida.inversion_id }}</p>
            <p>Inversionista: {{ inversion_recibida.nombre_inversor }}</p>
            <p>Tokens Recibidos: {{ inversion_recibida.monto }}</p>
            <p>Fecha: {{ inversion_recibida.fecha_deposito }}</p>
            <hr />
          </div>
          <div class="col-md-4">
            <img :src='inversion_recibida.imagen' width="25" class="img-fluid rounded" alt="">
          </div>
        </div>
      </div>
    </div>
    <!---->
    <!-- Lista de solicitudes de retiro -->
    <div class="tab-content" v-if="activeTabCli === 1">

      <div class="bg-white p-4" v-for="cliente_retiro in clientes_retiros" :key="cliente_retiro">
        <p>Solicitud: {{ cliente_retiro.retiro_id }}</p>
        <p>Monto: ${{ cliente_retiro.monto_recibir }}</p>
        <p>Fecha Solicitud: {{ cliente_retiro.fecha_solicitud }}</p>
        <p>Estado: {{ cliente_retiro.estado }}</p>
        <p v-if="cliente_retiro.estado == 'Aprobado'">
          Fecha Aprobación: {{ cliente_retiro.fecha_aprobacion }}
        </p>
        <hr />
      </div>
    </div>
    <!---->
    <!-- Lista de Devoluciones Pendientes-->
    <div class="tab-content" v-if="activeTabCli === 2">
      <div class="bg-white p-4 rounded-lg shadow-md" v-for="inversion_vencida in inversiones_vencidas"
        :key="inversion_vencida">
        <p>Solicitud: {{ inversion_vencida.inversion_id }}</p>
        <p>Tokens Pendientes: {{ inversion_vencida.ganancia_estimada }}</p>
        <p>Fecha de Inversion: {{ inversion_vencida.fecha_deposito }}</p>
        <p>Fecha de Vencimiento: {{ inversion_vencida.fecha_devolucion }}</p>
        <hr />
      </div>
    </div>

  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const route = useRouter();
let baseURL = "http://localhost:3000/reportes/";

const cantUsuarios = ref(0);

onMounted(() => {
  obtenerCantUsuarios();
})
const obtenerCantUsuarios = async () => {
  try {
    const { data } = await axios.get(baseURL + "usuariosCantidad/");
    cantUsuarios.value = data.data;
    console.log(cantUsuarios.value);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.active {
  color: var(--yellow-orange) !important;
  border-radius: 10px !important;
  padding-bottom: 2px !important;
  z-index: 1 !important;
}

.active::after {
  transform: scaleX(1) !important;
  transform-origin: left !important;
}

nav {
  height: 7vh;
  width: 50vw;
  border-radius: 10px !important;
  box-shadow: 0 4px 6px #17223B;
}

.card-title {
  color: var(--gray-color);
  font-size: 1.5rem;
}

td {
  font-size: 1rem;
  color: var(--gray-color);  
}

.tabs {
  font-size: 1.1rem;
  color: var(--white-color);
  background: #ffffff;
  border-color: #ffffff;
  border-radius: 10px !important;

  margin-right: 15px;
  transition: color 0.3s ease;
}

.tabs:hover {
  color: var(--yellow-orange) !important;
}

.nav-link {
  font-size: 1.1rem;
  color: #17223B;
  margin-right: 15px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--yellow-orange) !important;
}

.underline-dynamic {
  display: inline-block;
  position: relative;
  padding-bottom: 2px;
  color: #17223B;
  text-decoration: none;
  transition: color 0.3s ease;
  margin-right: 15px;
}

.underline-dynamic::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--yellow-orange);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s, background-color 0.3s ease;
}
</style>