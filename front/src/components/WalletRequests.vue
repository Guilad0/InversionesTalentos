<template>
    <main class="bg-light">
        <div class="content">
            <h4 class="d-block mb-2 text-center underline py-5"> Solicitudes de retiro </h4>
            <div class="table-responsive col-md-10 offset-md-1">
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
        </div>
        <nav v-if="paginacion.total > 0" aria-label="Page navigation example">
            <ul class="pagination">
                <li v-if="paginacion.previous == null" class="page-item disabled">
                    <button class="page-link">Previous</button>
                </li>
                <li v-else class="page-item">
                    <button @click="obtenerDatos(paginacion.previous)" class="page-link">Previous</button>
                </li>
                <li v-for="item in paginacion.pages" :key="item" class="page-item"
                    :class="paginacion.current == item ? 'active' : ''">
                    <button @click="obtenerDatos(item)" class="page-link">{{ item }}</button>
                </li>

                <li v-if="paginacion.next == null" class="page-item disabled">
                    <button class="page-link">Next</button>
                </li>
                <li v-else class="page-item ">
                    <button @click="obtenerDatos(paginacion.next)" class="page-link">Next</button>
                </li>
            </ul>
        </nav>
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

const obtenerDatos = async (param = 'p0') => {
    try {
        var url = BaseURL;
        const { data } = await axios.get(url);
        // const response = await axios.get(BaseURL);
        console.log(data);
        solicitudes.value = data.data;

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

.pagination .page-item {
    display: inline-block;
}
 
.pagination .page-item:nth-child(n+4):nth-last-child(n+4):not(.active) {
    display: none;
}
</style>
