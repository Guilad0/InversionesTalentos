<template>
  <div class="modal fade" id="modalUser" tabindex="1">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 m-auto" id="modalUserl">{{ typeForm }} del usuario</h1>
        </div>

    <div class="modal-body">
      <div v-if="typeForm == 'informacion'" class="modal-body ">
          <div v-if="myRol == 'Cliente'" class="d-flex justify-content-between px-5 ">
            <div class="col">
              <p> <label class="fw-bold">Nombres:</label>: {{ client.nombre }}</p>
              <p> <label class="fw-bold">apellidos:</label>: {{ client.apellido }}</p>
              <p> <label class="fw-bold">E-mail:</label>: {{ client.correo }}</p>
              <p> <label class="fw-bold">Usuario:</label> {{ client.username }}</p>
              <p> <label class="fw-bold">Teléfono:</label>: +{{ client.codigo_pais }} {{ client.numero_telefono }} </p>
              <p> <label class="fw-bold">Género:</label>: {{ client.genero }} </p>
            </div>
            <div class="col">
              <p v-if="client.rol == 'Cliente'"> <label class="fw-bold">Categoría: &nbsp;</label>{{ client.categoria }}
              </p>
              <p> <label class="fw-bold">Rol: &nbsp;</label>{{ client.rol }} </p>
              <p> <label class="fw-bold">Fecha de Registro: &nbsp;</label>{{ client.created_at?.slice(0,10) }} </p>
              <p v-if="client.verificado == '0'"> <label class="fw-bold">Verificado: &nbsp;</label>No </p>
              <p v-if="client.verificado == '1'"> <label class="fw-bold">Verificado: &nbsp;</label>Si </p>
              <p v-if="client.aprobado == '1'"> <label class="fw-bold">Cuenta Aprobada: &nbsp;</label>Si </p>
              <p v-if="client.aprobado == '0'"> <label class="fw-bold">Cuenta Aprobada: &nbsp;</label>No </p>
            </div>

          </div>
          <div v-if="myRol == 'Inversionista'">
            <div class="d-flex justify-content-between px-5">
              <div class="col">
              <p> <label class="fw-bold">Nombres:</label>: {{ client.nombre }}</p>
              <p> <label class="fw-bold">Apellidos:</label>: {{ client.apellido }}</p>
              <p> <label class="fw-bold">E-mail:</label>: {{ client.correo }}</p>
              <p> <label class="fw-bold">Usuario:</label> {{ client.username }}</p>
              <p> <label class="fw-bold">Teléfono:</label>: +{{ client.codigo_pais }} {{ client.numero_telefono }} </p>
              <p> <label class="fw-bold">Género:</label>: {{ client.genero }} </p>
            </div>
            <div class="col">
              <p> <label class="fw-bold">Rol: &nbsp;</label>{{ client.rol }} </p>
              <p> <label class="fw-bold">Fecha de Registro: &nbsp;</label>{{ client?.created_at?.slice(0,10) }} </p>
              <p v-if="client.verificado == '0'"> <label class="fw-bold">Verificado: &nbsp;</label>No </p>
              <p v-if="client.verificado == '1'"> <label class="fw-bold">Verificado: &nbsp;</label>Si </p>
              <p v-if="client.aprobado == '1'"> <label class="fw-bold">Cuenta Aprobada: &nbsp;</label>Si </p>
              <p v-if="client.aprobado == '0'"> <label class="fw-bold">Cuenta Aprobada: &nbsp;</label>No </p>
            </div>

            </div>
          </div>
        </div>

        <div v-if="typeForm == 'experiencia'">
         <div class="px-3 text-center" >
          <table v-if="client.length > 0" class="table ">
            <thead>
              <tr >
                <th class="td-custom">#</th>
                <th class="td-custom">Institución</th>
                <th class="td-custom">Cargo</th>
                <th class="td-custom">Actividades</th>
                <th class="td-custom">Fecha Inicio</th>
                <th class="td-custom">Fecha Final</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="(exp, index) in client" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ exp.institucion}}</td>
                <td>{{ exp.cargo}}</td>
                <td>{{ exp.actividades}}</td>
                <td>{{ exp.fecha_inicio.slice(0,10)}}</td>
                <td v-if="exp.fecha_final">{{ exp.fecha_final.slice(0,10)}}</td>
                <td v-else></td>
                
              </tr>

            </tbody>
          </table>
          <div v-else class="alert alert-warning px-5" role="alert">
            <h4 class="alert-heading">Sin Resultados</h4>
            <p><i class="fa-solid fa-circle-exclamation"></i> &nbsp; El usuario aun no cuenta con experiencias registradas</p>
          </div>
        </div>    
        </div>

        <div class="px-3 text-center" v-if="typeForm == 'logros'">
          <table v-if="client.length > 0" class="table ">
            <thead>
              <tr>
                <th class="td-custom">#</th>
                <th class="td-custom">Descripción</th>
                <th class="td-custom">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, index) in client" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ log.descripcion }}</td>
                <td>{{ log.fecha.slice(0,10) }}</td>
              </tr>

            </tbody>
          </table>
          <div v-else class="alert alert-warning px-5" role="alert">
            <h4 class="alert-heading">Sin Resultados</h4>
            <p>El usuario aun no cuenta con logros registrados</p>
          </div>

        </div>
        <div class="modal-footer text-center m-auto">
          <div class="m-auto"><button type="button" class="btn btn-gray border rounded-5 px-4"
              data-bs-dismiss="modal" @click="$emit('clearId')">Cerrar</button></div>
        </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue';
