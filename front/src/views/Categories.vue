<template>
  <main class="bg-light">
    <div class="content">
      <h4 class="d-block mb-2 text-center title py-5">Categorías</h4>
      <div class="d-flex justify-content-between px-5 mt-2 mb-3">
        <div class="col-2 position-relative">
          <input
            name="search"
            type="text"
            v-model="search"
            class="form-control"
            placeholder="Buscar ..."
            @input="obtenerCategorias(1, search)"
          />
          <div v-if="search !== ''" class="custom-absolute">
            <img
              class="cursor"
              src="../assets/svg/close.svg"
              alt="Descripción del SVG"
              width="25"
              @click="clearSearch"
            />
          </div>
        </div>
        <div class="col-8"></div>
        <div class="col-2 text-end">
          <button
            class="btn bg-gray rounded-3 text-white btn-categoria"
            data-bs-toggle="modal"
            data-bs-target="#modalRegisterCategorie"
            @click="crearCategoria"
          >
            +
            <i class="fa-solid fa-tags"></i>
          </button>
        </div>
      </div>
      <div class="table-responsive col-md-10 offset-md-1">
        <div class="table-container">
          <table class="table overflow-x-scroll">
            <thead>
              <tr class="table-secondary">
                <th>ID</th>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="categoria in categorias" :key="categoria.categoria_persona_id">
                <td>{{ categoria.categoria_persona_id }}</td>
                <td>{{ categoria.nombre }}</td>
                <td>
                  <img
                    :src="`${BaseURL}/${categoria.imagen}`"
                    alt="Imagen de categoría"
                    width="50"
                  />
                </td>
                <td>
                  <span v-if="categoria.estado" class="badge text-bg-success"
                    >Activo</span
                  >
                  <span v-else class="badge text-bg-danger">Inactivo</span>
                </td>
                <td>
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

        <div class="d-flex justify-content-center">
          <nav v-if="paginacion.total > 0" aria-label="Page navigation example">
            <ul class="pagination">
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
    </div>

    <!-- Modal para Crear/Editar Categoría -->
    <div
      class="modal fade"
      id="modalRegisterCategorie"
      tabindex="-1"
      aria-labelledby="modalRegisterCategorieLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content modal-card">
          <!-- Primera fila: Título -->
          <div class="modal-header text-center">
            <h5 class="modal-title w-100" id="modalRegisterCategorieLabel">
              {{ editMode ? "Editar Categoría" : "Crear Nueva Categoría" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <!-- Segunda fila: Contenido del formulario -->
          <div class="modal-body" style="background-color: #17223b">
            <form @submit.prevent="saveCategory">
              <div class="container">
                <!-- Campo: Nombre -->
                <div class="row mb-3">
                  <div class="col-12">
                    <label for="nombre" class="form-label custom-subtitle"
                      >Nombre de la Categoría</label
                    >
                    <input
                      type="text"
                      class="form-control input"
                      id="nombre"
                      v-model="form.nombre"
                      required
                    />
                  </div>
                </div>

                <!-- Campo: Imagen -->
                <div class="row mb-3">
                  <div class="col-12">
                    <label for="image" class="form-label custom-subtitle"
                      >Imagen de la Categoría</label
                    >
                    <input
                      type="file"
                      class="form-control input"
                      id="image"
                      @change="handleFileChange"
                    />
                  </div>
                </div>

                <!-- Botón: Crear/Guardar -->
                <div class="row">
                  <div class="col-12 text-center modal-footer">
                    <button type="submit" class="btn custom-button">
                      {{ editMode ? "Guardar Cambios" : "Crear Categoría" }}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const categorias = ref([]);
const paginacion = ref({});
const form = ref({ nombre: "", image: null });
const editMode = ref(false);
const categoriaEditada = ref(null);
const search = ref("");
// let BaseURL = "https://apitalentos.pruebasdeploy.online/categories";
const BaseURL = import.meta.env.VITE_BASE_URL + "/categories";

const router = useRouter();

onMounted(() => {
  obtenerCategorias();
  const modalElement = document.getElementById("modalRegisterCategorie");
  modalElement.addEventListener("hidden.bs.modal", () => {
    form.value = { nombre: "", image: null }; // Limpiar formulario al cerrar
  });
});

const obtenerCategorias = async (page = 1, search = "") => {
  try {
    const url = `${BaseURL}?page=${page}&search=${encodeURIComponent(search)}`;
    const { data } = await axios.get(url);
    categorias.value = data.results;
    paginacion.value = data.paginacion;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    alert("Error al cargar las categorías");
    categorias.value = [];
    paginacion.value = {};
  }
};

const cambiarEstado = async (categoria_persona_id) => {
  try {
    const { data } = await axios.patch(BaseURL + "/state/" + categoria_persona_id);
    obtenerCategorias(); // Vuelve a obtener las categorías después de cambiar el estado
  } catch (error) {
    console.error("Error al cambiar el estado de la categoría:", error);
  }
};

// Mostrar el modal para crear una nueva categoría
const crearCategoria = () => {
  form.value = { nombre: "", image: null }; // Limpiar los campos del formulario
  editMode.value = false; // Modo de creación
  categoriaEditada.value = null; // No hay categoría seleccionada
  const modalElement = document.getElementById("modalRegisterCategorie");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

// Mostrar el modal para editar una categoría existente
const editarCategoria = async (categoria_persona_id) => {
  try {
    const { data } = await axios.get(`${BaseURL}/${categoria_persona_id}`);
    form.value = { nombre: data.nombre, image: null }; // Cargar la categoría para editar
    categoriaEditada.value = data; // Guardar la categoría seleccionada para editar
    editMode.value = true; // Modo de edición
    const modal = new bootstrap.Modal(document.getElementById("modalRegisterCategorie"));
    modal.show();
  } catch (error) {
    console.error("Error al obtener la categoría para editar:", error);
  }
};

// Manejar el cambio de archivo (imagen)
const handleFileChange = (event) => {
  form.value.image = event.target.files[0]; // Guardar la imagen seleccionada
};

// Guardar la categoría (crear o editar)
const saveCategory = async () => {
  const formData = new FormData();
  formData.append("nombre", form.value.nombre);
  if (form.value.image) {
    formData.append("image", form.value.image); // Añadir la imagen al FormData
  }

  try {
    if (editMode.value) {
      // Si estamos en modo edición, hacemos un PUT o PATCH para actualizar la categoría
      await axios.put(
        `${BaseURL}/${categoriaEditada.value.categoria_persona_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Categoría actualizada con éxito");
    } else {
      // Si estamos en modo creación, hacemos un POST para crear una nueva categoría
      await axios.post(BaseURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Categoría creada con éxito");
    }

    // Cerrar el modal correctamente
    const modalElement = document.getElementById("modalRegisterCategorie");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    obtenerCategorias();
  } catch (error) {
    console.error("Error al guardar la categoría:", error);
    alert("Hubo un error al guardar la categoría");
  }
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
  background-color: #d9c5b2 !important;
  width: 100%;
  height: 75px;
  border-radius: 15px 15px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.modal-footer {
  background-color: #d9c5b2 !important;
  width: 100%;
  height: 75px;
  border-radius: 0 0 15px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.modal-card {
  border-radius: 15px;
  overflow: hidden;
  background-color: #17223b;
}

.input {
  background-color: rgba(44, 46, 51, 1.1);
  border-radius: 12px;
  border: 0;
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
</style>
