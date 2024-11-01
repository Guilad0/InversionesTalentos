<template>
<div>

  <div class="container mx-auto p-4" v-if="usuario_rol == 'Cliente'">
      <h1 class="text-2xl font-bold mb-4">Balance de Fondos</h1>
      <div class="bg-zinc-100 p-4 rounded-lg mb-6">
        <p class="text-xl">Total de Tokens Recibidos: {{ tokensRecibidosCliente }} </p>
      </div>

      <div class="d-flex justify-content-center mb-6">
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalSolicitud">Solicitar
          Retiro</button>
        <!-- <button class="btn btn-dark">Copy address</button> -->
      </div>
  </div>

  <div class="container mx-auto p-4" v-if="usuario_rol == 'Inversionista'">
    <h1 class="text-2xl font-bold mb-4">Balance de Fondos</h1>
    <div class="bg-zinc-100 p-4 rounded-lg mb-6">
      <div class="row">
        <div class="col-md-4">
          <p class="text-xl">Total de USD Ingresados: $US {{ dolaresInversionista }}</p>
        </div>
        <div class="col-md-4">
          <p class="text-xl">Tokens Restantes: {{ tokensCompradosInversionista  -  tokensInvertidosInversionista }}</p>
        </div>
        <div class="col-md-4">
          <p class="text-xl">Tokens Invertidos: {{ tokensInvertidosInversionista }}</p>
        </div>
      </div>

    </div>

    <div class="d-flex justify-content-around mb-6">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTokens">Comprar Tokens</button>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalInversion">Invertir</button>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalSolicitud">Solicitar Retiro</button>
    </div>

  </div>
  <!-- Modal Tokens -->
  <div class="modal fade" id="modalTokens" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Datos de la Compra de Tokens
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="#" class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-8">
                <div class="card m-1">
                  <div class="card-body">
                    <div class="form">

                      <div class="row d-flex justify-content-around">
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="montoUsd" class="form-label">Monto en USD</label>
                            <input type="text" v-model="montoUsd" id="montoUsd" class="form-control" @change="calcularTokens()" required />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label class="form-label">Tokens</label>
                            <p>{{ tokens }}</p>
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="text-center">
                        <button type="button" @click="comprarTokens()" class="btn btn-success">Comprar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-2"></div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>

      </div>
    </div>
  </div>

  <!-- Modal Inversión -->
  <div class="modal fade" id="modalInversion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Datos de la Inversión
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="#" class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-8">
                <div class="card m-1">
                  <div class="card-body">
                    <div class="form">
                      <div class="row d-flex justify-content-around">

                        <div class="col-md-8">
                          <div class="mb-3">
                            <label for="cliente_id" class="form-label">Cliente</label><br>
                            <select v-model="cliente_Invertir_ID" id="cliente_Invertir_ID" class="form-select" required>
                              <option disabled>Seleccione un Cliente</option>
                              <option v-for="cliente in clientes" :key="cliente" :value="cliente.usuario_id"> <!-- :value="cliente.usuario_id" -->
                                {{ cliente.nombre + ' ' + cliente.apellido }}
                              </option>
                            </select>
                          </div>
                        </div>                        
                      </div>

                      <div class="row d-flex justify-content-around">
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="monto" class="form-label">Tokens a invertir</label>
                            <input type="number" v-model="monto_tokens_invertir" id="monto" class="form-control" required />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label class="form-label">Ganancia Estimada</label>
                            <p>{{ ganancia_estimada }}</p>
                          </div>
                        </div>

                      </div>

                      <hr>
                      <div class="text-center">
                        <button type="button" @click="inversionistaInvertir()" class="btn btn-success">Invertir</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-2"></div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>

      </div>
    </div>
  </div>

  <!-- Modal Solicitud Retiro -->
  <div class="modal fade" id="modalSolicitud" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Datos del Retiro
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="#" class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-8">
                <div class="card m-1">
                  <div class="card-body">
                    <div class="form">
                      <div class="row d-flex justify-content-around">

                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="monto_solicitud" class="form-label">Monto de Solicitud</label>
                            <input type="text" v-model="monto_solicitud" id="monto_solicitud" class="form-control"
                              required />
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="tipo_ganancia" class="form-label">Tipo de Ganancia</label><br>
                            <select v-model="tipo_ganancia" id="tipo_ganancia" class="form-select" required>
                              <option disabled>Seleccione un Tipo de Ganancia</option>
                              <option value="Monto fijo">Monto Fijo</option>
                              <option value="Porcentual">Porcentual</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row d-flex justify-content-around">
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="monto" class="form-label">Monto</label>
                            <input type="text" v-model="monto" id="monto" class="form-control" required />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="ganancia_estimada" class="form-label">Ganancia Estimada</label>
                            <input type="text" v-model="ganancia_estimada" id="ganancia_estimada" class="form-control"
                              required />
                          </div>
                        </div>

                      </div>

                      <hr>
                      <div class="text-center">
                        <button type="button" @click="registrarInversion()" class="btn btn-success">Guardar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-2"></div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>

      </div>
    </div>
  </div>
