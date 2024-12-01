<script setup>
import useFetchData from '../helpers/UseFetchData';
import Pagination from '../components/Pagination.vue'
import { ref, onMounted, watch } from 'vue'
import { notyf } from '@/helpers/NotifyAlerts';
import ModalCreateUserAdmin from './ModalCreateUserAdmin.vue';
import ModalInforUser from '../components/ModalInforUser.vue'
import ModalMedia from './ModalMedia.vue';
import axios from 'axios';
import Spinner from './Spinner.vue';

const props = defineProps({
    rol: {
        type: String,
        required: false
    }
});

const myRol = ref('');

const id = ref(-1)
const typeForm = ref('')
watch(
    () => props.rol,
    (newSelectionated) => {
        myRol.value = newSelectionated;
    },
    { immediate: true }
);
const image = ref('')
const selectImage = (img, user) => {
    image.value = img;
    typeMedia.value = 'image'
    console.log(user);
}

const user = JSON.parse(localStorage.getItem("usuario"));
const page = ref(1);
const search = ref('')
const baseUrl = ref(`/users/filterByRol/${myRol.value}/?rol=${user.rol}&page=${page.value}`);
const { results, prev, next, isLoading, getData, ChangeState, total } = useFetchData(ref(baseUrl));
const nextAction = () => {
    page.value += 1;
    baseUrl.value = `/users/filterByRol/${myRol.value}/?rol=${user.rol}&page=${page.value}`;
    getData();
}
const prevAction = () => {
    page.value -= 1;
    baseUrl.value = `/users/filterByRol/${myRol.value}/?rol=${user.rol}&page=${page.value}`;
    getData();
}
onMounted(async() => {
    await getData();
    console.log(results.value);
    myRol.value = props.rol;
});


const clearSearch = () => {
    search.value = '';
    page.value = 1;
    baseUrl.value = `/users/filterByRol/${myRol.value}/?rol=${user.rol}&page=${page.value}`;
    getData();
}

const selecionatedMedia = (user) => {
    image.value =
        // "https://apitalentos.pruebasdeploy.online/categories/video/" + user.usuario_id;
        import.meta.env.VITE_BASE_URL + "/categories/video/" + user.usuario_id;
    typeMedia.value = "video";
};
const handleName = () => {
    if (search.value.trim() !== '') {

        baseUrl.value = `/users/filterUsersByNameAndRol/${search.value}/?rol=${user.rol}&rolUser=${myRol.value}`;
        console.log(baseUrl.value);

    }
    if (search.value.trim() == '') {
        page.value = 1;
        baseUrl.value = `/users/filterByRol/${myRol.value}/?rol=${user.rol}&page=${page.value}`;
        getData();
    }

}

const deleteUSer = (id, estado) => {
    baseUrl.value = '/users/Stateinvestors/' + id + `/?rol=${user.rol}`;
    ChangeState()
    baseUrl.value = `/users/filterByRol/${myRol.value}/?rol=${user.rol}&page=${page.value}`;
    if (estado == '1') {
        notyf.error("Usuario inactivo");
    } else {
        notyf.success("Usuario activo");
    }
}

const selecionatedUser = (idUser, typeModel) => {
    id.value = idUser;
    typeForm.value = typeModel;
}


const clearId = () => {
    id.value = -1;
    typeForm.value = '';
}

const typeMedia = ref('')

const handleAproved = async (id, name, event, porcentaje_registro) => {
    if (confirm("¿Quieres aprobar al usuario " + name + " ?")) {
        try {
            //    await axios.patch(`https://apitalentos.pruebasdeploy.online/users/approved/${id}?rol=${user.rol}`);
            await axios.patch(import.meta.env.VITE_BASE_URL + `/users/approved/${id}?rol=${user.rol}`);


        } catch (err) {
            console.log(err);
        } finally {
            baseUrl.value = `/users/filterByRol/${myRol.value}/?rol=${user.rol}&page=${page.value}`;
            getData();
        }
    }
    else {
        event.target.checked = !event.target.checked;
    }
}


