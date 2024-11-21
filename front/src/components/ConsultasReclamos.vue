<template>
  <main class="bg-light pt-5 ps-4">
    <div class="col-12">
      <button class="btn btn-pdf btn-sm mx-4 float-end " @click="exportToPDF()">
        PDF
      </button>
    </div>
    <div class="content">
      <h4 class="d-block mb-2 text-center py-2 title">Consultas Y Reclamos</h4>
      <div class="table-responsive col-md-10 offset-md-1">
        <div class="col-3 px-5 mb-3 d-flex">
          <input name="search" type="text" v-model="search" class="form-control" placeholder="Buscar ..."
            @input="fetchContacts(1)" />

        </div>

        <!-- <div
          v-if="showPreview"
          style="margin-top: 20px; border: 1px solid #ccc; padding: 10px"
          class="pdf-preview-container"
        >
          <iframe
            id="pdfPreview"
            style="width: 100%; height: 500px"
            title="Previsualización PDF"
            class="pdf-preview"
            frameborder="0"
          ></iframe>
        </div> -->
        <div class="table-responsive table-container-contact">
          <table class="table overflow-x-scroll fs-9">
            <thead>
              <tr class="table-secondary">
                <th scope="col" class="custom-size">ID</th>
                <th scope="col" class="custom-size">Nombre</th>
                <th scope="col" class="custom-size">Apellido</th>
                <th scope="col" class="custom-size">Email</th>
                <th scope="col" class="custom-size">Teléfono</th>
                <th scope="col" class="custom-size">Mensaje</th>
                <th scope="col" class="custom-size">Respuesta</th>
                <th scope="col" class="custom-size">Responder</th>
                <th scope="col" class="custom-size">Estado</th>
                <th scope="col" class="custom-size">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="" v-for="item in contacts" :key="item.id">
                <td>{{ item.contacto_id }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.apellido }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.telefono }}</td>
                <td>{{ item.comentarios }}</td>
                <td>{{ item.respuesta }}</td>
                <td v-if="item.respuesta === '' || item.respuesta === null">
                  <span class="badge badge-responder" @click="openModal(item)">
                    Responder
                  </span>
                </td>
                <td v-else>
                  <span class="badge text-bg-dark">Contestado</span>
                </td>

                <td v-if="item.estado == '1'">
                  <span @click="deleted(item.contacto_id)" class="badge text-bg-success">
                    Activo
                  </span>
                </td>
                <td v-else>
                  <span @click="deleted(item.contacto_id)" class="badge text-bg-danger">
                    Inactivo
                  </span>
                </td>

                <td>
                  <button class="btn btn-danger btn-sm" @click="deleted(item.contacto_id)">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </button>
                  <!-- <button class="btn btn-success">
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </button> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Paginación -->
      <div class="pagination-container-contact d-flex justify-content-center mt-3">
        <nav v-if="pagination.totalPages > 0" aria-label="Page navigation">
          <ul class="pagination">
            <li v-if="pagination.currentPage === 1" class="page-item disabled">
              <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                <i class="fa-solid fa-arrow-left"></i>
              </button>
            </li>
            <li v-else class="page-item">
              <button @click="fetchContacts(pagination.currentPage - 1)"
                class="page-link color-gray fw-bolder rounded-5 border border-3">
                <i class="fa-solid fa-arrow-left"></i>
              </button>
            </li>

            <li v-for="page in pagination.totalPages" :key="page" class="page-item"
              :class="{ active: pagination.currentPage === page }">
              <button @click="fetchContacts(page)"
                class="page-link bg-light mx-2 color-gray fw-bolder rounded-5 border border-3">
                {{ page }}
              </button>
            </li>

            <li v-if="pagination.currentPage === pagination.totalPages" class="page-item disabled">
              <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </li>
            <li v-else class="page-item">
              <button @click="fetchContacts(pagination.currentPage + 1)"
                class="page-link color-gray fw-bolder rounded-5 border border-3">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div class="modal fade" id="answerModal" tabindex="-1" role="dialog" aria-labelledby="answerModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">RESPONDER COMENTARIOS</h5>
            </div>
            <div class="modal-body">
              <p>{{ contactActive.nombre + ": " }} {{ contactActive.email }}</p>
              <label class="form-label"> Responder Usuario </label>
              <input class="form-control" type="text" id="respuesta" v-model="userResponse"
                placeholder="Escribe la respuesta" />
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                @click="answer(userResponse, contactActive.contacto_id)">
                Guardar
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
import useFetchData from "@/helpers/UseFetchData";
import { Modal } from "bootstrap";
import iziToast from "izitoast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const { results: contacts, getData: getContact } = useFetchData(ref("/contact"));
console.log("results", contacts);
const BaseURL = "https://apitalentos.pruebasdeploy.online/contact";
const search = ref("");
const isModalVisible = ref(false);
const contactActive = ref({});
const showPreview = ref(false);
console.log(contactActive);

