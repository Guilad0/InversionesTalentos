<template>
  <div>
    <div v-if="!loading">
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6">
            <h2 class="title">Cómo Funciona</h2>
            <p class="description">
              Mira este video para conocer qué es <br />
              Hamilo Inversiones y cómo funciona
            </p>
            <!-- Modal edit video -->
            <div class="modal fade" id="video" tabindex="-1" aria-labelledby="videoLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title fs-6 text-center m-auto">Introduce la URL de tu video</h5>
                  </div>
                  <div class="modal-body">
                    <input type="text" ref="refVideo"  v-model="videoUrl" class="form-control fs-custom">
                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn custom-button" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn custom-button" @click="updateVideo" >
                      <label v-if="!loadingUrl">Actualizar</label>
                      <label v-else>Cargando</label>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 video-container position-relative">
            <EditIconBlack v-if="user?.rol == 'Admin'" class="abs-custom   btn cess rounded-5  m-auto p-2"
               data-bs-toggle="modal" data-bs-target="#video" />
            <iframe
              width="100%"
              height="315"
              :src="videoSrc"
              frameborder="0"
              allowfullscreen></iframe>
          </div>
        </div>
      </div>
      <div v-if="user == null || user?.rol == 'Null'">
        <Unete />
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUser } from "@/helpers/utilities";
import Unete from "./Unete.vue";
import Spinner from "../components/Spinner.vue";
import EditIconBlack from "./Icons/EditIcon black.vue";
import axios from "axios";
import { errorAlert, successAlert, successAlertAcept } from "@/helpers/iziToast";
const loading = ref(false);
const user = ref(null);
const videoSrc = ref(``);
const refVideo = ref(``);
const videoUrl = ref(``);

onMounted(async () => {
  loading.value = true;
  user.value = await getUser();
  console.log(user.value);
  loading.value = false;
  await getUrlVideo()
});

const getUrlVideo = async () =>{
  try {
    const {data} = await axios.get(import.meta.env.VITE_BASE_URL+'/utilities/getVideoSettings');
    videoSrc.value = data.video;
    videoSrc.value = getEmbedUrl(videoSrc.value);
    console.log(videoSrc.value);
  } catch (error) {
    
  }
}

const loadingUrl = ref(false)
const updateVideo = async()=>{  
  if( videoUrl.value =='' ){
    errorAlert('El campo es requerido.','Error')
    refVideo.value.focus()
    return
  }
  if (!/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+$/.test(videoUrl.value)) {
    errorAlert('Formato de URL no valido.','Error')
    return
}
loadingUrl.value = true

 try {
   await axios.put(import.meta.env.VITE_BASE_URL+`/utilities/putVideoSetting?id=6&url=${videoUrl.value}`)
   await getUrlVideo()
   successAlert('La URL se actualizo correctamente','Carga finalizada')
 } catch (error) {
  console.log(error);
    let errorMessage = 'Error al autenticar con Google';
    if (error.response?.data?.msg) {
      errorMessage = error.response.data.msg;
      errorAlert(errorMessage,'Error')
    } else if (error.message.includes('NetworkError')) {
    errorAlert('Error al actualziar la URL del video.','Error')
    }

 }finally{
loadingUrl.value = false

 }
} 

function getEmbedUrl(videoUrl) {
  const match = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

</script>

<style scoped>
.abs-custom {
  position: absolute;
  top: 0;
  right: -100px
}

.fs-custom{
  font-size: 0.9rem !important
}

@import url("https://fonts.googleapis.com/css2?family=Monoton&display=swap");

.container {
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  animation: fadeIn 3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-family: var(--font-montserrat-bold);
  /* Variante bold */
  font-weight: 700;
  /* Asegura que sea bold */
  font-size: 30px;
  /* Tamaño predefinido */
  color: var(--gray-color);
  text-transform: uppercase;
}

.description {
  font-family: var(--font-montserrat-semibold);
  font-size: 24px;
  color: #7f8c8d;
  font-weight: 600;
}

.video-container {
  position: relative;
}

.video-container iframe {
  width: 100%;
  height: 315px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* Media Queries */
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  .description {
    font-size: 1em;
  }

  .video-container iframe {
    height: 250px;
  }
}

@media (max-width: 411px) {
  .container {
    padding: 15px;
  }

  .title {
    font-size: 1.8em;
  }

  .description {
    font-size: 0.9em;
  }

  .video-container iframe {
    height: 200px;
  }
}

@media (min-width: 1440px) {
  .container {
    padding: 40px;
  }

  .title {
    font-size: 3em;
  }

  .description {
    font-size: 1.5em;
  }

  .video-container iframe {
    height: 350px;
  }
}



.modal-title {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
  font-size: 28px;
  font-weight: 700;
  margin-top: 1px;
  text-transform: uppercase;
}

.modal-header {
  background-color: var(--dun2-color);
  border-bottom: none;
}

.modal-body {
  background-color: var(--gray-color);
  color: var(--white-anti-flash-color);
  font-weight: 400;
  font-size: 18px;
}
.modal-footer {
  background-color: var(--gray-color);
  color: var(--white-anti-flash-color);
  font-weight: 400;
  font-size: 18px;
  width: 100%;
  height: 100%;
}

.custom-button {
  background-color: #17223b; 
  color: #f3f3f4;  
  font-family: var(--font-montserrat);
  font-size: 16px;  
  border: 1px solid #F37926 !important; 
  border-radius: 5px; 
  margin-top: 2px;
  height: 40px;  
  width: 180px; 
  padding: 1.5rem;  
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;  
}

/* Efecto hover para el botón */
.custom-button:hover {
  background-color: #f37926 !important; 
  color: #fff; 
}

</style>
