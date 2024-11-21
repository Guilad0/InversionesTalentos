<template>
    <main class="bg-light pt-4 ps-4">
        <div class="d-flex">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li 
                      :class="{'active px-2': currentNav === 'users'}" 
                      @click="setActive('users')" 
                      class="nav-link mx-2">
                        <label>General </label>
                    </li>
                    <li 
                      :class="{'active px-2': currentNav === 'Cliente'}" 
                      @click="setActive('Cliente')" 
                      class="nav-link mx-2">
                        <label>Clientes </label>
                    </li>
                    <li 
                      :class="{'active px-2': currentNav === 'Inversionista'}" 
                      @click="setActive('Inversionista')" 
                      class="nav-link mx-2">
                        <label>Inversionistas </label>
                    </li>
                    <li 
                      :class="{'active px-2': currentNav === 'Admin'}" 
                      @click="setActive('Admin')" 
                      class="nav-link mx-2">
                        <label>Admin</label>
                    </li>
                </ol>
            </nav>
        </div>
        
        <div class="d-flex ">
            <div class="container" v-if="currentNav =='users'">
                <GralUsers/>
            </div>
            <div class="container" v-if="currentNav =='Cliente'"  >
                <Client :rol="rol"/>
            </div>
            <div class="container" v-if="currentNav =='Inversionista'" >
                <Client :rol="rol"/>
            </div>
            <div class="container" v-if="currentNav =='Admin'" >
                <Client :rol="rol"/>
            </div>
            
        </div>
        
    </main>
</template>

<script setup>
import {ref} from 'vue';
import GralUsers from './GralUsers.vue';
import Client from './Client.vue';

const rol = ref('');

const currentNav = ref('users');

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
