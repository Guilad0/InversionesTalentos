<template>
  <main class="bg-light mb-5 ">
    <div class="content ">
      <h2 class="d-block text-start mb-5 mt-5 text-center title">
        Ajustes
      </h2>
      <div class="mt-5">
        <h2 class="text-xl font-bold my-4 ms-5">
          Ajustes Transacciones
        </h2>
        <div class="table-responsive table-center col-md-10 offset-md-1">
          <table class="table overflow-x-scroll">
            <thead>
              <tr class="table-secondary text-center">
                <th class="custom-size td-custom" data-bs-toggle="tooltip" title="Porcentaje de ganancia obtenido como comisión">
                  Comisión % de Ganancia
                </th>
                <th class="custom-size td-custom" data-bs-toggle="tooltip" title="Porcentaje cobrado al realizar un retiro">
                  Comisión % de Retiro
                </th>
                <th class="custom-size td-custom" data-bs-toggle="tooltip"
                  title="Mínimo tiempo requerido para mantener una inversión (Meses)">
                  Tiempo Mínimo de Inversión
                </th>
                <th class="custom-size td-custom" data-bs-toggle="tooltip"
                  title="Máximo tiempo permitido para mantener una inversión (Meses)">
                  Tiempo Máximo de Inversión
                </th>
                <th class="custom-size td-custom" data-bs-toggle="tooltip" title="Valor actual del token en el mercado">
                  Valor Token
                </th>
                <th class="custom-size td-custom" data-bs-toggle="tooltip" title="Acciones disponibles para este registro">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">{{ combinedData.comision_porcentual_ganancia }}</td>
                <td class="text-center">{{ combinedData.comision_porcentual_retiro }}</td>
                <td class="text-center">{{ combinedData.tiempo_minimo_inversion }}</td>
                <td class="text-center">{{ combinedData.tiempo_maximo_inversion }}</td>
                <td class="text-center">{{ combinedData.valor_token }}</td>
                <td class="text-center">
                  <button class="border-0 rounded-circle btn-sm " @click="editUser(combinedData)">
                    <i class="fa fa-edit text-secondary"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true"
        style="background:rgba(0, 0, 0, 0.7) !important;">
        <div class="modal-dialog">
          <div class="modal-content modal-custom">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Editar Usuario</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body modal-body-custom">
              <form>
                <div class="mb-3">
                  <label class="form-label">Comisión % de Ganancia</label>
                  <input type="number" class="form-control" v-model="comision_porcentual_ganancia" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Comisión % de Retiro</label>
                  <input type="number" class="form-control" v-model="comision_porcentual_retiro" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Tiempo Mínimo de Inversión</label>
                  <input type="number" class="form-control" v-model="tiempo_minimo_inversion" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Tiempo Máximo de Inversión</label>
                  <input type="number" class="form-control" v-model="tiempo_maximo_inversion" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Valor Token</label>
                  <input type="number" class="form-control" v-model="valor_token" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="button" class="btn btn-dark" @click="saveEdit()">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 class="text-xl font-bold my-4 ms-5">
        Detalles Ajustes Transacciones
      </h2>
      <div class="container mt-5 px-5">
        <div class="d-flex gap-3">
          <div class="col">
            <div class="card  mb-3" style="max-width: 18rem;">
              <div class="card-header bg-gray text-light fw-bold">Comisión % de Ganancia</div>
              <div class="card-body">
                <p class="card-text">Porcentaje de ganancia obtenido como comisión.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card  mb-3" style="max-width: 18rem;">
              <div class="card-header bg-gray text-light fw-bold">Comisión % de Retiro</div>
              <div class="card-body">
                <p class="card-text">Porcentaje cobrado al realizar un retiro.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card  mb-3" style="max-width: 18rem;">
              <div class="card-header bg-gray text-light fw-bold">Tiempo Mínimo de Inversión</div>
              <div class="card-body">
                <p class="card-text">Mínimo tiempo requerido para mantener una inversión (Meses).</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card  mb-3" style="max-width: 18rem;">
              <div class="card-header bg-gray text-light fw-bold">Tiempo Máximo de Inversión</div>
              <div class="card-body">
                <p class="card-text">Máximo tiempo permitido para mantener una inversión (Meses).</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card  mb-3" style="max-width: 18rem;">
              <div class="card-header bg-gray text-light fw-bold">Valor Token</div>
              <div class="card-body">
                <p class="card-text">Valor actual del token en el mercado.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
      <h2 class="text-xl font-bold my-4 ms-5">
        Ajustes Web
      </h2>
      <div class="container ">
        <div class="card border-0  ">
          <div class="card-body">
            <div class="d-flex mx-5">
              <div class="col">
                <label for="name" class="fw-bold my-3">Nombre del Sistema</label>
                <input type="text" v-model="nameSystem" id="name" class="form-control w-50 ">
                <button :disabled="loading || loadingImage" class="btn-blue btn my-3 rounded-3  " @click="saveName" >
                  <label class="cursor" v-if="!loading || !loadingImage == false">Actualizar</label>
                  <label v-if="loading">Guardando...</label>
                </button>
              </div>
              <div class="col">
                <label for="logo" class="fw-bold my-3 me-3"> Logo del Sistema Actual</label>
                <img :src="logoSystem" class="rounded-3 mb-2" width="50">
                <div class="custom-file-upload">
                  <label for="file" class="btn btn-blue">
                    <i class="fa-solid fa-upload"></i> 
                  </label>
                  <label for="logo" class="ms-3 fw-medium " v-if="file == null">Selecciona una  imagen</label>
                  <input type="file" id="file" class="form-control" @change="onFileChange" accept="image/*"
                  style="display: none;" />
                </div>
                <button :disabled="loadingImage || loading"   class="btn-blue btn my-3 rounded-3 cursor" @click="saveImage">
                  <label class="cursor" v-if="!loadingImage || loading">Actualizar</label>
                  <label v-if="loadingImage">Guardando...</label>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Modal } from "bootstrap";

