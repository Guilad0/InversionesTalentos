<template>
  <div>
    <main>
      <div class="partners bg-dark d-flex align-items-center justify-content-center position-relative">
        <img :src="image">
        <EditIcon v-if="rol == 'Admin'" class="abs-custom " data-bs-toggle="modal" data-bs-target="#updatePartners" />
        <label class="text-white abs-custom-label " v-if="rol == 'Admin'">Editar Imagen</label>

      </div>

      <div class="modal fade" id="updatePartners" tabindex="-1" aria-labelledby="updatePartnersLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-6 text-center m-auto" id="updatePartnersLabel">Selecciona una imagen para la
                pantalla de inicio</h1>
            </div>
            <div class="modal-body">
              <div class="custom-file-upload text-center m-auto d-flex justify-content-center position-relative">
                <label for="filePartner" class="btn btn-outline-primary border-3 px-4 me-3 custom-button">
                  <i class="fa-solid fa-upload"></i>
                </label>
                <input type="file" id="filePartner" class="form-control" @change="onFileChange" accept="image/*"
                  style="display: none;" />
                <i v-if="file" class="cursor mx-2 fa-solid fa-image fs-1"></i>
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
    </main>
  </div>
</template>

<script setup>
import Button from './Buttons/Button.vue';
import EditIcon from './Icons/EditIcon.vue';
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';
import LoadingButton from './Buttons/LoadingButton.vue';

const props = defineProps({
  rol: {
    type: String,
    required: true
  }
})



const file = ref(null);
const image = ref({})

const onFileChange = (event) => {
  const fileInput = event.target.files[0];
  if (fileInput) {
    const validExtensions = ["jpeg", "jpg", "png"];
    const fileExtension = fileInput.name.split('.').pop().toLowerCase();
    console.log(fileExtension);
    if (!validExtensions.includes(fileExtension)) {
      alert("La imagen debe ser de tipo JPEG, JPG o PNG.");
      return;
    }

    const img = new Image();
    const objectURL = URL.createObjectURL(fileInput);

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      if (width >= 1800 && height <= 500) {
        file.value = fileInput; // Guardar el archivo si cumple con tamaño y formato
      } else {
        alert("La imagen debe ser de 1800x500 píxeles o superior.");
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

const loading = ref(false);

const saveImage = async () => {
  const formData = new FormData();
  if (file.value) {
    loading.value = true
    formData.append("image", file.value);
    console.log(file.value);
    try {
      // await axios.post(`https://apitalentos.pruebasdeploy.online/utilities/uploadimageUserCloudinaryHome/partners`,
      await axios.post(import.meta.env.VITE_BASE_URL + `/utilities/uploadimageUserCloudinaryHome/partners`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log('imagen cargada');
      cleanImage()
    } catch (error) {
      console.log(error);
      cleanImage()
      alert('Error al subir la imagen')

    } finally {
      loading.value = false
      getImagePartner();
    }
  } else {
    alert('Debes seleccionar una imagen')
  }


}
onMounted(() => {
  getImagePartner();
})

const getImagePartner = async () => {
  // const {data} = await axios.get('https://apitalentos.pruebasdeploy.online/utilities/getImagePartners');
  const { data } = await axios.get(import.meta.env.VITE_BASE_URL + '/utilities/getImagePartners');
  image.value = data.results[0].partners

}



</script>

<style scoped>
.partners {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.partners img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.abs-custom {
  position: absolute;
  top: 12px;
  right: 50px;
}

.abs-custom-label {
  position: absolute;
  top: 70px;
  right: 70px;
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
