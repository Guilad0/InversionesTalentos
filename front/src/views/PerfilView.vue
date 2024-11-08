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
              aria-controls="offcanvasScrolling">
              Verificar
              </button>
          </div>

            <div class="offcanvas offcanvas-end bg-blue-custom" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title text-white" id="offcanvasScrollingLabel">Completa tu registro</h5>
              
              <button type="button" class="btn-close bg-orange " data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <p class="text-white  text-center pb-3">Progreso de registro (0/4)</p>
                <ul class="text-white">
                  <li class="mb-3" v-if="rol== 'Cliente'">
                    <div class="d-flex m-auto align-items-center">
                      <div class="col"> <i class="fa-solid fa-trophy"></i> - logros </div> 
                      <div class="col">
                        <RouterLink to="/" class="nav-link py-2  btn btn-sm btn-orange rounded-5 w-50">Abrir 
                        </RouterLink>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol== 'Cliente'">
                    <div class="d-flex m-auto align-items-center ">
                      <div class="col"><i class="fa-solid fa-shield-halved"></i> - Experiencia </div> 
                      <div class="col">
                        <RouterLink to="experiencia" class="nav-link py-2  btn btn-sm btn-orange rounded-5 w-50">Abrir 
                        </RouterLink>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol== 'Cliente'">
                    <div class="d-flex m-auto align-items-center">
                      <div class="col">  <i class="fas fa-info-circle"></i> - Informacion </div> 
                      <div class="col">
                        <RouterLink to="/" class="nav-link py-2  btn btn-sm btn-orange rounded-5 w-50">Abrir 
                        </RouterLink>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3" v-if="rol == 'Inversionista'">
                    <div class="d-flex m-auto align-items-center">
                      <div class="col">  <i class="fas fa-info-circle"></i> - Informacion </div> 
                      <div class="col">
                        <RouterLink to="/" class="nav-link py-2  btn btn-sm btn-orange rounded-5 w-50">Abrir 
                        </RouterLink>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3">
                    <div class="d-flex m-auto align-items-center">
                        <div class="col">
                          <i class="fa-solid fa-image-portrait"></i> - Imagen
                        </div> 
                        <div class="col d-flex align-items-center">
                          <button v-if="!imagen_portada" class="py-2 btn btn-sm btn-orange rounded-5 w-50 me-2" @click="selectImage">Abrir</button>
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
                      <div class="col "> <i class="fa-solid fa-play"></i> - Presentacion </div> 
                      <div class="col ">
                        <RouterLink to="/" class="nav-link py-2  btn btn-sm btn-orange rounded-5 w-50">Abrir 
                        </RouterLink>
                      </div>
                    </div>
                  </li>
               

                </ul>
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
    const route = useRouter();
    
    const fileInput = ref(null);
    const selectImage = () => {
      fileInput.value.click();
    };
    
    const handleFileChange = () => {
      isImageSelected.value = fileInput.value.files.length > 0;
    };


let baseURL = "http://localhost:3000/users";
let miId = ref('');
let nombre = ref("");
let apellido = ref("");
let correo = ref("");
let codigopais = ref("");
let telefono = ref("");
let pais = ref("");
let userName = ref("");
const rol = ref("");
const imagen_portada = ref(null);

onMounted(() => {
  obtenerDatos();
  getRol()
});

const onFileChange = (event) => {
  imagen_portada.value = event.target.files[0];
  console.log("Archivo seleccionado:", imagen_portada.value); // Verificación del archivo
};

const cleanImage = () => {
      imagen_portada.value = null; // Limpiar referencia de la imagen
      if (fileInput.value) {
        fileInput.value.value = ''; // Limpiar el input de archivo en el DOM
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
    const response = await axios.post(`http://localhost:3000/clients/cloudinary/image/${usuario.usuario_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('subido ');
  } catch (error) {
    console.error("Error al cargar la imagen:", error.response ? error.response.data : error.message);
  }finally{
    setTimeout(() => {
    loadingButton.value = false
  }, 500);
  }
  
};



const usuario = JSON.parse(localStorage.getItem("usuario"));
const obtenerDatos = () => {
  miId.value = usuario.id;
  nombre.value = usuario.nombre;
  apellido.value = usuario.apellido;
  correo.value = usuario.correo;
  codigopais.value = usuario.codigo_pais;
  telefono.value = usuario.numero_telefono;
  pais.value = usuario.pais_residencia;
  userName.value = usuario.correo.split("@")[0];
  
};

const watchChange = ref('');  

    watch(watchChange, (newValue, oldValue) => {
      console.log('Cambio');
      watchChange.value +=1;
      obtenerDatos()

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

const handleRol = async (role)=>{
  const datos = {
    usuario_id:usuario.usuario_id,
    rol:role
  }
    try {
        await axios.put('http://localhost:3000/clients/changeRol/user',datos)
        const {data} =  await axios.get( `http://localhost:3000/clients/getUserById/user/?id=${usuario.usuario_id}` )
        console.log(data.results[0]);
        rol.value = data.results[0].rol;
        localStorage.setItem("usuario", JSON.stringify(data.results[0]));
        alert('Cambio de rol');
        // window.location.reload();

    } catch (error) {
      console.log(error);
    }

 
}

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
      allowOutsideClick: true,
      allowEscapeKey: true,
      color: 'var(--gray-color)',
      confirmButtonColor: 'var(--yellow-orange)', 
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
  background-color: #17223be7;
}
</style>
