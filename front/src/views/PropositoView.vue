<script setup>
import useFetchData from '@/helpers/UseFetchData';
import EditIcon from '../components/Icons/EditIcon.vue';
import { ref, watchEffect, onMounted } from 'vue';
import Button from '@/components/Buttons/Button.vue';
import LoadingButton from '@/components/Buttons/LoadingButton.vue';
import { getUser } from '@/helpers/utilities';
import axios from 'axios';

const { results, getData } = useFetchData(ref("/utilities/getTextProposito"));
const file = ref(null);

const text = ref("");
const loading = ref(false);
const image = ref("");
const rol = ref()
onMounted(async () => {
  const user = await getUser()
  rol.value = user.rol;
})

watchEffect(() => {
  if (results.value.length > 0) {
    text.value = results.value[0].propositoText;
    image.value = results.value[0].proposito_imagen;
    const element = document.querySelector('.full-background');
    
    // Aseguramos que la imagen de fondo sea fija, ocupe todo el espacio y no se mueva
    element.style.backgroundImage = `url(${image.value})`;

  }
});


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

const saveImage = async () => {
  const formData = new FormData();
  if (file.value) {
    loading.value = true
    formData.append("image", file.value);
    console.log(file.value);
    try {
      // await axios.post(`https://apitalentos.pruebasdeploy.online/utilities/uploadimageUserCloudinaryHome/proposito_imagen`,
      await axios.post(import.meta.env.VITE_BASE_URL + `/utilities/uploadimageUserCloudinaryHome/proposito_imagen`,
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
      alert('Error al subir la imagen')

    } finally {
      loading.value = false
      getData();
    }
  } else {
    alert('Debes seleccionar una imagen')
  }


}

const saveText = async () => {
  loading.value = true
  try {
    // await axios.patch('https://apitalentos.pruebasdeploy.online/utilities/putTextPurpose/'+ text.value);
    await axios.patch(import.meta.env.VITE_BASE_URL + '/utilities/putTextPurpose/' + text.value);
  } catch (error) {
    console.log(error);
    alert('error al subir iamgen')
  } finally {
    loading.value = false
    getData()
  }
}

</script>

<template>
  <div class="full-background">
    <header class="header">

      <h1 class="h1-title">Propósito</h1>

    </header>
    <EditIcon v-if="rol == 'Admin'" class="ms-5 " data-bs-toggle="modal" data-bs-target="#modalImagePurpose" />
    <label v-if="rol == 'Admin'" class="text-white ms-5">Editar Imagen</label>
    <main class="main-content">
      <h2 class="text-dark">
        {{ results[0]?.propositoText }}
      </h2>
      <EditIcon v-if="rol == 'Admin'" class="abs-custom" data-bs-toggle="modal" data-bs-target="#textPurpose" />
      <label v-if="rol == 'Admin'" class="text-white ms-5">Editar Propósito</label>
    </main>
    <!--Modal edit text -->
    <div class="modal fade" id="textPurpose" tabindex="-1" aria-labelledby="textHomeLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title  fs-custom-text m-auto text-center" id="textHomeLabel">Introduce el texto de la
              página</h1>
          </div>
          <div class="modal-body">
            <textarea class="form-control" v-model="text" rows="4"></textarea>
          </div>
          <div class="modal-footer m-auto">
            <Button message="Cerrar" typeButton="btn-red" data-bs-dismiss="modal" />
            <Button v-if="!loading" message="Actualizar" typeButton="btn-blue" @click="saveText()" />
            <LoadingButton v-else />

          </div>
        </div>
      </div>

    </div>

    <!--Modal edit imagen-->
    <div class="modal fade" id="modalImagePurpose" tabindex="-1" aria-labelledby="modalImagePurposeLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-6 text-center m-auto" id="modalImagePurposeLabel">Selecciona una imagen para la
              pantalla de inicio</h1>
          </div>
          <div class="modal-body">
            <div class="custom-file-upload text-center m-auto d-flex justify-content-center position-relative">
              <label for="file" class="btn btn-outline-primary border-3 px-4 me-3 custom-button">
                <i class="fa-solid fa-upload"></i>
              </label>
              <input type="file" id="file" class="form-control" @change="onFileChange" accept="image/*"
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

  </div>
</template>

<style scoped>

label.text-white {
  color: white;
  /* Asegura que el texto sea blanco */
}

.h1-title {
  font-family: var(--font-montserrat-bold);
  font-weight: 700;
  font-size: 30px;
  color: var(white);
  margin-right: 300px !important;
  margin-top: 200px !important;
  text-align: right;
  text-transform: uppercase;
  margin-bottom: 0px !important;
}

/* Asegurarse de que el html y body tengan altura completa */
html,
body {
  height: 100%;
  margin: 0;
  /* Elimina los márgenes predeterminados del body */
}

/* Contenedor principal que incluirá el header y main-content */
.full-background {
  position: relative;
  width: 100%;
  height: 100vh; 
  background-attachment: fixed; 
  background-size: cover;      
  background-position: center; 
} 


/* Estilos para el header */
.header {

  padding: 15px;
  text-align: center;
  width: 100%;
  /* Asegura que el header ocupe todo el ancho */
}

.header h1 {
  font-size: 24px;
  margin-bottom: 0px;
  letter-spacing: 1px;
  font-style: var(--font-montserrat-bold);
  /* Cursiva para darle elegancia */
  font-weight: bold;
  /* Negrita para mayor presencia */
  color: #fff;
}

/* Estilos para el main-content */
.main-content {
  color: #333;
  padding-top: 10px;
  padding: 30px;
  max-width: 600px;
  /* Ajusta el ancho máximo del contenido */
  width: 100%;
  /* Asegura que el main-content ocupe todo el ancho posible */
  margin: 0px 100px 50px auto;
  /* Desplaza el contenido a la derecha */
  background-color: rgba(255, 255, 255, 0.1);
  /* Fondo semitransparente para hacer el texto más legible */
  border-radius: 20px;
  /* Bordes redondeados */
  display: flex;
  flex-direction: column;
  /* Organiza los elementos dentro de main en columna */
  justify-content: flex-start;
  /* Alinea los elementos hacia el principio */
  align-items: flex-end;
  /* Alinea el contenido a la derecha */
}

h2 {
  margin-bottom: 5px;
  /* Reduce el margen inferior para acercar el título al cuadro de texto */
  padding-bottom: 0px;
  /* Elimina cualquier padding adicional */
  font-size: 24px;
  /* Ajusta el tamaño de la fuente si es necesario */
  line-height: 1.2;
}

.main-content h2 {
  margin-bottom: 5px;
  text-align: justify;
  font-size: 1.3rem;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
  /* Cursiva */
  font-weight: 400;
  /* Grosor moderado */
  color: var(--white-color) !important;
  /* Contraste oscuro */
}

@media (min-width: 600px) {


  .fs-custom-text {
    font-size: 1rem;

  }
}

@media (min-width: 900px) {


  .fs-custom-text {
    font-size: 1rem;

  }
}

@media (min-width: 1200px) {


  .fs-custom-text {
    font-size: 1rem;

  }
}

@media (max-width: 600px) {


  .fs-custom-text {
    font-size: 1rem;

  }
}

@media (max-width: 400px) {


  .fs-custom-text {
    font-size: 0.9rem;

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
