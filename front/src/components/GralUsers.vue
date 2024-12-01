<script setup>
import useFetchData from "../helpers/UseFetchData";
import Pagination from "../components/Pagination.vue";
import { ref, onMounted } from "vue";
import { notyf } from "@/helpers/NotifyAlerts";
import axios from "axios";
import ModalInforUser from "../components/ModalInforUser.vue";
import ModalCreateUserAdmin from "./ModalCreateUserAdmin.vue";
import ModalMedia from "./ModalMedia.vue";
import Spinner from '../components/Spinner.vue';
const user = JSON.parse(localStorage.getItem("usuario"));
const page = ref(1);
const search = ref("");
const baseUrl = ref(`/users?rol=${user.rol}&page=${page.value}`);
const { results, prev, next, isLoading, getData, ChangeState, total } = useFetchData(ref(baseUrl));
const { results:reports, getData:getReports,  } = useFetchData(ref('/utilities/total'));
const nextAction = () => {
  page.value += 1;
  baseUrl.value = `/users?rol=${user.rol}&page=${page.value}`;
  getData();
};
const prevAction = () => {
  page.value -= 1;
  baseUrl.value = `/users?rol=${user.rol}&page=${page.value}`;
  getData();
};
const myRol = ref("");
const aprobados = ref(0)
const pendientes = ref(0)
const activos = ref(0)
const inaactivos = ref(0)
// const getTotalReportsUser = async ()=>{
//   try {
//     const {data} = await axios.get(import.meta.env.VITE_BASE_URL+'/utilities/total')
//     console.log(data,'dataaa');
//     reports.value = data.results;
//   } catch (error) {
//     console.log(error);
//   }
// }

const updateReports = () =>{
  aprobados.value = reports.value.filter( u => u.aprobado == 1  ).length;
  pendientes.value = reports.value.filter( u => u.aprobado == 0 ).length;
  activos.value = reports.value.filter( u => u.estado == 1 ).length;
  inaactivos.value = reports.value.filter( u => u.estado == 0 ).length;
}
onMounted( async() => {
  await getData();
  await getReports();
  updateReports()
});

const image = ref("");
const clearSearch = () => {
  search.value = "";
  page.value = 1;
  baseUrl.value = `/users?rol=${user.rol}&page=${page.value}`;
  getData();
};

const selectImage = (img, user) => {
  image.value = img;
  typeMedia.value = "image";
};

const handleName = () => {
  if (search.value.trim() !== "") {
    baseUrl.value = `/users/filterUsersByName/${search.value}?rol=${user.rol}&page=${page.value}`;
  }
  if (search.value.trim() == "") {
    page.value = 1;
    baseUrl.value = `/users?rol=${user.rol}&page=${page.value}`;
    getData();
  }
};

const deleteUSer = async(id, estado) => {
  baseUrl.value = `/users/Stateinvestors/` + id + `/?rol=${user.rol}`;
 await ChangeState();
 await getReports();
  updateReports()
  baseUrl.value = `/users/?rol=${user.rol}&page=${page.value}`;
  console.log(estado);
  if (estado == "1") {
    notyf.error("Usuario inactivo");
  } else {
    notyf.success("Usuario activo");
  }
};

const updateRol = async (usuario_id, newRol) => {
  try {
    const response = await axios.patch(
      // `https://apitalentos.pruebasdeploy.online/roles/updateRole/${usuario_id}`,
      import.meta.env.VITE_BASE_URL+`/roles/updateRole/${usuario_id}`,
      { rol: newRol }
    );
    if (response.status === 200) {
      notyf.success("Rol actualizado correctamente");
      getData();
    }
  } catch (err) {
    console.error(err);
    notyf.error("Error al actualizar el rol");
  }
};

const handleAproved = async (id, name, event, porcentaje_registro) => {
  if (confirm("¿Quieres aprobar al usuario " + name + " ?")) {
    try {
      await axios.patch(
        // `https://apitalentos.pruebasdeploy.online/users/approved/${id}?rol=${user.rol}`
        import.meta.env.VITE_BASE_URL+`/users/approved/${id}?rol=${user.rol}`
      );
    } catch (err) {
      console.log(err);
    } finally {
      baseUrl.value = `/users?rol=${user.rol}&page=${page.value}`;
      getData();
    }
  } else {
    event.target.checked = !event.target.checked;
  }
};
const id = ref(-1);
const typeForm = ref("");

