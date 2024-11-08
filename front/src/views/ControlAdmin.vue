<template>
    <main class=" ">
        <div class="d-flex">
            <div class="col-2 shadow-custom-1 z-3">
                <ul class="mt-5">
                    <li class="py-3 ps-2 rounded  nav-link  my-3 " 
                    :class="{'border-custom': view == 'wallRequests'}" 
                     @click="showView('wallRequests')"> 
                       <img src="../assets/svg/wallet.svg" width="25" class="me-2"> Solicitudes Retiro</li>
                    <li class="py-3 ps-2 rounded  nav-link  my-3" 
                    :class="{'border-custom': view == 'users'}"   
                    @click="showView('users')">
                        <img src="../assets/svg/users.svg" width="25" class="me-2">Usuarios</li>

                    <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('posts')"
                    :class="{'border-custom': view === 'posts'}" >
                    <img src="../assets/svg/post.svg" width="25" class="me-2">Guias
                    </li>
                    <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('categorias')"
                    :class="{'border-custom': view === 'categorias'}" >
                    <img src="../assets/svg/tags-category-categories-labels-svgrepo-com.svg" width="25" class="me-2">Categorias
                    </li>
                    <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('coment')"
                    :class="{'border-custom': view === 'coment'}" >
                    <img src="../assets/svg/like.svg" width="25" class="me-2">Comentarios y Reseñas
                    </li>
                    <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('reclamos')"
                    :class="{'border-custom': view === 'reclamos'}" >
                    <img src="../assets/svg/consultas.svg" width="25" class="me-2">Consultas y Reclamos
                    </li>
                    <li class="py-3 ps-2 rounded nav-link my-3 " @click="showView('ajustes')"
                    :class="{'border-custom': view === 'ajustes'}" >
                    <img src="../assets/svg/settings-svgrepo-com.svg" width="25" class="me-2">Ajustes
                    </li>
                </ul>
            </div>
            <div class="col-10">
                <Solicitudes v-if="view == 'wallRequests'"/>
                <Users v-if="view == 'users'"/>
                <Posts v-if="view == 'posts'"/>
                <Ajustes v-if="view == 'ajustes'" />
                <Categories v-if="view == 'categorias'" />
                <Coment v-if="view == 'coment'" />
                <ConsultasReclamos v-if="view == 'reclamos'" />
            </div>
        </div>
    </main>
</template>

<script setup>
import {ref} from 'vue';
import Solicitudes from '../components/WalletRequests.vue'
import Users from '../components/Users.vue';
import Posts from '../components/Posts.vue'
import Ajustes from '@/components/Ajustes.vue';
import Categories from './Categories.vue';
import ConsultasReclamos from '@/components/ConsultasReclamos.vue';
import Coment from '../components/Coment.vue';
const view = ref('users');


const showView  = ( typeView )=>{
    view.value = typeView;
}
</script>
<style scoped>
    .d-flex{
        height: 100%;
    }
   main{
    background-color: var(--white-anti-flash-color);
    height: 95vh;
    width: 100%;
   }
   li{
    cursor: pointer;
    color: var(--smoky-dark-color)
   }
   li:hover{
        font-weight: 600;
        background-color: rgba(196, 196, 196, 0.315);
   }

   .border-custom{
        font-weight: 600;
        background-color: rgba(196, 196, 196, 0.315);

   }
 
</style>