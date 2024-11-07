<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    client: Object,
    required: true
})

const showClient =  (user) => {
  router.push({
    name: 'client',
    params: { name: `${user.nombre}-${user.apellido}` },
    query: { user: user.usuario_id },
  });
};

</script>
<template>
    <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
      <div class="card m-2 rounded-3 position-relative p-2 shadow">
        <img src="https://slicetokenfrontendassets.s3.amazonaws.com/players/img_white/61.webp"
        class="rounded-circle border m-auto border-2 " width="150" height="150" >
        <div class="custom-absolute">
        <img
          :src="`http://localhost:3000/categories/image/${props.client.categoria_persona_id}`"
          width="25"
          class=" rounded-circle"
          alt="">
        </div>
       
        <div class="card-body">
        <h5 class="card-title fs-6 text-center ">{{ props.client.nombre }}</h5>
          <div class="d-flex justify-content-center">
            <div class="col"><img src="../assets/svg/cardlogro.svg" width="25" alt=""></div>
            <div class="col"><img src="../assets/svg/trofeo.svg" width="22" alt=""></div>
            <div class="col"> <img src="../assets/svg/details.svg" width="22" alt=""></div>
            <div class="col"><img src="../assets/svg/links.svg" width="22" alt=""></div>
            <div class="col"><img src="../assets/svg/like.svg" width="22" alt=""></div>

          </div>
        <div class="text-center">
          <label class="card-text token py-3 m-auto">Token price: ${{ (props.client.monto_inversion==null)? '00.00':props.client.monto_inversion }}</label>
        </div>
        <div class="row mt-2">
            <button  class="btn btn-gray " @click="showClient(props.client)">Buy my Token</button>
        </div>
    </div>
</div>
    </div>
</template>
<style scoped>
.token{
    color:var(--gray-color) !important
}
.custom-absolute{
    position: absolute;
    bottom: 30%;
    right: 5px;
}

.card{
  border: 1px solid var(--gray-color); 
}

</style>