<template>
    <div class="modal fade" id="media" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
      </div>
      <div class="modal-body">
        <div class="card">
          <div v-if="image" class="card-body">
            <img  :src="image" alt="" width="300" class="card-img-top">
          </div>
          <div v-if="!image" class="alert alert-warning px-5" role="alert">
            <h4 class="alert-heading">Sin resultados</h4>
            <p>El usuario aun no cuenta con una imagen</p>
          </div>
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</template> 
<script setup>
const props = defineProps({
    image:{
        type:String,
        required:true
    }
})

</script>