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
      <h4 class="d-block mb-2 text-center title">Solicitudes de Retiro</h4>
      <div class="table-responsive col-md-10 offset-md-1">
        <div class="col-3 px-5 mb-3">
          <input name="search" type="text" v-model="search" class="form-control" placeholder="Buscar ..."
            @input="obtenerDatos(1, search)" />
        </div>
        <div class="table-container">
          <table class="table overflow-x-scroll">
            <thead>
              <tr class="table-secondary">
                <th class="custom-size">ID</th>
                <th class="custom-size">Nombre Usuario - Rol</th>
                <th class="custom-size">Monto Solicitud</th>
                <th class="custom-size">Comision a Aplicar %</th>
                <th class="custom-size">Monto a Recibir</th>
                <th class="custom-size">Fecha de Solicitud</th>
                <th class="custom-size">Fecha de Aprobacion</th>
                <th class="custom-size">Estado</th>
                <th class="custom-size">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in solicitudes" :key="item.retiro_id">
                <td>{{ item.retiro_id }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.monto_solicitud }}</td>
                <td>{{ item.comision_aplicar }}</td>
                <td>{{ item.monto_recibir }}</td>
                <td>{{ new Date(item.fecha_solicitud).toLocaleDateString() }}</td>
                <td>{{ new Date(item.fecha_aprobacion).toLocaleDateString() }}</td>
                <td>
                  <span v-if="item.estado == 'Pendiente'" class="badge text-bg-warning">{{
                    item.estado
                  }}</span>
                  <span v-if="item.estado == 'Aprobado'" class="badge text-bg-success">{{
                    item.estado
                  }}</span>
                  <span v-if="item.estado == 'Rechazado'" class="badge text-bg-danger">{{
                    item.estado
                  }}</span>
                  <span v-if="item.estado == 'Eliminado'" class="badge text-bg-danger">{{
                    item.estado
                  }}</span>
                </td>
                <td v-if="item.estado == 'Pendiente'">
                  <button class="btn btn-success btn-sm mx-1" @click="aprobado(item)">
                    <i class="fa fa-check"></i>
                  </button>
                  <button class="btn btn-danger btn-sm mx-1" @click="rechazado(item.retiro_id)">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
                <td v-if="item.estado == 'Aprobado'">
                  <!-- Botones específicos para el estado Aprobado -->
                </td>
                <td v-if="item.estado == 'Rechazado'">
                  <button class="btn btn-warning btn-sm mx-1" @click="pendiente(item.retiro_id)">
                    <i class="fa fa-clock"></i>
                  </button>
                  <button class="btn bg-white text-danger color-danger border-danger btn-sm mx-1"
                    @click="eliminado(item.retiro_id)">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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
                <button @click="obtenerDatos(paginacion.previous, search, currentNav)"
                  class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
              </li>
              <li v-for="page in paginacion.pages" :key="page" class="page-item"
                :class="paginacion.current === page ? 'active' : ''">
                <button @click="obtenerDatos(page, search, currentNav)"
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
                <button @click="obtenerDatos(paginacion.next, search, currentNav)"
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
let BaseURL = "https://apitalentos.pruebasdeploy.online/solicitudes";
const currentNav = ref("General");

onMounted(() => {
  obtenerDatos();
});

const setActive = (estado) => {
  currentNav.value = estado;
  obtenerDatos(1, "", estado);
};

const obtenerDatos = async (page = 1, search = "", filtro = "") => {
  try {
    let url = `${BaseURL}?page=${page}&search=${search}`;
    if (filtro && filtro !== "General") {
      url += `&estado=${filtro}`;
    }

    const { data } = await axios.get(url);
    solicitudes.value = data.data;
    paginacion.value = data.pagination;
  } catch (error) {
    console.log(error);
  }
};

const aprobado = async (retiro) => {

  try {
    await axios.put(BaseURL + "/aprobar/" + retiro.retiro_id, retiro);
    // Al aprobar, se vuelve a cargar la lista de pendientes
    obtenerDatos(1, "", "Pendiente");
  } catch (error) {
    console.log(error);
  }
};

const rechazado = async (retiro_id) => {
  try {
    const { data } = await axios.patch(BaseURL + "/rechazar/" + retiro_id);
    // Al rechazar, se vuelve a cargar la lista de pendientes
    obtenerDatos(1, "", "Pendiente");
  } catch (error) {
    console.log(error);
  }
};

const pendiente = async (retiro_id) => {
  try {
    const { data } = await axios.patch(BaseURL + "/pendiente/" + retiro_id);
    // Al poner en pendiente, se recarga la lista de rechazados
    obtenerDatos(1, "", "Rechazado");
  } catch (error) {
    console.log(error);
  }
};

const eliminado = async (retiro_id) => {
  try {
    const { data } = await axios.patch(BaseURL + "/" + retiro_id);
    // Al eliminar, recargar la lista de pendientes
    obtenerDatos(1, "", "Pendiente");
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
</style>
