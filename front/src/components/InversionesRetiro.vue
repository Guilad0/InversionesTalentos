<template>

  <div>

    <div class="container mx-auto p-4" v-if="usuario_rol == 'Cliente'">

      <div>

        <h2 class="text-xl font-bold mb-4">Inversiones, Retiros y Devoluciones Pendientes</h2>

        <div class="d-flex justify-content-center">

          <button v-for="(tabCli, index) in tabsCli" :key="index"
            :class="['animate__animated', 'animate__fadeInUp', 'animate__slow', 'btn-6', 'm-2', { active: activeTabCli === index }]"
            @click="activeTabCli = index">
            {{ tabCli }} <span></span>
          </button>

        </div>

        <!-- Lista Inversiones -->
        <div class="tab-content" v-if="activeTabCli === 0">

          <div class="p-3 shadow-md text-center" v-for="inversion_recibida in inversiones_recibidas"
            :key="inversion_recibida">

            <div class="custom-card row bg-degrade-inverso p-3">

              <div class="col-9 text-white text-center border-end p-3">

                <p class="text-white text-center">Inversion ID: {{ inversion_recibida.inversion_id }}</p>
                <p class="text-white text-center">Inversionista: {{ inversion_recibida.nombre_inversor }}</p>
                <p class="text-white text-center">Tokens Recibidos: {{ inversion_recibida.monto }}</p>
                <p class="text-white text-center">Fecha: {{ formatDate(inversion_recibida.fecha_deposito) }}</p>

              </div>

              <div class="col-3 p-3">

                <img :src="inversion_recibida.imagen" width="150" class=" rounded-circle" alt="">

              </div>

            </div>

          </div>

        </div>

        <!-- Lista de solicitudes de retiro -->
        <div class="tab-content" v-if="activeTabCli === 1">

          <div class="p-3 shadow-md text-center" v-for="cliente_retiro in clientes_retiros" :key="cliente_retiro">

            <div class="custom-card bg-degrade-inverso p-3">

              <h3 class="text-white text-center">Monto:<br> ${{ cliente_retiro.monto_recibir }}</h3>
              <p class="text-white text-center">Solicitud: {{ cliente_retiro.retiro_id }}</p>
              <p class="text-white text-center">Fecha Solicitud: {{ formatDate(cliente_retiro.fecha_solicitud) }}</p>
              <p class="text-white text-center">Estado: {{ cliente_retiro.estado }}</p>
              <p class="text-white text-center" v-if="cliente_retiro.estado == 'Aprobado'">
                Fecha Aprobación: {{ formatDate(cliente_retiro.fecha_aprobacion) }}
              </p>

            </div>

          </div>

        </div>

        <!-- Lista de Devoluciones Pendientes-->
        <div class="tab-content" v-if="activeTabCli === 2">

          <div class="p-3 shadow-md text-center" v-for="inversion_vencida in inversiones_vencidas"
            :key="inversion_vencida">

            <div class="custom-card bg-degrade-inverso p-3 d-flex flex-column align-items-center">

              <p class="text-white text-center">Solicitud: {{ inversion_vencida.inversion_id }}</p>
              <p class="text-white text-center">Tokens Pendientes: {{ inversion_vencida.ganancia_estimada }}</p>
              <p class="text-white text-center">Fecha de Inversion: {{ formatDate(inversion_vencida.fecha_deposito) }}</p>
              <p class="text-white text-center">Fecha de Vencimiento: {{ formatDate(inversion_vencida.fecha_devolucion)}}</p>
              <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2"
                @click="devolverTokens(inversion_vencida)">Devolver Inversión<span></span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="container mx-auto p-4" v-if="usuario_rol == 'Inversionista'">

      <div class="bg-zinc-100 p-4 rounded-lg mb-6">

        <h2 class="text-xl font-bold mb-4">Inversiones & Retiros</h2>
        <!-- Contenedor de tabs -->
        <div class="d-flex justify-content-center">
          <!-- Clase añadida para centrar -->
          <button v-for="(tabInv, index) in tabsInv" :key="index"
            :class="['animate__animated', 'animate__fadeInUp', 'animate__slow', 'btn-6', 'm-2', { active: activeTabInv === index }]"
            @click="activeTabInv = index">
            {{ tabInv }} <span></span>
          </button>

        </div>

        <!-- Contenido de los tabs -->
        <!-- Lista de Inversiones Recibidas-->
        <div class="tab-content" v-if="activeTabInv === 0">

          <div class="p-3 shadow-md text-center" v-for="inversion in inversiones" :key="inversion">

            <div class="custom-card row bg-degrade-inverso p-3">

              <div class="col-9 text-white text-center border-end p-3">

                <p class=" text-white text-center">Inversion ID: {{ inversion.inversion_id }}</p>
                <p class=" text-white text-center">Cliente: {{ inversion.nombre_cliente }}</p>
                <p class=" text-white text-center">Tokens Invertidos: {{ inversion.monto }}</p>
                <p class=" text-white text-center">Ganancia de Tokens: {{ inversion.ganancia_estimada - inversion.monto
                  }}</p>
                <p class=" text-white text-center">Fecha de Inversion: {{ formatDate(inversion.fecha_deposito) }}</p>
                <p class=" text-white text-center">Fecha de Retorno Aprox.: {{ formatDate(inversion.fecha_devolucion) }}
                </p>

              </div>

              <div class="col-3 p-3">

                <img :src="inversion.imagen" width="200" class=" rounded-circle" alt="">

              </div>

            </div>

          </div>

        </div>

        <!-- Lista de solicitudes de retiro-->
        <div class="tab-content" v-if="activeTabInv === 1">

          <div class="card bg-degrade-inverso p-4 rounded-lg shadow-md"
            v-for="inversionista_retiro in inversionistas_retiros" :key="inversionista_retiro">

            <p class="text-white">Monto: ${{ inversionista_retiro.monto_recibir }}</p>
            <p class="text-white">Solicitud: {{ inversionista_retiro.retiro_id }}</p>
            <p class="text-white">Fecha: {{ inversionista_retiro.fecha_solicitud }}</p>
            <p class="text-white">Estado: {{ inversionista_retiro.estado }}</p>
            <p class="text-white" v-if="inversionista_retiro.estado == 'Aprobado'">
              Fecha Aprobación: {{ formatDate(inversionista_retiro.fecha_aprobacion) }}
            </p>

          </div>

        </div>

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

const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

</script>

<style scoped>
.bg-degrade-inverso {
  background: linear-gradient(to left, var(--gray-color), rgb(101, 126, 197));
}

.active {
  background-color: var(--gray-color);
  color: white !important;
  border-radius: 10px !important;
  padding-bottom: 2px !important;
  z-index: 1 !important;
}

.custom-card {
  border-radius: 15px;
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

.active::after {
  transform: scaleX(1) !important;
  transform-origin: left !important;
}

p {
  font-size: 1rem;
  color: var(--gray-color);
  margin-right: 15px;
}
</style>