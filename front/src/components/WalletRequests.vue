<template>
    <main class="bg-light">
        <div class="content">
            <h4 class="d-block mb-2 text-center underline py-5"> Solicitudes de retiro </h4>
            <div class="table-responsive col-md-10 offset-md-1">
                <div class="col-3 px-5 mb-3">
                    <input name="search" type="text" v-model="search" class="form-control" placeholder="Buscar ..."
                        @input="obtenerDatos(1, search)">
                </div>
                <div class="table-container">
                    <table class="table overflow-x-scroll">
                        <thead>
                            <tr class="table-secondary">
                                <th class="custom-size">ID</th>
                                <th class="custom-size">Nombre usuario - Rol</th>
                                <th class="custom-size">Monto Solicitud</th>
                                <th class="custom-size">Comision a aplicar %</th>
                                <th class="custom-size">Monto a recibir</th>
                                <th class="custom-size">Fecha de solicitud</th>
                                <th class="custom-size">Fecha de aprobacion</th>
                                <th class="custom-size">Estado</th>
                                <th class="custom-size">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in solicitudes" :key="item.retiro_id">
                                <td>{{ item.retiro_id }}</td>
                                <td>{{ item.username }} </td>
                                <td>{{ item.monto_solicitud }}</td>
                                <td>{{ item.comision_aplicar }}</td>
                                <td>{{ item.monto_recibir }}</td>
                                <td>{{ new Date(item.fecha_solicitud).toLocaleDateString() }}</td>
                                <td>{{ new Date(item.fecha_aprobacion).toLocaleDateString() }}</td>
                                <td>
                                    <span v-if="item.estado == 'Pendiente'" class="badge text-bg-warning">{{ item.estado
                                        }}</span>
                                    <span v-if="item.estado == 'Aprobado'" class="badge text-bg-success">{{ item.estado
                                        }}</span>
                                    <span v-if="item.estado == 'Eliminado'" class="badge text-bg-danger">{{ item.estado
                                        }}</span>
                                </td>
                                <td v-if="item.estado == 'Pendiente'">
                                    <button class="btn btn-success btn-sm" @click="aprobado(item.retiro_id)"><i
                                            class="fa fa-check"></i></button>
                                    <button class="btn btn-danger btn-sm" @click="rechazado(item.retiro_id)"><i
                                            class="fa fa-times"></i></button>
                                </td>
                                <td v-if="item.estado == 'Aprobado'">
                                    <button class="btn btn-warning btn-sm" @click="pendiente(item.retiro_id)"><i
                                            class="fa fa-clock"></i></button>
                                </td>
                                <td v-if="item.estado == 'Eliminado'">
                                    <button class="btn btn-warning btn-sm" @click="pendiente(item.retiro_id)"><i
                                            class="fa fa-clock"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="d-flex justify-content-center">
                    <nav v-if="paginacion.total > 0" aria-label="Page navigation example">
                        <ul class="pagination">
                            <li v-if="paginacion.previous == null" class="page-item disabled">
                                <button class="page-link color-gray fw-bolder rounded-5 border border-3"><i
                                        class="fa-solid fa-arrow-left"></i></button>
                            </li>
                            <li v-else class="page-item">
                                <button @click="obtenerDatos(paginacion.previous)"
                                    class="page-link color-gray fw-bolder rounded-5 border border-3"><i
                                        class="fa-solid fa-arrow-left"></i></button>
                            </li>
                            <li v-for="page in paginacion.pages" :key="page" class="page-item"
                                :class="paginacion.current === page ? 'active' : ''">
                                <button @click="obtenerDatos(page)"
                                    class="page-link bg-light mx-2 color-gray fw-bolder rounded-5 border border-3">{{
                                    page
                                    }}</button>
                            </li>

                            <li v-if="paginacion.next == null" class="page-item disabled">
                                <button class="page-link color-gray fw-bolder rounded-5 border border-3"><i
                                        class="fa-solid fa-arrow-right"></i></button>
                            </li>
                            <li v-else class="page-item ">
                                <button @click="obtenerDatos(paginacion.next)"
                                    class="page-link color-gray fw-bolder rounded-5 border border-3"><i
                                        class="fa-solid fa-arrow-right"></i></button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';

const solicitudes = ref([]);
const paginacion = ref({});
let BaseURL = 'http://localhost:3000/solicitudes';


onMounted(() => {
    obtenerDatos();
});

const obtenerDatos = async (page = 1, search = '') => {
    try {
        var url = `${BaseURL}?page=${page}&search=${search}`;
        const { data } = await axios.get(url);
        solicitudes.value = data.data;
        paginacion.value = data.pagination;
    } catch (error) {
        console.log(error);
    }
};


const aprobado = async (retiro_id) => {

    try {
        const { data } = await axios.patch(BaseURL + '/aprobar/' + retiro_id);
        obtenerDatos();


    } catch (error) {
        console.log(error);
    }
}

const rechazado = async (retiro_id) => {

    try {
        const { data } = await axios.patch(BaseURL + '/' + retiro_id);
        obtenerDatos();


    } catch (error) {
        console.log(error);
    }
}

const pendiente = async (retiro_id) => {

    try {
        const { data } = await axios.patch(BaseURL + '/pendiente/' + retiro_id);
        obtenerDatos();


    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
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
    /* Separación superior para los botones */
}

.pagination .page-item {
    display: inline-block;
}

.pagination .page-item:nth-child(n+4):nth-last-child(n+4):not(.active) {
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
</style>
