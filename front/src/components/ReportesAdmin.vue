<template>
  <div class="m-3 min-vh-100">
    <h2 class="text-xl text-center title mb-4">DashBoard</h2>
    <h2 class="text-xl font-bold mb-4">
      Graficos de resumen
    </h2>

    <div class="row my-3">
      <div class="col-md-5">
        <div class="card m-1">
          <div class="card-body">
            <h5 class="card-title">Compras e Inversiones de Tokens</h5>
            <apexchart width="100%" type="area" :options="options" :series="series"></apexchart>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card m-1">
          <div class="card-body">
            <h5 class="card-title">Ganancias en Dólares</h5>
            <apexchart width="100%" type="bar" :options="options2" :series="series2"></apexchart>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card m-1">
          <div class="card-body">
            <h5 class="card-title">Usuarios</h5>
            <apexchart width="100%" type="pie" :options="options3" :series="series3"></apexchart>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold mb-4">
        Reportes de administrador
      </h2>
      <div class="d-flex gap-3 ">
        <div class="col-2">
          <div class="card  mb-3" style="max-width: 15rem;">
            <div class="card-header bg-gray text-light">Mayor inversionista</div>
            <div class="card-body">
              <p class="card-text">
                <strong>Usuario:</strong> {{ nombre_inversor }} <br>
                <strong>Inversiones realizadas:</strong> {{ total_inversiones }} <br>
                <strong>Tokens:</strong> {{ total_tokens }} <br>
              </p>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="card  mb-3" style="max-width: 15rem;">
            <div class="card-header bg-gray text-light">Talento con mas inversiones</div>
            <div class="card-body">
              <p class="card-text">
                <strong>Usuario:</strong> {{ nombre_cliente }} <br>
                <strong>Inversiones obtenidas:</strong> {{ total_inversiones_cliente }} <br>
                <strong>Tokens:</strong> {{ total_tokens_cliente }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="card  mb-3" style="max-width: 15rem;">
            <div class="card-header bg-gray text-light">Ganancia de la pagina</div>
            <div class="card-body">
              <p class="card-text">
                <strong>USD:</strong> {{ total_comisiones }} <br>

              </p>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="card  mb-3" style="max-width: 15rem;">
            <div class="card-header bg-gray text-light">Movimientos</div>
            <div class="card-body">
              <p class="card-text">
                <strong>Compras de token:</strong> {{ movTokens.movimientos_realizados }} <br>
                <strong>Retiros:</strong> {{ movRetiros.movimientos_realizados }} <br>
                <strong>Devoluciones:</strong> {{ movDeveoluciones.movimientos_realizados }} <br>

              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="">

        <h2 class="text-xl font-bold mb-4">
          Filtros
        </h2>
        <div class="d-flex justify-content-center">
          
          <button v-for="(tabAdmin, index) in tabsAdmin" :key="index" :class="[

            'animate__animated', 'animate__fadeInUp', 'animate__slow', 'btn-6', 'm-2',
            { active: activeTabAdmin === index },

          ]" @click="showReports(reportes_inversiones[index], index)">
            {{ tabAdmin }} <span></span>
          </button>          

        </div>
        <div class="d-flex justify-content-center gap-3 my-3 py-3">

          <div class=" col-2 bg-gray  btn text-light text-center rounded-3">
            <label for="fechaInicio" class="py-2">Fecha de Inicio</label>
            <input @input="showReportCustom" id="fechaInicio" v-model="fechaInicio" class="form-control rounded-0"
              type="date" />

          </div>
          <div class="col-2 bg-gray btn text-light text-center rounded-3 ">
            <label for="fechaFin" class="py-2">Fecha Final</label>
            <input @input="showReportCustom" id="fechaFin" v-model="fechaFinal" class="form-control rounded-0"
              type="date" />
          </div>
        </div>
      </div>
      <div class="table-responsive animate__animated  animate__fadeIn w-75 m-auto">
        <h3 class="card-title text-center my-2">Resultados
          <button @click="exportToExcel()"
            v-if="reports.length > 0 && typeReport == 'mayorInversionistaCustom' || reports.length > 0 && typeReport == 'mayorClienteCustom'"
            class="btn btn-success  text-light btn-sm fw-light ">
            <strong>Exportar</strong>
          </button>
        </h3>
        <table v-if="typeReport == 'mayorInversionistaCustom' && reports.length > 0 && bandReport == true"
          class="table overflow-x-scroll table-sm  ">
          <thead class="table table-primary">
            <tr class="table-secondary">
              <td class="td-custom text-center align-middle">#</td>
              <td class="td-custom text-center align-middle">Nombre Inversor</td>
              <td class="td-custom text-center align-middle">total tokens invertido</td>
              <td class="td-custom text-center align-middle">Cantidad de inversiones</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in reports" :key="index">
              <td class="text-center align-middle">{{ index + 1 }}</td>
              <td class="text-center align-middle">{{ report.nombre_inversor }}</td>
              <td class="text-center align-middle">{{ report.total_tokens }}</td>
              <td class="text-center align-middle">{{ report.total_inversiones }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="typeReport == 'mayorInversionistaCustom' && reports.length == 0 && bandReport"
          class="text-center alert fw-medium alert-light text-dark  card  rounded-3 fs-5">No se encontraron datos para
          las fechas seleccionadas</div>
        <table v-if="typeReport == 'mayorClienteCustom' && reports.length > 0 && bandReport == true"
          class="table overflow-x-scroll table-sm  ">
          <thead class="table table-primary">
            <tr class="table-secondary">
              <td class="td-custom text-center align-middle">#</td>
              <td class="td-custom text-center align-middle">Nombre Talento</td>
              <td class="td-custom text-center align-middle">total tokens invertido generados</td>
              <td class="td-custom text-center align-middle">Cantidad de inversiones recibidas</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in reports" :key="index">
              <td class="text-center align-middle">{{ index + 1 }}</td>
              <td class="text-center align-middle">{{ report.nombre_cliente }}</td>
              <td class="text-center align-middle">{{ report.total_tokens }}</td>
              <td class="text-center align-middle">{{ report.total_inversiones }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="typeReport == 'mayorClienteCustom' && reports.length == 0 && bandReport == true"
          class="text-center alert fw-medium alert-light text-dark  card  rounded-3 fs-5">No se encontraron datos para
          las fechas seleccionadas</div>
        <table v-if="typeReport == 'sumaComisionesCustom' && reports[0]?.estado != null && bandReport == true"
          class="table overflow-x-scroll table-sm  ">
          <thead class="table table-primary">
            <tr class="table-secondary">
              <td class="td-custom text-center align-middle">#</td>
              <td class="td-custom text-center align-middle">Total comisiones obtenidas</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in reports" :key="index">
              <td class="text-center align-middle">{{ index + 1 }}</td>
              <td class="text-center align-middle">{{ report.total_comisiones }} USD</td>


            </tr>
          </tbody>
        </table>
        <div v-if="typeReport == 'sumaComisionesCustom' && reports[0]?.estado == null && bandReport == true"
          class="text-center alert fw-medium alert-light text-dark  card  rounded-3 fs-5">No se encontraron datos para
          las fechas seleccionadas</div>

      </div>
      <div class="text-dark my-3" v-if="!bandReport">
        <div class="d-flex justify-content-center rounded-3">
          <div class="alert alert-orange card  rounded-3" role="alert">
            <div class="card-b">
              <h4 class="alert-heading fs-6">Por favor, selecciona una fecha de inicio y una fecha de fin para obtener
                los resultados esperados <br>
                La busqueda tomara los 3 usuarios que cumplan con los filtros. <br>
                Si el filtro es de ganancia global, mostrara solo un resultado en caso de existir.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import apexchart from "vue3-apexcharts";
import { errorAlert } from "@/helpers/iziToast";
import * as XLSX from "xlsx";

let currentPath = useRouter();
currentPath = currentPath.name;

const route = useRouter();
let baseURL = import.meta.env.VITE_BASE_URL + "/reportes/";

onMounted(async () => {
  await obtenerTotales();
  await obtenerGanancias();
  await obtenerUsuarios();
  await getReportsTotals()
})

const series = ref([]);
const series2 = ref([]);
const series3 = ref([]);
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

const options3 = ref({
  chart: {
    id: "vuechart-example3",
  },
  labels: ["Admin", "Inversionista", "Cliente"],
});

const obtenerUsuarios = async () => {
  series3.value = [];
  try {
    const { data } = await axios.get(baseURL + "usuariosCantidad");
    var roles = [];
    var datosCantidad = [];
    for (let i = 0; i < data.data.length; i++) {
      roles[i] = data.data[i].rol + ': ' + data.data[i].cantidad;
      datosCantidad[i] = data.data[i].cantidad;
    }
    series3.value = datosCantidad;
    options3.value = {
      chart: {
        id: "vuechart-example3",
      },
      labels: roles,
    };
  } catch (error) {
    console.log(error);
    if (error.response.status == 401 || error.response.status == 403) {
      expirado();
    }
  }
};

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
//-----REPORTES-----
const tabsAdmin = ref(["Mayores inversores", "Talento con mas inversiones", "Ganancia global de la aplicacion",]);
const reportes_inversiones = ref(['mayorInversionistaCustom', 'mayorClienteCustom', 'sumaComisionesCustom',]);

const reports = ref([])
const fechaInicio = ref("");
const fechaFinal = ref("");

const showReportCustom = async () => {
  const isValidDate = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) return false;

    const [year, month, day] = date.split('-').map(Number);

    return year >= 1900 && year <= 2100 && month >= 1 && month <= 12 && day >= 1 && day <= 31;
  };

  if (fechaInicio.value && isValidDate(fechaFinal.value)) {
    bandReport.value = true
    if (fechaInicio.value <= fechaFinal.value) {
      try {
        const { data } = await axios.get(import.meta.env.VITE_BASE_URL + `/reportes/${typeReport.value}?fechaInicial=${fechaInicio.value}&fechaFinal=${fechaFinal.value}`)
        reports.value = data.data;
        console.log(reports.value);
      } catch (error) {

      }
    }
  }
};
const bandReport = ref(false)
const typeReport = ref('mayorInversionistaCustom')
const showReports = (report, index) => {
  reports.value = []
  typeReport.value = report
  activeTabAdmin.value = index
  console.log(typeReport.value);
  fechaInicio.value = ''
  fechaFinal.value = ''
  bandReport.value = false
}