</div>

</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';

import Swal from "sweetalert2";
import { useRouter } from "vue-router";
const route = useRouter();

let baseURL = 'http://localhost:3000/billetera/';

const clientes = ref([]);
const valorToken = ref([]);
const tokens = ref(0);
const montoUsd = ref(0);
const dolaresInversionista = ref(0);
const tokensCompradosInversionista = ref(0);
const tokensInvertidosInversionista = ref(0);
const tokensRecibidosCliente = ref(0);

const ganancia_estimada = ref(0);
const monto_tokens_invertir = ref(0);

const cliente_Invertir_ID = ref('');
const cliente_ID = ref('');
const inversionista_ID = ref('');
const usuario = JSON.parse(localStorage.getItem("usuario"));
const usuario_id = ref(usuario.usuario_id);
const usuario_rol = ref(usuario.rol);
console.log(usuario_rol.value);
console.log(usuario_id.value);
if(usuario_rol.value == 'Inversionista'){
  inversionista_ID.value = usuario_id.value;  
  console.log(inversionista_ID.value);
}
if(usuario_rol.value == 'Cliente'){
  cliente_ID.value = usuario_id.value;
  console.log(cliente_ID.value);
}


onMounted(() => {
  obtenerDolares_Inversionista();  
  obtenerTokens_Inversionista();
  obtenerTokens_Inversionista_Invertidos();
  calcularTokens();

  obtenerListaClientes();

  obtenerTokens_Cliente();
});


const obtenerDolares_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + 'dolaresInversionista/' + inversionista_ID.value);
    console.log(data);
    dolaresInversionista.value = data.data[0].totalUsd;
    console.log(dolaresInversionista.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTokens_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensInversionistaComprados/' + inversionista_ID.value);
    console.log(data);
    tokensCompradosInversionista.value = data.data[0].totalTokensComprados;
    console.log(tokensCompradosInversionista.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTokens_Inversionista_Invertidos = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensInversionistaInvertidos/' + inversionista_ID.value);
    console.log(data);
    tokensInvertidosInversionista.value = data.data[0].totalTokensInvertidos;
    console.log(tokensInvertidosInversionista.value);
  } catch (error) {
    console.log(error);
  }
};

const calcularTokens = async () => {

  try {
    const { data } = await axios.get(baseURL + 'valorToken');
    
    console.log(data);
    /* valorToken.value = data.data; */
    var valor = parseFloat(data.data[0].valor_token)
    console.log(valor);
    console.log(montoUsd.value);
    montoUsd.value = parseFloat(montoUsd.value);
    console.log(montoUsd.value);
    tokens.value = montoUsd.value * valor;
    console.log(tokens.value);    
  } catch (error) {
    console.log(error);
  }
};

const comprarTokens = async () => {
  const datos = {
    monto: montoUsd.value,
    tokens: tokens.value,
    usuario_id: inversionista_ID.value,
    tipo: 'Ingreso',
    descripcion: 'Compra de tokens',
  };
  console.log(datos);
  try {
    await axios.post(baseURL + 'comprarTokens', datos);
    alert('Tokens comprados exitosamente');
    var myModalEl = document.getElementById('modalTokens');
    var modal = bootstrap.Modal.getInstance(myModalEl) || new bootstrap.Modal(myModalEl);
    modal.hide();
    
  } catch (error) {
    console.error('Error al guardar los tokens:', error);
  }

};

