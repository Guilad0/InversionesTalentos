<template>
    <main class="bg-light pt-4 ps-4">
        <div class="d-flex pt-4">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li :class="{ 'active px-2': currentNav === 'general' }" @click="setActive('general')"
                        class="nav-link mx-2">
                        <label>General </label>
                    </li>
                    <li :class="{ 'active px-2': currentNav === 'inversiones' }" @click="setActive('inversiones')"
                        class="nav-link mx-2">
                        <label>Reversion </label>
                    </li>
                </ol>
            </nav>
        </div>

        <div class="d-flex">
            <div class="container" v-if="currentNav == 'general'">
                <Gral />
            </div>
            <div class="container" v-if="currentNav == 'inversiones'">
                <div class="d-flex justify-content-between">
                    <div class="mb-3 col-md-2 pt-5">
                        <select class="form-select custom-select" v-model="estadoSeleccionado"
                            aria-label="Seleccionar estado">
                            <option value="pendiente">Periodo de recaudacion</option>
                            <option value="proceso">Periodo de devolucion</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="reversion">Reversión</option>
                        </select>
                    </div>
                    <span class="title text-center pt-0">Reportes</span>
                    <div class="custom-abs-rigth d-flex justify-content-end align-items-center pt-4">
                        <button
                          class="animate__animated animate__fadeInUp animate__slow btn-danger m-2 btn btn-sm text-white"
                          @click="exportToPDF()"
                        >
                          <strong>PDF</strong>
                        </button>
                        <button
                          class="animate__animated animate__fadeInUp animate__slow btn-success text-white m-2 btn btn-sm"
                          @click="exportToExcel()"
                        >
                          <strong>Excel</strong>
                        </button>
                    </div>
                </div>

                <component :is="componenteActual" 
                    @updatePagination="obtenerPaginacion"
                    ></component>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, computed } from "vue";
import Gral from "./DashboardReportes.vue";
import Reversion from "./Reversion.vue";
import Pendiente from "./Pendiente.vue";
import Proceso from "./Proceso.vue";
import Finalizado from "./Finalizado.vue";
import jsPDF from "jspdf";
import axios from "axios";
import { getHeaderRequest } from "@/helpers/Authenticator";
import * as XLSX from "xlsx";

const rol = ref("");
const currentNav = ref("general");
const estadoSeleccionado = ref("pendiente");
const header = getHeaderRequest();
const BaseURL =
    import.meta.env.VITE_BASE_URL + "/reporteSolicitudesInversion/";

const componenteActual = computed(() => {
    switch (estadoSeleccionado.value) {
        case "pendiente":
            getStatusInvestment(estadoSeleccionado.value);
            return Pendiente;
        case "proceso":
            getStatusInvestment(estadoSeleccionado.value);
            return Proceso;
        case "finalizado":
            getStatusInvestment(estadoSeleccionado.value);
            return Finalizado;
        case "reversion":
           getStatusInvestment(estadoSeleccionado.value);
            return Reversion;
        default:
            return Pendiente;
    }
});

const dataExports = ref('');
const titleExportDoc = ref('')
const page = ref(null);
// const { data } = await axios.get(`${BaseURL}?page=${page}`, header);
const getStatusInvestment = async (status) => { 
    try { 
        const response = await axios.get(`${BaseURL+status}?page=${page.value}`, header);
        console.log(response.data);  
        dataExports.value = response.data.data.solicitudes_inversion;
        titleExportDoc.value = status
    } catch(e) { 
        console.log(e); 
    }
}

const obtenerPaginacion = (dataPage) => { 
    page.value = dataPage; 
    console.log(page.value);
}

const setActive = (nav) => {
    currentNav.value = nav;
    rol.value = nav;
};

const exportToPDF = () => {
    const doc = new jsPDF();
    const columns =   Object.keys(dataExports.value[0]).map(key => ({
        header: key.replace(/_/g, " "), 
        dataKey: key,
    }));
    const rows = dataExports.value.map(item => {
        const row = {};
        columns.forEach(header => {
        row[header.dataKey] = formatValue(item[header.dataKey]);
        });
        return row;
    });
    doc.autoTable({
        columns: columns,
        body: rows,
        startY: 20,
        theme: "grid",
        styles: {
        overflow: "linebreak",
        cellPadding: 1,
        fontSize: 6,
        },
    });

    doc.text(titleExportDoc.value, doc.internal.pageSize.width / 2, 10, {
        align: "center",
    });
    doc.save(`${titleExportDoc.value}.pdf`);
}

const exportToExcel = () => {
    const headers = Object.keys(dataExports.value[0]);

    const formattedData = dataExports.value.map(item => {
        const row = {};
        headers.forEach(key => {
         row[key] = formatValue(item[key]);
        });
        return row;
    });
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inversiones");
    XLSX.writeFile(workbook, "reporte_inversiones.xlsx");
};

const formatValue = (value) => {
    if (typeof value === "string" && !isNaN(Date.parse(value))) {
      const date = new Date(value);
      return date.toLocaleDateString("en-CA");
    }
    return value;
};

</script>

<style scoped>
main {
    height: 100%;
}

li {
    cursor: pointer !important;
}

label:hover {
    font-weight: 500;
}

.active {
    font-weight: 500;
    border-bottom: 1px solid var(--gray-color);
    text-decoration: underline !important;
}

.custom-select {
    font-size: 0.85rem;
    padding: 0.4rem 0.75rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background-color: #fff;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
}

.custom-select:focus {
    border-color: #e0e4ff;
    box-shadow: 0 0 0 0.1rem rgba(224, 228, 255, 0.25);
    outline: 0;
}

.custom-select option {
    font-size: 0.85rem;
    padding: 8px;
}
</style>