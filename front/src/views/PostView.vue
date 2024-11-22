<template>
  <div class="post-view-container shadow border-primary bg-light animate__animated animate__fadeInLeft" v-if="post && Object.keys(post).length">
    <div class="post-header">
      <div class="card-header bg-transparent border-success fs-5 underline mb-3">{{ post.titulo }}</div>
      <img
        :src="post.imagen_portada || '/assets/empty_img.jpg'"
        class=""
        alt="Post Image"
        width="300"
      />
    </div>
    <div class="post-content">
      <p class="fs-6 ">
        <span v-html="mostrarCompleto ? post.contenido : post.contenido.slice(0, 300) + '...'"></span>
      </p>
      <button @click="toggleMostrarCompleto" class="btn ">
        <label class="text-orange showmore "> {{ mostrarCompleto ? 'Mostrar menos' : 'Leer más' }}</label>
      </button>
    </div>
    <div class="text-center">
      <button @click="volverAtras" class="btn-gray btn rounded-5 px-4 mt-2">Regresar</button>
    </div>
  </div>
  <div v-else>
    <div  class="d-flex justify-content-center align-items-center min-vh-100">
    <div  class="spinner-grow text-dark" role="status">
      <span class="visually-hidden">Cargando...</span>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
// const baseURL = "https://apitalentos.pruebasdeploy.online/";
const baseURL = import.meta.env.VITE_BASE_URL+"/";
const post = ref({});
const mostrarCompleto = ref(false); 


const toggleMostrarCompleto = () => {
  mostrarCompleto.value = !mostrarCompleto.value;
};

const cargarPost = async () => {
  const postId = route.params.post_id;
  try {
    const response = await axios.get(`${baseURL}posts/${postId}`);
    post.value = response.data.data;
  } catch (error) {
    console.error("Error al cargar el post:", error);
  }
};

// Volver a la página anterior
const volverAtras = () => {
  router.back();
};

onMounted(() => {
  cargarPost();
});
</script>

<style scoped>
.showmore:hover{
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.post-view-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--white-anti-flash-color);
  border-radius: 10px;
  box-shadow: 0 0 10px var(--smoky-dark-color);
}

.post-header {
  text-align: center;
}

.post-content {
  font-size: 1.2rem;
  color: var(--jet-color);
  line-height: 1.6;
}

.btn-link {
  color: var(--blue); 
  font-weight: bold;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  text-decoration: underline;
}

.btn-link:hover {
  color: var(--dark-blue);
}
</style>
