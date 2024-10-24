<template>
  <div class="custom-main">
    <!-- <button @click="changePage()" class="btn btn-primary custom-aboluste">Cambio a {{ currentPage === 1 ? 'Register' : 'Login' }}</button> -->
    <main class="d-flex justify-content-center align-items-center">
        
      <div class="container-wrapper  d-flex">
        <div class="col  " :class="{ 'move-right': currentPage === 1 }">
          <Register @click="changePage" />
        </div>
        <div class="col   " :class="{ 'move-left': currentPage === 1 }">
        <Login @click="changePage" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  height: 90vh;
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
  background-image: url('../assets/images/register10.jpg');
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
import { ref } from 'vue';
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'


const currentPage = ref(0);
const changePage = () => {
  currentPage.value = currentPage.value === 1 ? 0 : 1;
  console.log(currentPage.value);
};
</script>