// const contact = ref([]);
const pagination = ref({
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  itemsPerPage: 7,
});

const userResponse = ref("");
const iduser = ref("");

onMounted(() => {
  // getContact();
  // fetchContacts();
  fetchContacts();
});

const exportToPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(11);

  const columns = [
    { header: "ID", dataKey: "contacto_id" },
    { header: "Nombre", dataKey: "nombre" },
    { header: "Apellido", dataKey: "apellido" },
    { header: "Email", dataKey: "email" },
    { header: "Telefono", dataKey: "telefono" },
    { header: "Comentarios", dataKey: "comentarios" },
    { header: "Respuesta", dataKey: "respuesta" },
  ];
  const rows = contacts.value.map((contact) => ({
    contacto_id: contact.contacto_id,
    nombre: contact.nombre,
    apellido: contact.apellido,
    email: contact.email,
    telefono: contact.telefono,
    comentarios: contact.comentarios,
    respuesta: contact.respuesta || "Sin responder",
  }));

  console.log("Rows para PDFF", rows);
  doc.autoTable({
    columns: columns,
    body: rows,
    startY: 20,
    theme: "grid",
    styles: {
      fontSize: 10,
      textColor: [40, 40, 40],
      lineColor: [200, 200, 200],
    },
    headStyles: {
      fillColor: [60, 141, 188],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 10,
      halign: "center",
    },
    bodyStyles: {
      fontStyle: "normal",
      fillColor: [245, 245, 245],
      textColor: [50, 50, 50],
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
    margin: { top: 30 },
    tableLineColor: [200, 200, 200],
    tableLineWidth: 0.1,
  });
  doc.text("Listado de Contactos", 105, 15, { align: "center" });
  doc.save("contactos.pdf");

  // const pdfData = doc.output("datauristring");
  // const previewIframe = document.getElementById("pdfPreview");
  // if (previewIframe) {
  //   previewIframe.src = pdfData;
  // }
  // showPreview.value = true;
};

const fetchContacts = async (page = 1) => {
  try {
    const response = await axios.get(`https://apitalentos.pruebasdeploy.online/contact`, {
      params: {
        page,
        limit: pagination.value.itemsPerPage,
        search: search.value,
      },
    });
    contacts.value = response.data.results;
    pagination.value.currentPage = response.data.currentPage;
    pagination.value.totalPages = response.data.totalPages;
    pagination.value.totalItems = response.data.totalItems;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};

const deleted = async (id) => {
  try {
    await axios.put(`https://apitalentos.pruebasdeploy.online/contact/stateContact/${id}`);
    fetchContacts(pagination.value.currentPage);

    iziToast.success({
      title: "Exito",
      message: "Estado cambiado con exito",
      position: "topRight",
    });
  } catch (error) {
    console.log(error);
  }
};

const answer = async (response, iduser) => {
  const datos = {
    respuesta: response,
  };
  console.log(iduser);
  console.log(response);

  try {
    const res = await axios.put(
      "https://apitalentos.pruebasdeploy.online/contact/response/" + iduser,
      datos
    );

    if (res.status === 200) {
      console.log("Respuesta actualizada correctamente", res.data);

      iziToast.success({
        title: "Exito",
        message: "Respuesta actualizada correctamente",
        position: "topRight",
        backgroundColor: "green",
        color: "white",
      });
      await fetchContacts(pagination.value.currentPage);

      const answerModalElement = document.getElementById("answerModal");
      const answerModal = bootstrap.Modal.getInstance(answerModalElement);
      answerModal.hide();
    } else {
      console.error("Error al actualizar la respuesta:", res);
    }
  } catch (error) {
    console.error("Hubo un error al hacer la solicitud:", error);
  }

  // const answerModalElement = document.getElementById("answerModal");
  // const answerModal = bootstrap.Modal.getInstance(answerModalElement);
  // answerModal.hide();
};

const openModal = (item) => {
  contactActive.value = item;
  const answerModal = new Modal(document.getElementById("answerModal"));
  answerModal.show();
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

.pdf-preview-container {
  position: fixed;
  z-index: 9999;
  width: 50vw;
  height: 50vh;
}

.custom-size {
  font-size: 0.9rem;
  font-weight: 630;
}

.content {
  height: 70vh;
  width: 100%;
}

.table-container-contact {
  max-height: 70vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.pagination-container-contact {
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-pdf {
  border: none;
  background-color: var(--gray-color);
  color: white;
  border: 1px solid var(--yellow-orange);
  margin-right: 2rem;
}

.btn:hover {
  border: none;
  color: white;
  background-color: var(--yellow-orange) !important;
}
.badge-responder {
  background-color: var(--yellow-orange);
  color: white;
  cursor: pointer;
}
</style>
