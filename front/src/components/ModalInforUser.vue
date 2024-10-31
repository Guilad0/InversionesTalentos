<template>
<div class="modal fade" id="modalUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalUserl" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 m-auto" id="modalUserl">Detalles del usuario</h1>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="cl">Understood</button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>

const props = defineProps({
    userSelecionated:{
        type:Object,
        required:true
    }
})

const cl = ()=>{
        var myModalEl = document.getElementById('modalUser');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
}


</script>