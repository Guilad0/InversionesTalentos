<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { onMounted, ref, defineProps, computed } from "vue";
/* import { successAlert, errorAlert } from "@/helpers/iziToast"; */
import { getUser } from "@/helpers/utilities";
import {successAlert, errorAlert} from "../helpers/iziToast";

const enlace = ref('http://localhost:5173/marketplace');
const mostrarBoton = ref(false);

const props = defineProps({
  client: {
    type: Object,
    required: true
  }
});

const logros = ref([]);
const experiencia = ref([]);
const comentarios = ref([]);
const links = ref([]);
const categorias = ref([]);
const userId = ref(props.client.usuario_id);

const router = useRouter();
const usuario = ref(null)

const loadingCard = ref(false)
onMounted(async () => {
  loadingCard.value = true
  try {
    usuario.value = await getUser();
    
    await obtenerLogros();
    await obtenerExperiencia();
    await obtenerComentarios();
    await obtenerLinks();
    await obtenerCategoria();
    // Inicializa todos los tooltips en el componente 
    import('bootstrap').then((bootstrap) => {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]')); tooltipTriggerList.map((tooltipTriggerEl) => { return new bootstrap.Tooltip(tooltipTriggerEl); });
    });

  } catch (error) {
    console.log(error);
  } finally {
    loadingCard.value = false
  }
}

);


const showClient = (user) => {
  if (usuario.value == null) {
    errorAlert('Debes autenticarte', 'Error')
  } else {
    router.push({
      name: "client",
      params: { name: `${user.nombre}-${user.apellido}` },
      query: { user: user.usuario_id },
    });
  }
};

const obtenerLogros = async () => {
  try {
    const { data } = await axios.get(
      // `https://apitalentos.pruebasdeploy.online/logros/logrosFechas/${userId.value}`
      import.meta.env.VITE_BASE_URL + `/logros/logrosFechas/${userId.value}`
    );
    logros.value = data.data || [];
  } catch (error) {
    console.log(error);
  }
};

