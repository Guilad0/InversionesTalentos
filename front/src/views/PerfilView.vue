<template>
  <div>
    <div v-if="!loading" class="my-5">
    <div v-if="rol == 'Cliente'|| rol == 'Inversionista' " class="d-flex">
      <div class="col-2">
        <label class="px-5"><strong>Rol</strong>: {{ rol }} </label>
        <SidebarProfile />
      </div>
      <div class="col-5 d-flex justify-content-center">
        <div class="card  shadow w-75">
          <div class="card-body">
            
            <p :style="{ fontSize: '1rem' }" class="text-secondary text-center "
              >Bienvenid@!!! <strong>{{nombre+' '+apellido}}</strong>  </p>
            <h5 class=" fs-6 text-secondary ">Datos Personales</h5>
              
            
        
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
              <div class="col-md-6 mb-3">
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
              <div class="col-md-6 mb-3">
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
            <div class="form-check form-switch mb-3">
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
            
            <input type="text" name="tag" id="tag" class="form-control" />
            <div class="row">
              <div class="col-md-6">
                <label for="idioma" class="form-label">Nombre de usuario</label>
                  <input type="text" id="idioma" v-model="userName" class="form-control mb-2">
              </div>
              <div class="col-md-6">
                <label for="pais" class="form-label">Pais de Residencia</label>
                <select name="pais" v-model="pais_residencia" class="form-select" id="">
                  <option >{{pais}}</option>
                </select>
              </div>
            </div>
            <div class="col text-center "> 
                <div class="">
                    <button
                type="button"
                class="btn col btn-gray perfilbutton rounded-5 px-4 mt-5"
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
            <button  class="btn btn-orange rounded-5 px-3">Modificar</button>
          </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between py-4">
          <div class="">
            <i class="fas fa-user-check"></i>
            Verificar Cuenta(KYC)
          </div>
          <div class="">
            <button
              class="btn btn-orange rounded-5 px-3"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              :disabled="loadingButtonKYC"
              aria-controls="offcanvasScrolling">
              Verificar
              </button>
          </div>

            <div class="offcanvas offcanvas-end bg-blue-custom" data-bs-scroll="false" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasRegisterUser">
            <div class="offcanvas-header m-auto position-relative">
              <h5 class="offcanvas-title text-white" id="offcanvasRegisterUser">Estado de Registro</h5>
              <button type="button" class="btn text-light custom-close-abs" data-bs-dismiss="offcanvas"  @click="cleanImage"><i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div class="offcanvas-body">

             <div class="px-4 mb-4">
              <ProgresBar :bar="bar"/>
             </div>

                <ul v-if="!loadingButtonKYC" class="text-white">
                  <li class="mb-3" v-if="rol== 'Cliente'">
                    <div class="d-flex m-auto align-items-center">
                      <div class="col"> <i class="fa-solid fa-trophy"></i> &nbsp; logros </div> 
                      <div class="col position-relative">
                        <RouterLink to="logros" class=" py-2  btn btn-sm btn-orange rounded-5 w-50">Abrir 
                        </RouterLink>
                        <label v-if="verifyRegister[0].status" class="custom-abs pe-2">
                        {{ verifyRegister[0].cant }}
                        </label>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol== 'Cliente'">
                    <div class="d-flex m-auto align-items-center ">
                      <div class="col"><i class="fa-solid fa-chart-line"></i> &nbsp; Experiencia </div> 
                      <div class="col position-relative">
                        <RouterLink to="experiencia" class=" py-2  btn btn-sm btn-orange rounded-5 w-50" >Abrir 
                        </RouterLink>
                        <label v-if="verifyRegister[1].status" class="custom-abs pe-2">
                          {{ verifyRegister[1].cant }}
                        </label>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol== 'Cliente'">
                    <div class="d-flex m-auto align-items-center">
                      <div class="col">  <i class="fas fa-info-circle"></i> &nbsp; Informacion </div> 
                      <div class="col position-relative">
                        <RouterLink  to="addInfCliente" class=" py-2  btn btn-sm btn-orange rounded-5 w-50" :class="{ disabled: verifyRegister[0].status }">
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
                      <div class="col">  <i class="fas fa-info-circle"></i> &nbsp; Informacion </div> 
                      <div class="col position-relative">
                        <RouterLink to="addInfInversionista" class="py-2  btn btn-sm btn-orange rounded-5 w-50" :class="{ disabled: verifyRegisterInversor[0].status }">
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
                          <button v-if="!imagen_portada" :disabled="verifyRegister[3].status" class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2" @click="selectImage">
                            <label v-if="verifyRegister[3].status">Enviado</label>
                            <label v-if="!verifyRegister[3].status">Abrir</label>
                            </button>
                          <button v-if="imagen_portada" class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2" @click="saveImage">
                             <label v-if="!loadingButton">Enviar</label>
                             <label v-if="loadingButton">
                              <div class="spinner-border text-primary spinner-border-sm" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                             </label>
                            </button>
                        <i v-if="imagen_portada" class="me-2 fa-solid fa-image text-light fs-5" style="color: green;"></i>
                        <i v-if="imagen_portada" class=" fa-solid fa-ban text-light fs-5 cursor" @click="cleanImage" style="color: green;"></i>
                        </div>
                        <input  type="file" ref="fileInput" accept="image/*" style="display: none;"  @change="onFileChange">
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
                          <button v-if="!imagen_portada" :disabled="verifyRegisterInversor[1].status" class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2" @click="selectImage">
                            <label v-if="verifyRegisterInversor[1].status">Enviado</label>
                            <label v-else>Enviar</label>
                          </button>
                          <button v-if="imagen_portada" class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2" @click="saveImage">
                             <label v-if="!loadingButton">Enviar</label>
                             <label v-if="loadingButton">
                              <div class="spinner-border text-primary spinner-border-sm" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                             </label>
                            </button>
                        <i v-if="imagen_portada" class="me-2 fa-solid fa-image text-light fs-5" style="color: green;"></i>
                        <i v-if="imagen_portada" class=" fa-solid fa-ban text-light fs-5 cursor" @click="cleanImage" style="color: green;"></i>
                        </div>
                        <input  type="file" ref="fileInput" accept="image/*" style="display: none;"  @change="onFileChange">
                      </div>
                  </li>
                  <li class="mb-3" v-if="rol=='Cliente'">
                    <div class="d-flex m-auto align-items-center justify-content-between">
                      <div class="col "> <i class="fa-solid fa-play"></i> &nbsp; Presentacion </div> 
                      <div class="col d-flex align-items-center position-relative">
                        <button  :disabled="verifyRegister[4].status" class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2" >
                          <label v-if="verifyRegister[4].status">Enviado</label>
                          <label v-if="!verifyRegister[4].status">Enviar</label>
                          </button>
                        <label v-if="verifyRegister[4].status" class="custom-abs">
                        <img src="../assets/svg/check1.svg " width="25" alt="">
                        </label>
                      </div>
                    </div>
                  </li>
                  <li v-if="bar == '100%'" class="pt-2 ">
                    <strong>Nota: </strong> Su proceso de registro está completo. Nuestro equipo de administración revisará sus datos para habilitar su cuenta en breve.
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
            <hr>
            <div class="d-flex justify-content-between py-4 ">
              <div class="">
                <i class="fas fa-smile"></i>
                Referir Amigos
              </div>
          <div class="">
            <button class="btn btn-orange rounded-5 px-3">Referir</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else >
      <Unete @handleRol="handleRol"/>
    </div>
  </div>
  <div v-else class="container-custom d-flex justify-content-center align-items-center" >
      <div class="col text-center">
        <div class="spinner-grow text-dark" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
      </div>
      
  </div>
  </div>
