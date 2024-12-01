<template>
    <main class="bg-light pt-4 ps-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li :class="{ 'active-button': currentNav === 'General' }" @click="setActive('General')"
                        class="nav-link mx-2">
                        <label>General</label>
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

            <!-- Botón para abrir el modal -->
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#clienteModal">
                Estadísticas
            </button>
        </div>
        <div class="content">
            <h4 class="d-block mb-2 text-center title">Comentarios y Reseñas</h4>

            <div class="table-responsive col-md-10 offset-md-1">
                <div class="d-flex justify-content-start gap-3 position-relative my-4">
                    <div class="card text-bg-secondary mb-3 rounded-5" style="max-width: 18rem"
                        @click="obtenerDatos(1, '', 'General')">
                        <div class="card-header">
                            <i class="fa-solid fa-comments"></i> <strong>Total</strong> {{ totalComentarios }} &nbsp;
                        </div>
                    </div>
                    <div class="card text-bg-success mb-3 rounded-5" style="max-width: 18rem"
                        @click="obtenerDatos(1, '', 'Aprobado')">
                        <div class="card-header text-white">
                            <i class="fa-solid fa-comments"></i><strong> Aprobados</strong> {{ comentariosActivos }}
                            &nbsp;
                        </div>
                    </div>
                    <div class="card text-bg-danger mb-3 rounded-5" style="max-width: 18rem"
                        @click="obtenerDatos(1, '', 'Rechazado')">
                        <div class="card-header text-white">
                            <i class="fa-solid fa-comments"></i> <strong> Rechazados</strong> {{ comentariosInactivos }}
                            &nbsp;
                        </div>
                    </div>
                    <div class="custom-abs-search">
                        <div class="position-relative">
                            <input name="search" type="text" v-model="search"
                                class="form-control border-1 border-secondary border-primary rounded-5 float"
                                placeholder="Buscar ..." @input="obtenerDatos(1, search)" />
                        </div>
                    </div>
                </div>
                <div class="table-container">
                    <table class="table overflow-x-scroll">
                        <thead>
                            <tr class="table-secondary">
                                <th class="custom-size td-custom">ID</th>
                                <th class="custom-size td-custom">Cliente</th>
                                <th class="custom-size td-custom">Inversor</th>
                                <th class="custom-size td-custom">Comentario</th>
                                <th class="custom-size td-custom">Calificación</th>
                                <th class="custom-size td-custom">Fecha de Creación</th>
                                <th class="custom-size td-custom">Estado</th>
                                <th class="custom-size td-custom">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in comentarios" :key="item.id_comentarios">
                                <td>{{ item.id_comentarios }}</td>
                                <td>{{ item.cliente_nombre }} {{ item.cliente_apellido }}</td>
                                <td>{{ item.inversor_nombre }} {{ item.inversor_apellido }}</td>
                                <td>{{ item.comentario }}</td>
                                <td>{{ item.calificacion }}</td>
                                <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
                                <td>
                                    <span v-if="item.estado == 'Aprobado'" class="badge text-bg-success">{{
                                        item.estado
                                    }}</span>
                                    <span v-if="item.estado == 'Rechazado'" class="badge text-bg-danger">{{
                                        item.estado
                                    }}</span>
                                </td>
                                <td v-if="item.estado == 'Aprobado'">
                                    <button class="btn btn-danger btn-sm mx-1" @click="rechazado(item.id_comentarios)">
                                        <i class="fa fa-times"></i>
                                    </button>
                                </td>
                                <td v-if="item.estado == 'Rechazado'">
                                    <button class="btn btn-success btn-sm mx-1" @click="aprobado(item.id_comentarios)">
                                        <i class="fa fa-check"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-center">
                    <nav v-if="paginacion && paginacion.total > 0" aria-label="Page navigation example">
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
            <!-- Modal para buscar cliente y mostrar resultados -->
            <div class="modal fade" id="clienteModal" tabindex="-1" aria-labelledby="clienteModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg">

                    <div class="modal-content modal-custom ">

                        <div class="modal-header modal-header-custom">
                            <h5 class="modal-title" id="clienteModalLabel">Buscar Cliente</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                @click="cerrarModal"></button>
                        </div>
                        <div class="modal-body modal-body-custom">

                            <input type="text" v-model="searchCliente" class="form-control mb-3"
                                placeholder="Buscar cliente por nombre o apellido" @input="buscarCliente" />

                            <div v-if="clientes.length">
                                <ul class="list-group mb-3">
                                    <li v-for="cliente in clientes" :key="cliente.usuario_id"
                                        class="list-group-item d-flex justify-content-between align-items-center modal-item-custom"
                                        @click="seleccionarCliente(cliente)">
                                        {{ cliente.nombre }} {{ cliente.apellido }}
                                        <button class="btn btn-sm btn-secondary">Seleccionar</button>
                                    </li>
                                </ul>
                            </div>
                            <p v-else>No se encontraron resultados.</p>

                            <div v-if="clienteSeleccionado">
                                <h5>Estadísticas de {{ clienteSeleccionado.nombre }} {{ clienteSeleccionado.apellido }}
                                </h5>
                                <p>Comentarios Aprobados: {{ estadisticas.totalAprobados }}</p>
                                <p>Calificación Promedio: {{ estadisticas.promedioCalificaciones.toFixed(2) }} / 5</p>
                                <div class="d-flex justify-content-center align-items-center">
                                    <span v-for="n in 5" :key="n" class="star">
                                        <i v-if="n <= Math.floor(estadisticas.promedioCalificaciones)"
                                            class="fa fa-star text-warning"></i>
                                        <i v-else-if="n - 1 < estadisticas.promedioCalificaciones && estadisticas.promedioCalificaciones < n"
                                            class="fa fa-star-half-alt text-warning"></i>
                                        <i v-else class="fa fa-star-o text-muted"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer modal-footer-custom">
                            <button type="button" class="btn btn-secondary btn-cerrar2" data-bs-dismiss="modal"
                                @click="cerrarModal">Cerrar</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const search = ref("");
