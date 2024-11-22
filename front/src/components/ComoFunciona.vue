<template>
  <div>
    <div v-if="!loading">
      <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <h2 class="title">Cómo Funciona</h2>
        <p class="description">
          Mira este video para conocer qué es <br> Hamilo Inversiones y cómo funciona
        </p>
      </div>
      <div class="col-md-6 video-container">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/watch?si=Ofi0aaVby5vYn5P0&v=aO5GKcWe-FA&feature=youtu.be"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
  <div v-if="user == null || user?.rol == 'Null'">
    <Unete />
   </div>
    </div>
    <div v-else >
      <Spinner/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUser } from '@/helpers/utilities';
import Unete from './Unete.vue';
import Spinner from '../components/Spinner.vue'
const loading = ref(false)
const user = ref(null);

onMounted(async () => {
  loading.value =true;
  user.value = await getUser();
  console.log(user.value);
  loading.value = false
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');

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
    font-family: var(--font-montserrat-bold); /* Variante bold */
    font-weight: 700; /* Asegura que sea bold */
    font-size: 30px; /* Tamaño predefinido */
    color: var( --gray-color); 
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
</style>