import axios from 'axios'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  typeForm: {
    type: String,
    required: true
  },
  myRol: {
    type: String,
    required: true
  }
});
const clearClientData = () => {
  client.value = {};
};

const client = ref({})
const getUser = async () => {
  if (!props.id) return;
  console.log(action.value);
  console.log(props.myRol);
  if( props.myRol == 'Cliente' ){
    if (props.typeForm == 'informacion') {
    try {
      // const { data } = await axios.get('https://apitalentos.pruebasdeploy.online/users/getUserById/' + props.id)
      const { data } = await axios.get(import.meta.env.VITE_BASE_URL+'/users/getUserById/' + props.id)
      client.value = data.results[0];
      console.log('fdsfdsafa',client.value);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      // const { data } = await axios.get(`https://apitalentos.pruebasdeploy.online/clients/getExperienceById/${props.id}?type=${props.typeForm}`)
      const { data } = await axios.get(import.meta.env.VITE_BASE_URL+`/clients/getExperienceById/${props.id}?type=${props.typeForm}`)
      client.value = data.results;
      console.log('fdsfdsafa',client.value);


    } catch (error) {
      console.log(error);
    }
  }
  }else{
    if( props.myRol  == 'Inversionista' ){
      try {
        // const {data} = await axios.get('https://apitalentos.pruebasdeploy.online/users/getInfoInvestor/'+props.id);
        const {data} = await axios.get(import.meta.env.VITE_BASE_URL+'/users/getInfoInvestor/'+props.id);
        client.value = data.results[0];
        console.log(client.value);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
const action = ref('')
const islaoding = ref(false)
watch(
  () => [props.id, props.typeForm,props.myRol],
  ([newId, newTypeForm]) => {
    if (newId !== -1 && newId) {
      action.value = newTypeForm;
      getUser();
    }
  },
  { immediate: true }
);


onMounted(() => {
  const modalElement = document.getElementById('modalUser');
  modalElement.addEventListener('hidden.bs.modal', clearClientData);
});

onUnmounted(() => {
  const modalElement = document.getElementById('modalUser');
  if (modalElement) {
    modalElement.removeEventListener('hidden.bs.modal', clearClientData);
  }
});
</script>
<style scoped>
.modal-title{
  color: #17223B;
  font-family: var(--font-montserrat-bold);
  font-size: 30px;
  font-weight: 700;
  margin-top: 10px;
  text-align: center;
  text-transform: uppercase;

}

</style>