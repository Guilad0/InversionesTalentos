<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-4">
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
          <div class="btn-group d-flex justify-content-end my-3" role="group">
            <button id="btnGroupDrop1" type="button" class="btn btn-dark dropdown-toggle btn-sm"
              data-bs-toggle="dropdown" aria-expanded="false">
              Nuevo
            </button>
            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <li>
                <div v-if="vista === 'list'">
                  <button class="dropdown-item" @click="abrirFormulario('post')">
                    Post
                  </button>
                </div>
              </li>
              <li>
                <div v-if="vista === 'list'">
                  <button class="dropdown-item" @click="abrirFormulario('categoria')">
                    Categoría
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-4">
        <h1 class="text-center">Posts</h1>
      </div>
      <div class="col-4"></div>
    </div>

    <!-- Vista para mostrar la lista de posts -->
    <div v-if="vista === 'list'" class="row justify-content-center my-5 gy-3">
      <div v-for="item in posts" :key="item.post_id" class="col-xl-4 col-md-6 col-sm-12">
        <div class="card" style="max-width: 540px;">
          <img :src="item.imagen_portada ? item.imagen_portada : '/assets/empty_img.jpg'"
            class="card-img-top object-fit-cover" style="height: 200px" alt="Image" />
          <div class="card-body">
            <h5 class="card-title">{{ item.titulo }}</h5>
            <small class="text-muted">{{ new Date(item.created_at).toLocaleString() }}</small>
            <div class="card-text d-flex flex-column gap-3 mb-3">
              <p>{{ item.resumen }}</p>
              <div class="d-flex justify-content-between">
                <small class="badge text-bg-dark">{{ obtenerNombreCategoria(item.categoria_id) }}</small>
                <small class="text-muted">{{ obtenerNombreAutor(item.usuario_id) }}</small>
              </div>
            </div>
            <div class="d-flex flex-row gap-3">
              <button @click="leerPost(item.post_id)" class="btn btn-success" style="min-width: 120px;">
                Leer
              </button>
              <button @click="editar(item)" class="btn btn-success" style="min-width: 120px;">
                Editar
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Formulario para gestionar Posts -->
  <div v-if="vista === 'formPost'" class="row justify-content-center">
    <div class="col-md-7">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            {{
              formularioAccion === "registrar"
                ? "Registrar Post"
                : "Actualizar Post"
            }}
          </h5>

          <div class="mb-3">
            <label for="imagen" class="form-label">Imagen</label>
            <input type="file" id="imagen" name="imagen_portada" @change="cargarImagen($event)" class="form-control" />
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="usuario_id" class="form-label">Autor</label>
                <select v-model="usuario_id" id="usuario_id" class="form-select" required>
                  <option value="">Seleccione autor...</option>
                  <option v-for="item in usuarios" :key="item.usuario_id" :value="item.usuario_id">
                    {{ item.nombre + "-" + item.apellido }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="categoria_id" class="form-label">Categoria</label>
                <select v-model="categoria_id" id="categoria_id" class="form-select" required>
                  <option value="">Seleccione categoria...</option>
                  <option v-for="item in categorias" :key="item.categoria_id" :value="item.categoria_id">
                    {{ item.nombre }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" v-model="titulo" id="titulo" class="form-control" />
          </div>

          <div class="mb-3">
            <label for="contenido" class="form-label">Contenido</label>
            <textarea v-model="contenido" id="contenido" class="form-control" cols="30" rows="3"></textarea>
          </div>

          <div class="mb-3">
            <label for="resumen" class="form-label">Resumen</label>
            <textarea v-model="resumen" id="resumen" class="form-control" cols="30" rows="3"></textarea>
          </div>

          <div class="mb-3">
            <label for="estado" class="form-label">Estado</label>
            <select v-model="estado" id="estado" class="form-select" required>
              <option value="">Seleccione estado...</option>
              <option value="1">Publicar</option>
              <option value="0">Borrar</option>
            </select>
          </div>

          <div class="text-center my-3">
            <button v-if="formularioAccion === 'registrar'" @click="registrarPost()" class="btn btn-dark">
              Registrar Post
            </button>
            <button v-else @click="actualizarPost()" class="btn btn-dark">
              Actualizar
            </button>
            <button @click="cancelar()" class="btn btn-dark ms-3">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Formulario para gestionar Categorías -->
  <div v-if="vista === 'formCategoria'" class="row justify-content-center">
    <div class="col-md-7">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Registrar Categoría</h5>

          <div class="mb-3">
            <label for="nombreCategoria" class="form-label">Nombre de la Categoría</label>
            <input type="text" v-model="nombreCategoria" id="nombreCategoria" class="form-control" />
          </div>

          <div class="text-center my-3">
            <button @click="registrarCategoria()" class="btn btn-dark">
              Registrar Categoría
            </button>
            <button @click="cancelar()" class="btn btn-dark ms-3">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";

const baseURL = "http://localhost:3000/";

const vista = ref("list");
const formularioAccion = ref("registrar");
const posts = ref([]);

const usuarios = ref([]);
const categorias = ref([]);

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
  cargarUsuario();
  cargarCategoria();
});

