<template>
  <div>
    <div class="container mx-auto p-4" v-if="usuario_rol == 'Cliente'">
      <div>
        <h2 class="text-xl font-bold mb-4">Inversiones, Retiros y Devoluciones Pendientes</h2>

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
              <div class="col-4">
                <img :src="inversion_recibida.imagen" width="150" class=" rounded-circle" alt="">
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
            <button class="btn btn-secondary" @click="devolverTokens(inversion_vencida)">Devolver Inversión</button>
            <hr />
          </div>
        </div>
        <!---->
      </div>
    </div>

    <div class="container mx-auto p-4" v-if="usuario_rol == 'Inversionista'">
      <div class="bg-zinc-100 p-4 rounded-lg mb-6">
        <h2 class="text-xl font-bold mb-4">Inversiones & Retiros</h2>

        <!-- Contenedor de tabs -->
        <nav class="navbar navbar-expand-lg custom-navbar bg-dark-custom z-3 shadow">
          <div class="container-fluid m-3">
            <div class="tabs me-auto mb-2 mb-lg-0">
              <button v-for="(tabInv, index) in tabsInv" :key="index"
                :class="['underline-dynamic', 'tabs', { active: activeTabInv === index }]"
                @click="activeTabInv = index">
                {{ tabInv }}
              </button>
            </div>
          </div>
        </nav>

        <!-- Contenido de los tabs -->
        <!-- Lista de Inversiones Recibidas-->
        <div class="tab-content" v-if="activeTabInv === 0">
          <div class="bg-white p-4 rounded-lg shadow-md" v-for="inversion in inversiones" :key="inversion">
            <div class="row">
              <div class="col-5">
                <p>Inversion ID: {{ inversion.inversion_id }}</p>
                <p>Cliente: {{ inversion.nombre_cliente }}</p>
                <p>Tokens Invertidos: {{ inversion.monto }}</p>
                <p>Ganancia de Tokens: {{ inversion.ganancia_estimada - inversion.monto }}</p>
                <p>Fecha de Inversion: {{ inversion.fecha_deposito }}</p>
                <p>Fecha de Retorno Aprox.: {{ inversion.fecha_devolucion }}</p>
                <hr />
              </div>
              <div class="col-4">
                <img :src="inversion.imagen" width="200" class=" rounded-circle" alt="">
              </div>
            </div>
          </div>
        </div>
        <!---->

        <!-- Lista de solicitudes de retiro-->
        <div class="tab-content" v-if="activeTabInv === 1">
          <div class="bg-white p-4 rounded-lg shadow-md" v-for="inversionista_retiro in inversionistas_retiros"
            :key="inversionista_retiro">
            <p>Solicitud: {{ inversionista_retiro.retiro_id }}</p>
            <p>Monto: ${{ inversionista_retiro.monto_recibir }}</p>
            <p>Fecha: {{ inversionista_retiro.fecha_solicitud }}</p>
            <p>Estado: {{ inversionista_retiro.estado }}</p>
            <p v-if="inversionista_retiro.estado == 'Aprobado'">
              Fecha Aprobación: {{ inversionista_retiro.fecha_aprobacion }}
            </p>
          </div>
        </div>
        <!---->

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const route = useRouter();
const tabsInv = ref(["Inversiones", "Retiros"]);
var activeTabInv = ref(0);

const tabsCli = ref(["Inversiones", "Retiros", "Devoluciones"]);
var activeTabCli = ref(0);

let baseURL = "http://localhost:3000/inversionesRetiros/";

const cliente_ID = ref("");
const inversionista_ID = ref("");
const usuario = JSON.parse(localStorage.getItem("usuario"));
const usuario_id = ref(usuario.usuario_id);
const usuario_rol = ref(usuario.rol);

if (usuario_rol.value == "Inversionista") {
  inversionista_ID.value = usuario_id.value;
  onMounted(() => {
    obtenerInversiones_Inversionista();
    obtenerInversionista_retiro();
  });
}
if (usuario_rol.value == "Cliente") {
  cliente_ID.value = usuario_id.value;
  onMounted(() => {
    obtenerInversiones_Clientes();
    obtenerCliente_retiro();
    obtenerInversiones_Clientes_Vencidas();
    obtenerTokens_Cliente();
  });
}

const inversiones = ref([]);
const inversionistas_retiros = ref([]);
const inversiones_recibidas = ref([]);
const clientes_retiros = ref([]);
const inversiones_vencidas = ref([]);

const tokensRecibidosCliente = ref(0);
const tokensDeudasCliente = ref(0);


const obtenerInversiones_Inversionista = async () => {
  try {
    const { data } = await axios.get(
      baseURL + "inversionista/" + inversionista_ID.value
    );
    inversiones.value = data.data;
    console.log(inversiones.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerInversionista_retiro = async () => {
  try {
    const { data } = await axios.get(
      baseURL + "inversionista_retiros/" + inversionista_ID.value
    );
    inversionistas_retiros.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerInversiones_Clientes = async () => {
  try {
    const { data } = await axios.get(baseURL + "cliente/" + cliente_ID.value);
    inversiones_recibidas.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerCliente_retiro = async () => {
  try {
    const { data } = await axios.get(
      baseURL + "cliente_retiros/" + cliente_ID.value
    );
    clientes_retiros.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerInversiones_Clientes_Vencidas = async () => {
  try {
    const { data } = await axios.get(baseURL + "inversiones_vencidas/" + cliente_ID.value);
    inversiones_vencidas.value = data.data;
    console.log(inversiones_vencidas.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTokens_Cliente = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensClienteRecibido/' + cliente_ID.value);
    tokensRecibidosCliente.value = data.data[0].totalTokensRecibidos + data.data[0].tokensCompradosCliente;
    tokensDeudasCliente.value = data.data[0].totalTokensDeudas;
    console.log(tokensRecibidosCliente.value);
  } catch (error) {
    console.log(error);
  }
};

const devolverTokens = async (inversion) => {
  console.log(inversion);
  console.log(inversion.monto);
  console.log(tokensRecibidosCliente.value);

  if (inversion.monto < tokensRecibidosCliente.value) {
    const datos = {
      inversion_id: inversion.inversion_id,
      token: inversion.monto,
      usuario_id: inversion.inversor_id,
      cliente_id: cliente_ID.value,
      inversor_id: inversion.inversor_id,
      tipo: 'Egreso',
      descripcion: 'Devolucion de tokens'
    };
    console.log(datos);
    try {
      await axios.post(baseURL + 'devolverTokens', datos);
      Swal.fire({
        title: "¡Felicidades!",
        text: "Devolución de tokens realizada con éxito",
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
  }
  else {
    Swal.fire({
      title: "¡Error!",
      text: "La cantidad de tokens es insuficiente",
      icon: "error",
      allowOutsideClick: true,
      allowEscapeKey: true,
      color: 'var(--gray-color)',
      confirmButtonColor: 'var(--yellow-orange)',
    });
  }
  obtenerInversiones_Clientes_Vencidas();

};

</script>

<style scoped>
.active {
  color: var(--yellow-orange) !important;
  border-radius: 10px !important;
  padding-bottom: 2px !important;
  z-index: 1 !important;
}

.btn-secondary {
  background-color: var(--gray-color);
  color: var(--white-color);
  border-color: var(--white-color);
}

.btn-secondary:hover {
  background-color: var(--secondary);
  color: var(--yellow-orange);
  border-color: var(--yellow-orange);
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

p {
  font-size: 1rem;
  color: var(--gray-color);
  margin-right: 15px;
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