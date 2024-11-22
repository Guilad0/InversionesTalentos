<template>
  <div class="m-3">
    <h2 class="text-xl text-center title mb-4">Reportes</h2>

    <div class="row my-3">
      <div class="col-md-5">
        <div class="card m-1">
          <div class="card-body">
            <h5 class="card-title">Compras e Inversiones de Tokens</h5>
            <apexchart width="100%" type="area" :options="options" :series="series"></apexchart>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card m-1">
          <div class="card-body">
            <h5 class="card-title">Ganancias en Dólares</h5>
            <apexchart width="100%" type="bar" :options="options2" :series="series2"></apexchart>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-3">
      <div class="col-md-5 col-sm-6 mb-3 mb-sm-0">
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
      <div class="col-md-5 col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Cantidad de Inversiones</h5>
            <table class="table">
              <tbody v-for="(cantInversion, index) in cantInversiones" :key="index">
                <tr>
                  <td>{{ cantInversion.estado_descripcion }}s: </td>
                  <td>{{ cantInversion.cantidad }} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-3">
      <div class="col-md-5 col-sm-6 mb-3 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Cantidad de Solicitudes de Retiro</h5>
            <table class="table">
              <tbody v-for="(cantSolicitud, index) in cantSolicitudes" :key="index">
                <tr>
                  <td>{{ cantSolicitud.estado }}s: </td>
                  <td>{{ cantSolicitud.cantidad }} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Ganancia en Dólares de la página</h5>
            <table class="table">
              <tbody v-for="(cantSumComision, index) in cantSumComisiones" :key="index">
                <tr>
                  <td>{{ cantSumComision.estado }}s: </td>
                  <td>$US {{ cantSumComision.total_comisiones }} </td>
                </tr>
              </tbody>
            </table>
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
import apexchart from "vue3-apexcharts";
const route = useRouter();
// let baseURL = "https://apitalentos.pruebasdeploy.online/reportes/";
let baseURL = import.meta.env.VITE_BASE_URL+"/reportes/";

const cantUsuarios = ref(0);
const cantInversiones = ref(0);
const cantSolicitudes = ref(0);
const cantSumComisiones = ref(0);

onMounted(() => {
  obtenerCantUsuarios();
  obtenerCantInversiones();
  obtenerCantSolicitudes();
  obtenerCantSumComisiones();
  obtenerTotales();
  obtenerGanancias();
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

const obtenerCantInversiones = async () => {
  try {
    const { data } = await axios.get(baseURL + "inversionesCantidad/");
    cantInversiones.value = data.data;
    console.log(cantInversiones.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerCantSolicitudes = async () => {
  try {
    const { data } = await axios.get(baseURL + "solicitudesCantidad/");
    cantSolicitudes.value = data.data;
    console.log(cantSolicitudes.value);
  } catch (error) {
    console.log(error);
  }
};


const obtenerCantSumComisiones = async () => {
  try {
    const { data } = await axios.get(baseURL + "sumaComisiones/");
    cantSumComisiones.value = data.data;
    console.log(cantSumComisiones.value);
  } catch (error) {
    console.log(error);
  }
};


const series = ref([]);
const series2 = ref([]);
const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const options = ref({
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: meses,
  },
});

const options2 = ref({
  chart: {
    type: 'bar', height: 250, stacked: true,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        total: {
          enabled: true,
          offsetX: 0,
          style: {
            fontSize: '13px',
            fontWeight: 900
          }
        }
      }
    },
  },
  xaxis: {
    categories: meses,
    labels: {
      formatter: function (val) {
        return val
      }
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40
  }
});

const obtenerTotales = async () => {
  series.value = [];
  try {
    const { data } = await axios.get(baseURL + "totalCompras");

    var datosMesCompra = [];
    for (let i = 0; i < meses.length; i++) {
      let mes = i + 1;

      datosMesCompra[i] = 0;

      for (let j = 0; j < data.data.length; j++) {
        if (mes == data.data[j].mes) {
          datosMesCompra[i] = data.data[j].tokens_comprados;
        }
      }
    }

    var datos = {
      name: "Compra de Tokens",
      data: datosMesCompra,
    };
    series.value.push(datos);
  } catch (error) {
    console.log(error);
  }
  try {
    const { data } = await axios.get(baseURL + "totalInversiones");

    var datosMesVenta = [];
    for (let i = 0; i < meses.length; i++) {
      let mes = i + 1;

      datosMesVenta[i] = 0;

      for (let j = 0; j < data.data.length; j++) {
        if (mes == data.data[j].mes) {
          datosMesVenta[i] = data.data[j].tokens_invertidos;
        }
      }
    }

    var datos = {
      name: "Inversiones de Tokens",
      data: datosMesVenta,
    };
    series.value.push(datos);
  } catch (error) {
    console.log(error);
  }
};

const obtenerGanancias = async () => {
  series2.value = [];
  try {
    const { data } = await axios.get(baseURL + "gananciasPendientes");

    var datosMesPendientes = [];
    for (let i = 0; i < meses.length; i++) {
      let mes = i + 1;

      datosMesPendientes[i] = 0;

      for (let j = 0; j < data.data.length; j++) {
        if (mes == data.data[j].mes) {
          datosMesPendientes[i] = data.data[j].total_comisiones;
        }
      }
    }

    var datos = {
      name: "Ganancias Pendientes",
      data: datosMesPendientes,
    };
    series2.value.push(datos);
  } catch (error) {
    console.log(error);
  }
  try {
    const { data } = await axios.get(baseURL + "gananciasAprobadas");

    var datosMesAprobado = [];
    for (let i = 0; i < meses.length; i++) {
      let mes = i + 1;

      datosMesAprobado[i] = 0;

      for (let j = 0; j < data.data.length; j++) {
        if (mes == data.data[j].mes) {
          datosMesAprobado[i] = data.data[j].total_comisiones;
        }
      }
    }

    var datos = {
      name: "Ganancias Aprobadas",
      data: datosMesAprobado,
    };
    series2.value.push(datos);
  } catch (error) {
    console.log(error);
  }
};

</script>

<style scoped>

.title {
  font-family: var(--font-montserrat-bold); 
  font-weight: 700;
  font-size: 30px; 
  color: var( --gray-color); 
  text-transform: uppercase;
}
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