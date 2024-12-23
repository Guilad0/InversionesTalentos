<template>
  <main class="bg-light">
    <div class="content pt-4">
      <h4 class="d-block mb-2 text-center title py-4">Rubros</h4>


          
      <div class="table-responsive col-md-10 offset-md-1">
        <div class="d-flex gap-3   justify-content-center align-content-center ">
              <div class="col">
                <label for="createNombre" class="form-label fw-bolder">Nombre del Rubro</label>
            <input
              type="text"
              class="form-control placeHolderCustom rounded-5"
              id="createNombre"
              v-model="formCreate.nombre"
              placeholder="Escribe aquí el nombre del rubro"
              required
            />
              </div>
              <div class="col">
                <label for="createImage" class="form-label fw-bolder">Imagen</label>
            <input
              type="file"
              class="form-control "
              id="createImage"
              accept="image/*"
              @change="handleFileChangeCreate"
            />
              </div>
              <div class="col">
                <label for="montoMin" class="form-label fw-bolder">Inversion Minima</label>
            <input
              type="number"
              class="form-control"
              id="montoMin"
              min="0"
              v-model="montoInvMin"
              placeholder="Monto maximo de inversion"
            />
              </div>
              <div class="col">
                <label for="montoMax" class="form-label fw-bolder">Inversion Maxima</label>
            <input
              type="number"
              class="form-control"
              id="montoMax"
              min="0"
              v-model="montoInvMax"
              placeholder="Monto maximo de inversion"
            />
              </div>
              <div class="col">
                <label for="porcentaje" class="form-label fw-bolder">Porcentaje</label>
                <input 
                  type="number"
                  class="form-control"
                  id="porcentaje"
                  min="0"
                  v-model="porcentaje_interes"
                />
              </div>
         
              <div class="text-center col m-auto">
              <button
            type="button"
            class="btn btn-gray rounded-3 border-1 border"

            :disabled="formCreate.nombre == '' || formCreate.image == null || montoInvMax <= 0 || montoInvMin <= 0"
            @click="createCategory"
          >
             Registrar Rubro
          </button>
            </div>
 
        </div>
        <div class="col-3 my-3">
            <!-- <label for="search" class="form-label fw-bolder">Buscar Categoría</label> -->
          <input
            name="search"
            type="text"
            v-model="search"
            class="form-control rounded-5 w-75 border-2 placeHolderCustom"
            placeholder="Buscar rubro por su nombre"
            @input="obtenerCategorias(1, search)"
          />
          </div>
        <div class="table-container">
          <table class="table overflow-x-scroll">
            <thead>
              <tr class="table-secondary">
                <th class="td-custom">ID</th>
                <th class="td-custom">Nombre</th>
                <th class="td-custom">Inversion Minima</th>
                <th class="td-custom">Inversion Maxima</th>
                <th class="td-custom">Porcentaje</th>
                <th class="td-custom">Imagen</th>
                <th class="td-custom">Estado</th>
                <th class="td-custom">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="categoria in categorias" :key="categoria.categoria_persona_id">
                <td class="text-center align-middle">{{ categoria.categoria_persona_id }}</td>
                <td class="align-middle ">{{ categoria.nombre }}</td>
                <td class="align-middle text-center"> {{ categoria.monto_minimo_inversion }}</td>
                <td class="align-middle text-center"> {{ categoria.monto_maximo_inversion }}</td>
                <td class="align-middle text-center">{{ categoria.porcentaje_interes }}%</td>
                <td class="text-center">
                  <img
                    :src="`${BaseURL.replace('/categories', '')}/uploads/categories/${
                      categoria.imagen
                    }`"
                    alt="Imagen de categoría"
                    width="50"
                    class=" rounded img-thumbnail "
                  />
                </td>
                <td class="text-center align-middle">
                  <span v-if="categoria.estado" class="badge text-bg-success"
                    >Activo</span
                  >
                  <span v-else class="badge text-bg-danger">Inactivo</span>
                </td>
                <td class="text-center align-middle" v-if="categoria.estado !== 0">
                  <button
                     
                    @click="editarCategoria(categoria.categoria_persona_id, categoria.monto_minimo_inversion, categoria.monto_maximo_inversion, categoria.porcentaje_interes)"
                    class="border-0  me-2 hover-button p-0"
                  >
                  <i class="fa-regular fa-pen-to-square"></i>
                  </button>

                  <button
                    v-if="categoria.estado"
                    @click="cambiarEstado(categoria.categoria_persona_id)"
                    class="border-0 ms-2 hover-button fs-6  rounded-5 p-0 m-auto"
                  >
                  <i class="fa-solid fa-ban text-danger"></i>
                  </button>
                </td>
                  <td class="text-center align-middle" v-else>
                    <button
                      @click="cambiarEstado(categoria.categoria_persona_id)"
                      class="border-0 hover-button fs-6  rounded-5 p-0 m-auto"
                    >
                    <i class="fa-regular fa-circle-check text-success align-middle"></i>
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
        <div class="d-flex justify-content-center overflow-auto ">
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
                  <div class="row ">
                    <div class="col">
                      <label for="editNombre" class="form-label custom-subtitle">
                        Nombre de la Categoría
                      </label>
                      <input
                        type="text"
                        class="form-control input text-dark"
                        id="editNombre"
                        v-model="formEdit.nombre"
                        required
                      />
                    </div>
                  </div>
                  <div class="row my-2 ">
                    <div class="col">
                      <label for="editImage" class="form-label custom-subtitle ">
                        Imagen de la Categoría
                      </label>
                      <input
                        type="file"
                        class="form-control input text-dark"
                        id="editImage"
                        @change="handleFileChangeEdit"
                      />
                    </div>
                  </div>
                  <div class="row ">
                    <div class="col">
                      <label for="editImage" class="form-label custom-subtitle ">Inversion minima</label>
                      <input type="number" class="form-control input text-dark" v-model="montoMin">
                    </div>
                    <div class="col">
                      <label for="editImage" class="form-label custom-subtitle ">Inversion Maxima</label>
                      <input type="number" class="form-control input text-dark" v-model="montoMax">
                    </div>
                    <div class="col">
                      <label for="editImage" class="form-label custom-subtitle padding">Porcentaje</label>
                      <input type="number" class="form-control input text-dark" step="0.01" v-model="porcentaje">
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mt-4 mb-2">
                      <button type="submit"  class="border btn btn-gray">Guardar Cambios</button>
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
const montoInvMin = ref(0);
const montoInvMax = ref(0);
const montoMax = ref(0);
const montoMin = ref(0);
const porcentaje_interes = ref(0);
const porcentaje = ref(0);
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
    console.log(categorias.value);
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
const editarCategoria = async (categoria_persona_id,monto_minimo_inv,monto_maximo_inv, porcentaje_interes ) => {
  try {
    const { data } = await axios.get(`${BaseURL}/${categoria_persona_id}`);
    formEdit.value = { nombre: data.nombre, image: null }; // Cargar la categoría para editar
    categoriaEditada.value = data; // Guardar la categoría seleccionada para editar
    // Forzar actualización del DOM antes de mostrar el modal 
    montoMax.value = monto_maximo_inv
    montoMin.value = monto_minimo_inv
    porcentaje.value = porcentaje_interes
    await nextTick();
    const editModal = new bootstrap.Modal(document.getElementById("modalEditCategory"));
    editModal.show();
  } catch (error) {
    console.error("Error al obtener la categoría para editar:", error);
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
  formData.append("nombre", formCreate.value.nombre.trim());
  formData.append("montoInvMin", montoInvMin.value);
  formData.append("montoInvMax", montoInvMax.value);
  formData.append("porcentaje_interes", porcentaje_interes.value);
  
  if (!formCreate.value.image) {
    errorAlert("La imagen es requerida", "Error"); // Mostrar mensaje de error en caso de excepción
    return
  }
  if (montoInvMin.value >= montoInvMax.value ) {
    errorAlert("El monto minimo de inversion no puede ser mayor a monto maximo", "Error"); // Mostrar mensaje de error en caso de excepción
    return
  }
  if ( formCreate.value.nombre.length <= 3 ) {
    errorAlert("El nombre de la categoria debe contener al menos 3 caracteres", "Error"); // Mostrar mensaje de error en caso de excepción
    return
  }
  if (formCreate.value.image) {
    formData.append("image", formCreate.value.image);
  }
  //el interes sea solo del 1 al 100
  if(!porcentaje_interes.value || porcentaje_interes.value < 1 || porcentaje_interes.value > 100) {
  errorAlert("El interés debe estar entre 1 y 100", "Error");
  return;
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
      montoInvMax.value = 0;
      montoInvMin.value = 0;
      porcentaje_interes.value = 0;
      
    } else {
      errorAlert(data.msg, "Error"); // Mostrar mensaje de error si no fue exitoso
    }
  } catch (error) {
    console.error("Error al crear la categoría", error);
    errorAlert("El nombre de categoria ya existe", "Error"); // Mostrar mensaje de error en caso de excepción
  }
};


const editCategory = async () => {
  if (!montoMin.value  || !montoMax.value || montoMin.value <= 0 || montoMax.value <= 0) {
    errorAlert("Los montos de inversion son requeridos", "Error"); // Mostrar mensaje de error en caso de excepción
    return
  }
  if (montoMin.value >= montoMax.value ) {
    errorAlert("La inversion minima no puede ser mayor a inversion maxima", "Error"); // Mostrar mensaje de error en caso de excepción
    return
  }
  if(!porcentaje.value || porcentaje.value < 1 || porcentaje.value > 100) {
  errorAlert("El interés debe estar entre 1 y 100", "Error");
  return;
  }
  
  const formData = new FormData();
  formData.append("nombre", formEdit.value.nombre.trim());
  formData.append("monto_minimo_inversion", montoMin.value);
  formData.append("monto_maximo_inversion", montoMax.value);
  formData.append("porcentaje_interes", porcentaje.value);
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
   await obtenerCategorias();
   montoMin.value = 0;
   montoMax.value = 0;
   porcentaje.value = 0;
  } catch (error) {
    errorAlert("El nombre de categoria ya existe", "Error");
  }
  console.log('enviado');
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
.padding{
  padding-top: 27px;
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
  min-height: 70vh;
  width: 100%;
}

.footer {
  height: 10vh;
}

main {
  min-height: 90vh;
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
.placeHolderCustom::placeholder{
  font-size: 0.7rem;
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

/* .hover-button:hover{
  font-size: 1.2rem !important;
  transform: scale(1.2) !important;
}
.hover-button{
  transition: transform 0.8s ease-in;

} */



</style>
