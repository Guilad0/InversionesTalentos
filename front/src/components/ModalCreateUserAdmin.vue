<script setup>
import Register from '../components/Register.vue'

</script>
<template>
  <div class="container mi">
    <div class="modal fade " id="modalRegisterUser" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="modalRegisterUser1" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content ">

              <div class="bg-orange text-center pe-3">
                <button class="btn btn-gray my-2  btn-sm" data-bs-dismiss="modal" @click="$emit('closeModal')"> Cerrar </button>
              </div>
          <div class="  modal-body p-0">
            <Register  />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .abs-custom{
    position: absolute;
    bottom: 0px;
    right: 43%;
  }
</style>