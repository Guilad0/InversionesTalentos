<template>
  <main class="bg-light pt-4 ps-4">
    <div class="content">
      <h4 class="d-block mb-2 py-3 text-center title">Guías de Usuarios</h4>
      <div class="table-center py-3">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr class="table-secondary">
                <th class="custom-size td-custom">ID</th>
                <th class="custom-size td-custom">Nombre De Guia</th>
                <th class="custom-size td-custom">Fecha de Creación</th>
                <th class="custom-size td-custom">Fecha de Edición</th>
                <th class="custom-size td-custom">Estado</th>
                <th class="custom-size td-custom">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in posts" :key="item.post_id">
                <td class="text-center">{{ item.post_id }}</td>
                <td>{{ item.titulo }}</td>
                <td class="text-center">{{ new Date(item.created_at).toLocaleDateString() }}</td>
                <td class="text-center">{{ new Date(item.updated_at).toLocaleDateString() }}</td>
                <td class="text-center">
                  <span v-if="item.estado == 'Activo'" class="badge text-bg-success">{{
                    item.estado
                  }}</span>
                  <span v-if="item.estado == 'Inactivo'" class="badge text-bg-danger">{{
                    item.estado
                  }}</span>
                </td>
                <td class="text-center" v-if="item.estado == 'Activo'">
                  <button class="btn btn-danger btn-sm mx-1" @click="cambiarEstado(item.post_id)">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
                <td class="text-center" v-else>
                  <button class="btn btn-success btn-sm mx-1" @click="cambiarEstado(item.post_id)">
                    <i class="fa fa-check"></i>
                  </button>
                  <button class="btn btn-warning btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    @click="editar(item)">
                    <i class="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Edición de Guía</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <div class="mb-3">
                <label for="contenido" class="form-label">Contenido</label>
                  <!-- <textarea id="contenido" class="form-control" rows="5" v-model="contenido"></textarea> -->
                <div id="summernote"> 
                </div>
                
              </div>
              <div class="mb-3">
                <label for="imagen_portada" class="form-label">Imagen de Portada</label>
                <input type="file" id="imagen_portada" class="form-control" @change="onFileChange" accept=".png, .jpeg, .jpg" />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="actualizarPost">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// import "summernote/dist/summernote-bs5.js";
// import "summernote/dist/summernote-bs5.css";
import "summernote/dist/summernote-lite.css";
import $ from "jquery";
import "summernote/dist/summernote-lite.js";

import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import {successAlert, errorAlert} from "../helpers/iziToast";

// const baseURL = "https://apitalentos.pruebasdeploy.online/";
const baseURL = import.meta.env.VITE_BASE_URL + "/";
const posts = ref([]);

const titulo = ref("");
const imagen_portada = ref(null);
const contenido = ref("");
const estado = ref(false);
const seleccionado = ref({});

const router = useRouter();

onMounted( async () => {
  $('#summernote').summernote({
        // placeholder: 'Hello Bootstrap 5',
        tabsize: 2,
        height: 200,
        callbacks: {
          onChange: (contents)=>{
            contenido.value = contents
          }
        }
      });
  cargarDatos();
  if (contenido.value) {
    $('#summernote').summernote('code', contenido.value);
  }
});

const cargarDatos = async () => {
  try {
    const response = await axios.get(`${baseURL}posts`);
    posts.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const cambiarEstado = async (post_id) => {
  try {
    await axios.patch(`${baseURL}posts/estado/${post_id}`);
    cargarDatos();
  } catch (error) {
    console.error("Error al cambiar el estado:", error);
  }
};

const onFileChange = (event) => {
  imagen_portada.value = event.target.files[0];
};

// const actualizarPost = async () => {
//   if (!contenido.value) {
//     alert("El campo de contenido es obligatorio");
//     return;
//   }
//   try {
//     const formData = new FormData();
//     formData.append("titulo", seleccionado.value.titulo);
//     formData.append("contenido", contenido.value);
//     if (imagen_portada.value) {
//       formData.append("imagen_portada", imagen_portada.value);
//     }
//     formData.append("estado", 1);
//     console.log(formData);
    
//     const response = await axios.put(
//       `${baseURL}posts/${seleccionado.value.post_id}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     if (response.status === 200) {
//       alert("Post actualizado exitosamente");
//       cargarDatos();

//       const modal = document.getElementById("staticBackdrop");
//       const bsModal = bootstrap.Modal.getInstance(modal);
//       bsModal.hide();
//     }
//   } catch (error) {
//     console.error("Error al actualizar el post:", error);
//   }
// };

const actualizarPost = async () => {
  if (!contenido.value) {
    alert("El campo de contenido es obligatorio");
    return;
  }

  // Extraer título del contenido si es necesario
  const parser = new DOMParser();
  const doc = parser.parseFromString(contenido.value, "text/html");
  const extractedTitle = doc.querySelector("h3")?.innerText || seleccionado.value.titulo;
  const extractedContent = doc.body.innerHTML.replace(/<h3>.*<\/h3>/, "").trim();

  try {
    const formData = new FormData();
    formData.append("titulo", extractedTitle);
    formData.append("contenido", extractedContent);
    
    
    if (imagen_portada.value) {
      formData.append("imagen_portada", imagen_portada.value);
    }
    formData.append("estado", 1);

    const response = await axios.put(
      `${baseURL}posts/${seleccionado.value.post_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      // alert("Post actualizado exitosamente");
      successAlert('Post actualizada Exitosamente','Exito')
      cargarDatos();

      const modal = document.getElementById("staticBackdrop");
      const bsModal = bootstrap.Modal.getInstance(modal);
      bsModal.hide();
    }
  } catch (error) {
    console.error("Error al actualizar el post:", error);
  }
  contenido.value = "";
};


const editar = (item) => {
  seleccionado.value = item;
  contenido.value = `${item.contenido}`;
  imagen_portada.value = null;
  
  $('#summernote').summernote('code', contenido.value);
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
  background-color: rgba(136, 136, 136, 0.76) !important;
}

.table-center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
}

.table-container {
  max-width: 100%;
  margin-bottom: 1rem;
}

.table {
  width: 150%;
}

.modal-dialog {
  max-height: 80% !important;
  max-width: 80% !important;
  margin: 0 auto;
}
</style>