const combinedData = ref({});
const editableData = ref({});
const nameSystem = ref('Name systema');
const logoSystem = ref('');
const fetchCombinedData = async () => {
  try {
    // const response = await axios.get("https://apitalentos.pruebasdeploy.online/ajustesAdmin");
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/ajustesAdmin");
    combinedData.value = response.data.results;
    nameSystem.value = combinedData.value.nombre
    logoSystem.value = combinedData.value.logo
  } catch (error) {
    console.error("Error al obtener datos combinados:", error);
  }
};

const editUser = (data) => {
  comision_porcentual_ganancia.value = data.comision_porcentual_ganancia;
  comision_porcentual_retiro.value = data.comision_porcentual_retiro;
  tiempo_minimo_inversion.value = data.tiempo_minimo_inversion;
  tiempo_maximo_inversion.value = data.tiempo_maximo_inversion;
  ajuste_id.value = data.ajuste_id;
  valor_token.value = data.valor_token;

  const editUserModal = new Modal(document.getElementById("editModal"));
  editUserModal.show();
};

const ajuste_id = ref("");

const loading = ref(false)
const saveName = async () => {
  if (nameSystem.value.trim() === '') {
    nameSystem.value = combinedData.value.nombre;
    errorAlert('El campo es requerido', 'Error');
    return;
  } 
  try {
    loading.value = true;
    await axios.put(
      import.meta.env.VITE_BASE_URL + `/utilities/changeNameSystem?nombre=${nameSystem.value}`
    );
    successAlert('El nombre del sistema se actualizó correctamente', 'Proceso finalizado');
  } catch (error) {
    errorAlert('Error al guardar el nombre del sistema', 'Error');
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

const loadingImage = ref(false)
// Función para guardar los cambios y enviar los datos al servidor
const saveEdit = async () => {
  const datos = {
    comision_porcentual_ganancia: comision_porcentual_ganancia.value,
    comision_porcentual_retiro: comision_porcentual_retiro.value,
    tiempo_minimo_inversion: tiempo_minimo_inversion.value,
    tiempo_maximo_inversion: tiempo_maximo_inversion.value,
    admin_id: 33,
    valor_token: valor_token.value,
  };
  console.log(editableData);
  try {
    await axios.put(
      // `https://apitalentos.pruebasdeploy.online/ajustesAdmin/${ajuste_id.value}`,
      import.meta.env.VITE_BASE_URL + `/ajustesAdmin/${ajuste_id.value}`,
      datos
    );
    await fetchCombinedData();
    combinedData.value = { ...editableData.value }; // Actualiza la vista con los cambios
    const editModal = Modal.getInstance(document.getElementById("editModal"));
    editModal.hide();
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
  }
};
onMounted(() => {
  fetchCombinedData();
});
const comision_porcentual_ganancia = ref("");
const comision_porcentual_retiro = ref("");
const tiempo_minimo_inversion = ref("");
const tiempo_maximo_inversion = ref("");
const valor_token = ref("");
const file = ref(null);

const onFileChange = (event) => {
  const fileInput = event.target.files[0];
  if (fileInput) {
    const img = new Image();
    const objectURL = URL.createObjectURL(fileInput);

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      if (width >= 300 && height >= 300) {
        file.value = fileInput;
      } else {
    errorAlert('La imagen debe ser de 300x300 píxeles o superior.','Error')
        file.value = null;
      }
      URL.revokeObjectURL(objectURL);
    };
    img.src = objectURL;
  }
};
const cleanImage = () => {
  file.value = ''
}
//Funcion para hacer mas intuitiva la tabla 


const saveImage = async () => {
  const formData = new FormData();
  if (file.value) {
    loadingImage.value = true
    formData.append("image", file.value);
    console.log(file.value);
    try {
      await axios.post(import.meta.env.VITE_BASE_URL + `/utilities/uploadimageUserCloudinaryHome/logo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log('imagen cargada');
    successAlert('La imagen se actualizo correctamente.','Carga finalizada');

      await fetchCombinedData();
      cleanImage()
    } catch (error) {
      console.log(error);
      cleanImage()
      errorAlert('Error al subir la imagen','Error')

    } finally {
      loadingImage.value = false
    }
  } else {
    errorAlert('Debes seleccionar una imagen','Error')
  }


}

import { Tooltip } from 'bootstrap';
import { errorAlert, successAlert } from "@/helpers/iziToast";

onMounted(() => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new Tooltip(tooltipTriggerEl);
  });
});
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

.custom-size:hover {
  cursor: pointer;
  background-color: #F37926;
  color: #fff;
}


.content {
  min-height: 70vh;
  width: 100%;
  padding-top: 20px;
}

main {
  min-height: 90vh;
}

td {
  font-size: 0.9rem;
}

.cursor {
  cursor: pointer;
}

.btn:hover {
  border: none;
  background-color: var(--yellow-orange) !important;
}

.btn-dark {
  background-color: var(--gray-color);
  border: 1px solid var(--yellow-orange);
  margin-right: 2rem;
}

.modal-custom {
  border: none;
  padding: 30px;
  width: 500px;
  z-index: 2;
  margin: auto;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-backdrop {
  background-color: #17223bef !important;
  /* Cambiar la opacidad o color */
  background: #17223bef !important;
}

.modal-header {
  background-color: var(--dun2-color);
  border-bottom: none;
}

.modal-title {
  font-family: var(--font-montserrat-bold);
  /* Variante bold */
  font-weight: 700;
  /* Asegura que sea bold */
  font-size: 24px;
  /* Tamaño predefinido */
  color: var(--gray-color);
  text-transform: uppercase;
}

.modal-content {
  background-color: transparent !important;
  /* Hacerlo transparente */
  box-shadow: none;
  /* Quitar sombras si no las quieres */
  border: none;
  /* Quitar bordes */
}

.modal-body {
  background-color: var(--blue-transparent) !important;
  color: var(--white-color);
}

.modal-body-custom {
  background-color: var(--blue-transparent);
  color: var(--white-color);
}

.modal-item-custom {
  background-color: var(--dark-anti-flash-color);
  color: var(--white-color);
  border: 1px solid var(--yellow-orange);
}

.modal-footer {
  background-color: var(--gray-color);
  border-top: 1px solid var(--white-color);

}

.modal-item-custom {
  background-color: var(--dark-anti-flash-color);
  color: var(--white-color);
  border: 1px solid var(--yellow-orange);
}

.form-label {
  color: var(--white-color);
  font-weight: var(--font-montserrat-semibold);
  font-size: 16px;
}
</style>
