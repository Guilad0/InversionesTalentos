<template>
  <div id="carouselExampleCaptions" class="carousel slide ">
    <div class="carousel-indicators">
      <button class="rounded-circle ancho active" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0" aria-current="true" aria-label="Slide 1"></button>
      <button class="rounded-circle ancho" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
        aria-label="Slide 2"></button>
      <button class="rounded-circle ancho" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
        aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active animate__animated">
        <div class="position-relative">
          <img :src="images[0]?.image1" class="d-block w-100 " alt="...">
          <EditIcon v-if="rol == 'Admin'" class="abs-custom" @click="openModal('image1')" data-bs-toggle="modal"
            data-bs-target="#exampleModal" />
          <!-- <label class="text-white abs-custom-label " v-if="rol == 'Admin'">Cambiar imagen</label> -->
        </div>
      </div>
      <div class="carousel-item">
        <div>
          <img :src="images[0]?.image2" class="d-block w-100" alt="...">
          <EditIcon v-if="rol == 'Admin'" class="abs-custom" @click="openModal('image2')" data-bs-toggle="modal"
            data-bs-target="#exampleModal" />
          <label class="text-white abs-custom-label " v-if="rol == 'Admin'">Cambiar imagen</label>
        </div>

      </div>
      <div class="carousel-item">
        <div>
          <img :src="images[0]?.image3" class="d-block w-100" alt="...">
          <EditIcon v-if="rol == 'Admin'" class="abs-custom" @click="openModal('image3')" data-bs-toggle="modal"
            data-bs-target="#exampleModal" />
          <label class="text-white abs-custom-label " v-if="rol == 'Admin'">Cambiar imagen</label>
        </div>

      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-6 text-center m-auto" id="exampleModalLabel">Selecciona una imagen para la
              pantalla de inicio</h1>
          </div>
          <div class="modal-body">
            <div class="custom-file-upload text-center m-auto d-flex justify-content-center position-relative">
              <label for="file" class="btn btn-outline-primary border-3 px-4 me-3 custom-button">
                <i class="fa-solid fa-upload"></i>
              </label>
              <input type="file" id="file" class="form-control" @change="onFileChange" accept="image/*"
                style="display: none;" />
              <i v-if="file" class="cursor mx-2 fa-solid fa-image fs-1 "></i>
              <i v-if="file" class="cursor mx-2 text-danger fa-solid fa-ban fs-1" @click="cleanImage()"></i>
            </div>
          </div>
          <div class="modal-footer text-center m-auto d-flex justify-content-center position-relative">
            <!-- Botón Cerrar con estilo personalizado -->
            <button type="button" class="btn custom-button" data-bs-dismiss="modal">Cerrar</button>

            <!-- Botón Subir imagen con estilo personalizado, solo si no está cargando -->
            <button v-if="!loading" type="button" class="btn custom-button" @click="saveImage()">Subir imagen</button>

            <!-- Botón de carga, solo si está cargando -->
            <LoadingButton v-else />
          </div>



        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

</template>


<script setup>
import EditIcon from './Icons/EditIcon.vue';
import Button from '../components/Buttons/Button.vue';
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';
import LoadingButton from './Buttons/LoadingButton.vue';
import { errorAlert } from '@/helpers/iziToast';
const fieldName = ref('')
const file = ref(null);
const images = ref([])
const openModal = (field) => {
  fieldName.value = field;
}
const onFileChange = (event) => {
  const fileInput = event.target.files[0];
  if (fileInput) {
    const img = new Image();
    const objectURL = URL.createObjectURL(fileInput);
  
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      if (width >= 1980 && height >= 1080) {
        file.value = fileInput;
      } else {
        alert(`La imagen debe ser de 1980x1980 píxeles o superior.`);
        file.value = null;
      }
      URL.revokeObjectURL(objectURL);
    };
    img.src = objectURL;
  }
};

const cleanImage = () => {
  file.value = ''
}
const props = defineProps({
  rol: {
    type: String,
    required: true
  }
})
const loading = ref(false);

const saveImage = async () => {
  const formData = new FormData();
  if (file.value) {
    loading.value = true
    formData.append("image", file.value);
    console.log(file.value);
    try {
      // await axios.post(`https://apitalentos.pruebasdeploy.online/utilities/uploadimageUserCloudinaryHome/${fieldName.value}`,
      await axios.post(import.meta.env.VITE_BASE_URL + `/utilities/uploadimageUserCloudinaryHome/${fieldName.value}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log('imagen cargada');
      alert('Imagen cargada')
      cleanImage()
    } catch (error) {
      console.log(error);
      cleanImage()
      errorAlert('Error al subir la imagen','Error')

    } finally {
      loading.value = false
      getImages();
    }
  } else {
    errorAlert('Debes seleccionar una imagen','Error')
  }


}
onMounted(async() => {
  await getImages();
})

const getImages = async () => {
  // const {data} = await axios.get('https://apitalentos.pruebasdeploy.online/utilities/getAllImageHome');
  const { data } = await axios.get(import.meta.env.VITE_BASE_URL + '/utilities/getAllImageHome');
  images.value = data.results;
  console.log('IMAGENES', images.value);
}

</script>



<style scoped>
.abs-custom {
  position: absolute;
  top: 25px;
  left: 25px;
}

.abs-custom-label {
  position: absolute;
  top: 15px;
  left: 15px;
}

.carousel-item {
  height: 90vh;
  width: 100%;
  transition: transform 0.5s ease-in-out;
}

.custom-file-upload {
  position: relative;
  display: inline-block;
}

.file-input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.upload-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #0056b3;
}

.file-name {
  margin-left: 10px;
  font-size: 14px;
  color: #555;
}

.carousel-item img {
  filter: brightness(0.7);
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-height: 100%;
}

.carousel-caption {
  padding: 1rem;
  border-radius: 10px;
  animation: fadeIn 1s ease-in-out;
}

.carousel-control-prev,
.carousel-control-next {
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #000;
  border-radius: 50%;
  padding: 10px;
  transition: background-color 0.3s ease;
}

.carousel-control-prev-icon:hover,
.carousel-control-next-icon:hover {
  background-color: #555;
}

.ancho {
  width: 12px !important;
  height: 12px !important;
  background-color: #fff;
  border: 2px solid #000;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.carousel-indicators .active {
  background-color: #000;
  transform: scale(1.2);
}

@media (max-width: 1500px) {
  .carousel-item {
    height: auto;
  }

  .abs-custom {
    position: absolute;
    top: 25px;
    left: 25px;
  }

  .carousel-item img {
    height: auto;
    max-height: 100%;
  }

  .abs-custom-label {
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 0.8rem;

  }
}

@media (max-width: 768px) {
  .carousel-item {
    height: auto;
  }

  .abs-custom {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  .carousel-item img {
    height: auto;
    max-height: 100%;
  }

  .abs-custom-label {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 0.5rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/*modal*/

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

/* Estilo base para los botones personalizados */
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