const searchCliente = ref("");
const clientes = ref([]);
const clienteSeleccionado = ref(null);
const estadisticas = ref({ totalAprobados: 0, promedioCalificaciones: 0 });
const totalComentarios = ref(0);
const comentariosActivos = ref(0);
const comentariosInactivos = ref(0);

const comentarios = ref([]);
const paginacion = ref({});
// let BaseURL = "https://apitalentos.pruebasdeploy.online/comentarios/";
let BaseURL = import.meta.env.VITE_BASE_URL + "/comentarios/";
const currentNav = ref("General");

onMounted(() => {
    obtenerDatos();
});


function cerrarModal() {
    searchCliente.value = "";
    clienteSeleccionado.value = null;
    estadisticas.value = { totalAprobados: 0, promedioCalificaciones: 0 };
}
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

        comentarios.value = data.data || [];
        paginacion.value = data.pagination || {};

        totalComentarios.value = comentarios.value.length;
        comentariosActivos.value = comentarios.value.filter((c) => c.estado === "Aprobado").length;
        comentariosInactivos.value = comentarios.value.filter((c) => c.estado === "Rechazado").length;
    } catch (error) {
        console.log("Error en la solicitud GET:", error);
        paginacion.value = {};
    }
};

const aprobado = async (id_comentarios) => {
    try {
        await axios.patch(`${BaseURL}aprobar/${id_comentarios}`);
        // Mantener el estado de la paginación y filtro
        obtenerDatos(paginacion.value.current, search.value, currentNav.value);
    } catch (error) {
        console.log(error);
    }
};

const rechazado = async (id_comentarios) => {
    try {
        await axios.patch(`${BaseURL}rechazar/${id_comentarios}`);
        // Mantener el estado de la paginación y filtro
        obtenerDatos(paginacion.value.current, search.value, currentNav.value);
    } catch (error) {
        console.log(error);
    }
};