</script>
<template>
    <main class="bg-light">
        <div class="content ">
            <h4 class="d-block text-start mb-2 text-center title"> {{ myRol }}s </h4>
            <div class="d-flex justify-content-between px-5 mt-2 mb-3">
                <div class="col-2 position-relative">
                    <input name="search" type="text" v-model="search" class="form-control rounded-5" placeholder="Buscar ..."
                        @input="handleName">
                    <div v-if="search !== ''" class="custom-absolute">
                        <img class="cursor" src="../assets/svg/close.svg" alt="Descripción del SVG" width="25"
                            @click="clearSearch">
                    </div>
                </div>
                <div class="col-8 ">
                </div>
                <div class="col-2 text-end">
                    <button class="btn bg-gray rounded-3 btn-sm text-white" data-bs-toggle="modal"
                        data-bs-target="#modalRegisterUser">
                        +<img src="../assets/svg/user-white.svg" width="25" class="img">
                    </button>
                </div>
            </div>
            <div class="table-responsive" v-if="!isLoading">
                <table class="table overflow-x-scroll">
                    <thead>
                        <tr class="table-secondary">
                            <th class="td-custom custom-size">Nombre</th>
                            <th class="td-custom custom-size">Apellido</th>
                            <!-- <th class="td-custom custom-size">Correo</th> -->
                            <th v-if="myRol == 'Cliente'" class="td-custom custom-size">Imagen</th>
                            <th v-if="myRol == 'Cliente'" class="td-custom custom-size">Logros</th>
                            <th v-if="myRol == 'Cliente'" class="td-custom custom-size">Experiencia</th>
                            <th v-if="myRol == 'Cliente' || myRol == 'Inversionista'"
                                class="td-custom custom-size text-center">
                                Información</th>
                            <th v-if="myRol == 'Cliente'" class="td-custom custom-size text-center">Vídeo</th>
                            <th class="td-custom custom-size">Rol</th>
                            <th v-if="myRol !== 'Admin'" class="td-custom custom-size">% Registro</th>
                            <th v-if="myRol == 'Cliente' || myRol == 'Inversionista'" class="td-custom custom-size">
                                Aprobado</th>
                            <th class="td-custom custom-size">Estado</th>
                            <th class="td-custom custom-size ">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in results" :key="user.usuario_id">
                            <td>{{ user.nombre }}</td>
                            <td>{{ user.apellido }}</td>
                            <!-- <td>
                                <div class="d-flex">
                                    <div class="col-1">
                                        <img v-if="user.verificado == 0" src="../assets/svg/cancel.svg" width="20">
                                        <img v-if="user.verificado == 1" src="../assets/svg/confirm.svg" width="20">
                                    </div>

                                    <div class="col-10 ms-1">
                                        {{ user.correo }}
                                    </div>
                                </div>
                            </td> -->
                            <td class="text-secondary text-center align-middle" v-if="myRol == 'Cliente'">
                                <i class="fas fa-image cursor" data-bs-toggle="modal" data-bs-target="#media"
                                    @click="selectImage(user.imagen, user)"></i>
                            </td>
                            <td v-if="myRol == 'Cliente'" class="text-center eye align-middle" data-bs-toggle="modal"
                                data-bs-target="#modalUser" @click="selecionatedUser(user.usuario_id, 'logros')">
                                <img src="../assets/svg/eye.svg" width="18">

                            </td>
                            <td v-if="myRol == 'Cliente'" class="text-center eye align-middle" data-bs-toggle="modal"
                                data-bs-target="#modalUser" @click="selecionatedUser(user.usuario_id, 'experiencia')">
                                <img src="../assets/svg/eye.svg" width="18">

                            </td>
                            <td class="text-center align-middle"
                                v-if="user.rol == 'Cliente' || user.rol == 'Inversionista'">
                                <i v-if="user.rol == 'Cliente' || user.rol == 'Inversionista'" data-bs-toggle="modal"
                                    data-bs-target="#modalUser"
                                    @click="selecionatedUser(user.usuario_id, 'informacion', user.rol)"
                                    class="fa fa-eye text-secondary cursor" aria-hidden="true"></i>
                                <i v-else class="fa-solid fa-xmark text-danger"></i>
                            </td>
                            <td v-if="user.rol == 'Cliente'" class="text-center eye text-secondary align-middle">
                                <i v-if="user.video == null" class="fa-solid fa-video-slash"></i>
                                <i v-else class="fa-solid fa-video" data-bs-toggle="modal" data-bs-target="#media"
                                    @click="selecionatedMedia(user)"></i>
                            </td>
                            <td class="text-center align-middle">
                                {{ user.rol }}
                            </td>
                            <td class="text-center align-middle"
                                v-if="user.rol == 'Cliente' || user.rol == 'Inversionista'">
                                {{ user.porcentaje_registro }}
                            </td>
                            <!-- Aprobar -->
                            <td v-if="myRol == 'Cliente' || myRol == 'Inversionista'" class="text-center align-middle">
                                <div class="form-check form-switch">
                                    <div class="form-check form-switch ">
                                        <input class="form-check-input" type="checkbox" role="switch" id="aproved"
                                            :checked="user.aprobado === 1"
                      :disabled="user.porcentaje_registro !== '100%'"

                                            @change="handleAproved(user.usuario_id, user.nombre, $event)" />

                                    </div>
                                </div>
                            </td>
                            <td v-if="user.estado == '1'" class="text-center align-middle">
                                <span class="badge text-bg-success cursor" @mouseover="toggleStatus"
                                    @mouseout="toggleStatus">Activo</span>
                            </td>
                            <td v-if="user.estado == '0'" class="text-center align-middle">
                                <span class="badge text-bg-danger cursor">No Activo</span>
                            </td>
                            <td v-if="user.estado == '1'" class="text-center align-middle">
                                <div class="cursor" @click="deleteUSer(user.usuario_id, user.estado)">
                                    <img src="../assets/svg/delete.svg" width="25">
                                </div>

                            </td>
                            <td v-if="user.estado == '0'" class="text-center align-middle">
                                <div class="cursor" @click="deleteUSer(user.usuario_id, user.estado)">
                                    <img src="../assets/svg/user-plus.svg" width="25">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ModalInforUser :id="id" :typeForm="typeForm" @clearId="clearId" :myRol="myRol" />
                <ModalCreateUserAdmin />
                <ModalMedia :image="image" :typeMedia="typeMedia" />


            </div>
            <div v-if="isLoading">
        <Spinner/>
    </div>
        </div>
        <div class="footer">
            <Pagination :page="page" :prev="prev" :next="next" :isLoading="isLoading" @nextAction="nextAction"
                @prevAction="prevAction" :total="total" :myRol="myRol" />
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