const selecionatedUser = (idUser, typeModel, rol) => {
  id.value = idUser;
  typeForm.value = typeModel;
  myRol.value = rol;
};

const typeMedia = ref("");
const selecionatedMedia = (user) => {
  image.value =
    // "https://apitalentos.pruebasdeploy.online/categories/video/" + user.usuario_id;
    import.meta.env.VITE_BASE_URL+"/categories/video/" + user.usuario_id;
  typeMedia.value = "video";
};

const clearId = () => {
  id.value = -1;
  typeForm.value = "";
};

const closeModal = () =>{
    getData()
}
</script>
<template>
  <main class="bg-light">
    <div  class="content">
      <h4 class="d-block text-start mb-2 text-center title">Todos los Usuarios</h4>
      <div class="d-flex justify-content-between  mt-2 mb-3">
      </div>
      <div class="d-flex justify-content-start gap-3 position-relative my-4">
        <div class="">
          <button
            class="btn bg-gray rounded-3 btn-sm text-white"
            data-bs-toggle="modal"
            data-bs-target="#modalRegisterUser"
          >
            +<img src="../assets/svg/user-white.svg" width="25" class="img" />
          </button>
        </div>
        <div class="card text-bg-secondary mb-3   rounded-5" style="max-width: 18rem">
          <div class="card-header ">
            <i class="fa-solid fa-users"></i> <strong> Total</strong> {{ total }} &nbsp; 
          </div>
        </div>
        <div class="card text-bg-primary mb-3 rounded-5" style="max-width: 18rem">
          <div class="card-header">
            <i class="fa-solid fa-check"></i><strong> Aprobados</strong> {{ aprobados }} &nbsp; 
          </div>
        </div>
        <div class="card text-bg-orange mb-3  rounded-5" style="max-width: 18rem">
          <div class="card-header text-white">
            <i class="fa-solid fa-triangle-exclamation"></i> <strong class=""> Pendientes</strong> {{pendientes}} &nbsp; 
          </div>
        </div>
        <div class="card text-bg-success mb-3  rounded-5" style="max-width: 18rem">
          <div class="card-header text-white">
            <i class="fa-solid fa-user-plus"></i><strong class=""> Activos</strong> {{activos}} &nbsp; 
          </div>
        </div>
        <div class="card text-bg-danger mb-3  rounded-5" style="max-width: 18rem">
          <div class="card-header text-white">
            <i class="fa-solid fa-user-minus"></i> <strong class=""> Inactivos</strong> {{inaactivos}} &nbsp; 
          </div>
        </div>
        <div class="custom-abs-search">
            <div class="position-relative">
          <input
            name="search"
            type="text"
            v-model="search"
            class="form-control border-1 border-secondary rounded-5" 
            placeholder="Buscar ..."
            @input="handleName"
          />
          <div v-if="search !== ''" class="custom-absolute">
            <img
              class="cursor"
              src="../assets/svg/close.svg"
              alt="Descripción del SVG"
              width="25"
              @click="clearSearch"
            />
          </div>
        </div>
        </div>
      </div>
      <div class="table-responsive animate__animated  animate__fadeIn" v-if="!isLoading">
        <table class="table overflow-x-scroll table-sm  table-light">
          <thead class="table-dark">
            <tr class="table-secondary">
              <th class=" td-custom custom-size">#</th>
              <th class=" td-custom custom-size">Nombre</th>
              <th class=" td-custom custom-size">Apellido</th>
              <th class="td-custom custom-size">Imagen</th>
              <th class="td-custom custom-size">Logros</th>
              <th class="td-custom custom-size">Experiencia</th>
              <th class="td-custom custom-size text-center">Informacion</th>
              <th class="td-custom custom-size text-center">Video</th>
              <th class="td-custom custom-size">Rol</th>
              <th class="td-custom custom-size">% Registro</th>
              <th class="td-custom custom-size">Aprobado</th>
              <th class="td-custom custom-size">Estado</th>
              <th class="td-custom custom-size">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, i) in results" :key="i">
              <td>{{ i+1 }}</td>
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
              <td class="text-secondary text-center align-middle">
                <i
                  v-if="user.rol !== 'Admin' || user.rol == 'Inversionista'"
                  class="fas fa-image"
                  data-bs-toggle="modal"
                  data-bs-target="#media"
                  @click="selectImage(user.imagen, user)"
                ></i>
                <i v-else class="fa-solid fa-xmark text-danger"></i>
              </td>
              <td class="text-center align-middle">
                <i
                  v-if="user.rol == 'Cliente'"
                  data-bs-toggle="modal"
                  data-bs-target="#modalUser"
                  class="fa fa-eye text-secondary cursor"
                  aria-hidden="true"
                  @click="selecionatedUser(user.usuario_id, 'logros', user.rol)"
                ></i>
                <i v-else class="fa-solid fa-xmark text-danger"></i>
              </td>
              <td class="text-center align-middle">
                <i
                  v-if="user.rol == 'Cliente'"
                  data-bs-toggle="modal"
                  data-bs-target="#modalUser"
                  @click="selecionatedUser(user.usuario_id, 'experiencia', user.rol)"
                  class="fa fa-eye text-secondary cursor"
                  aria-hidden="true"
                ></i>
                <i v-else class="fa-solid fa-xmark text-danger"></i>
              </td>
              <td class="text-center align-middle">
                <i
                  v-if="user.rol == 'Cliente' || user.rol == 'Inversionista'"
                  data-bs-toggle="modal"
                  data-bs-target="#modalUser"
                  @click="selecionatedUser(user.usuario_id, 'informacion', user.rol)"
                  class="fa fa-eye text-secondary cursor"
                  aria-hidden="true"
                ></i>
                <i v-else class="fa-solid fa-xmark text-danger"></i>
              </td>

              <td v-if="user.rol == 'Cliente'" class="text-center eye text-secondary align-middle">
                <i v-if="user.video == null" class="fa-solid fa-video-slash"></i>
                <i
                  v-else
                  class="fa-solid fa-video"
                  data-bs-toggle="modal"
                  data-bs-target="#media"
                  @click="selecionatedMedia(user)"
                ></i>
              </td>

              <td
                v-if="
                  user.rol == 'Inversionista' || user.rol == 'Admin' || user.rol == 'Null'
                "
                class="text-center text-danger align-middle"
              >
                <i class="fa-solid fa-xmark"></i>
              </td>

              <td class="align-middle text-center">
                <select
                  v-model="user.rol"
                  @change="updateRol(user.usuario_id, user.rol)"
                  class="form-select"
                >
                  <option value="Inversionista">Inversionista</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Admin">Admin</option>
                  <option value="Null">Null</option>
                </select>
              </td>
              <td class="text-center align-middle">
                <label v-if="user.rol !== 'Admin'">{{ user.porcentaje_registro }}</label>
                <label v-else>Null</label>
              </td>
              <td class="text-center align-middle">
                <div class="form-check form-switch">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      :disabled="user.porcentaje_registro !== '100%'"
                      id="aproved"
                      :checked="user.aprobado === 1"
                      @change="handleAproved(user.usuario_id, user.nombre, $event)"
                    />
                  </div>
                </div>
              </td>
              <td v-if="user.estado == '1'" class="text-center align-middle">
                <span
                  class="badge text-bg-success cursor"
                  @mouseover="toggleStatus"
                  @mouseout="toggleStatus"
                  >Activo</span
                >
              </td>
              <td v-if="user.estado == '0'" class="text-center align-middle">
                <span class="badge text-bg-danger cursor">No activo</span>
              </td>
              <td v-if="user.estado == '1'" class="text-center">
                <div class="cursor" @click="deleteUSer(user.usuario_id, user.estado)">
                  <img src="../assets/svg/delete.svg" width="25" />
                </div>
              </td>
              <td v-if="user.estado == '0'" class="text-center align-middle">
                <div class="cursor" @click="deleteUSer(user.usuario_id, user.estado)">
                  <img src="../assets/svg/user-plus.svg" width="25" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="isLoading">
        <Spinner/>
    </div>
    <div class="footer">
      <Pagination
        :page="page"
        :prev="prev"
        :next="next"
        myRol="usuario"
        :isLoading="isLoading"
        @nextAction="nextAction"
        @prevAction="prevAction"
        :total="total"
      />
    </div>
    <ModalInforUser :id="id" :typeForm="typeForm" @clearId="clearId" :myRol="myRol" />
    <ModalMedia :image="image" :typeMedia="typeMedia" />
    <ModalCreateUserAdmin  @closeModal="closeModal"/>
  </main>
</template>
<style scoped>
.custom-size {
  font-size: 0.9rem;
  font-weight: 630;
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

.custom-abs-search{
    position: absolute;
    right: 0;
}

</style>