// const pendiente = async (retiro_id) => {
//     try {
//         const { data } = await axios.patch(BaseURL + "/pendiente/" + retiro_id);
//         // Al poner en pendiente, se recarga la lista de rechazados
//         obtenerDatos(1, "", "Rechazado");
//     } catch (error) {
//         console.log(error);
//     }
// };

// const eliminado = async (retiro_id) => {
//     try {
//         const { data } = await axios.patch(BaseURL + "/" + retiro_id);
//         // Al eliminar, recargar la lista de pendientes
//         obtenerDatos(1, "", "Pendiente");
//     } catch (error) {
//         console.log(error);
//     }
// };

const buscarCliente = async () => {
    if (searchCliente.value.length > 2) {
        try {
            const response = await axios.get(
                // `https://apitalentos.pruebasdeploy.online/comentarios/clientes?search=${searchCliente.value}`
                import.meta.env.VITE_BASE_URL + `/comentarios/clientes?search=${searchCliente.value}`
            );
            clientes.value = response.data;
        } catch (error) {
            console.error("Error al buscar clientes:", error);
        }
    }
};

const seleccionarCliente = async (cliente) => {
    clienteSeleccionado.value = cliente;
    try {
        const response = await axios.get(
            // `https://apitalentos.pruebasdeploy.online/comentarios/estadisticas/${cliente.usuario_id}`
            import.meta.env.VITE_BASE_URL + `/comentarios/estadisticas/${cliente.usuario_id}`
        );
        estadisticas.value = response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas del cliente:", error);
    }
};



</script>

<style scoped>
.form-control:focus {
    background-color: var(--white-color);
    border: 2px solid #f37926;
    outline: none;
    box-shadow: none;
    color: black;
  }

.btn-cerrar2 {
    margin: 0 auto;
}
.title {
    font-family: var(--font-montserrat-bold);
    font-weight: 700;
    font-size: 30px;
    color: var(--gray-color);
    text-transform: uppercase;
}

.background {
    background-image: url('@/assets/images/otro-fondo5.png');
    background-size: 100% auto;
    background-position: center 10%;
    background-repeat: no-repeat;
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
    border: none;
    background-color: var(--yellow-orange) !important;
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

.btn-primary {
    border: none;
    background-color: var(--gray-color);
    border: 1px solid var(--yellow-orange);
    margin-right: 2rem;
}

.btn-secondary {
    border: 1px solid var(--yellow-orange);
    background-color: var(--gray-color);

}

.modal-custom {
    border: none;
    padding: 30px;
    width: 500px;
    z-index: 2;
    margin: auto;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)
}

.modal-content {
    background-color: transparent !important;
    /* Hacerlo transparente */
    box-shadow: none;
    /* Quitar sombras si no las quieres */
    border: none;
    /* Quitar bordes */
}

.modal-backdrop {
    background-color: #17223bef !important;
    /* Cambiar la opacidad o color */
}

.modal-header-custom {
    background-color: var(--dun2-color);
    border-bottom: none
}

.modal-title {
    font-family: var(--font-montserrat-bold);
    /* Variante bold */
    font-weight: 700;
    /* Asegura que sea bold */
    font-size: 24px;
    /* Tamaño predefinido */
    color: var(--gray-color);
    text-transform: uppercase;
}

.modal-body-custom {
    background-color: var(--blue-transparent);
    color: var(--white-color);
}

.modal-item-custom {
    background-color: var(--dark-anti-flash-color);
    color: var(--white-color);
    border: 1px solid var(--yellow-orange);
}

.modal-footer-custom {
    background-color: var(--gray-color);
    border-top: 1px solid var( --white-color);
}

.star {
    font-size: 1.5rem;
    margin: 0 0.1rem;
}

.custom-abs-search {
    position: absolute;
    right: 0;
}
</style>