const obtenerExperiencia = async () => {
  try {
    const { data } = await axios.get(
      // "https://apitalentos.pruebasdeploy.online/logros/experiencia/" + userId.value
      import.meta.env.VITE_BASE_URL + "/logros/experiencia/" + userId.value
    );
    experiencia.value = data.data || [];
    //console.log(experiencia.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerComentarios = async () => {
  try {
    const { data } = await axios.get(
      // "https://apitalentos.pruebasdeploy.online/comentarios/cliente/" + userId.value
      import.meta.env.VITE_BASE_URL + "/comentarios/cliente/" + userId.value
    );
    comentarios.value = data.data || [];
    //console.log(comentarios.value);
  } catch (error) {
    console.log(error);
  }
};
const obtenerLinks = async () => {
  try {
    const { data } = await axios.get(
      // "https://apitalentos.pruebasdeploy.online/links/cliente/" + userId.value
      import.meta.env.VITE_BASE_URL + "/links/cliente/" + userId.value
    );
    links.value = data.data || [];
    //console.log(links.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerCategoria = async () => {
  // try { const { data } = await axios.get('https://apitalentos.pruebasdeploy.online/categories'); // URL correcta para obtener categorías 
  try {
    const { data } = await axios.get(import.meta.env.VITE_BASE_URL + '/categories'); // URL correcta para obtener categorías 
    categorias.value = data.results || []; // Accede al array de categorías dentro de results 
    //console.log('Categorías obtenidas:', categorias.value); // Imprime todas las categorías para depuración 
  } catch (error) { console.error('Error al obtener las categorías:', error); }
};

const tooltipExperiencia = computed(() => {
  if (experiencia.value.length > 0) {
    return experiencia.value.map((experiencia) => experiencia.cargo).join(", ");
  }
  return "Sin experiencia";
});

const tooltipComentarios = computed(() => {
  if (comentarios.value.length > 0) {
    return comentarios.value.map((comentario) => comentario.comentario).join(", ");
  }
  return "Sin comentarios";
});
const tooltipLogros = computed(() => {
  if (logros.value.length > 0) {
    return logros.value.map((logro) => logro.descripcion).join(", ");
  }
  return "Sin logros";
});


const categoriaNombre = computed(() => {
  //console.log("Verificando categoría para ID:", props.client.categoria_persona_id); // Depuración
  //console.log('Lista de categorías disponibles:', categorias.value); // Imprime la lista completa de categorías
  if (props.client.categoria_persona_id && categorias.value.length > 0) {
    const categoria = categorias.value.find(
      cat => cat.categoria_persona_id === props.client.categoria_persona_id);
    //console.log("Categoría encontrada:", categoria); // Depuración
    return categoria ? categoria.nombre : "Categoría no encontrada";
  }
  return "Sin categoría";
});


const copiarEnlace = () => {
  navigator.clipboard.writeText(enlace.value).then(() => {
    successAlert('Copiado al portapapeles', 'Enlace copiado');
  }).catch(err => {
    errorAlert('Error', 'No se pudo copiar');
  });
};
</script>
<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3 ">
    <div class="card m-2 rounded-3 position-relative p-2 shadow">
      <img :src="client.imagen || 'https://cdn-icons-png.flaticon.com/512/6429/6429059.png'"
        class="rounded-circle border m-auto border-2" width="150" height="150">
      <div class="card-body">
        <h5 class="card-title fs-6 text-center">{{ props.client.nombre }}</h5>
        <p class="text-muted text-center">{{ props.client.ocupacion || 'Ocupación no especificada' }}</p>
        <div class="d-flex justify-content-center">
          <div class="col-auto tooltip-container">
            <img src="../assets/svg/cardlogro.svg" width="25" alt="" data-toggle="tooltip" data-placement="right"
              :data-bs-original-title="tooltipExperiencia" class="custom-tooltip" />
          </div>
          <div class="col-auto tooltip-container">
            <img src="../assets/svg/trofeo.svg" width="22" alt="" data-toggle="tooltip" data-placement="right"
              :data-bs-original-title="tooltipLogros" class="custom-tooltip" />
          </div>

          <!-- <div class="col"><img src="../assets/svg/details.svg" width="22" alt="" /></div> -->
          <div class="col-auto  " @mouseover="mostrarBoton = true" @mouseleave="mostrarBoton = false">
            <img v-if="!mostrarBoton" src="../assets/svg/links.svg" width="22" alt="" />
            <button v-if="mostrarBoton" @click="copiarEnlace" class="btn-copiar"> Copiar Enlace </button>
          </div>
          <div class="col-auto  tooltip-container">
            <img src="../assets/svg/like.svg" width="22" alt="" data-toggle="tooltip" data-placement="right"
              :data-bs-original-title="tooltipComentarios" class="custom-tooltip" />
          </div>
          <div class="col-auto  tooltip-container">
            <img src="../assets/svg/details.svg" width="22" alt="" data-toggle="tooltip" data-placement="right"
              :data-bs-original-title="categoriaNombre" class="custom-tooltip" />
          </div>
        </div>
        <div class="text-center">
          <label class="card-text token py-3 m-auto">Monto mínimo de inversión: ${{
            props.client.monto_inversion == null
              ? "00.00"
              : props.client.monto_inversion
          }}</label>
        </div>
        <div class="row mt-2">
          <button :disabled="loadingCard" class="btn btn-gray" @click="showClient(props.client)">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.token {
  color: var(--gray-color) !important;
}

.custom-absolute {
  position: absolute;
  bottom: 30%;
  right: 5px;
}

.card {
  border: 1px solid var(--gray-color);
}
@media (min-width: 1400px) {
  .col-xxl-3-custom {
    width: 20%;
  }
}
.btn-copiar {
  display: flex;
  background-color: white;
  border: 1px solid var(--gray-color);
  color: black;
  font-size: 0.65rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.5rem;
  border-radius: 4px;
  text-align: center;
  width: 80px;
  position: relative;
}

.btn-copiar:hover {
  background-color: var(--yellow-orange);
  color: white;

}

.tooltip-container {
  position: relative;
}

.custom-tooltip {
  position: relative;
  cursor: pointer;
}
</style>
