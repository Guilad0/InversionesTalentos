<script setup>
import Register from '../components/Register.vue'

</script>
<template>
  <div class="container">
    <div class="modal fade " id="modalRegisterUser" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="modalRegisterUser1" data-bs-backdrop="static">
      <div class="modal-dialog ">
        <div class="modal-content ">

          <div class="  modal-body p-0">
            <div class=" border-0 bg-gray  text-center rounded-0 w-100">
              <button class="btn btn-orange my-2" data-bs-dismiss="modal" @click="$emit('closeModal')"> Cerrar </button>
            </div>
            <Register />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