</template>

<script setup>
import { handleError, onMounted, ref,watch } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import SidebarProfile from "@/components/SidebarProfile.vue";
import Unete from "@/components/Unete.vue";
import axios from 'axios'
import ProgresBar from '../components/ProgressBar.vue'
import { confirmAlert, loadingAlert, messageAlert, timerAlert } from "@/helpers/sweetAlerts";
import { porcentajeTrue } from "@/helpers/utilities";
import iziToast from "izitoast";
    const route = useRouter();
    const fileInput = ref(null);
    const selectImage = () => {
      fileInput.value.click();
    };

let baseURL = "http://localhost:3000/";
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

onMounted(() => {
  obtenerDatos();
  getRol()
  verifyFormInfClient()
});

const onFileChange = (event) => {
  imagen_portada.value = event.target.files[0];
  console.log("Archivo seleccionado:", imagen_portada.value); 
  let extension = imagen_portada.value.name.split('.');
  console.log(extension);
  if( extension[1] == 'jpeg' || extension[1] == 'jpg' || extension[1] == 'png' ){
    console.log('Formato permitido');
  }else{
    iziToast.warning({
    title: 'Caution',
    message: 'Formato de imagen no permitida',
    position:'center',
    theme:'dark',
    color:'#ef4444',
    // icon:'<i class="fa-regular fa-user"></i>',
    progressBarColor:'#FFFFFF',
    messageColor:'#FFFFFF',
    titleColor:'#FFFFFF',
    iconColor:'#FFFFFF',
});
    // timerAlert('¡Formato de imagen no permitida!','center',2500,'warning')
    cleanImage();
  }
};

