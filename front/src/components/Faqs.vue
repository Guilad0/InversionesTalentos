<template>
  <div class="container py-5 font">
    <h1 class="py-3 text-center title">FAQs</h1>
    <!-- Botón para agregar nuevo FAQ (moverlo a la parte superior) -->
    <div class="mt-4">
      <button @click="openModal" class="btn btn-faq btn-sm mx-4">Agregar Nuevo FAQ</button>
    </div>
    <br />

    <!-- Listar FAQ -->
    <div class="accordion custom-accordion" id="accordionExample">
      <div
        v-for="(faq, index) in faqs"
        :key="faq.faq_id"
        class="accordion-item custom-accordion-item"
      >
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
          <div class="accordion-body custom-accordion-body" v-html="faq.respuesta"></div>
          <!-- Formulario de edición -->
          <div v-if="editIndex === index">
            <form @submit.prevent="updateFaq(faq.faq_id)">
              <div class="mb-3">
                <label for="pregunta" class="form-label">Pregunta</label>
                <input
                  v-model="faqToEdit.pregunta"
                  type="text"
                  class="form-control"
                  id="pregunta"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="respuesta" class="form-label">Respuesta</label>
                <textarea
                  v-model="faqToEdit.respuesta"
                  class="form-control"
                  id="respuesta"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Actualizar</button>
              <button @click="cancelEdit" class="btn btn-secondary ms-2">Cancelar</button>
            </form>
          </div>
          <!-- Botón para activar edición -->
          <button v-else @click="editFaq(index)" class="btn btn-warning mt-2 me-2">
            Editar
          </button>
          <!-- Botón para eliminar FAQ -->
          <button @click="deleteFaq(faq.faq_id)" class="btn btn-danger mt-2">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de agregar FAQ -->

     <!-- Fondo negro semi-transparente -->
    <div 
    v-show="showModal" 
    class="modal-backdrop"
    ></div>
    <div 
      v-show="showModal"
      class="modal"
      tabindex="-1"
      aria-labelledby="addFaqModalLabel"
      style="display: block"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addFaqModalLabel">Agregar Nuevo FAQ</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addFaq">
              <div class="mb-3">
                <label for="newPregunta" class="form-label">Pregunta</label>
                <input
                  v-model="newFaq.pregunta"
                  type="text"
                  class="form-control"
                  id="newPregunta"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="newRespuesta" class="form-label">Respuesta</label>
                <textarea
                  v-model="newFaq.respuesta"
                  class="form-control"
                  id="newRespuesta"
                  required
                ></textarea>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-success">Agregar</button>

              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const faqs = ref([]);
const openIndex = ref(null);
const editIndex = ref(null);
const faqToEdit = ref({ pregunta: "", respuesta: "" });
const newFaq = ref({ pregunta: "", respuesta: "" });
const showModal = ref(false); // Controla la visibilidad del modal

const toggleAccordion = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const editFaq = (index) => {
  editIndex.value = index;
  faqToEdit.value = { ...faqs.value[index] };
};

const cancelEdit = () => {
  editIndex.value = null;
};

const updateFaq = async (faq_id) => {
  try {
    const response = await axios.put(
      // `https://apitalentos.pruebasdeploy.online/faq/${faq_id}`,
      import.meta.env.VITE_BASE_URL+`/faq/${faq_id}`,
      faqToEdit.value
    );
    console.log(response.data);
    faqs.value = faqs.value.map((faq) =>
      faq.faq_id === faq_id ? { ...faqToEdit.value, faq_id } : faq
    );
    cancelEdit();
  } catch (error) {
    console.error("Error al actualizar el FAQ:", error);
  }
};

const deleteFaq = async (faq_id) => {
  try {
    // Llamada a la ruta de eliminación definitiva
    // const response = await axios.delete(`https://apitalentos.pruebasdeploy.online/faq/definitivo/${faq_id}`);
    const response = await axios.delete(import.meta.env.VITE_BASE_URL+`/faq/definitivo/${faq_id}`);
    console.log(response.data);
    // Elimina el FAQ de la lista solo en la vista
    faqs.value = faqs.value.filter((faq) => faq.faq_id !== faq_id);
  } catch (error) {
    console.error("Error al eliminar el FAQ:", error);
  }
};

const addFaq = async () => {
  try {
    // const response = await axios.post("https://apitalentos.pruebasdeploy.online/faq", newFaq.value);
    const response = await axios.post(import.meta.env.VITE_BASE_URL+"/faq", newFaq.value);
    console.log(response.data);
    faqs.value.push({ ...newFaq.value, faq_id: response.data.data });
    newFaq.value = { pregunta: "", respuesta: "" };
    closeModal(); // Cierra el modal después de agregar el FAQ
  } catch (error) {
    console.error("Error al agregar el FAQ:", error);
  }
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

onMounted(async () => {
  try {
    // const response = await axios.get("https://apitalentos.pruebasdeploy.online/faq");
    const response = await axios.get(import.meta.env.VITE_BASE_URL+"/faq");
    faqs.value = response.data.data;
  } catch (error) {
    console.error("Error al cargar los FAQs:", error);
  }
});
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');


/* .font{
  font-family: 'Monoton'!important;
} */
.form-control:focus {
  background-color: var(--white-color);
  border: 2px solid #f37926;
  outline: none;
  box-shadow: none;
  color: black;
}
.btn-success {
  background-color: var(--gray-color);
  border: 1px solid var(--yellow-orange); 
  margin-right: 2rem;
}
.modal-header {
  background-color: var(--dun2-color);
  border-bottom: none;
} 

.modal-footer-custom {
  background-color: var(--dun2-color);
  border-top: none;
}

.modal-title {
  font-family: var(--font-montserrat-bold); 
  font-weight: 700; 
  font-size: 30px; 
  color: var( --gray-color); 
  text-transform: uppercase;
}

.modal-body {
  background-color: var(--gray-color);
  color: var(--white-anti-flash-color);
  font-weight: 400; 
  font-size: 18px; 
  
}

.font{
  font-family: 'Montserrat'!important;

 }
.custom-accordion-button {
  font-family: 'Montserrat', sans-serif;
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
  color: #f37926;
}

.custom-accordion-body {
  font-family: 'Montserrat';
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

/* Ajuste del ancho del acordeón */
/* Cambiado */
.custom-accordion-item {
  
  max-width: 700px;
  /* Establece el ancho máximo para hacerlo más estrecho */
  margin: 0 auto;
  /* Centra el acordeón */
}

/* Separación entre los botones de edición y eliminación */
/* Cambiado */
button.btn-warning.mt-2.me-2 {
  margin-right: 10px;
}

/* Estilo del modal */
.modal {
  display: none;
}

.modal.show {
  display: block;
}

.custom-accordion {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding-right: 15px;
}
.btn-faq {
  border: none;
  background-color: var(--gray-color);
  color: white;
  border: none;
  margin-right: 2rem;
}

.btn:hover {
  border: none;
  color: white;
  background-color: var(--yellow-orange) !important;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.922); /* Fondo negro semi-transparente */
  z-index: 1040; /* Asegúrate de que esté debajo del modal pero encima del contenido */
}

.modal {
  z-index: 1050; /* El modal debe estar encima del fondo negro */
}
</style>
