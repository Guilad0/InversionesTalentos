<template>
  <div>
    <div class="container mx-auto p-4" v-if="usuario_rol == 'Cliente'">
      <h1 class="font-bold mb-4 title">Balance de Fondos</h1>
      <div>
        <div class="row">
          <div class="col-md-6">
            <p class="text-white">Tokens del Cliente: {{ tokensTOTAL }} </p>
          </div>
          <div class="col-md-6">
            <p class="text-white">Tokens por Devolver: {{ tokensDeudasCliente }} </p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-around mb-6 button-container">
        <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2" data-bs-toggle="modal"
          data-bs-target="#modalTokens">Comprar Tokens <span></span></button>
        <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2" data-bs-toggle="modal"
          data-bs-target="#modalSolicitud">Solicitar Retiro <span></span></button>
      </div>

    </div>

    <div class="container mx-auto p-4" v-if="usuario_rol == 'Inversionista'">
      <h1 class="text-2xl font-bold mb-4">Balance de Fondos</h1>
      <div class="bg-zinc-100 p-4 rounded-lg mb-6">
        <div class="row d-flex justify-content-around">
          <div class="col-md-5">
            <p class="text-xl text-white">Tokens del Inversionista: {{ tokensTOTAL }}</p>
          </div>

          <div class="col-md-5">
            <p class="text-xl text-white">Inversiones con Ganancias Pendientes: {{ gananciasTokenInversionista }}</p>
          </div>
          <!-- <div class="col-md-4">
            <p class="text-xl text-white">Total de USD Ingresados: $US {{ dolaresInversionista }}</p>
          </div> -->
        </div>
      </div>

      <div class="d-flex justify-content-around mb-6 button-container">
        <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2" data-bs-toggle="modal"
          data-bs-target="#modalTokens">Comprar Tokens<span></span></button>
        <button class="animate__animated animate__fadeInUp animate__slow btn-6 m-2 col-2" data-bs-toggle="modal"
          data-bs-target="#modalSolicitud">Solicitar Retiro<span></span></button>
      </div>

    </div>
    <!-- Modal Tokens -->
    <div class="modal fade" id="modalTokens" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content bg-degrade">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Datos de la Compra de Tokens</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Cliente Info -->
            <div class="container mx-auto p-4" v-if="usuario_rol == 'Cliente'">
              <div class="row d-flex justify-content-around">
                <div class="col-md-6">
                  <p class="text-xl text-white text-center">Tokens del Cliente: {{ tokensTOTAL }}</p>
                </div>
                <div class="col-md-6">
                  <p class="text-xl text-white text-center">Tokens por Devolver: {{ tokensDeudasCliente }}</p>
                </div>
              </div>
            </div>
            <!-- Inversionista Info -->
            <div class="container mx-auto p-4" v-if="usuario_rol == 'Inversionista'">
              <div class="row d-flex justify-content-around">
                <!-- <div class="col-md-6">
                  <p class="text-xl text-white text-center">Tokens Invertidos: {{ gananciasTokenInversionista }}</p>
                </div> -->
                <div class="col-md-6">
                  <p class="text-xl text-white text-center">Tokens del Inversionista: {{ tokensTOTAL }}</p>
                </div>
              </div>
            </div>
            <!-- Formulario -->
            <form action="#" class="needs-validation" novalidate>
              <div class="row">
                <div class="col-md-5 offset-md-2">
                  <div class="mb-3">
                    <label for="montoUsd" class="form-label"><b>Monto en USD</b></label>
                    <input type="number" v-model="montoUsd" id="montoUsd" class="form-control "
                      @input="calcularTokens()" required />
                    <label for="monotUsd" class="mt-2">Compra maxima USD {{ limiteCompraDolares }}</label>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="mb-3">
                    <label class="form-label">Tokens</label>
                    <p class="text-xl text-white text-center">{{ tokens }}</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" @click="comprarTokens()"
              class="animate__animated animate__fadeInUp animate__slow btn-6 m-2" data-bs-dismiss="modal">
              Comprar<span></span>
            </button>
            <button type="button" class="animate__animated animate__fadeInUp animate__slow btn-6 btn-7 m-2"
              data-bs-dismiss="modal" @click="closeModal">
              Cerrar<span></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Inversión -->
    <div class="modal fade" id="modalInversion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content bg-degrade">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Datos de la Inversión</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="#" class="needs-validation" novalidate>
              <p class="text-xl text-white text-center">Tokens Restantes: {{ tokensTOTAL }}</p>
              <div class="row">
                <!-- Selección de Cliente -->
              </div>
              <div class="row">
                <!-- Tokens a Invertir -->
                <div class="col-md-4 offset-md-2">
                  <div class="mb-3">
                    <label for="monto_tokens_invertir" class="form-label">Tokens a invertir</label>
                    <input type="number" v-model="monto_tokens_invertir" id="monto_tokens_invertir" class="form-control"
                      @input="calcularGanancias()" required />
                  </div>
                </div>
                <!-- Meses de Inversión -->
                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">Meses de Inversión</label>
                    <p class="text-xl text-white text-center">{{ tiempo_inversion }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <!-- Ganancias -->
                <div class="col-md-4 offset-md-4">
                  <div class="mb-3 text-center">
                    <label class="form-label">Ganancia del {{ porcentaje_inversion }}%</label>
                    <p class="text-xl text-white text-center">{{ ganancia_tokens_inv }}</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" @click="inversionistaInvertir()"
              class="animate__animated animate__fadeInUp animate__slow btn-6 m-2" data-bs-dismiss="modal">
              Invertir<span></span>
            </button>
            <button type="button" class="animate__animated animate__fadeInUp animate__slow btn-6 btn-7 m-2"
              data-bs-dismiss="modal">Cerrar<span></span></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Solicitud Retiro -->
    <div class="modal fade" id="modalSolicitud" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content bg-degrade">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Datos del Retiro
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="#" class="needs-validation" novalidate>
              <div class="row justify-content-between ">
                <div class="col m-auto d-flex flex-column">
                  <div class="m-auto">
                    <label for="cambioTokens" class="form-label ">Tokens a cambiar</label>
                    <input type="number" v-model="cambioTokens" id="cambioTokens" class="form-control"
                      @input="calcularDolares()" required />
                  </div>
                  <div class="col">

                    <div class="mb-3 my-3">

                      <label class="form-label m-auto">Comisión de Retiro</label>

                      <p class="text-xl text-white m-auto">{{ comision_retiro }}%</p>

                    </div>

                  </div>
                </div>
                <div class="col">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label m-auto">Tokens Disponibles</label>
                      <p class="text-xl text-white m-auto"> {{ tokensTOTAL - cambioTokens }}</p>
                    </div>
                    <div class="mb-3">
                      <label class="form-label m-auto">Dólares</label>
                      <!-- <p class="text-xl text-white text-center m-auto">$US {{ montoDolares }}</p> -->
                      <p class="text-xl text-white text-center m-auto">$US {{ montoDolares.toFixed(3) }}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label for="retiro_inversionista " class="form-label m-auto  ">Total a Retirar</label>
                      <!-- <p class="text-xl text-white m-auto">$US {{ dolares }}</p> -->
                      <p class="text-xl text-white m-auto">$US {{ dolares.toFixed(3) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" @click="solicitarRetiro()"
              class="animate__animated animate__fadeInUp animate__slow btn-6 m-2" data-bs-dismiss="modal">
              Solicitar Retiro<span></span>
            </button>
            <button type="button" class="animate__animated animate__fadeInUp animate__slow btn-6 btn-7 btn-7 m-2"
              data-bs-dismiss="modal" @click="closeModal">
              Cerrar<span></span>
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
import { useRouter } from "vue-router";
import iziToast from 'izitoast';
import { timerAlert } from '@/helpers/sweetAlerts';
import { successAlert, successAlertAcept } from '@/helpers/iziToast';
const route = useRouter();

// let baseURL = 'https://apitalentos.pruebasdeploy.online/billetera/';
let baseURL = import.meta.env.VITE_BASE_URL + '/billetera/';
const cambioTokens = ref(0)

const valores = ref([]);
const tokensDeudasCliente = ref(0);

const monto_tokens_invertir = ref(0);
const ganancia_estimada = ref(0);
const cliente_Invertir_ID = ref('');
const cliente_ID = ref('');
const inversionista_ID = ref('');
const usuario = JSON.parse(localStorage.getItem("usuario"));
const usuario_id = ref(usuario.usuario_id);
const usuario_rol = ref(usuario.rol);

const tiempo_inversion = ref(0);
const porcentaje_inversion = ref(0);
const ganancia_tokens_inv = ref(0);
const montoDolares = ref(0);
const comision_retiro = ref(0);
const dolares = ref(0);

const dolaresInversionista = ref(0);

const tokensIngresan = ref(0);
const tokensEgresan = ref(0);
const tokensTOTAL = ref(0);

const montoLimite = ref(0)
const limiteCompraDolares = ref(10000)
const montoUsd = ref(0);
const tokens = ref(0);

const limiteTokensRetiro = ref(0)

if (usuario_rol.value == 'Inversionista') {
  inversionista_ID.value = usuario_id.value;
  onMounted(async () => {
    await obtenerDolares_Inversionista();
    await obtenerTokens_Inversionista();
    await ganancias_Inversionista();

    await calcularGanancias();
  });
}
if (usuario_rol.value == 'Cliente') {
  cliente_ID.value = usuario_id.value;
  onMounted(async () => {
    await obtenerTokens_Cliente();
    await obtenerDeudas_Cliente();
  });
}
onMounted(async () => {
  await calcularTokens();
  await calcularDolares();
});



//Función para saber cuantos dólares invirtió el inversionista

const obtenerDolares_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + 'dolaresInversionista/' + inversionista_ID.value);
    dolaresInversionista.value = data.data[0].totalUsd;
  } catch (error) {
    console.log(error);
  }
};
//Función para saber cuantos tokens tiene el inversionista

