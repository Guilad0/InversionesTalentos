<template>
  <div class="container animate__animated animate__fadeInLeftBig container-mobile" >
    <div class="col-3">
      <div class="card custom-card">
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

            <!-- RouterLink para Inversiones -->
            <RouterLink class="nav-link my-3" to="/inversionesRealizadas">
              <li
                class="py-3 ps-2 rounded nav-link my-3"
                :class="{ active: currentPath === 'inversionesRealizadas' }"
              >
                <i class="fas fa-piggy-bank me-3"></i>Inversiones
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
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPath = route.name;
const user = ref(null);

onMounted(async () => {
  user.value = await getUser();
  console.log(user.value);
});
</script>

<style scoped>
.custom-card {

  background-color: #f9f7f4; /* Color de fondo */
  border: 1px solid #17223b; /* Borde */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
  border-radius: 10px;
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

.nav-link:hover li {
  background-color: #17223b;
  color: white;
}

.nav-link li:hover {
  cursor: pointer;
}

.active {
  background-color: #17223b;
  color: white !important;
}

.my-3 {
  margin-top: 12px;
  margin-bottom: 12px;
}

.container-mobile {
  display: flex;
  justify-content: center;
  width: 100vw !important;
  padding: 0px;
  margin: 0px;
}
</style>