<script setup>
import useFetchData from '../helpers/UseFetchData';
import Pagination from '../components/Pagination.vue'
import { ref, onMounted } from 'vue'
import { notyf } from '@/helpers/NotifyAlerts';
import axios from 'axios';
import ModalInforUser from '../components/ModalInforUser.vue'
import ModalCreateUserAdmin from './ModalCreateUserAdmin.vue';
const user = JSON.parse(localStorage.getItem("usuario"));
const page = ref(1);
const search = ref('')
const baseUrl = ref(`/users?rol=${user.rol}&page=${page.value}`);
const { results, prev, next, isLoading, getData, ChangeState, total } = useFetchData(ref(baseUrl));
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
const  myRol = ref('')

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
        }finally{
            baseUrl.value = `/users?rol=${user.rol}&page=${page.value}`
            getData();
        }
      } 
      else{
        event.target.checked = !event.target.checked;
      }
}
const id = ref(-1)
const typeForm = ref('')

const selecionatedUser = ( idUser, typeModel,rol )=>{
    id.value = idUser;
    typeForm.value = typeModel;
    myRol.value = rol;
    
}



const clearId = ()=>{
    id.value = -1;
    typeForm.value = '';
}

</script>
<template>
    <main class="bg-light">
        
        <div class="content ">
            <h4 class="d-block text-start mb-2 text-center underline"> Todos los usuarios </h4>
            <div class="d-flex justify-content-between px-5 mt-2 mb-3">
                <div class="col-2 position-relative">
                    <input name="search" type="text" v-model="search" class="form-control border-1 border-secondary" placeholder="Buscar ..."
                        @input="handleName">
                    <div v-if="search !== ''" class="custom-absolute" >
                        <img class="cursor" src="../assets/svg/close.svg" alt="Descripción del SVG" width="25"
                            @click="clearSearch">
                    </div>
                </div>
                <div class="col-8 ">
                </div>
                <div class="col-2 text-end">
                    <button class="btn bg-gray rounded-3 btn-sm text-white" data-bs-toggle="modal" data-bs-target="#modalRegisterUser" >
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
                            <th class="custom-size">Imagen</th>
                            <th class="custom-size">Logros</th>
                            <th class="custom-size">Experiencia</th>
                            <th class="custom-size text-center">informacion</th>
                            <th class="custom-size text-center">Video</th>
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
                            <td class="text-secondary text-center">
                                <i v-if="user.rol !=='Admin' ||user.rol =='Inversionista' " class="fas fa-image "></i>
                                <i v-else class="fa-solid fa-xmark text-danger"></i>
                            </td>
                            <td class="text-center "  >
                                <i
                                  v-if="user.rol == 'Cliente'"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalUser"
                                  class="fa fa-eye text-secondary cursor"
                                  aria-hidden="true"
                                  @click="selecionatedUser(user.usuario_id,'logros',user.rol)"></i>
                                <i v-else  class="fa-solid fa-xmark text-danger"></i>
                                
                            </td>
                            <td class="text-center " >
                                <i
                                  v-if="user.rol == 'Cliente'"
                                 data-bs-toggle="modal" 
                                 data-bs-target="#modalUser" 
                                 @click="selecionatedUser(user.usuario_id,'experiencia',user.rol)"
                                  class="fa fa-eye text-secondary cursor"
                                  aria-hidden="true"
                                 ></i>
                                <i v-else  class="fa-solid fa-xmark text-danger"></i>
                                
                            </td>
                            <td class="text-center" >
                                <i
                                  v-if="user.rol == 'Cliente' || user.rol == 'Inversionista'"
                                 data-bs-toggle="modal"
                                  data-bs-target="#modalUser" 
                                  @click="selecionatedUser(user.usuario_id,'informacion',user.rol)"
                                  class="fa fa-eye text-secondary cursor"
                                  aria-hidden="true"
                                 ></i>
                                <i v-else  class="fa-solid fa-xmark text-danger"></i>
                            </td>
                            <td v-if="user.rol == 'Cliente'" class="text-center eye text-secondary" data-bs-toggle="modal" data-bs-target="#modalUser" @click="selecionatedUser(user)">
                                <i v-if="user.video == null" class="fa-solid fa-video-slash"></i>
                                <i v-else class="fa-solid fa-video"></i>
                            </td>
                
                           
                            <td v-if="user.rol == 'Inversionista' || user.rol == 'Admin' || user.rol == 'Null'" class="text-center text-danger">
                                <i class="fa-solid fa-xmark"></i>
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
        <ModalInforUser :id="id" :typeForm="typeForm" @clearId="clearId" :myRol="myRol"/>
        <ModalCreateUserAdmin />
        <div class="footer">
            <Pagination :page="page" :prev="prev" :next="next" :isLoading="isLoading" @nextAction="nextAction"
                @prevAction="prevAction" :total="total" />
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
