<template>
  <div>

    <div class="container mx-auto p-4" v-if="usuario_rol == 'Cliente'">
      <h1 class="text-2xl font-bold mb-4">Balance de Fondos</h1>
      <div>
        <div class="row">
          <div class="col-md-6">
            <p>Total de Tokens Recibidos: {{ tokensRecibidosCliente }} </p>
          </div>
          <div class="col-md-6">
            <p>Total de Tokens por Devolver: {{ tokensDeudasCliente }} </p>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-around mb-6">
        <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalTokens">Comprar Tokens</button>
        <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalSolicitud">Solicitar Retiro</button>
        <!-- <button class="btn btn-dark">Copy address</button> -->
      </div>
    </div>

    <div class="container mx-auto p-4" v-if="usuario_rol == 'Inversionista'">
      <h1 class="text-2xl font-bold mb-4">Balance de Fondos</h1>
      <div class="bg-zinc-100 p-4 rounded-lg mb-6">
        <div class="row">
          <div class="col-md-4">
            <p class="text-xl">Tokens Invertidos: {{ tokensInvertidosInversionista }}</p>
          </div>
          <div class="col-md-4">
            <p class="text-xl">Tokens Restantes: {{ tokensCompradosInversionista - tokensInvertidosInversionista }}</p>
          </div>
          <div class="col-md-4">
            <p class="text-xl">Total de USD Ingresados: $US {{ dolaresInversionista }}</p>
          </div>
        </div>

      </div>

      <div class="d-flex justify-content-around mb-6">
        <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalTokens">Comprar Tokens</button>
        <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalInversion">Invertir</button>
        <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalSolicitud">Solicitar Retiro</button>
      </div>

    </div>
    <!-- Modal Tokens -->
    <div class="modal fade" id="modalTokens" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
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
                              <input type="text" v-model="montoUsd" id="montoUsd" class="form-control"
                                @change="calcularTokens()" required />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label class="form-label" required>Tokens</label>
                              <p>{{ tokens }}</p>
                            </div>
                          </div>
                        </div>
                        <hr>
                        <div class="text-center">
                          <button type="button" @click="comprarTokens()" class="btn btn-secondary" data-bs-dismiss="modal">Comprar</button>
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
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
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
                              <select v-model="cliente_Invertir_ID" id="cliente_Invertir_ID" class="form-select"
                                required>
                                <option disabled>Seleccione un Cliente</option>
                                <option v-for="cliente in clientes" :key="cliente" :value="cliente.usuario_id">
                                  <!-- :value="cliente.usuario_id" -->
                                  {{ cliente.nombre + ' ' + cliente.apellido }}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="row d-flex justify-content-around">
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label for="monto_tokens_invertir" class="form-label">Tokens a invertir</label>
                              <input type="number" v-model="monto_tokens_invertir" id="monto_tokens_invertir" class="form-control" @change="calcularGanancias()"
                                required />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label class="form-label">Meses de Inversión</label>
                              <p>{{ tiempo_inversion }}</p>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label class="form-label">Ganancia del {{ porcentaje_inversion }}%</label>
                              <p>{{ ganancia_tokens_inv }}</p>
                            </div>
                          </div>

                        </div>

                        <hr>
                        <div class="text-center">
                          <button type="button" @click="inversionistaInvertir()"
                            class="btn btn-secondary" data-bs-dismiss="modal">Invertir</button>
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
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
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
                              <label for="cambioTokens" class="form-label">Tokens a cambiar</label>
                              <input type="text" v-model="cambioTokens" id="cambioTokens" class="form-control"
                                @change="calcularDolares()" required />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label class="form-label">Dolares</label>
                              <p>$US {{ montoDolares }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="row d-flex justify-content-around">
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label class="form-label">Comisión de Retiro</label>
                              <p>{{ comision_retiro }}%</p>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label for="retiro_inversionista" class="form-label">Total a Retirar</label>
                              <p>$US {{ dolares }}</p>
                            </div>
                          </div>
                        </div>
                        <hr>
                        <div class="text-center">
                          <button type="button" @click="solicitarRetiro()" class="btn btn-secondary" data-bs-dismiss="modal">Solicitar Retiro</button>
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
import iziToast from 'izitoast';
const route = useRouter();

let baseURL = 'http://localhost:3000/billetera/';

const clientes = ref([]);
const valores = ref([]);
const tokens = ref(0);
const montoUsd = ref(0);
const dolaresInversionista = ref(0);
const tokensCompradosInversionista = ref(0);
const tokensInvertidosInversionista = ref(0);
const tokensRecibidosCliente = ref(0);
const tokensDeudasCliente = ref(0);

const monto_tokens_invertir = ref(0);
const ganancia_estimada = ref(0);
const cliente_Invertir_ID = ref('');
const cliente_ID = ref('');
const inversionista_ID = ref('');
const usuario = JSON.parse(localStorage.getItem("usuario"));
const usuario_id = ref(usuario.usuario_id);
const usuario_rol = ref(usuario.rol);
if (usuario_rol.value == 'Inversionista') {
  inversionista_ID.value = usuario_id.value;
  onMounted(() => {
    obtenerDolares_Inversionista();
    obtenerTokens_Inversionista();
    obtenerTokens_Inversionista_Invertidos();

    obtenerListaClientes();
    calcularGanancias();
  });
}
if (usuario_rol.value == 'Cliente') {
  cliente_ID.value = usuario_id.value;
  onMounted(() => {    
    obtenerTokens_Cliente();
  });
}
onMounted(() => {
  calcularTokens();
  calcularDolares();
});

const tiempo_inversion = ref(0);
const porcentaje_inversion = ref(0);
const ganancia_tokens_inv = ref(0);
const montoDolares = ref(0);
const comision_retiro = ref(0);
const dolares = ref(0);

//Función para saber cuantos dólares invirtió el inversionista
const obtenerDolares_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + 'dolaresInversionista/' + inversionista_ID.value);
    dolaresInversionista.value = data.data[0].totalUsd;
  } catch (error) {
    console.log(error);
  }
};

