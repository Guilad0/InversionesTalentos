<template>

  <div class="row my-4">
    
    <div class="col-2 d-flex" v-if="user.aprobado == 1 && isLoading == false">
      <SidebarProfile :currentPath="currentPath" />
    </div>

    <div class="col-9 bg-info" v-if="user.aprobado == 1 && isLoading == false">
      <Report />
    </div>

    <div v-if="user.aprobado == 0 && isLoading == false"
      class="py-5 d-flex justify-content-center align-items-center ">

      <div class="card shadow">

        <div class="card-body text-center">

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZBzeb9nNGTCZl1-C-o-3vUoiLS81IhiZ4bAo9JrS9oxj-JLIaIEmwcLk1iGVYucB4-L0&usqp=CAU"
            class="img-fluid">

          <p class="text-center mt-5">
            Debes completar tu registro para acceder a tu billetera
          </p>

          <div class="text-center my-3">

            <RouterLink to="perfil" class="btn btn-orange ">Ir a perfil</RouterLink>

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
import Report from '@/components/Report.vue';
import SidebarProfile from "@/components/SidebarProfile.vue";
import Spinner from '@/components/Spinner.vue';
import { ref, onMounted } from "vue";
import { getUser } from '@/helpers/utilities';
import { useRoute } from "vue-router";

let currentPath = useRoute();
currentPath = currentPath.name;
const user = ref({})
const isLoading = ref(false)
onMounted(async () => {
  isLoading.value = true
  user.value = await getUser();
  isLoading.value = false
})

</script>

<style scoped>
.d-flex-custom {
  width: 100%;
  min-height: 56vh;
}
</style>