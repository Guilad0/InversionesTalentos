<template>
  <main class="bg-light">
    <div  class="content">
      <h4 class="d-block text-start mb-2 text-center title">Reversion</h4>
      <div class="d-flex justify-content-between  mt-2 mb-3">
      </div>
      <div class="table-responsive animate__animated  animate__fadeIn" v-if="!isLoading">
        <table class="table overflow-x-scroll table-sm  table-light">
          <thead class="table-dark">
            <tr class="table-secondary">
              <th class=" td-custom custom-size">#</th>
              <th class=" td-custom custom-size">Usuario</th>
              <th class=" td-custom custom-size">Rubro</th>
              <th class="td-custom custom-size">Total de inversionistas</th>
              <th class="td-custom custom-size">Monto</th>
              <th class="td-custom custom-size">Monto recaudado</th>
              <th class="td-custom custom-size text-center">Fecha Inicio Recaudacion</th>
              <th class="td-custom custom-size text-center">Fecha Fin Recaudacion</th>
              <th class="td-custom custom-size text-center">Estado</th>
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
      <!-- <Pagination
        :page="page"
        :prev="prev"
        :next="next"
        myRol="usuario"
        :isLoading="isLoading"
        @nextAction="nextAction"
        @prevAction="prevAction"
        :total="total"
      /> -->
    </div>
    <ModalInforUser :id="id" :typeForm="typeForm" @clearId="clearId" :myRol="myRol" />
    <ModalMedia :image="image" :typeMedia="typeMedia" />
    <ModalCreateUserAdmin  @closeModal="closeModal"/>
  </main>
</template>
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

</script>
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
