<script setup>
import useFetchData from '../helpers/UseFetchData';
import Pagination from '../components/Pagination.vue'
import { ref, onMounted } from 'vue'
import { notyf } from '@/helpers/NotifyAlerts';
import axios from 'axios';
import ModalUsers from '../components/ModalInforUser.vue'
import ModalCreateUserAdmin from './ModalCreateUserAdmin.vue';
const user = JSON.parse(localStorage.getItem("usuario"));
const page = ref(1);
const search = ref('')
const baseUrl = ref(`/users?rol=${user.rol}&page=${page.value}`);
const { results, prev, next, isLoading, getData, ChangeState } = useFetchData(ref(baseUrl));
const nextAction = () => {
    page.value += 1;
    baseUrl.value = `/users?rol=${user.rol}&page=${page.value}`;
    getData();
}
const prevAction = () => {
    page.value -= 1;
    baseUrl.value = `/users?rol=${user.rol}&page=${page.value}`;
    getData();
}
onMounted(() => {
    getData();

});

const clearSearch = () => {
    search.value = '';
    page.value = 1;
    baseUrl.value = `/users?rol=${user.rol}&page=${page.value}`;
    getData();
}

const handleName = () => {
    if (search.value.trim() !== '') {
        baseUrl.value = `/users/filterUsersByName/${search.value}?rol=${user.rol}&page=${page.value}`;

    }
    if (search.value.trim() == '') {
        page.value = 1;
        baseUrl.value = `/users?rol=${user.rol}&page=${page.value}`;
        getData();
    }

}

const deleteUSer = (id, estado) => {
    baseUrl.value = `/users/Stateinvestors/` + id + `/?rol=${user.rol}`;
    ChangeState()
    baseUrl.value = `/users/?rol=${user.rol}&page=${page.value}`;
    console.log(estado);
    if (estado == '1') {
        notyf.error("Usuario inactivo");
    } else {
        notyf.success("Usuario activo");
    }

}

const handleAproved =async (id, name, event)=>{
    if (confirm("¿Quieres aprobar al usuario " + name+" ?")) {
        try {
           await axios.patch(`http://localhost:3000/users/approved/${id}?rol=${user.rol}`);
            
        } catch (err) {
            console.log(err);
        }
      } 
      else{
        event.target.checked = !event.target.checked;
      }
}
const userSelecionated = ref({})

const selecionatedUser = ( user )=>{
    userSelecionated.value = user;
}

</script>
<template>
    <main class="bg-light">
        <div class="content ">
            <h4 class="d-block text-start mb-2 text-center underline"> Todos los usuarios </h4>
            <div class="d-flex justify-content-between px-5 mt-2 mb-3">
                <div class="col-2 position-relative">
                    <input name="search" type="text" v-model="search" class="form-control" placeholder="Buscar ..."
                        @input="handleName">
                    <div v-if="search !== ''" class="custom-absolute" >
                        <img class="cursor" src="../assets/svg/close.svg" alt="Descripción del SVG" width="25"
                            @click="clearSearch">
                    </div>
                </div>
                <div class="col-8 ">
                </div>
                <div class="col-2 text-end">
                    <button class="btn bg-gray rounded-3 btn-sm text-white" data-bs-toggle="modal" data-bs-target="#modalRegisterUser">
                        +<img src="../assets/svg/user-white.svg" width="25" class="img">
                    </button>
                </div>
            </div>
            <div class="table-responsive shadow">
                <table class="table overflow-x-scroll">
                    <thead>
                        <tr class="table-secondary">
                            <th class="custom-size">Nombre</th>
                            <th class="custom-size">Apellido</th>
                            <th class="custom-size">Correo</th>
                            <th class="custom-size">Categoria</th>
                            <th class="custom-size">Pais de residencia</th>
                            <th class="custom-size">Edad</th>
                            <th class="custom-size text-center">Ver inf.</th>
                            <th class="custom-size">Rol</th>
                            <th class="custom-size">Aprobado</th>
                            <th class="custom-size">Estado</th>
                            <th class="custom-size ">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in results" :key="user.usuario_id">
                            <td>{{ user.nombre }}</td>
                            <td>{{ user.apellido }}</td>
                            <td>
                                <div class="d-flex">
                                    <div class="col-1">
                                        <img v-if="user.verificado == 0" src="../assets/svg/cancel.svg" width="20"> 
                                        <img v-if="user.verificado == 1" src="../assets/svg/confirm.svg" width="20"> 
                                    </div>

                                <div class="col-10 ms-1">
                                    {{ user.correo }}
                                </div>
                                </div>
                            </td>
                            <td>{{ user.categoria }}</td>
                            <td>{{ user.pais_residencia }}</td>
                            <td>{{ user.edad }}</td>
                            <td class="text-center eye" data-bs-toggle="modal" data-bs-target="#modalUser" @click="selecionatedUser(user)">
                                <img  src="../assets/svg/eye.svg" width="18">
                            </td>
                            <td>
                                {{ user.rol }}
                            </td>
                            <td>
                                <div class="form-check form-switch">
                                    <div class="form-check form-switch ">
                                       <input
                                         class="form-check-input"
                                         type="checkbox"
                                         role="switch"
                                         id="aproved"
                                         :checked="user.aprobado === 1"
                                         @change="handleAproved(user.usuario_id, user.nombre, $event)"
                                         />
                                    
                                    </div>
                                </div>
                            </td>
                            <td v-if="user.estado == '1'" >
                                <span class="badge text-bg-success cursor"  @mouseover="toggleStatus" 
                                @mouseout="toggleStatus">Activo</span>
                            </td>
                            <td v-if="user.estado == '0'"  >
                                <span class="badge text-bg-danger cursor">No activo</span>
                            </td>
                            <td v-if="user.estado == '1'" >
                                <div class="cursor" @click="deleteUSer(user.usuario_id, user.estado)">
                                    <img src="../assets/svg/delete.svg" width="25">
                                </div>

                            </td>
                            <td v-if="user.estado == '0'">
                                <div class="cursor" @click="deleteUSer(user.usuario_id, user.estado)">
                                    <img src="../assets/svg/user-plus.svg" width="25">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <ModalUsers :userSelecionated="userSelecionated"/>
        <ModalCreateUserAdmin />
        <div class="footer">
            <Pagination :page="page" :prev="prev" :next="next" :isLoading="isLoading" @nextAction="nextAction"
                @prevAction="prevAction" />
        </div>
    </main>
</template>
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
</style>
