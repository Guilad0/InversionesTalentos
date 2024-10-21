<template>
    <main class=" bg-danger">
        <div class="d-flex">
            <div class="col-2 bg-primary">
                <ul>
                    <li @click="showView('wallRequests')">Solicitudes Retiro</li>
                    <li @click="showView('users')">users</li>
                    <li @click="showView('posts')">Posts</li>
                    <li @click="showView('categories')">Categorias personas</li>
                </ul>
            </div>
            <div class="col-10 bg-warning">
                <Solicitudes v-if="view == 'wallRequests'"/>
                <Users v-if="view == 'users'"/>
                <Posts v-if="view == 'posts'"/>
            </div>
        </div>
    </main>
</template>
<script setup></script>

<style scoped>
main{
    height: 95vh;
    width: 100%;
}
</style>
<script setup>
import {ref} from 'vue';
import Solicitudes from '../components/WalletRequests.vue'
import Users from '../components/Users.vue';
import Posts from '../components/Posts.vue'
const view = ref('wallRequests');


const showView  = ( typeView )=>{
    view.value = typeView;
}
</script>
<style scoped>
    .d-flex{
        height: 100%;
    }
</style>