const obtenerTokens_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensInversionistaComprados/' + inversionista_ID.value);
    tokensCompradosInversionista.value = data.data[0].totalTokensComprados;
  } catch (error) {
    console.log(error);
  }
};

const obtenerTokens_Inversionista_Invertidos = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensInversionistaInvertidos/' + inversionista_ID.value);
    tokensInvertidosInversionista.value = data.data[0].totalTokensInvertidos;
  } catch (error) {
    console.log(error);
  }
};

const calcularTokens = async () => {

  try {
    const { data } = await axios.get(baseURL + 'valores');
    valores.value = data.data;
    let valor = parseFloat(data.data[0].valor_token)
    montoUsd.value = parseFloat(montoUsd.value);
    tokens.value = montoUsd.value * valor;
  } catch (error) {
    console.log(error);
  }
};

const comprarTokens = async () => {
  if(montoUsd.value > 0 && tokens.value > 0)
  {
    if (usuario_rol.value == 'Inversionista') {
    const datos = {  
    monto: montoUsd.value,
    tokens: tokens.value,
    usuario_id: inversionista_ID.value,
    tipo: 'Ingreso',
    descripcion: 'Compra de tokens',
    color: 'var(--gray-color)',
    confirmButtonColor: 'var(--yellow-orange)',
  };
  try {
    await axios.post(baseURL + 'comprarTokens', datos);
    // Swal.fire({
    //     title: "¡Felicidades!",
    //     text: "Tokens comprados exitosamente",
    //     icon: "success",
    //     allowOutsideClick: true,
    //     allowEscapeKey: true,
    //     color: 'var(--gray-color)',
    //     confirmButtonColor: 'var(--yellow-orange)', 
    //   }); 
    iziToast.success({
      title: 'Felicidades',
      message: 'Tokens comprados exitosamente',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      closeOnEscape: true
    })
    var myModalEl = document.getElementById('modalTokens');
    var modal = bootstrap.Modal.getInstance(myModalEl) || new bootstrap.Modal(myModalEl);
    modal.hide();
  } catch (error) {
    console.error('Error al guardar los tokens:', error);
  }
  obtenerDolares_Inversionista();
  obtenerTokens_Inversionista();
  montoUsd.value = 0;
  tokens.value = 0;
  }
  if (usuario_rol.value == 'Cliente') {
    const datos = {  
    monto: montoUsd.value,
    tokens: tokens.value,
    usuario_id: cliente_ID.value,
    tipo: 'Ingreso',
    descripcion: 'Compra de tokens',
  };
  try {
    await axios.post(baseURL + 'comprarTokens', datos);
    // Swal.fire({
    //     title: "¡Felicidades!",
    //     text: "Tokens comprados exitosamente",
    //     icon: "success",
    //     allowOutsideClick: true,
    //     allowEscapeKey: true,
    //     color: 'var(--gray-color)',
    //     confirmButtonColor: 'var(--yellow-orange)', 
    //   }); 
    iziToast.success({
      title: 'Felicidades',
      message: 'Tokens comprados exitosamente',
      messageColor: 'white',
      position: 'topRight',
      theme: 'dark',
      color: '#5ce65c',
      progressBarColor: '#FFFFFF',
      closeOnEscape: true
    })
    var myModalEl = document.getElementById('modalTokens');
    var modal = bootstrap.Modal.getInstance(myModalEl) || new bootstrap.Modal(myModalEl);
    modal.hide();
  } catch (error) {
    console.error('Error al guardar los tokens:', error);
  }
  obtenerTokens_Cliente();
  montoUsd.value = 0;
  tokens.value = 0;
}
  }
  else
  {
    // Swal.fire({
    // title: "¡Error!",
    // text: "Ingrese un valor mayor a 0 para comprar tokens",
    // icon: "error",
    // allowOutsideClick: true,
    // allowEscapeKey: true,
    // color: 'var(--gray-color)',
  //   // confirmButtonColor: 'var(--yellow-orange)', 
  // });
  iziToast.error({
    title: 'Error',
    message: 'Ingrese un valor mayor a 0 para comprar tokens',
    messageColor: 'white',
    position: 'topRight',
    theme: 'dark',
    color: '#f00',
    progressBarColor: '#FFFFFF',
    closeOnEscape: true,
  })
  }
};

