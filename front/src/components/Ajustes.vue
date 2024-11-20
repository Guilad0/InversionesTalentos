<template>
  <main class="bg-light">
    <div class="content">
      <h2 class="d-block text-start mb-5 mt-5 text-center underline">
        Datos de Usuarios
      </h2>
      <div class="mt-5">
        <div class="table-responsive table-center col-md-10 offset-md-1">
          <table class="table overflow-x-scroll">
            <thead>
              <tr class="table-secondary">
                <th class="custom-size">Comisión % de Ganancia</th>
                <th class="custom-size">Comisión % de Retiro</th>
                <th class="custom-size">Tiempo Mínimo de Inversión</th>
                <th class="custom-size">Tiempo Máximo de Inversión</th>
                <th class="custom-size">Valor Token</th>
                <th class="custom-size">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ combinedData.comision_porcentual_ganancia }}</td>
                <td>{{ combinedData.comision_porcentual_retiro }}</td>
                <td>{{ combinedData.tiempo_minimo_inversion }}</td>
                <td>{{ combinedData.tiempo_maximo_inversion }}</td>
                <td>{{ combinedData.valor_token }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="editUser(combinedData)"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
        style="background:rgba(0, 0, 0, 0.7) !important;"
      >
        <div class="modal-dialog">
          <div class="modal-content modal-custom">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Editar Usuario</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body modal-body-custom">
              <form>
                <div class="mb-3">
                  <label class="form-label">Comisión % de Ganancia</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="comision_porcentual_ganancia"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Comisión % de Retiro</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="comision_porcentual_retiro"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Tiempo Mínimo de Inversión</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="tiempo_minimo_inversion"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Tiempo Máximo de Inversión</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="tiempo_maximo_inversion"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Valor Token</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="valor_token"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" class="btn btn-dark" @click="saveEdit()">
                Guardar cambios
              </button>
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

const fetchCombinedData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/ajustesAdmin");
    combinedData.value = response.data.results;
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
      `http://localhost:3000/ajustesAdmin/${ajuste_id.value}`,
      datos
    );
    fetchCombinedData();
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
</script>

<style scoped>
.custom-size {
  font-size: 0.9rem;
  font-weight: 630;
}

.content {
  height: 70vh;
  width: 100%;
  padding-top: 20px;
}

main {
  height: 90vh;
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
  background-color: #17223bef !important; /* Cambiar la opacidad o color */
  background: #17223bef !important; 
}

.modal-header {
  background-color: var(--dun2-color);
  border-bottom: none;
}
.modal-title {
  font-family: var(--font-montserrat-bold); /* Variante bold */
  font-weight: 700; /* Asegura que sea bold */
  font-size: 24px; /* Tamaño predefinido */
  color: var(--gray-color);
  text-transform: uppercase;
}
.modal-content {
  background-color: transparent !important; /* Hacerlo transparente */
  box-shadow: none; /* Quitar sombras si no las quieres */
  border: none; /* Quitar bordes */
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

.modal-footer-custom {
  background-color: var(--dun2-color);
  border-top: none;
}
.modal-item-custom {
  background-color: var(--dark-anti-flash-color);
  color: var(--white-color);
  border: 1px solid var(--yellow-orange);
}
.modal-footer {
  background-color: var(--dun2-color);
  border-top: none;
}
.form-label {
  color: var(--white-color);
  font-weight: var(--font-montserrat-semibold);
  font-size: 16px;
}
</style>
