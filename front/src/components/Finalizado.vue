<template>
    <main class="bg-light">
        <div class="content">
            <h4 class="d-block text-start mb-2 text-center title">Finalizado</h4>
            <div class="table-container">
                <table class="table overflow-x-scroll">
                    <thead>
                        <tr class="table-secondary">
                            <th class="td-custom align-middle custom-size text-start">
                                Cliente
                            </th>
                            <th class="td-custom custom-size text-start">Descripción</th>
                            <th class="td-custom align-middle custom-size">Monto</th>
                            <th class="td-custom align-middle custom-size">Fecha Inicio</th>
                            <th class="td-custom align-middle custom-size">Fecha Fin</th>
                            <th class="td-custom align-middle custom-size">Inversores</th>
                        </tr>
                    </thead>
                    <tbody v-if="solicitudesInversion.length">
                        <tr v-for="(solicitud, index) in solicitudesInversion" :key="solicitud.id">
                            <td class="text-start fw-bold">
                                {{ index + 1 }}. {{ solicitud.cliente.nombre }}
                                {{ solicitud.cliente.apellido }}
                            </td>
                            <td class="text-start">{{ solicitud.descripcion }}</td>
                            <td class="text-center align-middle fw-bold">
                                {{
                                    parseFloat(solicitud.monto).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })
                                }}
                            </td>
                            <td class="text-center">
                                {{ formatearFecha(solicitud.fecha_inicio_recaudacion) }}
                            </td>
                            <td class="text-center">
                                {{ formatearFecha(solicitud.fecha_fin_recaudacion) }}
                            </td>
                            <td class="text-center align-middle">
                                <button class="btn btn-primary btn-sm" @click="abrirModal(solicitud)"
                                    :disabled="!tieneInversores(solicitud.inversores)">
                                    Ver Inversores
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="6" class="text-center text-muted py-3">
                            No hay datos disponibles para mostrar.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <InversoresModalProceso v-if="mostrarModal" :cliente="clienteActual" :inversiones="inversionesModal"
                @cerrar="cerrarModal" />

            <div class="footer">
                <div class="d-flex justify-content-center">
                    <nav v-if="paginacion.total > 0" aria-label="Page navigation example">
                        <ul class="pagination">
                            <li v-if="!paginacion.previous" class="page-item disabled">
                                <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                                    <i class="fa-solid fa-arrow-left"></i>
                                </button>
                            </li>
                            <li v-else class="page-item">
                                <button @click="obtenerDatos(paginacion.previous)"
                                    class="page-link color-gray fw-bolder rounded-5 border border-3">
                                    <i class="fa-solid fa-arrow-left"></i>
                                </button>
                            </li>
                            <li v-for="page in paginacion.pages" :key="page" class="page-item"
                                :class="paginacion.current === page ? 'active' : ''">
                                <button @click="obtenerDatos(page)"
                                    class="page-link bg-light mx-2 color-gray fw-bolder rounded-5 border border-3">
                                    {{ page }}
                                </button>
                            </li>
                            <li v-if="!paginacion.next" class="page-item disabled">
                                <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </li>
                            <li v-else class="page-item">
                                <button @click="obtenerDatos(paginacion.next)"
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
import InversoresModalProceso from "./InversoresModalReport.vue";
import { getHeaderRequest } from "@/helpers/Authenticator";

const solicitudesInversion = ref([]);
const inversionesModal = ref([]);
const clienteActual = ref("");
const mostrarModal = ref(false);
const paginacion = ref({});
const BaseURL =
    import.meta.env.VITE_BASE_URL + "/reporteSolicitudesInversion/finalizado";
const header = getHeaderRequest();

onMounted(async () => {
    await obtenerDatos();
});

const obtenerDatos = async (page = 1) => {
    try {
        const { data } = await axios.get(`${BaseURL}?page=${page}`, header);
        console.log(data);
        solicitudesInversion.value = data.data.solicitudes_inversion;
        paginacion.value = data.data.paginacion;
    } catch (error) {
        console.error(error);
    }
};

const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES");
};
const tieneInversores = (inversores) => {
    return (
        Array.isArray(inversores) && inversores.length > 0 && inversores[0] !== null
    );
};

const abrirModal = (solicitud) => {
    clienteActual.value = `${solicitud.cliente.nombre} ${solicitud.cliente.apellido}`;
    inversionesModal.value = solicitud.inversores;
    mostrarModal.value = true;
};

const cerrarModal = () => {
    mostrarModal.value = false;
};
</script>

<style scoped>
.custom-size {
    font-size: 0.8rem;
    font-weight: 630;
}

.table-container {
    max-height: 60vh;
    overflow-y: auto;
    margin-bottom: 1rem;
}

.table {
    width: 100%;
}

.footer {
    margin-top: 1rem;
}

.pagination {
    margin-top: 1rem;
    z-index: 1;
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
</style>