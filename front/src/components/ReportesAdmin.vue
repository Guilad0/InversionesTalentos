<template>
  <main class="bg-light pt-4 ps-4">
      <div class="d-flex">
          <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                  <li 
                    :class="{'active px-2': currentNav === 'general'}" 
                    @click="setActive('general')" 
                    class="nav-link mx-2">
                      <label>General </label>
                  </li>
                  <li 
                    :class="{'active px-2': currentNav === 'reversion'}" 
                    @click="setActive('reversion')" 
                    class="nav-link mx-2">
                      <label>Reversion </label>
                  </li>
              </ol>
          </nav>
      </div>
      
      <div class="d-flex ">
          <div class="container" v-if="currentNav =='general'">
              <Gral/>
          </div>
          <div class="container" v-if="currentNav =='reversion'"  >
              <Reversion/>
          </div>
      </div>
      
  </main>
</template>

<script setup>
import {ref} from 'vue';
import Gral from './DashboardReportes.vue';
import Reversion from './Reversion.vue';

const rol = ref('');

const currentNav = ref('general');

const setActive = ( nav )=>{
  currentNav.value = nav;
  rol.value = nav
}
</script>

<style scoped>
  main {
      height: 100%;
      
  }


  li {
      cursor: pointer !important;
  }

  label:hover {
      font-weight: 500;
  }
  

  .active {
      font-weight: 500;
      border-bottom: 1px solid var(--gray-color);
      text-decoration: underline !important;

    
  }
</style>