const obtenerListaClientes = async () => {
  try {
    const { data } = await axios.get(baseURL + 'clientes');
    clientes.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const calcularGanancias = async () => {

try {
  const { data } = await axios.get(baseURL + 'valores');  
  monto_tokens_invertir.value = parseFloat(monto_tokens_invertir.value);
  console.log(monto_tokens_invertir.value);
  tiempo_inversion.value = parseInt(data.data[0].tiempo_inversion);
  porcentaje_inversion.value = parseFloat(data.data[0].porcentaje_inversion);
  console.log(porcentaje_inversion.value);
  ganancia_tokens_inv.value = monto_tokens_invertir.value * (porcentaje_inversion.value / 100);
} catch (error) {
  console.log(error);
}
};
const inversionistaInvertir = async () => {

  if (monto_tokens_invertir.value > 0) {
    ganancia_estimada.value = monto_tokens_invertir.value + ganancia_tokens_inv.value;
  const fecha_devolucion = ref('');
  const fecha = new Date();
  fecha.setMonth(fecha.getMonth() + tiempo_inversion.value);
  fecha_devolucion.value = new Date(fecha).toISOString().slice(0, 10);
  console.log(fecha_devolucion.value);
  
  const datos = {
    token: monto_tokens_invertir.value,
    usuario_id: inversionista_ID.value,
    cliente_id: cliente_Invertir_ID.value,
    inversor_id: inversionista_ID.value,
    tipo: 'Egreso',
    descripcion: 'Tokens invertidos',
    monto: monto_tokens_invertir.value,
    ganancia_estimada: ganancia_estimada.value,
    fecha_devolucion: fecha_devolucion.value
  };
  console.log(datos);
  try {
    await axios.post(baseURL + 'invertirTokens', datos);
    // Swal.fire({
    //     title: "¡Felicidades!",
    //     text: "Inversión realizada exitosamente",
    //     icon: "success",
    //     allowOutsideClick: true,
    //     allowEscapeKey: true,
    //     color: 'var(--gray-color)',
    //     confirmButtonColor: 'var(--yellow-orange)', 
      // }); 
      iziToast.success({
        title: 'Felicidades',
        message: 'Inversión realizada exitosamente',
        messageColor: 'white',
        theme: 'dark',
        color: '#5ce65c',
        progressBarColor: '#FFFFFF',
        closeOnEscape: true
      })
    var myModalEl = document.getElementById('modalInversion');
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  } catch (error) {
    console.error('Error al invertir los tokens:', error);
  }
  monto_tokens_invertir.value = 0;
  obtenerTokens_Inversionista();
  obtenerTokens_Inversionista_Invertidos();
  location.reload();
  }
  else
  {
  //   Swal.fire({
  //   title: "¡Error!",
  //   text: "Por favor, ingrese una cantidad de tokens a invertir",
  //   icon: "error",
  //   allowOutsideClick: true,
  //   allowEscapeKey: true,
  //   color: 'var(--gray-color)',
  //   confirmButtonColor: 'var(--yellow-orange)', 
  // });
  iziToast.error({
    title: 'Error',
    message: 'Por favor, ingrese una cantidad de tokens a invertir',
    messageColor: 'white',
    position: 'topRight',
    theme: 'dark',
    color: '#f00',
    progressBarColor: '#FFFFFF',
    closeOnEscape: true
  })
  }
  
};

const obtenerTokens_Cliente = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensClienteRecibido/' + cliente_ID.value);
    tokensRecibidosCliente.value = data.data[0].totalTokensRecibidos + data.data[0].tokensCompradosCliente;
    tokensDeudasCliente.value = data.data[0].totalTokensDeudas;
  } catch (error) {
    console.log(error);
  }
};

