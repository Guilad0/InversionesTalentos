<template>
    <div class="post-view-container">
        <div class="post-header">
            <h1 class="post-title">{{ post.titulo }}</h1>
            <img :src="post.imagen_portada || '/assets/empty_img.jpg'" class="post-image" alt="Post Image" />
        </div>
        <div class="post-details">
            <p class="post-author">By: {{ obtenerNombreAutor(post.usuario_id) }}</p>
            <p class="post-date">Published on: {{ new Date(post.created_at).toLocaleDateString() }}</p>
        </div>
        <div class="post-content">
            <p>{{ post.contenido }}</p>
        </div>
        <button @click="volverAtras" class="btn-back">Volver Atrás</button>
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

const cargarPost = async () => {
    const postId = route.params.post_id;
    try {
        const response = await axios.get(`${baseURL}posts/${postId}`);
        post.value = response.data.data;
    } catch (error) {
        console.error("Error al cargar el post:", error);
    }
};

const obtenerNombreAutor = (usuarioId) => {
    // Simular cargar datos del autor (puedes ajustar esto según cómo obtienes los datos de los usuarios)
    const usuarios = [
        { usuario_id: 1, nombre: "Autor", apellido: "Ejemplo" },
        // Otros autores...
    ];
    const usuario = usuarios.find((u) => u.usuario_id === usuarioId);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : "Desconocido";
};

const volverAtras = () => {
    router.back();
};

onMounted(() => {
    cargarPost();
});
</script>

<style scoped>
.post-view-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: var(--white-anti-flash-color);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.post-header {
    text-align: center;
}

.post-title {
    font-size: 2.5rem;
    color: var(--violet-color);
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

.post-details {
    display: flex;
    justify-content: space-between;
    color: var(--gray-color);
    font-style: italic;
    margin-bottom: 1.5rem;
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
    background-color: var(--violet-2-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-back:hover {
    background-color: var(--violet-color);
}
</style>