const obtenerTokens_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + 'totalTokens/' + inversionista_ID.value);
    tokensIngresan.value = data.data[0].token;
    tokensEgresan.value = data.data[1].token || 0;
    tokensTOTAL.value = tokensIngresan.value - tokensEgresan.value;
  } catch (error) {
    console.log(error);
  }
};
const gananciasTokenInversionista = ref(0);
const ganancias_Inversionista = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensGananciasInversionista/' + inversionista_ID.value);
    gananciasTokenInversionista.value = data.data[0].gananciaTokens || 0;
  } catch (error) {
    console.log(error);
  }
};

const closeModal = () => {
  montoUsd.value = 0;
  tokens.value = 0;
  cambioTokens.value = 0;
  dolares.value = 0;
  montoDolares.value = 0
}

const calcularTokens = async () => {
  if (montoUsd.value <= limiteCompraDolares.value) {
    try {
      montoLimite.value = montoUsd.value;
      const { data } = await axios.get(baseURL + 'valores');
      valores.value = data.data;
      let valor = parseFloat(data.data[0].valor_token)
      montoUsd.value = parseFloat(montoUsd.value) || 0;
      tokens.value = montoUsd.value * valor;
    } catch (error) {
      console.log(error);
    }
  } else {
    timerAlert(`El monto maximo permitido es ${limiteCompraDolares.value}.`, 'center', 2500, 'error')
    montoUsd.value = montoLimite.value;
  }
};

