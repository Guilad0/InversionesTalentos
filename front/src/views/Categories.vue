<template>
  <main class="bg-light">
    <div class="content">
      <h4 class="d-block mb-2 text-center title py-4">Categorías</h4>
      <div class="d-flex justify-content-between px-5 mt-2 mb-3">

        <div class="row">
          <div class="col-3">
            <label for="search" class="form-label">Buscar Categoría</label>
          <input
            name="search"
            type="text"
            v-model="search"
            class="form-control"
            placeholder="Buscar ..."
            @input="obtenerCategorias(1, search)"
          />
          </div>
          <div class="col-1"></div>
          <div class="col-8">
            <div class="row">
              <div class="col-6">
                <label for="createNombre" class="form-label">Nombre de la Categoría</label>
            <input
              type="text"
              class="form-control"
              id="createNombre"
              v-model="formCreate.nombre"
              placeholder="Nueva categoría"
              required
            />
              </div>
              <div class="col-6">
                <label for="createImage" class="form-label">Imagen de la Categoría</label>
            <input
              type="file"
              class="form-control"
              id="createImage"
              accept="image/*"
              @change="handleFileChangeCreate"
            />
              </div>
            </div>
            <div class="row py-3">
              <button
            type="button"
            class="btn btn-cat rounded-3"
            @click="createCategory"
          >
            <i class="fa-solid fa-check"></i> Crear Categoría
          </button>
            </div>
          </div>
        </div>

        
      </div>
      <div class="table-responsive col-md-10 offset-md-1">
        <div class="table-container">
          <table class="table overflow-x-scroll">
            <thead>
              <tr class="table-secondary">
                <th class="td-custom">ID</th>
                <th class="td-custom">Nombre</th>
                <th class="td-custom">Imagen</th>
                <th class="td-custom">Estado</th>
                <th class="td-custom">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="categoria in categorias" :key="categoria.categoria_persona_id">
                <td class="text-center">{{ categoria.categoria_persona_id }}</td>
                <td>{{ categoria.nombre }}</td>
                <td class="text-center">
                  <img
                    :src="`${BaseURL.replace('/categories', '')}/uploads/categories/${
                      categoria.imagen
                    }`"
                    alt="Imagen de categoría"
                    width="50"
                  />
                </td>
                <td class="text-center">
                  <span v-if="categoria.estado" class="badge text-bg-success"
                    >Activo</span
                  >
                  <span v-else class="badge text-bg-danger">Inactivo</span>
                </td>
                <td class="text-center">
                  <button
                    @click="editarCategoria(categoria.categoria_persona_id)"
                    class="btn btn-warning btn-sm me-2"
                  >
                    <i class="fa fa-edit"></i>
                  </button>

                  <button
                    v-if="categoria.estado"
                    @click="cambiarEstado(categoria.categoria_persona_id)"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fa fa-times"></i>
                  </button>
                  <button
                    v-else
                    @click="cambiarEstado(categoria.categoria_persona_id)"
                    class="btn btn-success btn-sm"
                  >
                    <i class="fa fa-check"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="d-flex justify-content-center overflow-auto">
          <nav v-if="paginacion.total > 0" aria-label="Page navigation example" class="pagination-container">
            <ul class="pagination flex-wrap">
              <li v-if="paginacion.previous == null" class="page-item disabled">
                <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
              </li>
              <li v-else class="page-item">
                <button
                  @click="obtenerCategorias(paginacion.previous)"
                  class="page-link color-gray fw-bolder rounded-5 border border-3"
                >
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
              </li>
              <li
                v-for="page in paginacion.pages"
                :key="page"
                class="page-item"
                :class="paginacion.current === page ? 'active' : ''"
              >
                <button
                  @click="obtenerCategorias(page)"
                  class="page-link bg-light mx-2 color-gray fw-bolder rounded-5 border border-3"
                >
                  {{ page }}
                </button>
              </li>

              <li v-if="paginacion.next == null" class="page-item disabled">
                <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </li>
              <li v-else class="page-item">
                <button
                  @click="obtenerCategorias(paginacion.next)"
                  class="page-link color-gray fw-bolder rounded-5 border border-3"
                >
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div
    class="modal fade"
    id="modalEditCategory"
    tabindex="-1"
    aria-labelledby="modalEditCategoryLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content modal-card">
        <div class="modal-header text-center">
          <h5 class="modal-title w-100" id="modalEditCategoryLabel">Editar Categoría</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" style="background-color: #17223b">
          <form @submit.prevent="editCategory">
            <div class="container">
              <div class="row mb-3">
                <div class="col-12">
                  <label for="editNombre" class="form-label custom-subtitle">
                    Nombre de la Categoría
                  </label>
                  <input
                    type="text"
                    class="form-control input"
                    id="editNombre"
                    v-model="formEdit.nombre"
                    required
                  />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12">
                  <label for="editImage" class="form-label custom-subtitle">
                    Imagen de la Categoría
                  </label>
                  <input
                    type="file"
                    class="form-control input"
                    id="editImage"
                    @change="handleFileChangeEdit"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-center modal-footer">
                  <button type="submit" class="btn custom-button">Guardar Cambios</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    </div>
  </main>


 
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { successAlert, errorAlert } from "../helpers/iziToast";
const categorias = ref([]);
const paginacion = ref({});
const formCreate = ref({ nombre: "", image: null });
const formEdit = ref({ nombre: "", image: null });
const categoriaEditada = ref(null);
const search = ref("");
// let BaseURL = "https://apitalentos.pruebasdeploy.online/categories";
const BaseURL = import.meta.env.VITE_BASE_URL + "/categories";

const router = useRouter();

onMounted(() => {
  console.log("Ejecutando onMounted");
  obtenerCategorias(); // Esperar a que el DOM esté completamente cargado
  const createModalElement = document.getElementById("modalCreateCategory");
  const editModalElement = document.getElementById("modalEditCategory");
  if (createModalElement) {
    createModalElement.removeEventListener("hidden.bs.modal", handleModalCreateHidden);
    createModalElement.addEventListener("hidden.bs.modal", handleModalCreateHidden);
  }
  if (editModalElement) {
    editModalElement.removeEventListener("hidden.bs.modal", handleModalEditHidden);
    editModalElement.addEventListener("hidden.bs.modal", handleModalEditHidden);
  }
});
const handleModalCreateHidden = () => {
  console.log("Modal de creación cerrado");
  formCreate.value = { nombre: "", image: null }; // Limpiar formulario al cerrar
};
const handleModalEditHidden = () => {
  console.log("Modal de edición cerrado");
  formEdit.value = { nombre: "", image: null }; // Limpiar formulario al cerrar
};

const obtenerCategorias = async (page = 1, search = "") => {
  try {
    const url = `${BaseURL}?page=${page}&search=${encodeURIComponent(search)}`;
    const { data } = await axios.get(url);
    categorias.value = data.results;
    paginacion.value = data.paginacion;
  } catch (error) {
    /* console.error("Error al obtener las categorías:", error);
    alert("Error al cargar las categorías"); */
    errorAlert("Error al cargar las categoria", "Error");
    categorias.value = [];
    paginacion.value = {};
  }
};

const cambiarEstado = async (categoria_persona_id) => {
  try {
    const { data } = await axios.patch(BaseURL + "/state/" + categoria_persona_id);
    obtenerCategorias(); // Vuelve a obtener las categorías después de cambiar el estado
  } catch (error) {
    /* console.error("Error al cambiar el estado de la categoría:", error); */
    errorAlert("Error al cambiar el estado de la categoría:", "error");
  }
};

// Mostrar el modal para editar una categoría existente
const editarCategoria = async (categoria_persona_id) => {
  try {
    const { data } = await axios.get(`${BaseURL}/${categoria_persona_id}`);
    formEdit.value = { nombre: data.nombre, image: null }; // Cargar la categoría para editar
    categoriaEditada.value = data; // Guardar la categoría seleccionada para editar
    // Forzar actualización del DOM antes de mostrar el modal 
    await nextTick();
    const editModal = new bootstrap.Modal(document.getElementById("modalEditCategory"));
    editModal.show();
  } catch (error) {
    errorAlert("Error al obtener la categoría para editar:", "Error");
  }
};

// Manejar el cambio de archivo (imagen)
const handleFileChangeCreate = (event) => {
  formCreate.value.image = event.target.files[0]; // Guardar la imagen seleccionada
};
const handleFileChangeEdit = (event) => {
  formEdit.value.image = event.target.files[0]; // Guardar la imagen seleccionada
};

const createCategory = async () => {
  const formData = new FormData();
  formData.append("nombre", formCreate.value.nombre);
  if (formCreate.value.image) {
    formData.append("image", formCreate.value.image);
  }
  try {
    console.log("Enviando datos al servidor", formCreate.value);
    const { data } = await axios.post(BaseURL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Respuesta recibida:", data);

    if (data.success) {
      successAlert(data.msg, "Éxito"); // Mostrar mensaje de éxito
      obtenerCategorias();
      // Limpiar los campos de input 
      formCreate.value.nombre = ""; 
      formCreate.value.image = null
      document.getElementById("createNombre").value = ""; // Limpiar input de nombre 
      document.getElementById("createImage").value = null
      
    } else {
      errorAlert(data.msg, "Error"); // Mostrar mensaje de error si no fue exitoso
    }
  } catch (error) {
    console.error("Error al crear la categoría", error);
    errorAlert("Error al crear la categoría", "Error"); // Mostrar mensaje de error en caso de excepción
  }
};

const editCategory = async () => {
  const formData = new FormData();
  formData.append("nombre", formEdit.value.nombre);
  if (formEdit.value.image) {
    formData.append("image", formEdit.value.image); // Añadir la imagen al FormData
  }
  try {
    await axios.put(
      `${BaseURL}/${categoriaEditada.value.categoria_persona_id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    successAlert("Categoría actualizada con éxito", "Exito");
    const editModalElement = document.getElementById("modalEditCategory");
    const editModalInstance = bootstrap.Modal.getInstance(editModalElement);
    editModalInstance.hide();
    obtenerCategorias();
  } catch (error) {
    errorAlert("Error al actualizar la categoría", "Error");
  }
};
const clearSearch = () => {
  search.value = "";
  obtenerCategorias();
};
</script>

