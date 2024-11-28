<template>
  <div class="row my-4">
    <div class="col-2 d-flex" v-if="user.aprobado == 1 && isLoading == false">
      <SidebarProfile :currentPath="currentPath" />
    </div>

    <div class="card bg-degrade col-9 text-white text-center" v-if="user.aprobado == 1 && isLoading == false">
      <Billetera />
      <InversionesRetiro />
    </div>

    <div v-if="user.aprobado == 0 && isLoading == false" class="py-5 d-flex justify-content-center align-items-center">
      <div class="card shadow">
        <div class="card-body text-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZBzeb9nNGTCZl1-C-o-3vUoiLS81IhiZ4bAo9JrS9oxj-JLIaIEmwcLk1iGVYucB4-L0&usqp=CAU"
            class="img-fluid"
          />
          <p class="text-center mt-5">Debes completar tu registro para acceder a tu billetera.</p>
          <div class="text-center my-3">
            <RouterLink to="perfil" class="btn btn-orange">Ir a Perfil</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading && isLoading == true" class="d-flex justify-content-center align-items-center">
      <Spinner></Spinner>
    </div>
  </div>
</template>

<script setup>
import Billetera from "@/components/Billetera.vue";
import InversionesRetiro from "@/components/InversionesRetiro.vue";
import SidebarProfile from "@/components/SidebarProfile.vue";
import Spinner from "@/components/Spinner.vue";
import { getUser } from "@/helpers/utilities";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

let currentPath = useRoute();
currentPath = currentPath.name;
const user = ref({});
const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  user.value = await getUser();
  isLoading.value = false;
  if (user.value.rol == "inversionista" || user.value.rol == "Admin") {
    router.push("/");
  }
});
</script>

<style scoped>
.bg-degrade {
  background: linear-gradient(to right, var(--gray-color), rgb(101, 126, 197));
}

.card {
  box-shadow: 0 0 10px 0 black;
}

.d-flex-custom {
  width: 100%;
  min-height: 56vh;
}

/* Responsividad */
@media (max-width: 1200px) {
  .col-2 {
    display: none !important;
  }

  .col-9 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .card-body img {
    width: 80%;
  }
}

@media (max-width: 768px) {
  .py-5 {
    padding: 2rem 1rem;
  }

  .card-body p {
    font-size: 1rem;
  }

  .btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 576px) {
  .card {
    margin: 0 auto;
    box-shadow: none;
  }

  .text-center {
    font-size: 0.8rem;
  }

  .card-body img {
    width: 100%;
  }

  .bg-degrade {
    background: linear-gradient(to bottom, var(--gray-color), rgb(101, 126, 197));
  }
}
</style>