const abrirFormulario = (tipo) => {
  if (tipo === "post") {
    limpiarCampos();
    formularioAccion.value = "registrar";
    vista.value = "formPost";
  } else if (tipo === "categoria") {
    limpiarCampos();
    vista.value = "formCategoria";
  }
};

const leerPost = (post_id) => {
  console.log(post_id);
  // redirigir a post/post_id
  router.push({ name: "post", params: { post_id } });
}

const cargarImagen = (event) => {
  const file = event.target.files[0];
  imagen_portada.value = file;
};

const cargarUsuario = async () => {
  try {
    const response = await axios.get(`${baseURL}users`);
    usuarios.value = response.data.results;
    console.log(usuarios.value);
  } catch (error) {
    console.log(error);
  }
};

const cargarCategoria = async () => {
  try {
    const response = await axios.get(`${baseURL}categoria_posts`);
    categorias.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const cargarDatos = async () => {
  try {
    const response = await axios.get(`${baseURL}posts`);
    posts.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const registrarPost = async () => {
  // if (!usuario_id.value || !categoria_id.value || !titulo.value || !resumen.value || !contenido.value) {
  //   alert('Todos los campos son obligatorios');
  //   return;
  // }
  try {
    const formData = new FormData();
    formData.append("usuario_id", usuario_id.value);
    formData.append("categoria_id", categoria_id.value);
    formData.append("titulo", titulo.value);
    formData.append("resumen", resumen.value);
    formData.append("imagen_portada", imagen_portada.value);
    formData.append("contenido", contenido.value);
    formData.append("estado", 1);

    const response = await axios.post(`${baseURL}posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      alert("Post registrado exitosamente");
      cargarDatos();
      cargarUsuario();
      cargarCategoria();
      vista.value = "list";
      limpiarCampos();
    }
  } catch (error) {
    console.error(error);
  }
};

const actualizarPost = async () => {
  if (
    !usuario_id.value ||
    !categoria_id.value ||
    !titulo.value ||
    !resumen.value ||
    !contenido.value
  ) {
    alert("Todos los campos son obligatorios");
    return;
  }
  try {
    const formData = new FormData();
    formData.append("usuario_id", usuario_id.value);
    formData.append("categoria_id", categoria_id.value);
    formData.append("titulo", titulo.value);
    formData.append("resumen", resumen.value);
    if (imagen_portada.value) {
      formData.append("imagen_portada", imagen_portada.value);
    }
    formData.append("contenido", contenido.value);
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
      alert("Post actualizado exitosamente");
      cargarDatos();
      vista.value = "list";
      limpiarCampos();
    }
  } catch (error) {
    console.error(error);
  }
};

const obtenerNombreAutor = (usuarioId) => {
  const usuario = usuarios.value.find((a) => a.usuario_id === usuarioId);
  return usuario ? `${usuario.nombre} ${usuario.apellido}` : "Desconocido";
};

const obtenerNombreCategoria = (categoriaId) => {
  const categoria = categorias.value.find(
    (c) => c.categoria_id === categoriaId
  );
  return categoria ? categoria.nombre : "Desconocido";
};

const registrarCategoria = async () => {
  if (!nombreCategoria.value) {
    alert("El nombre de la categoría es obligatorio");
    return;
  }
  try {
    const response = await axios.post(`${baseURL}categoria_posts`, {
      nombre: nombreCategoria.value,
    });

    if (response.status === 200) {
      alert("Categoría registrada exitosamente");
      vista.value = "list";
      limpiarCampos();
    }
  } catch (error) {
    console.error(error);
  }
};

const editar = (item) => {
  usuario_id.value = item.usuario_id;
  categoria_id.value = item.categoria_id;
  titulo.value = item.titulo;
  resumen.value = item.resumen;
  contenido.value = item.contenido;
  imagen_portada.value = null;
  seleccionado.value = item;
  formularioAccion.value = "actualizar";
  vista.value = "formPost";
};

const cancelar = () => {
  limpiarCampos();
  vista.value = "list";
};

const limpiarCampos = () => {
  usuario_id.value = "";
  categoria_id.value = "";
  titulo.value = "";
  resumen.value = "";
  imagen_portada.value = null;
  contenido.value = "";
  nombreCategoria.value = "";
  seleccionado.value = {};
};
</script>

<style scoped></style>