<style scoped>
.title {
  font-family: var(--font-montserrat-bold);
  font-weight: 700;
  font-size: 30px;
  color: var(--gray-color);
  text-transform: uppercase;
}
/*inicio de la modal*/
.modal-header {
  background-color: var(--dun2-color) !important;
  width: 100%;
  height: 75px;
  border-radius: 15px 15px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
/* .modal-footer {
  background-color: #d9c5b2 !important;
  width: 100%;
  height: 75px;
  border-radius: 0 0 15px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
} */

.modal-card {
  border-radius: 15px;
  overflow: hidden;
  background-color: #17223b;
}

.input {
  /* background-color: rgba(44, 46, 51, 1.1); */
  border-radius: 12px;
  border: 1px solid #F37926 !important;
  box-sizing: border-box;
  color: var(--white-color);
  font-size: 13px;
  height: 50px;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.input:focus {
  background-color: var(--white-color);
  border: 2px solid #f37926;
  outline: none;
  box-shadow: none;
  color: black;
}

.custom-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-cat{
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: var(--gray-color);
  color: white;
  transition: background-color 0.3s ease; 
}
.btn-cat:hover{
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: var(--yellow-orange)!important;
  color: var(--gray-color);
  transition: background-color 0.3s ease; 
}

.custom-button:hover {
  background-color: #d06a20; /* Darker orange */
}


.modal-dialog {
  /* background-image: url("@/assets/images/otro-fondo5.png"); */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  align-items: center;
  /* Centra verticalmente el formulario */
  justify-content: center;
  /* Centra horizontalmente el formulario */
}

/* Botón de cerrar modal */
.btn-close {
  color: var(--yellow-orange);
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

/*titulo de la modal*/
.modal-title {
  color: var(--gray-color);
  font-family: var(--font-montserrat);
  font-size: 28px;
  font-weight: 700;
  margin-top: 1px;
  text-transform: uppercase;
}

.custom-subtitle {
  color: var(--white-color);
  font-family: var(--font-montserrat);
  font-size: 18px;
  font-weight: 700;
  margin-top: 3px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 20px;
}

.ic2 {
  margin-top: 20px;
}

.custom-button {
  background-color: #17223b;
  color: #f3f3f4;
  font-family: var(--font-montserrat);
  font-size: 16px;
  border: none;
  margin-top: 2px;
  height: 30px;
  width: 180px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.custom-button:hover {
  background-color: #f37926 !important;
  color: #fff;
}

/*fin de la Modal*/

.custom-size {
  font-size: 0.9rem;
  font-weight: 630;
}

.content {
  height: 70vh;
  width: 100%;
}

.footer {
  height: 10vh;
}

main {
  height: 90vh;
}

td {
  font-size: 0.9rem;
}

.eye {
  cursor: pointer;
}

.btn:hover {
  background-color: rgba(136, 136, 136, 0.76);
}

.btn-danger:hover {
  background-color: rgba(122, 0, 0, 0.8) !important;
}

.btn-warning:hover {
  background-color: rgba(187, 156, 0, 0.8) !important;
}

.table-container {
  max-height: 60vh;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.table {
  width: 100%;
}

.pagination {
  margin-top: 1rem;
  /* Separación superior para los botones */
  display: flex;
  justify-content: center;
  gap: 0.5rem; /* Espaciado entre botones */
  flex-wrap: wrap; /* Ajusta los botones en varias filas si es necesario */
  
}

.pagination .page-item {
  display: inline-block;
}

.pagination .page-item:nth-child(n + 4):nth-last-child(n + 4):not(.active) {
  display: none;
}

.pagination .page-item.active .page-link {
  background-color: #e0e4ff;
  color: #080808;
  font-weight: bold;
  border: 1.5px solid #b0b8ff;
  box-shadow: 0px 0px 6px rgb(3, 3, 3);
  transform: scale(1.05);
}
.btn-categoria:hover {
  border: none;
  color: white;
  background-color: var(--yellow-orange) !important;
}

.pagination-container {
  max-width: 100%; /* Limita la anchura al contenedor */
  overflow-x: auto; /* Activa el desplazamiento horizontal si es necesario */
  white-space: nowrap; /* Evita saltos de línea */
}

</style>
