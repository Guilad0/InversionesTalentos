<template>
    <div>
        <h3 class="underline container my-3">Solicitudes de retiro</h3>
        <div class="table-responsive container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre usuario - Rol</th>
                        <th scope="col">Monto Solicitud</th>
                        <th scope="col">Comision a aplicar %</th>
                        <th scope="col">Monto a recibir</th>
                        <th scope="col">Fecha de solicitud</th>
                        <th scope="col">Fecha de aprobacion</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sol in results" :key="sol">
                        <td scope="row">{{ sol.retiro_id }}</td>
                        <td scope="row">{{ sol.nombre }} - {{ sol.rol }} </td>
                        <td scope="row">{{ sol.monto_solicitud }}</td>
                        <td scope="row">{{ sol.comision_aplicar }}</td>
                        <td scope="row">{{ sol.monto_recibir }}</td>
                        <td scope="row">{{ sol.fecha_solicitud }}</td>
                        <td scope="row">{{ sol.fecha_aprobacion }}</td>
                        <td scope="row">{{ sol.estado }}</td>
                        <td scope="row" class="cursor" @click="aprobar( sol )"> + </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
    import useFetchData from '@/helpers/UseFetchData';
import {ref, onMounted} from 'vue';
import axios from 'axios'
    const baseUrl =ref('/solicitudes')
    const { results,getData } = useFetchData(ref(baseUrl));
    
    const aprobar = ( id )=>{
        console.log(id);
        
    }

</script>

<style scoped></style>
