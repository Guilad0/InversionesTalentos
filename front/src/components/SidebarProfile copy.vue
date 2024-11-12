<template>
    <div class="card shadow ">
        <div class="card-body">
            <ul>
        <div class="text-center">
            <img :src="user?.imagen" alt="" width="150">
        </div>
        <RouterLink class="nav-link my-3" to="perfil" :class="{ 'active': currentPath === 'perfil' }">
      <li 
        class="py-3 ps-2 rounded nav-link my-3" 
        
      >
        <img src="../assets/svg/users.svg" width="25" class="me-2">Perfil
      </li>
    </RouterLink>
    
    <RouterLink class="nav-link" to="billetera">
      <li 
        class="py-3 ps-2 rounded nav-link my-3" 
        :class="{ 'active': currentPath === 'billetera' }"
      >
        <img src="../assets/svg/post.svg" width="25" class="me-2">Billetera
      </li>
    </RouterLink>
       
    </ul>
        </div>
    </div>

</template>

<script setup>
import { getUser } from '@/helpers/utilities';
import {ref, onMounted} from 'vue'
const user = ref(null)

onMounted(async()=>{
     user.value = await getUser()
     console.log(user.value);
})

defineProps({
  currentPath:{
    type:String,
    Required:true
  }
})

</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.active {
  background-color: #007bff ; 
  color: white !important; 
  border-radius: 10px;
}

.nav-link {
  text-decoration: none;
  font-weight: 500;
  display: block;
  transition: all 0.3s ease;
}

.nav-link li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-link li img {
  filter: grayscale(50%);
  transition: filter 0.3s ease;
}


.nav-link:hover li {
  background-color: #e2e6ea; 
}

.nav-link:hover img {
  filter: grayscale(0%); 
}

.nav-link:active li {
  transform: translateY(1px); 
}


.nav-link:hover {
  color: #0056b3; 
}

.nav-link li:hover {
  cursor: pointer;
}


.my-3 {
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>

