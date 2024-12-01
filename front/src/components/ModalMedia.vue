<template>
  <div
    class="modal fade"
    id="media"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 v-if="typeMedia == 'image'" class="modal-title fs-5 m-auto" id="modalUserl">Imagen del Usuario</h1>
          <h1 v-if="typeMedia == 'video'" class="modal-title fs-5 m-auto" id="modalUserl">Video del Usuario</h1>

        </div>
        <div class="modal-body">
          <div class="card">
            <div v-if="typeMedia == 'image'">
              <div v-if="image" class="card-body">
                <img :src="image" alt="" width="300" class="card-img-top" />
              </div>
              <div v-else class="alert alert-warning px-5" role="alert">
                <h4 class="alert-heading">Sin Resultados</h4>
                <p>El usuario aún no cuenta con una imagen</p>
              </div>
            </div>
            <div v-if="typeMedia == 'video' && image">
              <video controls width="100%" height="auto" ref="videoPlayer">
                <source :key="image" :src="image" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  @click="pauseVideo">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from "vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  typeMedia: {
    type: String,
    required: true,
  },
});
const pauseVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause();
  }
};
const videoPlayer = ref(null);

watch(
  () => props.image,
  (newValue, oldValue) => {
    if (props.typeMedia === "video" && videoPlayer.value) {
      videoPlayer.value.load(); 
    }
  }
);
</script>