var activeTabAdmin = ref(0);
const nombre_inversor = ref(0)
const total_inversiones = ref(0)
const total_tokens = ref(0)
const nombre_cliente = ref(0)
const total_inversiones_cliente = ref(0)
const total_tokens_cliente = ref(0)
const total_comisiones = ref(0)
const movTokens = ref({})
const movRetiros = ref({})
const movDeveoluciones = ref({})
const getReportsTotals = async () => {
  try {
    const { data } = await axios.get(baseURL + '/mayorInversionista')
    nombre_inversor.value = data.data[0].nombre_inversor
    total_inversiones.value = data.data[0].total_inversiones
    total_tokens.value = data.data[0].total_tokens
    const { data: data2 } = await axios.get(baseURL + '/mayorCliente')
    nombre_cliente.value = data2.data[0].nombre_cliente
    total_inversiones_cliente.value = data2.data[0].total_inversiones
    total_tokens_cliente.value = data2.data[0].total_tokens
    const { data: data3 } = await axios.get(baseURL + '/sumaComisiones')
    total_comisiones.value = data3.data[1].total_comisiones
    const { data: data4 } = await axios.get(baseURL + '/totalMovimientos')
    movTokens.value = data4.data[0];
    movRetiros.value = data4.data[3];
    movDeveoluciones.value = data4.data[5];
  } catch (error) {
    errorAlert('Error al realizar la peticion', 'Error')
  }
}