const calcularDolares = async () => {

try {
  const { data } = await axios.get(baseURL + 'valores');
  valores.value = data.data;
  let valor = parseFloat(data.data[0].valor_token);
  let interes = parseFloat(data.data[0].comision_retiros);
  comision_retiro.value = interes
  montoDolares.value = cambioTokens.value / valor;
  dolares.value = montoDolares.value - (montoDolares.value * (interes/100));
} catch (error) {
  console.log(error);
}
};

const solicitarRetiro = async () => {
  if(cambioTokens.value > 0){
    if (usuario_rol.value == 'Inversionista') {
    const datos = {
      tipo: 'inversor',
      usuario_id: inversionista_ID.value,
      monto_solicitud: montoDolares.value,
      tokens_cambio: cambioTokens.value,
      comision_aplicar: montoDolares.value * (comision_retiro.value/100),
      monto_recibir: montoDolares.value - (montoDolares.value * (comision_retiro.value/100)),
      estado: 'Pendiente'
    };
    try {
      await axios.post(baseURL + 'solicitarRetiro', datos);
      // Swal.fire({
      //   title: "¡Felicidades!",
      //   text: "Solicitud de Retiro realizada exitosamente",
      //   icon: "success",
      //   allowOutsideClick: true,
      //   allowEscapeKey: true,
      //   color: 'var(--gray-color)',
      //   confirmButtonColor: 'var(--yellow-orange)', 
      // }); 
      iziToast.success({
        title: 'Felicidades',
        message: 'Solicitud de Retiro realizada exitosamente',
        messageColor: 'white',
        theme: 'dark',
        color: '#5ce65c',
        position: 'topRight',
        progressBarColor: '#FFFFFF',
        closeOnEscape: true
      })
      var myModalEl = document.getElementById('modalSolicitud');
      var modal = bootstrap.Modal.getInstance(myModalEl) || new bootstrap.Modal(myModalEl);
      modal.hide();
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
    obtenerTokens_Inversionista();
    obtenerTokens_Inversionista_Invertidos();
    location.reload();
  }
  if (usuario_rol.value == 'Cliente') {
    const datos = {
      tipo: 'cliente',
      usuario_id: cliente_ID.value,
      monto_solicitud: montoDolares.value,
      tokens_cambio: cambioTokens.value,
      comision_aplicar: montoDolares.value * (comision_retiro.value/100),
      monto_recibir: montoDolares.value - (montoDolares.value * (comision_retiro.value/100)),
      estado: 'Pendiente'
    };
    try {
      await axios.post(baseURL + 'solicitarRetiro', datos);
      // Swal.fire({
      //   title: "¡Felicidades!",
      //   text: "Solicitud de Retiro realizada exitosamente",
      //   icon: "success",
      //   allowOutsideClick: true,
      //   allowEscapeKey: true,
      //   color: 'var(--gray-color)',
      //   confirmButtonColor: 'var(--yellow-orange)', 
      // });      
      iziToast.success({
        title: 'Felicidades',
        message: 'Solicitud de Retiro realizada exitosamente',
        messageColor: 'white',
        theme: 'dark',
        color: '#5ce65c',
        position: 'topRight',
        progressBarColor: '#FFFFFF',
        closeOnEscape: true
      })
      var myModalEl = document.getElementById('modalSolicitud');
      var modal = bootstrap.Modal.getInstance(myModalEl) || new bootstrap.Modal(myModalEl);
      modal.hide();
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
    obtenerTokens_Cliente();
    obtenerSolicitudes();
    location.reload();
  }
  cambioTokens.value = 0;
  montoDolares.value = 0;
  comision_retiro.value = 0;
  dolares.value = 0;
  location.reload();
}
else
  {
  //   Swal.fire({
  //   title: "¡Error!",
  //   text: "Ingrese un valor mayor a 0 para solicitar retiro",
  //   icon: "error",
  //   allowOutsideClick: true,
  //   allowEscapeKey: true,
  //   color: 'var(--gray-color)',
  //   confirmButtonColor: 'var(--yellow-orange)', 
  // });
  iziToast.error({
    title: 'Error',
    message: 'Ingrese un valor mayor a 0 para solicitar retiro',
    messageColor: 'white',
    position: 'topRight',
    theme: 'dark',
    color: '#f00',
    progressBarColor: '#FFFFFF',
    closeOnEscape: true
  })
  }
}

</script>

<style scoped>
p {
  font-size: 1rem;
  color: var(--gray-color);
  margin-right: 15px;
}

.btn-primary {
  background-color: var(--primary);
  color: var(--yellow-orange);
  border-color: var(--yellow-orange);
}

.btn-secondary {
  background-color: var(--secondary);
  color: var(--yellow-orange);
  border-color: var(--yellow-orange);
}
.btn-secondary:hover {
  background-color: var(--gray-color);
  color: var(--white-color);
  border-color: var(--white-color);
}


.btn-danger {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

input {
  border-color: var(--input);
  background-color: var(--background);
}

</style>