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
                  <button class="dropdown-item" @click="abrirFormulario('post')">Post</button>
                </div>
              </li>
              <li>
                <div v-if="vista === 'list'">
                  <button class="dropdown-item" @click="abrirFormulario('categoria')">Categoría</button>
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
    <div v-if="vista === 'list'" class="row justify-content-center my-5">
      <div v-for="item in posts" :key="item.post_id" class="col-md-6">
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="item.imagen_portada" class="img-fluid rounded-start" alt="Image">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ item.titulo }}</h5>
                <p class="card-text">{{ item.contenido }}</p>
                <p class="card-text">
                  <small class="text-muted">{{ new Date(item.created_at).toLocaleString() }}</small>
                </p>
                <p class="card-text">
                  <small class="text-muted">{{ item.autor_id }}</small>
                  <small class="text-muted">{{ item.categoria_id }}</small>
                  <button @click="editar(item)" class="btn btn-success">Editar</button>
                </p>
              </div>
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
            <h5 class="card-title">{{ formularioAccion === 'registrar' ? 'Registrar Post' : 'Actualizar Post' }}</h5>

            <div class="mb-3">
              <label for="imagen" class="form-label">Imagen</label>
              <input type="file" id="imagen" name="imagen_portada" @change="cargarImagen($event)" class="form-control">
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="autor_id" class="form-label">Autor</label>
                  <select v-model="autor_id" id="autor_id" class="form-select" required>
                    <option value="">Seleccione autor...</option>
                    <option v-for="item in autores" :key="item.usuario_id" :value="item.usuario_id">
                      {{ item.nombre + '-' + item.apellido }}
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
              <input type="text" v-model="titulo" id="titulo" class="form-control">
            </div>

            <div class="mb-3">
              <label for="contenido" class="form-label">Contenido</label>
              <textarea v-model="contenido" id="contenido" class="form-control" cols="30" rows="3"></textarea>
            </div>

            <div class="mb-3">
              <label for="resumen" class="form-label">Resumen</label>
              <textarea v-model="resumen" id="resumen" class="form-control" cols="30" rows="3"></textarea>
            </div>

            <div class="text-center my-3">
              <button v-if="formularioAccion === 'registrar'" @click="registrarPost()" class="btn btn-dark">Registrar
                Post</button>
              <button v-else @click="actualizarPost()" class="btn btn-dark">Actualizar</button>
              <button @click="cancelar()" class="btn btn-dark ms-3">Cancelar</button>
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
              <input type="text" v-model="nombreCategoria" id="nombreCategoria" class="form-control">
            </div>

            <div class="text-center my-3">
              <button @click="registrarCategoria()" class="btn btn-dark">Registrar Categoría</button>
              <button @click="cancelar()" class="btn btn-dark ms-3">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const baseURL = 'http://localhost:3000/'

const vista = ref('list');
const formularioAccion = ref('registrar');
const posts = ref([])

const autores = ref([]);
const categorias = ref([]);

const autor_id = ref(0);
const categoria_id = ref(0);
const titulo = ref('');
const resumen = ref('');
const imagen_portada = ref(null);
const contenido = ref('');
const estado = ref(false);
const nombreCategoria = ref('');

const seleccionado = ref({});

onMounted(() => {
  cargarDatos();
  cargarAutor();
  cargarCategoria();
});

const abrirFormulario = (tipo) => {
  if (tipo === 'post') {
    limpiarCampos();
    formularioAccion.value = 'registrar';
    vista.value = 'formPost';
  } else if (tipo === 'categoria') {
    limpiarCampos();
    vista.value = 'formCategoria';
  }
};

const cargarImagen = (event) => {
  const file = event.target.files[0];
  imagen_portada.value = file;
};

const cargarAutor = async () => {
  try {
    const response = await axios.get(`${baseURL}usuarios`);
    autores.value = response.data.data;
  } catch (error) {
    console.log(error)
  }
}

const cargarCategoria = async () => {
  try {
    const response = await axios.get(`${baseURL}categoria_posts`);
    categorias.value = response.data.data;
  } catch (error) {
    console.log(error)
  }
}

const cargarDatos = async () => {
  try {
    const response = await axios.get(`${baseURL}posts`);
    posts.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const registrarPost = async () => {
  // if (!autor_id.value || !categoria_id.value || !titulo.value || !resumen.value || !contenido.value) {
  //   alert('Todos los campos son obligatorios');
  //   return;
  // }
  try {
    const formData = new FormData();
    formData.append("autor_id", autor_id.value);
    formData.append("categoria_id", categoria_id.value);
    formData.append("titulo", titulo.value);
    formData.append("resumen", resumen.value);
    formData.append("imagen_portada", imagen_portada.value);
    formData.append("contenido", contenido.value);
    formData.append("estado", 1);

    const response = await axios.post(`${baseURL}posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 201) {
      alert('Post registrado exitosamente');
      cargarDatos();
      cargarAutor();
      cargarCategoria();
      vista.value = 'list';
      limpiarCampos();
    }

  } catch (error) {
    console.error(error);
  }
};

const actualizarPost = async () => {
  if (!autor_id.value || !categoria_id.value || !titulo.value || !resumen.value || !contenido.value) {
    alert('Todos los campos son obligatorios');
    return;
  }
  try {
    const formData = new FormData();
    formData.append("autor_id", autor_id.value);
    formData.append("categoria_id", categoria_id.value);
    formData.append("titulo", titulo.value);
    formData.append("resumen", resumen.value);
    if (imagen_portada.value) {
      formData.append("imagen_portada", imagen_portada.value);
    }
    formData.append("contenido", contenido.value);
    formData.append("estado", 1);

    const response = await axios.put(`${baseURL}posts/${seleccionado.value.post_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 200) {
      alert('Post actualizado exitosamente');
      cargarDatos();
      vista.value = 'list';
      limpiarCampos();
    }
  } catch (error) {
    console.error(error);
  }
};

const registrarCategoria = async () => {
  if (!nombreCategoria.value) {
    alert('El nombre de la categoría es obligatorio');
    return;
  }
  try {
    const response = await axios.post(`${baseURL}categoria_posts`, {
      nombre: nombreCategoria.value,
    });

    if (response.status === 200) {
      alert('Categoría registrada exitosamente');
      vista.value = 'list';
      limpiarCampos();
    }
  } catch (error) {
    console.error(error);
  }
};

const editar = (item) => {
  autor_id.value = item.autor_id;
  categoria_id.value = item.categoria_id;
  titulo.value = item.titulo;
  resumen.value = item.resumen;
  contenido.value = item.contenido;
  imagen_portada.value = null;
  seleccionado.value = item;
  formularioAccion.value = 'actualizar';
  vista.value = 'formPost';
};

const cancelar = () => {
  limpiarCampos();
  vista.value = 'list';
};

const limpiarCampos = () => {
  autor_id.value = '';
  categoria_id.value = '';
  titulo.value = '';
  resumen.value = '';
  imagen_portada.value = null;
  contenido.value = '';
  nombreCategoria.value = '';
  seleccionado.value = {};
};
</script>

<style scoped></style>
