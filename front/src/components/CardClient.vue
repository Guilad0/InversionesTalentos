<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    client: Object,
    required: true
})

const showClient = (id) => {
  console.log(id);
  router.push({
    name: 'client',
    params: {
      id,  
    },
  });
};
</script>
<template>
    <div class="col-custom">
        <div class="card m-2 rounded-3 position-relative">
                <img src="https://slicetokenfrontendassets.s3.amazonaws.com/players/img_white/61.webp" 
                class="card-img-top">
                <div class="custom-absolute">
                <img
                  :src=props.client.imagen
                  width="35"
                  alt="">
                </div>
                
                <div class="card-body">
                <h5 class="card-title fs-6 text-center ">{{ props.client.nombre }}</h5>
                <small class="card-text token ">Token price: ${{ props.client.informacion[0]?.monto_inversion }}</small>
                <div class="row px-2 my-2">
                    <button  class="btn btn-gray" @click="showClient(props.client.usuario_id)">Buy my Token</button>
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
.col-custom{
    width: 20%;
}
</style>