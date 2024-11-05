<template>
  <main class="bg-light pt-4 ps-4">
    <div class="content">
      <h4 class="d-block mb-2 text-center underline py-5">Guías de Usuarios</h4>
      <div class="table-center py-3">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr class="table-secondary">
                <th class="custom-size">ID</th>
                <th class="custom-size">Nombre usuario</th>
                <th class="custom-size">Fecha de creación</th>
                <th class="custom-size">Fecha de edición</th>
                <th class="custom-size">Estado</th>
                <th class="custom-size">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in posts" :key="item.post_id">
                <td>{{ item.post_id }}</td>
                <td>{{ item.titulo }}</td>
                <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
                <td>{{ new Date(item.updated_at).toLocaleDateString() }}</td>
                <td>
                  <span v-if="item.estado == 'Activo'" class="badge text-bg-success">{{
                    item.estado
                  }}</span>
                  <span v-if="item.estado == 'Inactivo'" class="badge text-bg-danger">{{
                    item.estado
                  }}</span>
                </td>
                <td v-if="item.estado == 'Activo'">
                  <button
                    class="btn btn-danger btn-sm mx-1"
                    @click="cambiarEstado(item.post_id)"
                  >
                    <i class="fa fa-times"></i>
                  </button>
                </td>
                <td v-else>
                  <button
                    class="btn btn-success btn-sm mx-1"
                    @click="cambiarEstado(item.post_id)"
                  >
                    <i class="fa fa-check"></i>
                  </button>
                  <button
                    class="btn bg-white text-danger color-danger border-danger btn-sm mx-1"
                    @click="editar(item.post_id)"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { onMounted, ref } from "vue";

const baseURL = "http://localhost:3000/";
const posts = ref([]);

const usuario_id = ref("");
const categoria_id = ref("");
const titulo = ref("");
const resumen = ref("");
const imagen_portada = ref(null);
const contenido = ref("");
const estado = ref(false);
const nombreCategoria = ref("");

const seleccionado = ref({});

onMounted(() => {
  cargarDatos();
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
</script>

<style scoped>
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
</style>