const exportToExcel = () => {
  if (typeReport.value == "mayorInversionistaCustom" && reports.value.length > 0) {
    const datos = reports.value.map((report, index) => ({
      "#": index + 1,
      "Nombre inversor": report.nombre_inversor,
      "Tokens invertidos": report.total_tokens,
      "Cantidad de inversiones": report.total_inversiones,
    }));
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Top 3 inversores");
    XLSX.writeFile(workbook, "reporte_mayores_inversores.xlsx");
  }
  if (typeReport.value == "mayorClienteCustom" && reports.value.length > 0) {
    const datos = reports.value.map((report, index) => ({
      "#": index + 1,
      "Nombre talento": report.nombre_cliente,
      "Tokens invertidos": report.total_tokens,
      "Cantidad de inversiones": report.total_inversiones,
    }));
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Top 3 talentos");
    XLSX.writeFile(workbook, "reporte_talentos.xlsx");
  }
}


</script>




<style scoped>
.title {
  font-family: var(--font-montserrat-bold);
  font-weight: 700;
  font-size: 30px;
  color: var(--gray-color);
  text-transform: uppercase;
}

.active {
  color: var(--white-anti-flash-color) !important;
  background-color: var(--gray-color) !important;
  border-radius: 10px !important;
  padding-bottom: 2px !important;
  z-index: 1 !important;
}

.active span {
  background-color: var(--gray-color) !important;
}

.active::after {
  transform: scaleX(1) !important;
  transform-origin: left !important;
}

/* nav {
  height: 7vh;
  width: 50vw;
  border-radius: 10px !important;
  box-shadow: 0 4px 6px #17223B;
} */

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
  color: var(--white-color) !important;
  background: #ffffff;
  border-color: #ffffff;
  border-radius: 10px !important;

  margin-right: 15px;
  transition: color 0.3s ease;
}

.tabs:hover {
  color: var(--yellow-orange) !important;
}

/* .nav-link {
  font-size: 1.1rem;
  color: #17223B;
  margin-right: 15px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--yellow-orange) !important;
} */

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
</style>