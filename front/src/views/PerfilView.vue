<template>
  <div class="my-5">
    <div class="d-flex">
      <div class="col-2">
        <SidebarProfile />
      </div>
      <div class="col-5 d-flex justify-content-center">
        <div class="card  shadow w-75">
          <div class="card-body">
            <!--  -->
            <h5 class="card-title">
                <img :src="`https://ui-avatars.com/api/?name=${nombre}+${apellido}&background=random`" class="rounded-circle me-2" width="30" alt="">{{nombre+' '+apellido}}</h5>
            <span :style="{ fontSize: '1rem' }" class="text-secondary"
              >Bienvenido!!! </span
            >
            <br />
            <br />
            <h5>Datos Personales</h5>
            <label for="nombre" class="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              v-model="nombre"
              id="nombre"
              class="form-control opacity-75"
              disabled
            />
            <label for="apellido" class="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              v-model="apellido"
              id="apellido"
              class="form-control opacity-75"
              disabled
            />
            <label for="correo" class="form-label">Correo</label>
            <input
              type="correo"
              name="correo"
              v-model="correo"
              id="correo"
              class="form-control opacity-75"
              disabled
            />
            <div class="row">
              <div class="col-md-6">
                <label for="codigopais" class="form-label">Codigo del pais</label>
                <select
                  name="codigopais"
                  v-model="codigopais"
                  class="form-select opacity-75"
                  id="codigopais" 
                  disabled
                >
                  <option>{{codigopais}}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="telefono" class="form-label">Numero de telefono</label>
                <input
                  type="text"
                  name="telefono"
                  v-model="telefono"
                  id="telefono"
                  class="form-control opacity-75"
                  disabled
                />
              </div>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                >KYC - Se necesita validar</label
              >
            </div>
            <label for="tag" class="form-label">Tag</label>
            <input type="text" name="tag" id="tag" class="form-control" />
            <div class="row">
              <div class="col-md-6">
                <label for="idioma" class="form-label">Idioma</label>
                <select name="idioma" class="form-select" id="">
                  <option value="">Seleccione</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="pais" class="form-label">Pais de Residencia</label>
                <select name="pais" v-model="pais" class="form-select" id="">
                  <option >{{pais}}</option>
                </select>
              </div>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="comprasanonimas"
              />
              <label class="form-check-label" for="comprasanonimas"
                >Compras Anonimas</label
              >
            </div>
            <div class="col text-center "> 
                <div class="">
                    <button
                type="button"
                class="btn col btn-gray perfilbutton rounded-5 px-4 mt-3"
                @click="actualizar()"
              >
                Actualizar
              </button>
                </div>
            </div>
          </div>
        </div>
      </div>


      <div class="col-3 custom-profile shadow px-4">
        <div class="d-flex justify-content-between py-4">
          <div class="">
            <i class="fa fa-lock" aria-hidden="true"></i>
            Cambiar Contraseña
          </div>
          <div class="">
            <button class="btn btn-primary">Modificar</button>
          </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between py-4">
          <div class="">
            <i class="fas fa-user-check"></i>
            Verificar Cuenta(KYC)
          </div>
          <div class="">
            <button class="btn btn-primary">Verificar</button>
          </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between py-4 ">
          <div class="">
            <i class="fas fa-smile"></i>
            Referir Amigos
          </div>
          <div class="">
            <button class="btn btn-primary">Referir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import SidebarProfile from "@/components/SidebarProfile.vue";

const route = useRouter();

let baseURL = "http://localhost:3000/users";

let miId = ref(0);
let nombre = ref("");
let apellido = ref("");
let correo = ref("");
let codigopais = ref("");
let telefono = ref("");
let pais = ref("");
let userName = ref("");

onMounted(() => {
  obtenerDatos();
  console.log(userName.value);
  console.log(pais.value);
  
  
  
});


const obtenerDatos = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  miId.value = usuario.id;
  nombre.value = usuario.nombre;
  apellido.value = usuario.apellido;
  correo.value = usuario.correo;
  codigopais.value = usuario.codigo_pais;
  telefono.value = usuario.numero_telefono;
  pais.value = usuario.pais_residencia;
  userName.value = usuario.correo.split("@")[0];
};

const actualizar = async () => {
  if (
    nombre.value == "" ||
    apellido.value == "" ||
    correo.value == "" ||
    codigopais.value == "" ||
    telefono.value == "" ||
    pais.value == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Todos los campos son obligatorios",
    });
    return;
  }
  const datos = {
    nombre: nombre.value,
    apellido: apellido.value,
    correo: correo.value,
    codigo_pais: codigopais.value,
    numero_telefono: telefono.value,
    pais_residencia: pais.value,
  };
  try {
    const { data } = await axios.put(baseURL + "/" + miId.value, datos);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

</script>

<style scoped>
.perfilbutton {
  color: white;
  background-color: var(--jet-color);
}
.custom-profile {
    max-height: 321px;

}
</style>
