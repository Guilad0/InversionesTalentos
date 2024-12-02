<template>
  <main class="bg-light pt-4 ps-4">
    <div class="d-flex">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li :class="{ 'active-button': currentNav === 'General' }" @click="setActive('General')"
            class="nav-link mx-2">
            <label>General</label>
          </li>
          <li :class="{ 'active-button': currentNav === 'Pendiente' }" @click="setActive('Pendiente')"
            class="nav-link mx-2">
            <label>Pendientes</label>
          </li>
          <li :class="{ 'active-button': currentNav === 'Aprobado' }" @click="setActive('Aprobado')"
            class="nav-link mx-2">
            <label>Aprobados</label>
          </li>
          <li :class="{ 'active-button': currentNav === 'Rechazado' }" @click="setActive('Rechazado')"
            class="nav-link mx-2">
            <label>Rechazados</label>
          </li>
        </ol>
      </nav>
    </div>
    <div class="content">
      <h4 class="d-block mb-2 text-center title">Solicitudes de Compras de Tokens</h4>
      <div class="table-responsive col-md-10 offset-md-1">
        <div class="d-flex justify-content-start gap-3 position-relative my-4">
          <div class="card text-bg-secondary mb-3 rounded-5" style="max-width: 18rem">
            <div class="card-header">
              <i class="fa-solid fa-comments"></i> <strong>Total</strong> {{ totalSolicitudesTokens }} &nbsp;
            </div>
          </div>
          <div class="card text-bg-orange mb-3 rounded-5" style="max-width: 18rem">
            <div class="card-header text-white">
              <i class="fa-solid fa-comments"></i><strong> Pendientes</strong> {{ solicitudesPendientesTokens }}
              &nbsp;
            </div>
          </div>
          <div class="card text-bg-success mb-3 rounded-5" style="max-width: 18rem">
            <div class="card-header text-white">
              <i class="fa-solid fa-comments"></i><strong> Aprobados</strong> {{ solicitudesAprobadosTokens }}
              &nbsp;
            </div>
          </div>
          <div class="card text-bg-danger mb-3 rounded-5" style="max-width: 18rem">
            <div class="card-header text-white">
              <i class="fa-solid fa-comments"></i> <strong> Rechazados</strong> {{ solicitudesRechazadosTokens }}
              &nbsp;
            </div>
          </div>
          <div class="custom-abs-search">
            <div class="position-relative">
              <input name="search" type="text" v-model="search"
                class="form-control border-1 border-secondary border-primary rounded-5 float" placeholder="Buscar ..."
                @input="obtenerDatosTokens(1, search)" />
            </div>
          </div>
        </div>
        <div class="table-container">
          <table class="table overflow-x-scroll">
            <thead>
              <tr class="table-secondary">
                <th class="custom-size">ID</th>
                <th class="custom-size">Nombre Usuario - Rol</th>
                <th class="custom-size">Monto en Dólares</th>
                <th class="custom-size">Monto de Tokens</th>
                <th class="custom-size">Fecha de Solicitud</th>
                <th class="custom-size">Fecha de Aprobacion</th>
                <th class="custom-size">Estado</th>
                <th class="custom-size">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in solicitudes" :key="item.retiro_id">
                <td>{{ item.movimiento_id }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.monto }}</td>
                <td>{{ item.token }}</td> 
                <td class="text-center">{{ new Date(item.fecha_solicitud).toLocaleDateString() }}</td>
                <td class ="text-center">
                  <span v-if="item.fecha_desembolso !== null">{{ new Date(item.fecha_desembolso).toLocaleDateString() }}</span>
                  <span v-else>Sin aprobación</span>
                </td>
                <td>
                  <span v-if="item.estado == 0 && item.descripcion =='Compra de tokens'" class="badge text-bg-warning">Pendiente</span>
                  <span v-if="item.estado == 1 && item.descripcion =='Compra de tokens'" class="badge text-bg-success">Aprobada</span>
                  <span v-if="item.estado == 0 && item.descripcion == 'Compra de tokens rechazada'" class="badge text-bg-danger">Rechazada</span>                  
                </td>
                <td v-if="item.estado == 0 && item.descripcion == 'Compra de tokens'">
                  <button class="btn btn-success btn-sm mx-1" @click="aprobadoTokens(item)">
                    <i class="fa fa-check"></i>
                  </button>
                  <button class="btn btn-danger btn-sm mx-1" @click="rechazadoTokens(item.movimiento_id)">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
                <td v-if="item.estado == 1 && item.descripcion == 'Compra de tokens'">
                  <!-- Botones específicos para el estado Aprobado -->
                </td>
                <td v-if="item.estado == 0 && item.descripcion == 'Compra de tokens rechazada'">
                  <button class="btn btn-warning btn-sm mx-1" @click="pendienteTokens(item.movimiento_id)">
                    <i class="fa fa-clock"></i>
                  </button>
                  <button class="btn bg-white text-danger color-danger border-danger btn-sm mx-1"
                    @click="eliminadoTokens(item.movimiento_id)">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- paginacion -->
        <div class="d-flex justify-content-center">
          <nav v-if="paginacion.total > 0" aria-label="Page navigation example">
            <!-- Los botones de paginación se mantienen, pero se asegura que pase el filtro -->
            <ul class="pagination">
              <li v-if="paginacion.previous == null" class="page-item disabled">
                <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
              </li>
              <li v-else class="page-item">
                <button @click="obtenerDatosTokens(paginacion.previous, search, currentNav)"
                  class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
              </li>
              <li v-for="page in paginacion.pages" :key="page" class="page-item"
                :class="paginacion.current === page ? 'active' : ''">
                <button @click="obtenerDatosTokens(page, search, currentNav)"
                  class="page-link bg-light mx-2 color-gray fw-bolder rounded-5 border border-3">
                  {{ page }}
                </button>
              </li>

              <li v-if="paginacion.next == null" class="page-item disabled">
                <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </li>
              <li v-else class="page-item">
                <button @click="obtenerDatosTokens(paginacion.next, search, currentNav)"
                  class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const solicitudes = ref([]);
