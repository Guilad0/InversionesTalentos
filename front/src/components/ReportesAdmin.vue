<template>
  <div class="m-3">
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

    <!--  <div class="row my-3">
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
    </div> -->

    <div>
      <h2 class="text-xl font-bold mb-4">
        Reportes de administrador
      </h2>
    <div class="d-flex gap-3 ">
      <div class="col-2">
        <div class="card  mb-3" style="max-width: 15rem;">
        <div class="card-header bg-primary text-light">Mayor inversionista</div>
        <div class="card-body">
          <p class="card-text">
            <strong>Usuario:</strong> Juan Perez <br>
            <strong>Tokens:</strong> 800 <br>
            <strong>USD:</strong> 800
          </p>
        </div>
      </div>
      </div>
     <div class="col-2">
      <div class="card  mb-3" style="max-width: 15rem;">
        <div class="card-header bg-success text-light">Talento con mas inversiones</div>
        <div class="card-body">
          <p class="card-text">
            <strong>Usuario:</strong> Juan Perez <br>
            <strong>Tokens:</strong> 800 <br>
            <strong>USD:</strong> 800
          </p>
        </div>
      </div>
     </div>
     <div class="col-2">
      <div class="card  mb-3" style="max-width: 15rem;">
        <div class="card-header bg-orange text-light">Ganancia de la pagina</div>
        <div class="card-body">
          <p class="card-text">
            <strong>USD:</strong> 50 <br>
            <strong>Tokens:</strong> 800
          </p>
        </div>
      </div>
     </div>
     <div class="col-2">
      <div class="card  mb-3" style="max-width: 15rem;">
        <div class="card-header bg-secondary text-light">Movimientos</div>
        <div class="card-body">
          <p class="card-text">
            <strong>Inversiones:</strong> 50 <br>
            <strong>Retiros:</strong> 50 <br>
            <strong>Devoluciones:</strong> 800
          </p>
        </div>
      </div>
     </div>
    </div>
    <h2 class="text-xl font-bold mb-4">
        Filtros
      </h2>
      <div class="d-flex justify-content-center">
        <button v-for="(tabAdmin, index) in tabsAdmin" :key="index" :class="[
          'animate__animated', 'animate__fadeInUp', 'animate__slow', 'btn-6', 'm-2',
          { active: activeTabAdmin === index },
        ]" @click="activeTabAdmin = index">
          {{ tabAdmin }} <span></span>
        </button>
      </div>

      <!-- Lista Inversiones -->
      <div class="tab-content" v-if="activeTabAdmin === 0">
        <div class="mb-3">
          <label for="fechaInicio">Fecha de Inicio</label>
          <input id="fechaInicio" v-model="fechaInicio" class="form-control" type="date" />
          <label for="fechaFinal">Fecha Final</label>
          <input id="fechaFinal" v-model="fechaFinal" class="form-control" type="date" />
        </div>
        <div class="col-9 table-responsive">
          <table v-if="reportes_inversiones.length > 0" class="table table-sm align-middle">
            <thead class="align-middle">
              <tr>
                <th scope="col">Inversión ID</th>
                <th scope="col">Inversionista</th>
                <th scope="col">Fecha de Inversión</th>
                <th scope="col">Tokens Invertidos</th>
                <th scope="col">Talento Invertido</th>
                <th scope="col">Fecha de Devolución</th>
                <th scope="col">Ganancia de Tokens</th>
              </tr>
            </thead>
            <tbody v-for="reporte_inversion in reportes_inversiones" :key="reporte_inversion">
              <tr>
                <td scope="col">{{ reporte_inversion.inversion_id }}</td>
                <td scope="col">{{ reporte_inversion.inversor }}</td>
                <td scope="col">
                  {{ new Date(reporte_inversion.fecha_deposito).toLocaleDateString() }}</td>
                <td scope="col">{{ reporte_inversion.monto }}</td>
                <td scope="col">{{ reporte_inversion.cliente }}</td>
                <td scope="col">
                  {{ new Date(reporte_inversion.fecha_devolucion).toLocaleDateString() }}</td>
                <td scope="col">{{ reporte_inversion.ganancia }}</td>
              </tr>
            </tbody>
          </table>
        </div>


        <div class="text-dark my-3" v-if="reportes_inversiones.length == 0">
          <div class="d-flex justify-content-center rounded-3">
            <div class="alert alert-warning" role="alert">
              <h4 class="alert-heading">¡Sin resultados!</h4>
              <p>
                No se encontraron resultados de inversiones recibidas.<br>
                Se mostrará en blanco hasta que reciba alguna inversión.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de solicitudes de retiro -->
      <div class="tab-content" v-if="activeTabAdmin === 1">
        <div class="mb-3">
          <label for="rolReporte" class="form-label">Rol</label><br>
          <select v-model="tipo" id="rolReporte" class="form-select" required>
            <option value="'inversor','cliente'">Todas</option>
            <option value="inversor">Inversor</option>
            <option value="cliente">Talentos</option>
          </select>
          <label for="fechaInicio">Fecha de Inicio</label>
          <input id="fechaInicio" v-model="fechaInicio" class="form-control" type="date" />
          <label for="fechaFin">Fecha Final</label>
          <input id="fechaFin" v-model="fechaFinal" class="form-control" type="date" />
        </div>
        <div class="col-9 table-responsive">
          <table v-if="reportes_retiro.length > 0" class="table table-sm align-middle">
            <thead>
              <tr>
                <th scope="col">Tetiro ID</th>
                <th scope="col">Rol de Usuario</th>
                <th scope="col">Nombre Usuario</th>
                <th scope="col">Fecha Solicitud Retiro</th>
                <th scope="col">Monto Solicitud</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha de Aprobación</th>
                <th scope="col">Monto a Entregar</th>
                <th scope="col">Monto Ganancia Empresa</th>
              </tr>
            </thead>
            <tbody v-for="reporte_retiro in reportes_retiro" :key="reporte_retiro">
              <tr>
                <td scope="col">{{ reportes_retiro.retiro_id }}</td>
                <td scope="col">{{ reportes_retiro.tipo }}</td>
                <td scope="col">{{ reportes_retiro.usuario_nombre }}</td>
                <td scope="col">{{ new Date(reportes_retiro.fecha_solicitud).toLocaleDateString() }}</td>
                <td scope="col">{{ reportes_retiro.monto_solicitud }}</td>
                <td scope="col">{{ reportes_retiro.estado }}</td>
                <td scope="col">{{ new Date(reportes_retiro.fecha_aprobacion).toLocaleDateString() }}</td>
                <td scope="col">{{ reportes_retiro.monto_recibir }}</td>
                <td scope="col">{{ reportes_retiro.monto_solicitud - reportes_retiro.monto_recibir }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-dark my-3" v-if="reportes_retiro.length == 0">
          <div class="d-flex justify-content-center rounded-3">
            <div class="alert alert-warning" role="alert">
              <h4 class="alert-heading">¡Sin resultados!</h4>
              <p>
                No se encontraron resultados de solicitudes de retiros.<br>
                Se mostrará en blanco hasta que realice alguna solicitud.
              </p>
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

import {
  getCurrentYearStartAndEnd,
  getDayStartAndEnd,
  getMonthStartAndEnd,
  getWeekStartAndEnd,
  getYesterdayStartAndEnd,
} from "@/helpers/utilities";

let currentPath = useRouter();
currentPath = currentPath.name;

const route = useRouter();
let baseURL = import.meta.env.VITE_BASE_URL + "/reportes/";

onMounted(() => {
  obtenerTotales();
  obtenerGanancias();
  obtenerUsuarios();
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
    console.log(datos);
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
const tabsAdmin = ref(["Inversiones", "Retiros", "Devoluciones"]);
const rolReporte = ref("");
var activeTabAdmin = ref(0);
var typeReport = ref("Inversiones");
const bandAlert = ref(false);
let reportesURL = import.meta.env.VITE_BASE_URL + "/reportes/";
const selectedReport = ref("");
onMounted(async () => {
  await reporte_RetiroTipo();
  await reporte_InversionesGnral();
});

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const reportes_retiro = ref([]);
const reportes_inversiones = ref([]);

let fechaInicio = ref("");
let fechaFinal = ref("");

const reporte_RetiroTipo = async () => {
  try {
    const { data } = await axios.get(
      `${reportesURL}reporteSolicitudesTipo/?fecha_inicio=${fechaInicio.value}&fecha_final=${fechaFinal.value}&rol=${rolReporte.value}`
    );
    reportes_retiro.value = data.data;
  } catch (error) {
    console.error(error);
  }
};

const reporte_InversionesGnral = async () => {
  try {
    const { data } = await axios.get(
      `${reportesURL}reporteInversionesGnral/?fecha_inicio=${fechaInicio.value}&fecha_final=${fechaFinal.value}`
    );
    reportes_inversiones = data.data
  }
  catch (error) {
    console.error(error);
  }
};


const exportToPDF = () => {
  const doc = new jsPDF();

  const columns = [
    { header: "ID", dataKey: "inversion_id" },
    { header: "Inversionista", dataKey: "inversor" },
    { header: "Token Invertidos", dataKey: "monto" },
    { header: "Tokens a Devolver", dataKey: "ganancia" },
    { header: "Fecha de Inversion", dataKey: "fecha_deposito" },
    { header: "Fecha de Retorno(Aproximado)", dataKey: "fecha_devolucion" },
  ];

  const rows = reports.value.map((report) => ({
    inversion_id: report.inversion_id,
    inversor: report.inversor,
    monto: report.monto,
    ganancia: report.ganancia,
    fecha_deposito: report.fecha_deposito,
    fecha_devolucion: report.fecha_devolucion,
  }));

  console.log("Rows para PDF Cliente", rows);

  doc.autoTable({
    columns: columns,
    body: rows,
    startY: 20,
    theme: "grid",
    styles: {
      overflow: "linebreak",
      cellPadding: 2,
      fontSize: 9,
    },
  });
  doc.text("Reporte de Inversiones y Retiros", doc.internal.pageSize.width / 2, 10, {
    align: "center",
  });
  doc.save("Reporte de Inversiones y Retiros.pdf");
};


const exportToExcel = () => {
  if (typeReport.value == "Inversiones") {
    const datos = reports.value.map((report) => ({
      ID: report.inversion_id,
      Inversionista: report.inversor,
      "Tokens Invertidos": report.monto,
      "Tokens a Devolver": monto_devolver(report.monto, report.ganancia),
      "Fecha de Inversión": new Date(report.fecha_deposito).toLocaleDateString(),
      "Fecha de Retorno (Aprox)": new Date(report.fecha_devolucion).toLocaleDateString(),
    }))
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inversiones");
    XLSX.writeFile(workbook, "reporte_inversiones.xlsx");
  }
  if (typeReport.value == "Retiros") {

    const datos = reports.value.map((report) => ({
      ID: report.retiro_id,
      "Monto Solicitado": report.monto_solicitud,
      "Monto a Recibir": report.monto_recibir,
      "Fecha Solicitud": new Date(report.fecha_solicitud).toLocaleDateString(),
      "Fecha de Aprobación": new Date(report.fecha_aprobacion).toLocaleDateString(),

    }))
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Retiros");
    XLSX.writeFile(workbook, "reporte_retiros.xlsx");
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