const obtenerListaClientes = async () => {
  try {
    const { data } = await axios.get(baseURL + 'clientes');
    console.log(data);
    clientes.value = data.data;    
  } catch (error) {
    console.log(error);
  }
};

const inversionistaInvertir = async () => {
  console.log(cliente_ID.value);
  const datos = {
    token: monto_tokens_invertir.value,
    usuario_id: inversionista_ID.value,
    cliente_id: cliente_Invertir_ID.value,
    inversor_id: inversionista_ID.value,
    tipo: 'Egreso',
    descripcion: 'Tokens invertidos',
    monto: monto_tokens_invertir.value
  };
  console.log(datos);
  try {
    await axios.post(baseURL + 'invertirTokens', datos);
    alert('Tokens comprados exitosamente');
    var myModalEl = document.getElementById('modalInversion');
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  } catch (error) {
    console.error('Error al invertir los tokens:', error);
  }
  monto_tokens_invertir.value = 0;
};

const obtenerTokens_Cliente = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensClienteRecibido/' + cliente_ID.value);
    console.log(data);
    tokensRecibidosCliente.value = data.data[0].totalTokensRecibidos;
    console.log(tokensRecibidosCliente.value);
  } catch (error) {
    console.log(error);
  }
};

</script>

<style scoped>
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --card: #ffffff;
  --card-foreground: #1a1a1a;
  --popover: #ffffff;
  --popover-foreground: #1a1a1a;
  --primary: #1a1a1a;
  --primary-foreground: #fafafa;
  --secondary: #f0f0f0;
  --secondary-foreground: #1a1a1a;
  --muted: #f0f0f0;
  --muted-foreground: #767676;
  --accent: #f0f0f0;
  --accent-foreground: #1a1a1a;
  --destructive: #e60000;
  --destructive-foreground: #fafafa;
  --border: #e0e0e0;
  --input: #e0e0e0;
  --ring: #1a1a1a;
  --radius: 0.5rem;
}

/* Estilos personalizados para el modo oscuro */
.dark-mode {
  --background: #1a1a1a;
  --foreground: #fafafa;
  --card: #1a1a1a;
  --card-foreground: #fafafa;
  --popover: #1a1a1a;
  --popover-foreground: #fafafa;
  --primary: #fafafa;
  --primary-foreground: #1a1a1a;
  --secondary: #2a2a2a;
  --secondary-foreground: #fafafa;
  --muted: #2a2a2a;
  --muted-foreground: #a0a0a0;
  --accent: #2a2a2a;
  --accent-foreground: #fafafa;
  --destructive: #993333;
  --destructive-foreground: #fafafa;
  --border: #2a2a2a;
  --input: #2a2a2a;
  --ring: #d1d1d1;
}

/* Aplicar los estilos usando las variables definidas */
body {
  background-color: var(--background);
  color: var(--foreground);
}

.card {
  background-color: var(--card);
  color: var(--card-foreground);
  border-radius: var(--radius);
}

.popover {
  background-color: var(--popover);
  color: var(--popover-foreground);
}

.btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.btn-secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.text-muted {
  color: var(--muted-foreground);
}

.btn-danger {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

input {
  border-color: var(--input);
  background-color: var(--background);
}

/* Bordes personalizados */
.border {
  border-color: var(--border);
}

.btn-6 {
  color: #1a1aff; /* Equivalente a 'tint($btn-color)' en Sass */
  position: relative;
  overflow: hidden;

  /* Default Button color */
  background-color: darkblue;
}

.btn-6 span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: #000033; /* Equivalente a 'shade($btn-color, 40%)' */
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.btn-6:hover {
  color: #b3b3ff; /* Equivalent to 'tint($btn-color, 75%)' */
}

.btn-6:hover span {
  width: 225%;
  height: 225%;
}

.btn-6:active {
  background-color: darkblue;
}

</style>
