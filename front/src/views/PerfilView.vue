<template>
  <div class="mobile row">
    <div v-if="!loading" class="my-5 px-4">

      <div v-if="rol == 'Cliente' || rol == 'Inversionista'" class="d-flex justify-content-evenly">
        <div class="col-2  text-center container-mobile">
          <SidebarProfile :currentPath="currentPath" />
        </div>
        <div class="col-6 d-flex justify-content-center px-4 container-mobile-card">
          <div class="card  shadow w-75">
            <div class="card-body">
              <p :style="{ fontSize: '1rem' }" class="text-secondary text-center">
                Bienvenid@!!! <strong>{{ nombre.charAt(0).toUpperCase()+nombre.slice(1)+ " " + apellido.charAt(0).toUpperCase()+apellido.slice(1) }}</strong>
              </p>
              <h5 class="fs-6 text-secondary">Datos Personales</h5>

              <label for="nombre" class="form-label">Nombre</label>
              <input type="text" name="nombre" v-model="nombre" id="nombre" class="form-control opacity-75" disabled />
              <label for="apellido" class="form-label">Apellido</label>
              <input type="text" name="apellido" v-model="apellido" id="apellido" class="form-control opacity-75"
                disabled />
              <label for="correo" class="form-label">Correo</label>
              <input type="correo" name="correo" v-model="correo" id="correo" class="form-control opacity-75"
                disabled />
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="codigopais" class="form-label">Código del País</label>
                  <select name="codigopais" v-model="codigopais" class="form-select" id="codigopais">
                    <option>{{ codigopais }}</option>
                    <option v-for="country in countries" :key="country.code" :value="country.code" class="btn-gray">
                      {{ country.code }} - {{ country.abbreviation }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="telefono" class="form-label">Número de Teléfono</label>
                  <input type="text" name="telefono" v-model="telefono" id="telefono" class="form-control opacity-75"
                    disabled />
                </div>
              </div>
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                  :checked="aprobado" disabled="true" />
                <label class="form-check-label" for="flexSwitchCheckDefault">KYC - Se Necesita Validar</label>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label for="idioma" class="form-label">Nombre de Usuario</label>
                  <input type="text" id="idioma" v-model="userName" class="form-control mb-2" />
                </div>
                <div class="col-md-6">
                  <label for="pais" class="form-label">País de Residencia</label>
                  <select name="pais_residencia" v-model="pais_residencia" class="form-select" id="">
                    <option>{{ pais }}</option>
                    <option v-for="country in countries" :key="country" :value="country.name" class="btn-gray">
                      {{ country.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col text-center">
                <div class="">
                  <button type="button" class="btn col btn-gray perfilbutton rounded-5 px-4 mt-5" @click="actualizar()"
                    :disabled="formLoading || band == 1">
                    <label v-if="!formLoading">Actualizar</label>
                    <label v-else>
                      <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-else>
            <Spinner />
          </div> -->
          <div>

          </div>
        </div>
        <div class="col-3 custom-profile shadow px-4 mobile-customer">
          <div class="d-flex justify-content-between py-4">
            <div class="">
              <i class="fa fa-lock" aria-hidden="true"></i>
              Cambiar Contraseña
            </div>
            <div class="">
              <button class="btn btn-orange rounded-5 px-3" @click="goToPage('RecoverPass')">Modificar</button>
            </div>
          </div>
          <hr>
          <div class="d-flex justify-content-between py-4">
            <div class="">
              <i class="fas fa-user-check"></i>
              Verificar Cuenta(KYC)
            </div>
            <div class="">
              <button class="btn btn-orange rounded-5 px-3" @click="openCanvas" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling" :disabled="loadingButtonKYC"
                :class="{ 'blink-button': bar !== '100%' }" aria-controls="offcanvasScrolling">
                Verificar
              </button>
            </div>

            <div class="offcanvas offcanvas-end bg-blue-custom" data-bs-scroll="false" data-bs-backdrop="false"
              tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasRegisterUser">
              <div class="offcanvas-header m-auto position-relative">
                <h5 class="offcanvas-title text-white" id="offcanvasRegisterUser">Estado de Registro</h5>
                <button type="button" class="btn text-light custom-close-abs" data-bs-dismiss="offcanvas"
                  @click="closeCanvas"><i class="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div class="offcanvas-body">

                <div class="px-4 mb-4">
                  <ProgresBar :bar="bar" />
                </div>

                <ul v-if="!loadingButtonKYC" class="text-white">
                  <li class="mb-3" v-if="rol == 'Cliente'">
                    <div class="d-flex m-auto align-items-center">
                      <div class="col"> <i class="fa-solid fa-trophy"></i> &nbsp; Logros </div>
                      <div class="col position-relative">
                        <RouterLink to="logros" class=" py-2  btn btn-sm btn-orange rounded-5 w-50">Abrir
                        </RouterLink>
                        <label v-if="verifyRegister[0].status" class="custom-abs pe-2">
                          {{ verifyRegister[0].cant }}
                        </label>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol == 'Cliente'">
                    <div class="d-flex m-auto align-items-center ">
                      <div class="col"><i class="fa-solid fa-chart-line"></i> &nbsp; Experiencia </div>
                      <div class="col position-relative">
                        <RouterLink to="experiencia" class=" py-2  btn btn-sm btn-orange rounded-5 w-50">Abrir
                        </RouterLink>
                        <label v-if="verifyRegister[1].status" class="custom-abs pe-2">
                          {{ verifyRegister[1].cant }}
                        </label>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol == 'Cliente'">
                    <div class="d-flex m-auto align-items-center">
                      <div class="col"> <i class="fas fa-info-circle"></i> &nbsp; Información </div>
                      <div class="col position-relative">
                        <RouterLink to="addInfCliente" class=" py-2  btn btn-sm btn-orange rounded-5 w-50"
                          :class="{ disabled: verifyRegister[2].status }">
                          <label v-if="verifyRegister[2].status">Enviado</label>
                          <label v-else>Abrir</label>
                        </RouterLink>
                        <label v-if="verifyRegister[2].status" class="custom-abs">
                          <img src="../assets/svg/check1.svg " width="25" alt="">
                        </label>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol == 'Inversionista'">
                    <div class="d-flex m-auto align-items-center">
                      <div class="col"> <i class="fas fa-info-circle"></i> &nbsp; Información </div>
                      <div class="col position-relative">
                        <RouterLink to="addInfInversionista" class="py-2  btn btn-sm btn-orange rounded-5 w-50"
                          :class="{ disabled: verifyRegisterInversor[0].status }">
                          <label v-if="verifyRegisterInversor[0].status">Enviado</label>
                          <label v-else>Abrir</label>
                        </RouterLink>
                        <label v-if="verifyRegisterInversor[0].status" class="custom-abs">
                          <img src="../assets/svg/check1.svg " width="25" alt="">
                        </label>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol == 'Cliente'">
                    <div class="d-flex m-auto align-items-center">
                      <div class="col">
                        <i class="fa-solid fa-image-portrait"></i> &nbsp; Selfie
                      </div>
                      <div class="col d-flex align-items-center position-relative">
                        <label v-if="verifyRegister[3].status" class="custom-abs">
                          <img src="../assets/svg/check1.svg " width="25" alt="">
                        </label>
                        <button v-if="!imagen_portada" :disabled="verifyRegister[3].status"
                          class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2" @click="selectImage">
                          <label v-if="verifyRegister[3].status">Enviado</label>
                          <label v-if="!verifyRegister[3].status">Abrir</label>
                        </button>
                        <button v-if="imagen_portada" class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2"
                          @click="saveImage">
                          <label v-if="!loadingButton">Enviar</label>
                          <label v-if="loadingButton">
                            <div class="spinner-border text-primary spinner-border-sm" role="status">
                              <span class="visually-hidden"></span>
                            </div>
                          </label>
                        </button>
                        <i v-if="imagen_portada" class="me-2 fa-solid fa-image text-light fs-5"
                          style="color: green;"></i>
                        <i v-if="imagen_portada" class=" fa-solid fa-ban text-light fs-5 cursor" @click="cleanImage"
                          style="color: green;"></i>
                      </div>
                      <input type="file" ref="fileInput" accept="image/*" style="display: none;" @change="onFileChange">
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol == 'Inversionista'">
                    <div class="d-flex m-auto align-items-center">
                      <div class="col">
                        <i class="fa-solid fa-image-portrait"></i> &nbsp; Selfie
                      </div>
                      <div class="col d-flex align-items-center position-relative">
                        <label v-if="verifyRegisterInversor[1].status" class="custom-abs">
                          <img src="../assets/svg/check1.svg " width="25" alt="">
                        </label>
                        <button v-if="!imagen_portada" :disabled="verifyRegisterInversor[1].status"
                          class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2" @click="selectImage">
                          <label v-if="verifyRegisterInversor[1].status">Enviado</label>
                          <label v-else>Enviar</label>
                        </button>
                        <button v-if="imagen_portada" class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2"
                          @click="saveImage">
                          <label v-if="!loadingButton">Enviar</label>
                          <label v-if="loadingButton">
                            <div class="spinner-border text-primary spinner-border-sm" role="status">
                              <span class="visually-hidden"></span>
                            </div>
                          </label>
                        </button>
                        <i v-if="imagen_portada" class="me-2 fa-solid fa-image text-light fs-5"
                          style="color: green;"></i>
                        <i v-if="imagen_portada" class=" fa-solid fa-ban text-light fs-5 cursor" @click="cleanImage"
                          style="color: green;"></i>
                      </div>
                      <input type="file" ref="fileInput" accept="image/*" style="display: none;" @change="onFileChange">
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol == 'Cliente'">
                    <div class="d-flex m-auto align-items-center justify-content-between">
                      <div class="col "> <i class="fa-solid fa-play"></i> &nbsp; Presentacion </div>
                      <div class="col d-flex align-items-center position-relative">
                        <label v-if="verifyRegister[4].status" class="custom-abs">
                          <img src="../assets/svg/check1.svg " width="25" alt="">
                        </label>
                        <button v-if="!videoPresentacion" :disabled="verifyRegister[4].status"
                          class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2" @click="selectVideo">
                          <label v-if="verifyRegister[4].status">Enviado</label>
                          <label v-if="!verifyRegister[4].status">Abrir</label>
                        </button>
                        <button v-if="videoPresentacion" class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2"
                          @click="saveVideo">
                          <label v-if="!loadingButtonVideo">Enviar</label>
                          <label v-if="loadingButtonVideo">
                            <div class="spinner-border text-primary spinner-border-sm" role="status">
                              <span class="visually-hidden"></span>
                            </div>
                          </label>
                        </button>
                        <i v-if="videoPresentacion" class="me-2 fa-solid fa-video text-light fs-5"
                          style="color: green;"></i>
                        <i v-if="videoPresentacion" class=" fa-solid fa-ban text-light fs-5 cursor" @click="cleanVideo"
                          style="color: green;"></i>
                      </div>
                      <input type="file" ref="videoFile" accept="video/*" style="display: none;"
                        @change="onVideoChange">
                    </div>

                  </li>
                  <li v-if="bar == '100%'" class="pt-2 ">
                    <strong>Nota: </strong> Su proceso de registro está completo. Nuestro equipo de administración
                    revisará sus datos para habilitar su cuenta en breve.
                  </li>
                </ul>
                <div v-else class="h-100 m-auto text-center position-relative">
                  <div class="spinner-grow text-success custom-spinner-abs" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <!-- <hr> -->
          <!-- <div class="d-flex justify-content-between py-4 ">
            <div class="">
              <i class="fas fa-smile"></i>
              Referir Amigos
            </div>
            <div class="">
              <button class="btn btn-orange rounded-5 px-3">Referir</button>
            </div>
          </div> -->
        </div>
      </div>
      <div v-else>
        <Unete />
      </div>
      <p v-if="isOffcanvasOpen">El Offcanvas está abierto.</p>
    </div>
    <div v-else class="container-custom d-flex justify-content-center align-items-center">
      <Spinner></Spinner>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Swal from "sweetalert2";
import SidebarProfile from "@/components/SidebarProfile.vue";
import Unete from "@/components/Unete.vue";
import axios from 'axios'
import ProgresBar from '../components/ProgressBar.vue'
import { timerAlert } from "@/helpers/sweetAlerts";
import { porcentajeTrue } from "@/helpers/utilities";
import iziToast from "izitoast";
import { countriesData } from "../helpers/dataCountries";
import Spinner from "@/components/Spinner.vue";
import { useRouter, useRoute } from "vue-router";
import { successAlert, errorAlert } from "@/helpers/iziToast";
import router from '@/router';
const fileInput = ref(null);
const selectImage = () => {
  fileInput.value.click();
};
const videoFile = ref(null);
const selectVideo = () => {
  videoFile.value.click();
};

let currentPath = useRoute();
currentPath = currentPath.name;

// let baseURL = "https://apitalentos.pruebasdeploy.online/";
let baseURL = import.meta.env.VITE_BASE_URL + "/";
let miId = ref('');
let nombre = ref("");
let apellido = ref("");
let correo = ref("");
let codigopais = ref("");
let telefono = ref("");
let pais_residencia = ref("");
let pais = ref("");
let userName = ref("");
const rol = ref("");
const imagen_portada = ref(null);
const countries = ref(countriesData);
const videoPresentacion = ref(null);
const routers = useRouter()

const user = ref(JSON.parse(localStorage.getItem('usuario')))
onMounted(async () => {
  obtenerDatos();
  getRol();
  verifyFormInfClient();
  if (user.value?.rol === 'Admin') {
    router.push('/'); // Cambia '/' por la ruta deseada
    return; // Detén la ejecución del resto del código
  }
});

const band = ref(0)
const openCanvas = () => {
  band.value = 1;
}

const goToPage = (path) => {
  routers.push(path)
}


const onFileChange = (event) => {
  imagen_portada.value = event.target.files[0];
  console.log("Archivo seleccionado:", imagen_portada.value);
  let extension = imagen_portada.value.name.split('.');
  console.log(extension);
  if (extension[extension.length - 1] == 'jpeg' || extension[extension.length - 1] == 'jpg' || extension[extension.length - 1] == 'png') {
    console.log('Formato permitido');
  } else {
    /* iziToast.warning({
      title: 'Caution',
      message: 'Formato de imagen no permitida',
      position: 'center',
      theme: 'dark',
      color: '#ef4444',
      // icon:'<i class="fa-regular fa-user"></i>',
      progressBarColor: '#FFFFFF',
      messageColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
    }); */
    // timerAlert('¡Formato de imagen no permitida!','center',2500,'warning')
    errorAlert('Formato de imagen no permitida','Error','topCenter')
    cleanImage();
  }
};

const cleanImage = () => {
  imagen_portada.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
    band.value = 1
  }
};
const closeCanvas = () => {
  band.value = 0
  imagen_portada.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const loadingButton = ref(false)

const saveImage = async () => {
  const formData = new FormData();

  if (imagen_portada.value) {
    formData.append("image", imagen_portada.value);
  } else {
    console.error("No se ha seleccionado una imagen.");
    return;
  }

  try {
    loadingButton.value = true;
    // await axios.post(`https://apitalentos.pruebasdeploy.online/clients/cloudinary/image/${usuario.usuario_id}`, formData, {
    await axios.post(import.meta.env.VITE_BASE_URL + `/clients/cloudinary/image/${usuario.usuario_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('subido ');
    timerAlert('¡La imagen se cargó correctamente!', 'center', 2500, 'success')
    cleanImage()
    verifyFormInfClient()
  } catch (error) {
    console.error("Error al cargar la imagen:", error.response ? error.response.data : error.message);
    timerAlert('¡Error al cargar la imagen!', 'center', 2500, 'error')
  } finally {
    setTimeout(() => {
      loadingButton.value = false
    }, 500);
  }

};

const verifyRegister = ref([
  {
    status: false,
    field: 'logros',
    cant: 0,
  },
  {
    status: false,
    field: 'experiencia',
    cant: 0,
  },
  {
    status: false,
    field: 'informacion',
    cant: 0,
  },
  {
    status: false,
    field: 'imagen',
    cant: 0,
  },
  {
    status: false,
    field: 'video',
    cant: 0,
  }
]);

const verifyRegisterInversor = ref([
  {
    status: false,
    field: 'informacionInversionista',
    cant: 0,
  },
  {
    status: false,
    field: 'isInversorPhoto',
    cant: 0,
  },

]);

const aprobado = ref('')
const usuario = JSON.parse(localStorage.getItem("usuario"));
const obtenerDatos = () => {
  miId.value = usuario.usuario_id;
  nombre.value = usuario.nombre;
  aprobado.value = usuario.aprobado;
  apellido.value = usuario.apellido;
  correo.value = usuario.correo;
  codigopais.value = usuario.codigo_pais;
  telefono.value = usuario.numero_telefono;
  pais_residencia.value = usuario.pais_residencia;
  pais.value = usuario.pais_residencia;
  userName.value = usuario.username;
};

const formLoading = ref(false)
const actualizar = async () => {
  if (
    codigopais.value == "" ||
    telefono.value == "" ||
    userName.value == "" ||
    pais_residencia.value == ""
  ) {
    errorAlert('Todos los campos son obligatorios', 'error', 'topRight');
    return;
  }

  const datos = {
    codigopais: codigopais.value,
    telefono: telefono.value,
    userName: userName.value,
    pais_residencia: pais_residencia.value,
  };
  console.log(datos);
  console.log(miId.value);

  try {
    formLoading.value = true
    const { data } = await axios.put(baseURL + "perfil/actualizarPerfil/" + miId.value, datos);
    console.log(data);

    usuario.codigo_pais = codigopais.value;
    usuario.username = userName.value;
    usuario.pais_residencia = pais_residencia.value;
    localStorage.setItem("usuario", JSON.stringify(usuario));
    successAlert('Se actualizo los datos del perfil con exito', 'EXITO', 'topRight');
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      formLoading.value = false
    }, 500);

  }
};
const watchChange = ref('');

watch(watchChange, (newValue, oldValue) => {
  watchChange.value += 1;
  obtenerDatos()
  rol.value = rol.value
});

const loading = ref(false)

const getRol = async () => {
  try {
    loading.value = true
    const { data } = await axios.get(baseURL+`clients/getRol/user?id=${usuario.usuario_id}`);
    rol.value = data.rol;
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 500);
  }
}

const bar = ref('')
const loadingButtonKYC = ref(false)
const verifyFormInfClient = async () => {
  loadingButtonKYC.value = true
  if (rol?.value === '') {
    await new Promise(resolve => {
      const interval = setInterval(() => {
        if (rol?.value !== '') {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  if (rol?.value === 'Cliente') {
    console.log('verifyRegister antes de verificar:', verifyRegister.value); // Depuración
    verifyFields(verifyRegister, usuario.usuario_id, loadingButtonKYC, bar);
  }
  if (rol?.value === 'Inversionista') {
    verifyFields(verifyRegisterInversor, usuario.usuario_id, loadingButtonKYC, bar)
  }
};

const verifyFields = async (verifyRegister, id, loadingButtonKYC, bar) => {
  try {
    for (let i = 0; i < verifyRegister.value.length; i++) {
      const item = verifyRegister.value[i];
      console.log(baseURL+`utilities/${item.field}/?id=${id}`);
      const { data } = await axios.get(baseURL+`utilities/${item.field}/?id=${id}`);
      item.status = data.ok;
      item.cant = data.cant;
      console.log(`Campo: ${item.field}, Status: ${item.status}, Cant: ${item.cant}`);
    }
  } catch (error) {
    console.log('Error en la petición:', error);
  } finally {
    bar.value = porcentajeTrue(verifyRegister);
    await axios.patch(baseURL+`utilities/savePercentajerUser/${usuario.usuario_id}/?porcentaje=${bar.value}`)
    console.log(`Porcentaje de progreso: ${bar.value}%`);
    loadingButtonKYC.value = false;
  }
};

const isOffcanvasOpen = ref(false);

// Método para abrir el offcanvas
const openOffcanvas = () => {
  const offcanvasElement = document.getElementById('offcanvasExample');
  const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
  offcanvas.show();

  // Actualizar el estado de la apertura
  offcanvasElement.addEventListener('shown.bs.offcanvas', () => {
    isOffcanvasOpen.value = true;
  });

  // Escuchar el evento para saber cuándo se cierra
  offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
    isOffcanvasOpen.value = false;
  });
};

const loadingButtonVideo = ref(false)

const onVideoChange = (event) => {
  videoPresentacion.value = event.target.files[0];
  console.log("Archivo seleccionado:", videoPresentacion.value);

  // No es necesario verificar la extensión aquí, ya que se maneja en el backend
  if (videoPresentacion.value) {
    /* iziToast.success({
      title: 'Éxito',
      message: 'Archivo de video seleccionado correctamente',
      position: 'center',
      theme: 'dark',
      color: '#34D399',
      progressBarColor: '#FFFFFF',
      messageColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
    }); */
    successAlert ('Archivo de video seleccionado correctamente','Éxito','topCenter')
  } else {
    /* iziToast.warning({
      title: 'Caution',
      message: 'No se seleccionó ningún archivo',
      position: 'center',
      theme: 'dark',
      color: '#ef4444',
      progressBarColor: '#FFFFFF',
      messageColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
    }); */
    errorAlert('No se seleccionó ningún archivo','Error','topCenter')
    cleanVideo();
  }
};
const cleanVideo = () => {
  videoPresentacion.value = null;
  if (videoFile.value) {
    videoFile.value.value = '';
  }
};

const saveVideo = async () => {
  const formData = new FormData();

  if (videoPresentacion.value) {
    formData.append("video", videoPresentacion.value); // Agrega el archivo de video
    formData.append("cliente_id", usuario.usuario_id); // Agrega el id del cliente
  } else {
    console.error("No se ha seleccionado un video.");
    return;
  }

  try {
    loadingButtonVideo.value = true; // Muestra el spinner mientras se carga el video
    const response = await axios.post(baseURL+'informacion/videoUpload', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log('Video subido exitosamente:', response.data);
    timerAlert('¡El video se cargó correctamente!', 'center', 2500, 'success');

    // Actualiza el estado del video en verifyRegister a 'true' (completado)
    if (verifyRegister.value && verifyRegister.value[4]) {
      console.log('Estado antes de actualizar:', verifyRegister.value[4]);
      cleanImage()
      verifyFormInfClient()
    } else {
      console.error('verifyRegister[4] no está definido');
    }

    // Llama a la función de verificación de campos después de actualizar el estado del video
    await verifyFormInfClient(); // Verifica nuevamente todos los campos

    cleanVideo(); // Limpia los datos del video
  } catch (error) {
    console.error("Error al cargar el video:", error.response ? error.response.data : error.message);
    timerAlert('¡Error al cargar el video!', 'center', 2500, 'error');
  } finally {
    loadingButtonVideo.value = false; // Detiene el spinner
  }
};



</script>

<style scoped>
.custom-abs {
  position: absolute;
  top: 5px;
  right: 25px;
}

.container-custom {
  min-height: 85vh;
}

.perfilbutton {
  color: white;
  background-color: var(--jet-color);
}

li {
  list-style: none;
}

.custom-profile {
  max-height: 220px;
  
}

.btn-orange {
  min-width: 100px;
}

.bg-blue-custom {
  background-color: #17223bef;
}

.custom-spinner-abs {
  position: absolute;
  right: 45%;
  top: 40%;
}

.custom-close-abs {
  position: absolute;
  right: -70px;
}

.custom-close-abs:hover {
  border: 1px solid #d95c00;
  background-color: #d95c00;
}
@media (max-width: 800px) {
  .container-mobile {
    display: flex;
    position: absolute;
    /* Apila los elementos verticalmente */
    justify-content: center; /* Centra los elementos en pantallas pequeñas */
    gap: 20px; /* Espaciado entre elementos */
    width: 380px;
    margin-left: 20px;
    padding: 0px;

    
    
  }
  .mobile {
    width: 90vw; /* Ajusta el ancho del formulario */
    display: flex;
    flex-direction: column;
    
  }
  .container-mobile-card {
    width: 600px;/* Ancho de la tarjeta en dispositivos móviles */
    display: flex;
    flex-direction: column;
    /* position: absolute; */
    margin-top: -20px;
    margin-left: -40px;
    width: 553px;
  }
  .mobile-customer {
    width: 400px  !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: -550px !important;
    margin-top: 1180px;
  }

}

</style>