const paginacion = ref({});

let BaseURL = import.meta.env.VITE_BASE_URL + "/solicitudes";
const currentNav = ref("General");
const totalSolicitudesTokens = ref(0);
const solicitudesPendientesTokens = ref(0);
const solicitudesAprobadosTokens = ref(0);
const solicitudesRechazadosTokens = ref(0);

onMounted(() => {
  obtenerDatosTokens();
  obtenerTotalesTokens();
});

const setActive = (estado) => {
  currentNav.value = estado; onMounted(() => {
    obtenerDatosTokens(); // Carga los datos iniciales de solicitudes
    obtenerTotalesTokens(); // Carga los totales iniciales
  });

  obtenerDatosTokens(1, "", estado);
};

const obtenerDatosTokens = async (page = 1, search = "", filtro = "") => {
  try {
    let url = `${BaseURL}/tokens?page=${page}&search=${search}`;
    if (filtro && filtro !== "General") {
      url += `&estado=${filtro}`;
    }

    const { data } = await axios.get(url);
    solicitudes.value = data.data;
    console.log(solicitudes.value);
    paginacion.value = data.pagination;

  } catch (error) {
    console.log(error);
  }
};
const obtenerTotalesTokens = async () => {
  try {
    const { data } = await axios.get(`${BaseURL}/totalesTokens`);
    console.log(data);
    totalSolicitudesTokens.value = data.total;
    solicitudesPendientesTokens.value = data.pendientes;
    solicitudesAprobadosTokens.value = data.aprobados;
    solicitudesRechazadosTokens.value = data.rechazados;
  } catch (error) {
    console.log("Error al obtener totales:", error);
  }
};
const aprobadoTokens = async (movimiento) => {

  try {
    await axios.put(BaseURL + "/aprobarTokens/" + movimiento.movimiento_id, movimiento);
    // Al aprobar, se vuelve a cargar la lista de pendientes
    await obtenerDatosTokens(1, "", "Pendiente");
    await obtenerTotalesTokens();    
  } catch (error) {
    console.log(error);
  }
};
const rechazadoTokens = async (movimiento_id) => {
  try {
    const { data } = await axios.patch(BaseURL + "/rechazarTokens/" + movimiento_id);
    // Al rechazar, se vuelve a cargar la lista de pendientes
    await obtenerDatosTokens(1, "", "Pendiente");
    await obtenerTotalesTokens();
  } catch (error) {
    console.log(error);
  }
};

const pendienteTokens = async (movimiento_id) => {
  try {
    const { data } = await axios.patch(BaseURL + "/pendienteTokens/" + movimiento_id);
    // Al poner en pendiente, se recarga la lista de rechazados
    obtenerDatosTokens(1, "", "Rechazado");
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
  color: var(--gray-color);
  text-transform: uppercase;
}

.custom-size {
  font-size: 0.9rem;
  font-weight: 630;
}

.content {
  height: 70vh;
  width: 100%;
}

.footer {
  height: 10vh;
}

main {
  height: 90vh;
}

td {
  font-size: 0.9rem;
}

.eye {
  cursor: pointer;
}

.btn:hover {
  background-color: rgba(136, 136, 136, 0.76) !important;
}

.table-container {
  max-height: 60vh;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.table {
  width: 100%;
}

.pagination {
  margin-top: 1rem;
}

.pagination .page-item {
  display: inline-block;
}

.pagination .page-item:nth-child(n + 4):nth-last-child(n + 4):not(.active) {
  display: none;
}

.pagination .page-item.active .page-link {
  background-color: #e0e4ff;
  color: #080808;
  font-weight: bold;
  border: 1.5px solid #b0b8ff;
  box-shadow: 0px 0px 6px rgb(3, 3, 3);
  transform: scale(1.05);
}

.active-button {
  font-weight: 500;
  border-bottom: 1px solid var(--gray-color);
  text-decoration: underline !important;
}

li {
  cursor: pointer !important;
}

label:hover {
  font-weight: 500;
}

.custom-abs-search {
  position: absolute;
  right: 0;
}
</style>
