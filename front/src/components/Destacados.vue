<template>
  <main>
    <div class="proposito bg-dark d-flex align-items-center justify-content-center">
      <div class="text-container">
        <h1 class="text-center text-white  fs-custom position-relative ">
          {{ text }}
        <EditIcon v-if="rol == 'Admin'" class="mt-3"  data-bs-toggle="modal" data-bs-target="#textHome"/>
        <label  class="text-white abs-custom-label " v-if="rol == 'Admin'">Editar campo</label>
        
        </h1>
      </div>
    </div>
    <div class="destacados-section">
      <h3 class="py-5 text-center title">Destacados</h3>
      <div class="d-flex flex-wrap justify-content-center flex-wrap ">
        <CardClient
          v-for="client in primerosCinco"
          :key="client.usuario_id"
          :client="client"
          class="fade-in card-client"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center pb-5">
      <div class="wrap">
        <RouterLink to="marketplace" class="btn-6 text-center rounded-3"
          >Ir a marketplace<span></span
        ></RouterLink>
      </div>
    </div>
    <div class="modal fade" id="textHome" tabindex="-1" aria-labelledby="textHomeLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title  fs-custom-text m-auto text-center" id="textHomeLabel">Introduce el texto de almenos 50 caracteres</h1>
      </div>
      <div class="modal-body">
          <input type="text" class="form-control"  v-model="text">         
      </div>
      <div class="modal-footer m-auto">
        <Button message="Cerrar" typeButton="btn-red" data-bs-dismiss="modal" />
        <Button v-if="!loading" message="Actualizar" typeButton="btn-blue" @click="saveText()" />
        <LoadingButton v-if="loading"/>

      </div>
    </div>
  </div>

</div>
  </main>
</template>

<script setup>
import useFetchData from "../helpers/UseFetchData";
import { ref, computed, onMounted } from "vue";
import CardClient from "../components/CardClient.vue";
import { RouterLink } from "vue-router";
import EditIcon from '../components/Icons/EditIcon.vue'
import Button from '../components/Buttons/Button.vue'
import axios from "axios";
import LoadingButton from "./Buttons/LoadingButton.vue";

const path = ref("/clients");
const { results: clients, getData: getClients } = useFetchData(path);
const primerosCinco = computed(() => clients.value.slice(0, 5));
const text = ref('')


onMounted(()=>{
  getTextHome()
})

const getTextHome = async() =>{  
  try {
    const {data} = await axios.get('https://apitalentos.pruebasdeploy.online/utilities/getTextHome');
    text.value = data.text;
  } catch (error) {
      console.log(error);
  }
}
const loading = ref(false)
const saveText =async() =>{
  loading.value = true;
  try {
    await axios.patch('https://apitalentos.pruebasdeploy.online/utilities/putTextHome/'+text.value);
    getTextHome()
    alert('Texto arreglado')
  } catch (error) {
      console.log(error);
  }finally{
    setTimeout(() => {
      loading.value = false
    }, 500);
  }
}
const props = defineProps({
  rol:{
    type:String,
  required:true
  }
})

</script>

<style scoped>

.title {
  font-family: var(--font-montserrat-bold); /* Variante bold */
  font-weight: 700; /* Asegura que sea bold */
  font-size: 26px; /* Tamaño predefinido */
  color: var( --gray-color); 
  text-transform: uppercase;
}

@media (max-width: 1500px) {
  .abs-custom-label{
  position: absolute;
  bottom:  -20px;
  left: 130px;
  font-size: 1rem;

}
}
@media (max-width: 768px) {
  .abs-custom-label{
  position: absolute;
  bottom:  -20px;
  left: 100px;
  font-size: 1rem;

}
}
@media (max-width: 400px) {
  .abs-custom-label{
  position: absolute;
  bottom:  -20px;
  left: 70px;
  font-size: 0.8rem;

}
}


.proposito {
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s ease-in-out;
  padding: 1rem;
  text-align: center;
}

.text-container {
  max-width: 800px;
}

.destacados-section {
  padding: 2rem 1rem;
  animation: slideIn 1s ease-in-out;
}

.card-client {
  margin: 0.5rem;
  flex: 1 1 calc(100% - 1rem);
  max-width: calc(100% - 1rem);
  min-height: 400px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card-client img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.card-client .user-picture {
  width: 120px;
  height: 120px;
  margin-top: -60px;
}

.card-client .name-client {
  font-size: 1.4rem;
  margin: 25px 0 10px;
}

.card-client .description {
  font-size: 1.1rem;
  padding: 0 25px;
}

.card-client:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (min-width: 600px) {
  .card-client {
    flex: 1 1 calc( 35% - 2rem) !important;
    max-width: calc(35% - 2rem) !important;
    min-height: 500px !important;  

  }
  .fs-custom{
    font-size: 1.5rem;
  }
  .fs-custom-text{
    font-size: 1rem;

  }
}

@media (min-width: 900px) {
  .card-client {
    flex: 1 1 calc( 30.33% - 2rem)!important;
    max-width: calc(30.33% - 2rem)!important;
    min-height: 500px;

  }
  .fs-custom{
    font-size: 1.5rem;

  }
    .fs-custom-text{
    font-size: 1rem;

  }
}

@media (min-width: 1200px) {
  .card-client {
    flex: 1 1 calc(20% - 2rem)  !important;
    max-width: calc(20% - 2rem) !important;

  }
  .fs-custom{
    font-size: 1.8rem !important;

  }
    .fs-custom-text{
    font-size: 1rem;

  }
}
@media (max-width: 600px) {

  .fs-custom{
    font-size: 1.3rem !important;

  }
  .fs-custom-text{
    font-size: 1rem;

  }
}
@media (max-width: 400px) {

.fs-custom{
  font-size: 0.9rem !important;

}
.fs-custom-text{
    font-size: 0.9rem;

  }
}

.wrap {
  width: 100%;
  max-width: 200px;
}

a {
  text-decoration: none;
  line-height: 40px;
  color: black;
  transition: color 0.3s ease-in-out;
}

a:hover {
  color: var(--white-anti-flash-color);
}

.btn-6 {
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 40px;
  text-transform: uppercase;
  border: 1px solid currentColor;
  color: var(--gray-color);
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
}

.btn-6 span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: var(--gray-color);
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.btn-6:hover {
  color: var(--white-anti-flash-color);
}

.btn-6:hover span {
  width: 225%;
  height: 562.5px;
}

.btn-6:active {
  background-color: var(--white-anti-flash-color);
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
