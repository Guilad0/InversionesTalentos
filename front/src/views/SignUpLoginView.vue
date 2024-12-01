<template>
<div>
  
  <div class="custom-main d-none d-lg-block animate__animated animate__fadeIn bg-dark position-relative">
    <label class="abs-custom text-light fw-bolder"> {{ nameSyystem }} </label>
    <main class="d-flex justify-content-center align-items-center">
        
      <div class="container-wrapper  d-flex">
        <div class="col  " :class="{ 'move-right': currentPage === 1 }">
          <Register @changePage="changePage" />
        </div>
        <div class="col   " :class="{ 'move-left': currentPage === 1 }">
        <Login @changePage="changePage" />
        </div>
      </div>
    </main>
  </div>
  <div class="d-block d-lg-none">
    <div :class="{'animate__animated   animate__fadeOutLeftBig': changePage == 0}">
    <Register v-if="currentPage === 1" @changePage="changePage" />

    </div>
    <div >

    <Login v-if="currentPage === 0"  @changePage="changePage" />
    </div>

  </div>
</div>
</template>

<style scoped>
.abs-custom{
  position: absolute;
  top: 50%;
  left: 8%;
  font-size: 8rem;
  color: rgba(255, 255, 255, 0.801) !important;
  z-index: 9999;
}
main {
  height: 93vh;
  width: 100%;
  position: relative; 
}

.container-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.col {
  width: 50%;
  color: white;
  transition: transform 0.5s ease;
}

.move-right {
  transform: translateX(100%);
}

.move-left {
  transform: translateX(-100%);
}

.custom-main {
  position: relative;
}

.custom-main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-image: url('../assets/images/main.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.9;
  z-index: 1; 
}

.custom-aboluste{
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
}
.container-wrapper {
  position: relative;
  
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import axios from 'axios';
onMounted(async()=>{
  await getNameSstem()
  localStorage.clear()
})
const nameSyystem = ref('')
const getNameSstem = async() =>{
  try {
    const {data} = await axios.get(import.meta.env.VITE_BASE_URL+'/utilities/getNameSystem')
  console.log(data);
  nameSyystem.value = data.nombre
  } catch (error) {
    console.log(error);
  }

}

const currentPage = ref(0);
const changePage = () => {
  currentPage.value = currentPage.value === 1 ? 0 : 1;
  console.log(currentPage.value);
};
</script>
