<template>
  <div class="container animate__animated animate__fadeInLeftBig container-mobile" >
    <div class="col">
      <div class="card">
        <div class="card-body">
          <ul>
            <div class="text-center my-4">
              <img v-if="!user?.imagen" src="@/assets/images/profile_photo.png" alt="" width="150" class="rounded-circle" />
              <img v-else :src="user?.imagen" alt="" width="150" class="rounded-circle" 
            />
            </div>

            <!-- RouterLink para Perfil -->
            <RouterLink class="nav-link my-3" to="perfil">
              <li
                class="py-3 ps-2 rounded nav-link my-3"
                :class="{ active: currentPath === 'perfil' }"
              >
                <i class="fa-regular fa-user me-3"></i>Perfil
              </li>
            </RouterLink>

            <!-- RouterLink para Billetera -->
            <RouterLink class="nav-link my-3" to="billetera">
              <li
                class="py-3 ps-2 rounded nav-link my-3"
                :class="{ active: currentPath === 'billetera' }"
              >
                <i class="fa-solid fa-wallet me-3"></i>Billetera
              </li>
            </RouterLink>

            <!-- RouterLink para reportes -->
            <!-- <RouterLink class="nav-link my-3" to="reportes">
              <li class="py-3 ps-2 rounded nav-link my-3" :class="{ 'active': currentPath === 'reportes' }">
                <i class="fa-solif fa-chart-line me-3"></i>Reportes
              </li>
            </RouterLink> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUser } from "@/helpers/utilities";
import { ref, onMounted } from "vue";

const user = ref(null);

onMounted(async () => {
  user.value = await getUser();
  console.log(user.value);
});

defineProps({
  currentPath: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  text-decoration: none;
  font-weight: 500;
  display: block;
  transition: all 0.3s ease;
  border: none;
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
  background-color: var(--gray-color);

  color:white
}

.nav-link:hover img {
  filter: grayscale(0%);
}

.nav-link:active li {
  transform: translateY(1px);
}

.nav-link li:hover {
  cursor: pointer;
}

.active {
  /* border-bottom: 3px solid #d95c00; */
  background-color: var(--yellow-orange);

  color: white !important;
}

.my-3 {
  margin-top: 12px;
  margin-bottom: 12px;
}

@media screen and (max-width: 300px) {
  .container-mobile {
    display: flex;
    justify-content: center;
    width: 100vw !important;
    padding: 0px;
    margin: 0px;
    /* position: absolute; */
    /* margin-left: 1! important; */


    
  }
  
}
</style>