const cleanImage = () => {
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
    await axios.post(`http://localhost:3000/clients/cloudinary/image/${usuario.usuario_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('subido ');
    timerAlert('¡La imagen se cargó correctamente!','center',2500,'success')
    cleanImage()
    verifyFormInfClient()
  } catch (error) {
    console.error("Error al cargar la imagen:", error.response ? error.response.data : error.message);
    timerAlert('¡Error al cargar la imagen!','center',2500,'error')
  }finally{
    setTimeout(() => {
    loadingButton.value = false
  }, 500);
  }
  
};

const verifyRegister = ref([
  { status: false,
    field:'logros',
    cant:0,
   },
  { status: false,
    field:'experiencia',
    cant:0,
   },
  { status: false,
    field:'informacion',
    cant:0,
   },
  { status: false,
    field:'imagen',
    cant:0,
   },
  { status: false,
    field:'video',
    cant:0,
   }
]);

const verifyRegisterInversor = ref([
  { status: false,
    field:'informacionInversionista',
    cant:0,
   },
  { status: false,
    field:'isInversorPhoto',
    cant:0,
   },
 
]);


const usuario = JSON.parse(localStorage.getItem("usuario"));
const obtenerDatos = () => {
  miId.value = usuario.id;
  nombre.value = usuario.nombre;
  apellido.value = usuario.apellido;
  correo.value = usuario.correo;
  codigopais.value = usuario.codigo_pais;
  telefono.value = usuario.numero_telefono;
  pais_residencia.value = usuario.pais_residencia;
  pais.value = usuario.pais_residencia;
  userName.value = usuario.correo.split("@")[0];
};

const watchChange = ref('');  

    watch(watchChange, (newValue, oldValue) => {
      watchChange.value +=1;
      obtenerDatos()
      rol.value = rol.value
    });

    const loading = ref(false)

const getRol = async ()=>{
  try {
    loading.value =true
    const {data} = await axios.get(`http://localhost:3000/clients/getRol/user?id=${usuario.usuario_id}`);
    rol.value = data.rol;
  } catch (error) {
    console.log(error);    
  }finally{
    setTimeout(() => {
      loading.value =false
    }, 500);
  }
}
const doubleCheckIcon2 =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32"><path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" fill="currentColor" /></svg>'

  const doubleCheckIcon =
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="32" fill="#71717a" style="border: none;">
  <path d="M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
</svg>`;

  const handleRol = async (role) => {
  const result = await confirmAlert(`¿Está seguro de que desea seleccionar este rol? Su rol se actualizará a ${role}.`,'question',doubleCheckIcon);

  if (result.isConfirmed) {
    loadingAlert('Procesando datos','Por favor espere mientras actualizamos su rol.')
    const datos = {
      usuario_id: usuario.usuario_id,
      rol: role,
    };
    try {
      await axios.put('http://localhost:3000/clients/changeRol/user', datos);
      const { data } = await axios.get(`http://localhost:3000/clients/getUserById/user/?id=${usuario.usuario_id}`);
      const updatedUser = data.results[0];
      rol.value = updatedUser.rol;
      localStorage.setItem("usuario", JSON.stringify(updatedUser));      
      verifyFormInfClient();
      messageAlert( 'Felicidades!', `Tu rol actual es ${rol.value}`,'success',doubleCheckIcon2)
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      messageAlert('Error al procesar la accion','Un error ocurrio durante el cambio de rol', 'error')
    }
  }
};



const actualizar = async () => {
 
};


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
    verifyFields(verifyRegister,usuario.usuario_id, loadingButtonKYC,bar)
  }
  if( rol?.value === 'Inversionista' ){
    verifyFields(verifyRegisterInversor,usuario.usuario_id, loadingButtonKYC,bar)
  }
};

const verifyFields = async (verifyRegister, id, loadingButtonKYC, bar) => {
  try {
    for (let i = 0; i < verifyRegister.value.length; i++) {
      const item = verifyRegister.value[i];
      const { data } = await axios.get(`http://localhost:3000/utilities/${item.field}/?id=${id}`);
      item.status = data.ok;
      item.cant = data.cant;
      console.log(`Campo: ${item.field}, Status: ${item.status}, Cant: ${item.cant}`);
    }    
  } catch (error) {
    console.log('Error en la petición:', error);
  } finally {
    loadingButtonKYC.value = false;
    bar.value = porcentajeTrue(verifyRegister);
    console.log(`Porcentaje de progreso: ${bar.value}%`);
  } 
};

</script>

<style scoped>

.custom-abs{
  position: absolute;
  top: 5px;
  right: 25px;
}

.container-custom{
  height: 85vh;
}

.perfilbutton {
  color: white;
  background-color: var(--jet-color);
}
li{
  list-style: none;
}

.custom-profile {
    max-height: 321px;
}
.btn-orange{
  min-width: 100px;
}

.bg-blue-custom{
  background-color: #17223bef;
}

.custom-spinner-abs{
  position: absolute;
  right: 45%;
  top: 40%;
}

.custom-close-abs{
  position: absolute;
  right: -70px;
}
.custom-close-abs:hover{
  border: 1px solid #d95c00;
  background-color: #d95c00;
}

</style>
