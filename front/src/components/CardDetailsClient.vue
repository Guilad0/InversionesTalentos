<template>
  <div class="col-7 row col-xl-8 col-md-12 col-sm-10 d-none d-md-block">
    <p class="m-0 pb-3">
      <RouterLink to="/marketplace" class="custom-link">Marketplace</RouterLink> |
      <label>{{ selectedClient.rol }}</label>
    </p>
    <div class="card m-auto shadow mb-5">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <img
              src="https://slicetokenfrontendassets.s3.amazonaws.com/players/img_white/61.webp"
              class="card-img-top rounded-3"
            />
          </div>
          <div class="col">
            <h3 class="card-title">{{ selectedClient.nombre }}</h3>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="mx-1">{{ selectedClient.pais_residencia }} |</li>
                <li class="mx-1">{{ selectedClient.edad }} |</li>
                <li class="mx-1">{{ selectedClient.categoria }}</li>
              </ol>
            </nav>
            <label>Bio:</label>
            <p class="descripcion">
              {{
                selectedClient.descripcion == null
                  ? `Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha
                    sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T.
                    persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal
                    manera que logró hacer un libro de textos especimen`
                  : selectedClient.descripcion
              }}
            </p>
            <div class="row justify-content-between align-items-center mb-3">
              <div class="col">
                <p class="token m-0">
                  Precio por token USD $
                  {{
                    selectedClient.monto_inversion == null
                      ? "00.00"
                      : selectedClient.monto_inversion
                  }}
                </p>
              </div>
              <div class="col-4">
                <button class="border-custom btn-sm available rounded-3">
                  0 Disponibles
                </button>
              </div>
            </div>

            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed bg-light rounded-2 p-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Detalles Token
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">Detalles.</div>
                </div>
              </div>
            </div>

            <div class="row px-3 mt-4">
              <button class="btn btn-gray" @click="isAuthenticatedAlert()">
                Fondear mi billetera
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isAuthenticated, isAuthenticatedAlert } from "@/helpers/Authenticator";
const props = defineProps({
  selectedClient: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
.profile {
  height: 70vh;
  width: 100%;
}

li {
  font-size: 0.8rem;
}

.descripcion {
  font-size: 0.9rem;
}

.custom-link {
  text-decoration: none;
  color: var(--smoky-dark-color);
  font-size: 0.9rem;
}
.custom-link:hover {
  text-decoration: underline;
}
.token {
  font-size: 0.9rem;
}

.available {
  font-size: 0.7rem;
}

.border-custom {
  border: 1px solid var(--gray-color) !important;
}
.accordion-button:focus {
  box-shadow: 0 0 0 0.1rem var(--gray-color) !important;
  border-color: var(--gray-color) !important;
}

.accordion-button.collapsed .collapsed {
  border: 1px solid var(--gray-color);
}
.accordion-button {
  border: 1px solid var(--gray-color);
}

.accordion-body {
  border-radius: 0 0 10px 10px;
  border: 1px solid var(--gray-color);
  border-top: none !important;
}
</style>
