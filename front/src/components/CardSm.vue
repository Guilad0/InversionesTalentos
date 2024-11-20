<template>
    <div class="container px-5 ">
        <div class="card mb-3 position-relative  rounded-3" style="max-width: 500px; " @click="showClient(props.client)">
            <div class="custom-arrow-abs">
                            <img src="../assets/svg/arrow-right-svgrepo-com.svg" width="20" class="arrow">
                            </div>
            <div class="row ">
                <div class="col-5  row my-auto rounded-3">
                    <img src="https://slicetokenfrontendassets.s3.amazonaws.com/players/img_white/61.webp"
                        class="img rounded-3 m-auto">
                </div>
                <div class="col-5 ">
                    <div class="card-body ">
                       
                        <h5 class="card-title fs-6  ">{{ props.client.nombre }}</h5>
                        <small class="card-text ">Token:% 00.00</small>
                        <div class="position-relative mt-3">
                            <button class="btn  btn-outline-secondary rounded-4 btn-sm "><small>42 Lefts</small></button>
                        </div>
                        <div class="custom-absolute">
                            <!-- <img :src="`https://apitalentos.pruebasdeploy.online/categories/image/${props.client.categoria_persona_id}`"
                                width="25" class=" rounded-circle" alt=""> -->
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useClientStore } from '@/stores/clientStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    client: Object,
    required: true
})

const clientStore = useClientStore();
clientStore.resetClient();

const showClient = (client) => {

  clientStore.setClient(client)
  router.push({
    name: 'client',
    params:{ name: `${client.nombre}-${client.apellido}`},
  });
};



</script>

<style scoped>
.card{
    cursor: pointer;
    
}

.card {
    border: 1px solid var(--gray-color);
}

.custom-arrow-abs{
    position: absolute;
    right: 15px;
    bottom:15px
}

.custom-abs {
    position: absolute;

}

small {
    font-size: 0.7rem;
}

.custom-absolute {
    position: absolute;
    top: 10%;
    right: 15px;
}


</style>