const comprarTokens = async () => {
  if (montoUsd.value > 0 && tokens.value > 0 && montoUsd.value != NaN) {
    if (usuario_rol.value == 'Inversionista') {
      const datos = {
        monto: montoUsd.value,
        tokens: tokens.value,
        usuario_id: inversionista_ID.value,
        tipo: 'Ingreso',
        descripcion: 'Compra de tokens',
        estado: 0,
      };
      console.log(datos);
      try {
        await axios.post(baseURL + 'comprarTokens', datos);
        // successAlert(`Tokens comprados exitosamente`, 'Felicidades', 'topRight')
        successAlertAcept(`Tokens comprados exitosamente. Ahora está en espera de revisión y aprobación por parte de nuestro personal administrativo`, 'Felicidades', 'center')
        var myModalEl = document.getElementById('modalTokens');
        var modal = bootstrap.Modal.getInstance(myModalEl) || new bootstrap.Modal(myModalEl);
        modal.hide();
      } catch (error) {
        console.error('Error al guardar los tokens:', error);
      }
      await obtenerDolares_Inversionista();
      await obtenerTokens_Inversionista();
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
        estado: 0,
      };
      try {
        await axios.post(baseURL + 'comprarTokens', datos);
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
      await obtenerTokens_Cliente();
      montoUsd.value = 0;
      tokens.value = 0;
    }
  }
  else {
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

const calcularGanancias = async () => {

  try {
    const { data } = await axios.get(baseURL + 'valores');
    monto_tokens_invertir.value = parseFloat(monto_tokens_invertir.value);
    console.log(monto_tokens_invertir.value);
    tiempo_inversion.value = parseInt(data.data[0].tiempo_inversion) || 0;
    porcentaje_inversion.value = parseFloat(data.data[0].porcentaje_inversion);
    console.log(porcentaje_inversion.value);
    ganancia_tokens_inv.value = monto_tokens_invertir.value * (porcentaje_inversion.value / 100);
  } catch (error) {
    console.log(error);
  }
};
const inversionistaInvertir = async () => {
  const tokens_invertir = parseFloat(monto_tokens_invertir.value);
  const tokens_inversionista = parseFloat(tokensIngresan.value) - parseFloat(tokensEgresan.value);
  if (tokens_invertir > 0 && tokens_invertir <= tokens_inversionista && tokens_invertir != NaN || cliente_Invertir_ID.value == 0) {
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
    await obtenerTokens_Inversionista();

    location.reload();
  }
  else {
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

};

const obtenerTokens_Cliente = async () => {
  try {
    const { data } = await axios.get(baseURL + 'totalTokens/' + cliente_ID.value);
    tokensIngresan.value = data.data[0].token;
    tokensEgresan.value = data.data[1].token || 0;
    tokensTOTAL.value = parseFloat(tokensIngresan.value) - parseFloat(tokensEgresan.value);
    console.log(cliente_ID.value);
    console.log(tokensTOTAL.value)
  } catch (error) {
    console.log(error);
  }
};

const obtenerDeudas_Cliente = async () => {
  try {
    const { data } = await axios.get(baseURL + 'tokensDeudasCliente/' + cliente_ID.value);
    tokensDeudasCliente.value = data.data[0].totalTokensDeudas || 0;
  } catch (error) {
    console.log(error);
  }
}

const calcularDolares = async () => {
  if (usuario_rol.value == 'Inversionista') {
    if (cambioTokens.value <= (tokensTOTAL.value)) {
      try {
        limiteTokensRetiro.value = cambioTokens.value;
        const { data } = await axios.get(baseURL + 'valores');
        valores.value = data.data;
        let valor = parseFloat(data.data[0].valor_token);
        let interes = parseFloat(data.data[0].comision_retiros);
        comision_retiro.value = interes
        montoDolares.value = parseInt(cambioTokens.value) / valor || 0;
        dolares.value = montoDolares.value - (montoDolares.value * (interes / 100));
        console.log(cambioTokens.value);
      } catch (error) {
        console.log(error);
      }
    } else {
      cambioTokens.value = limiteTokensRetiro.value
      timerAlert(`Tu monto actual de tokens es ${tokensTOTAL.value}`, 'center', 2500, 'error')
    }
  }
  if (usuario_rol.value == 'Cliente') {
    if (cambioTokens.value <= (tokensTOTAL.value)) {
      try {
        limiteTokensRetiro.value = cambioTokens.value;
        const { data } = await axios.get(baseURL + 'valores');
        valores.value = data.data;
        let valor = parseFloat(data.data[0].valor_token);
        let interes = parseFloat(data.data[0].comision_retiros);
        comision_retiro.value = interes
        montoDolares.value = parseInt(cambioTokens.value) / valor || 0;
        dolares.value = montoDolares.value - (montoDolares.value * (interes / 100));
        console.log(cambioTokens.value);
      } catch (error) {
        console.log(error);
      }
    } else {
      cambioTokens.value = limiteTokensRetiro.value
      timerAlert(`Tu monto actual de tokens es ${tokensTOTAL.value}`, 'center', 2500, 'error')
    }
  }
};

const solicitarRetiro = async () => {
  if (cambioTokens.value > 0) {
    if (usuario_rol.value == 'Inversionista') {
      const datos = {
        tipo: 'inversor',
        usuario_id: inversionista_ID.value,
        monto_solicitud: montoDolares.value,
        tokens_cambio: parseInt(cambioTokens.value),
        comision_aplicar: montoDolares.value * (comision_retiro.value / 100),
        monto_recibir: montoDolares.value - (montoDolares.value * (comision_retiro.value / 100)),
        estado: 'Pendiente'
      };
      console.log(datos);

      try {
        await axios.post(baseURL + 'solicitarRetiro', datos);
        successAlertAcept(`Tu solicitud de retiro se ha enviado con éxito. Ahora está en espera de revisión y aprobación por parte de nuestro personal administrativo`, 'Transaccion finalizada', 'center')
        var myModalEl = document.getElementById('modalSolicitud');
        var modal = bootstrap.Modal.getInstance(myModalEl) || new bootstrap.Modal(myModalEl);
        modal.hide();
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }

      await obtenerTokens_Inversionista();


    }
    if (usuario_rol.value == 'Cliente') {
      const datos = {
        tipo: 'cliente',
        usuario_id: cliente_ID.value,
        monto_solicitud: montoDolares.value,
        tokens_cambio: cambioTokens.value,
        comision_aplicar: montoDolares.value * (comision_retiro.value / 100),
        monto_recibir: montoDolares.value - (montoDolares.value * (comision_retiro.value / 100)),
        estado: 'Pendiente'
      };
      console.log(datos);
      try {
        await axios.post(baseURL + 'solicitarRetiro', datos);
        successAlertAcept(`Tu solicitud de retiro se ha enviado con éxito. Ahora está en espera de revisión y aprobación por parte de nuestro personal administrativo`, 'Transaccion finalizada', 'center')
        await obtenerTokens_Cliente();
        var myModalEl = document.getElementById('modalSolicitud');
        var modal = bootstrap.Modal.getInstance(myModalEl) || new bootstrap.Modal(myModalEl);
        modal.hide();
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
    cambioTokens.value = 0;
    montoDolares.value = 0;
    comision_retiro.value = 0;
    dolares.value = 0;

  }
  else {
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
  //location.reload();
}

</script>

<style scoped>
.bg-degrade {
  background: linear-gradient(to right, var(--gray-color), rgb(101, 126, 197));
}

.title {
  font-family: var(--font-montserrat-bold);
  font-weight: 700;
  font-size: 30px;
  color: var(--white-color);
  text-transform: uppercase;
}

.h1 {
  font-family: var(--font-montserrat-bold);
}

p {
  font-family: var(--font-montserrat-semibold);
  font-size: 1.2rem;
  margin-right: 15px;
}

button {
  color: rgb(128, 159, 245);
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 25px;
  transition: background-color 0.3s, transform 0.3s;
}

.animate__slow {
  animation-duration: 5s;
}

.btn-6 {
  position: relative;
  display: block;
  overflow: hidden;
  text-transform: uppercase;
  border: 1px solid currentColor;
  color: var(--gray-color);
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
}

.btn-6 span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: var(--gray-color);
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.btn-7 span {
  background-color: var(--yellow-orange) !important;
}

.btn-6:hover {
  color: var(--white-anti-flash-color);
}

.btn-6:hover span {
  width: 225%;
  height: 562.5px;
}

input {
  border-color: white;
  background-color: rgba(255, 255, 255, 0.281);
}


@media (max-width: 1200px) {
  .title {
    font-size: 26px;
  }
  
  p {
    font-size: 1rem;
  }

  .btn-6, .btn-7 {
    font-size: 0.9rem;
    padding: 10px 15px;
  }
}

@media (max-width: 992px) {
  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .button-container {
    flex-direction: column;
    align-items: center;    
  }

  .button-container .btn {
    width: 100%; 
    max-width: 300px; 
    margin-bottom: 0.5rem; 
  }
  .col-md-5, .col-md-6, .col-md-4 {
    width: 100%;
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
  }

  .modal-dialog {
    width: 90%;
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 22px;
  }
  .button-container {
    flex-direction: column; 
    align-items: center;    
  }

  .button-container .btn {
    width: 50%; 
    max-width: 50px; 
    margin-bottom: 0.5rem; 
  }
  p {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.8rem;
    padding: 8px 10px;
  }

  .modal-body {
    padding: 1rem;
  }
}

@media (max-width: 576px) {
  .title {
    font-size: 18px;
  }

  p {
    font-size: 0.8rem;
  }

  .btn-6, .btn-7 {
    font-size: 0.7rem;
    padding: 5px 8px;
  }

  .modal-dialog {
    width: 95%;
    max-width: 400px;
  }
}
</style>
