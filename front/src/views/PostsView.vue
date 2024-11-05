<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <h3 class="text-center">Guías de Usuarios</h3>
      </div>
      <div class="col-4"></div>
    </div>

    <div class="row justify-content-center my-5 gy-3">
      <div v-for="item in posts" :key="item.post_id" class="col-xl-4 col-md-6 col-sm-12">
        <div class="card" style="max-width: 540px">
          <img
            :src="item.imagen_portada ? item.imagen_portada : '/assets/empty_img.jpg'"
            class="card-img-top object-fit-cover"
            style="height: 200px"
            alt="Image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.titulo }}</h5>
            <div class="d-flex flex-row gap-3">
              <button
                @click="leerPost(item.post_id)"
                class="btn btn-success"
                style="min-width: 120px"
              >
                Leer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { onMounted, ref } from "vue";

const baseURL = "http://localhost:3000/";

const posts = ref([]);

onMounted(() => {
  cargarDatos();
});

const leerPost = (post_id) => {
  console.log(post_id);
  router.push({ name: "post", params: { post_id } });
};

const cargarDatos = async () => {
  try {
    const response = await axios.get(`${baseURL}posts/activos`);
    posts.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
