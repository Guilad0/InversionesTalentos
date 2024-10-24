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
                      :class="{'active px-2': currentNav === 'clients'}" 
                      @click="setActive('clients')" 
                      class="nav-link mx-2">
                        <label>Clientes </label>
                    </li>
                    <li 
                      :class="{'active px-2': currentNav === 'investor'}" 
                      @click="setActive('investor')" 
                      class="nav-link mx-2">
                        <label>Inversionistas </label>
                    </li>
                    <li 
                      :class="{'active px-2': currentNav === 'admins'}" 
                      @click="setActive('admins')" 
                      class="nav-link mx-2">
                        <label>Admins</label>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="d-flex ">
            <div class="container" v-if="currentNav =='users'">
                <GralUsers/>
            </div>
            <div class="container" v-if="currentNav =='clients'">
                <Client/>
            </div>
            <div class="container" v-if="currentNav =='investor'">
                <Investor/>
            </div>
            <div class="container" v-if="currentNav =='admins'">
                <Admins/>
            </div>
        </div>
    </main>
</template>

<script setup>
import {ref} from 'vue';
import GralUsers from './GralUsers.vue';
import Client from './Client.vue';
import Investor from './Investor.vue';
import Admins from './Admins.vue';

const currentNav = ref('users');

const setActive = ( nav )=>{
    currentNav.value = nav;
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
