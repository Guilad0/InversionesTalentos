<template>
  <div>
  <div v-if="!loading">
    <h1 class="text-center title pt-5">FAQs</h1>
    <div class="container py-5 animate__animated animate__fadeIn">
      <div class="accordion custom-accordion" id="accordionExample">
        <div v-for="(faq, index) in faqs" :key="faq.faq_id" class="accordion-item">
          <h2 class="accordion-header" :id="'heading-' + index">
            <button
              class="accordion-button custom-accordion-button"
              type="button"
              :class="{ collapsed: openIndex !== index }"
              @click="toggleAccordion(index)"
              aria-expanded="openIndex === index"
              :aria-controls="'collapse-' + index"
            >
              {{ faq.pregunta }}
            </button>
          </h2>
          <div
            :id="'collapse-' + index"
            class="accordion-collapse collapse"
            :class="{ show: openIndex === index }"
            :aria-labelledby="'heading-' + index"
            data-bs-parent="#accordionExample"
          >
            <div
              class="accordion-body custom-accordion-body"
              v-html="faq.respuesta"
            ></div>
          </div>
        </div>
      </div>
    
    </div>
    <div v-if="user == null || user?.rol == 'Null'">
    <Unete />
   </div>
  </div>
  <div v-else>
    <Spinner/>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Unete from "../components/Unete.vue";
import { getUser } from '@/helpers/utilities';
import Spinner from '../components/Spinner.vue'

const loading = ref(false)
const user = ref(null);
const faqs = ref([]);
const openIndex = ref(null);

const toggleAccordion = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

onMounted(async () => {
  try {
    loading.value =true;
    user.value = await getUser(); 
    const response = await axios.get(import.meta.env.VITE_BASE_URL+"/faq");
    faqs.value = response.data.data;
  } catch (error) {
    console.error("Error al cargar las preguntas:", error);
  }finally{
    loading.value = false
  }
});
</script>

<style scoped>
.title {
  font-family: var(--font-montserrat-bold);
  font-weight: 700; 
  font-size: 30px; 
  color: var( --gray-color); 
  text-transform: uppercase;
}
.custom-accordion-button {
  background-color: var(--gray-color);
  color: var(--white-anti-flash-color);
  font-weight: bold;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-accordion-button:not(.collapsed) {
  background-color: var(--yellow-orange);
  color: var(--jet-color);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.custom-accordion-button:hover {
  background-color: var(--dark-gray-color);
  /* Color de fondo en hover */
  color: #f37926;
  /* Cambia el color del texto en hover */
}

.custom-accordion-body {
  background-color: rgba(255, 255, 255, 0.9);
  border-top: 1px solid var(--light-gray-color);
  padding: 20px;
  color: var(--dark-anti-flash-color);
  border-radius: 0 0 5px 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-accordion-body:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.accordion-collapse {
  transition: height 0.4s ease;
}

.accordion-item {
  border: none;
  margin-bottom: 10px;
}

.accordion-item:last-child .custom-accordion-body {
  border-radius: 0 0 5px 5px;
}

h2 {
  text-align: left;
  margin: 0;
  font-size: 1.1rem;
  font-family: "Arial", sans-serif;
}
</style>
