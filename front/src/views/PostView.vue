<template>
  <div class="post-view-container" v-if="post && Object.keys(post).length">
    <div class="post-header">
      <h1 class="post-title">{{ post.titulo }}</h1>
      <img
        :src="post.imagen_portada || '/assets/empty_img.jpg'"
        class="post-image"
        alt="Post Image"
      />
    </div>
    <div class="post-content">
      <p>{{ post.contenido }}</p>
    </div>
    <button @click="volverAtras" class="btn-back">Volver Atrás</button>
  </div>
  <div v-else>
    <p>Cargando contenido...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const baseURL = "http://localhost:3000/";
const post = ref({});

// Cargar el post específico
const cargarPost = async () => {
  const postId = route.params.post_id;
  try {
    const response = await axios.get(`${baseURL}posts/${postId}`);
    post.value = response.data.data;
    console.log("Post cargado:", post.value); // Verifica que post tenga datos
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
:root {
  --smoky-dark-color: rgba(0, 0, 0, 0.808);
  --jet-color: #14110f;
  --gray-color: #17223b;
  --yellow-orange: #f37926;
  --dun-color: #d9c5b2;
  --white-anti-flash-color: #f3f3f4;
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

.post-title {
  font-size: 2.5rem;
  color: var(--gray-color);
  margin-bottom: 1rem;
}

.post-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.post-content {
  font-size: 1.2rem;
  color: var(--jet-color);
  line-height: 1.6;
}

.btn-back {
  display: block;
  margin: 2rem auto;
  padding: 0.8rem 1.5rem;
  background-color: var(--yellow-orange);
  color: var(--white-anti-flash-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-back:hover {
  background-color: var(--gray-color);
  color: var(--dun-color);
}
</style>
