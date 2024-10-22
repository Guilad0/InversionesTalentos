<template>
  <div class="container py-5">
    <div class="accordion" id="accordionExample">
      <div v-for="(faq, index) in faqs" :key="faq.faq_id" class="accordion-item">
        <h2 class="accordion-header" :id="'heading-' + index">
          <button class="accordion-button collapsed custom-accordion-button" type="button" :data-bs-toggle="'collapse'"
            :data-bs-target="'#collapse-' + index" aria-expanded="false" :aria-controls="'collapse-' + index">
            {{ faq.pregunta }}
          </button>
        </h2>
        <div :id="'collapse-' + index" class="accordion-collapse collapse" :aria-labelledby="'heading-' + index"
          data-bs-parent="#accordionExample">
          <div class="accordion-body custom-accordion-body" v-html="faq.respuesta"></div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const faqs = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/faq');
    faqs.value = response.data.data;
  } catch (error) {
    console.error('Error al cargar las preguntas:', error);
  }
});
</script>




<style scoped>
.custom-accordion-button {
  background-color: rgb(20, 17, 15);
  color: #f1faee;
  border: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}


.custom-accordion-button:not(.collapsed) {
  background-color: rgb(20, 17, 15);
  color: #f1faee;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}


.custom-accordion-button:hover {
  background-color: rgb(126, 127, 131);
  color: rgb(20, 17, 15);
}


.custom-accordion-body {
  background-color: rgb(217, 197, 178);
  /* border: 1px solid #a8dadc;  */
  border-top: none;
  padding: 20px;
  color: #1d3557;

}


.custom-accordion-body {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.custom-accordion-body:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);

}
.custom-accordion-button:focus {
  outline: none;
  box-shadow: none;
}
</style>
