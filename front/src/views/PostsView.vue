<template>
  <div>
    <div class="container my-5">
      <div class="text-center">
        <h3 class="text-center underline fs-4">Guías de Usuarios</h3>
      </div>

      <div class="d-flex justify-content-center flex-wrap gap-3 my-5">
        <div
          v-for="item in posts"
          :key="item.post_id"
          class="col-xl-3 col-lg-3 col-md-3 col-sm-4 d-flex justify-content-center col-xxl-3"
        >
          <div
            class="card shadow animate__animated animate__fadeIn p-1"
            style="max-width: 240px"
          >
            <img
              :src="item.imagen_portada ? item.imagen_portada : '/assets/empty_img.jpg'"
              class="card-img-top p-1"
              width="100"
              alt="Image"
            />
            <div class="card-body">
              <h5 class="text-center fs-6">{{ item.titulo }}</h5>
              <div class="d-flex">
                <div class="col text-center my-2">
                  <button
                    @click="leerPost(item.post_id)"
                    class="btn btn-success rounded-5 btn-gray"
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
    </div>
    <div>
      <Unete />
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { onMounted, ref } from "vue";
import Unete from "../components/Unete.vue";

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

<style scoped>
.card:hover {
  transform: translateY(-10px);
}
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.container {
  min-height: 50vh;
}
</style>
