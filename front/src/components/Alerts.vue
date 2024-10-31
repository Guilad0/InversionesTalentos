<!-- AlertContainer.vue -->
<template>
  <div class="alert-container">
    <Alert
      v-if="showSuccess"
      :message="successMessage"
      type="success"
      @close="showSuccess = false"
    />
    <Alert
      v-if="showError"
      :message="errorMessage"
      type="error"
      @close="showError = false"
    />
    <Alert v-if="showInfo" :message="infoMessage" type="info" @close="showInfo = false" />
    <Alert
      v-if="showConfirm"
      :message="confirmMessage"
      type="confirm"
      :showConfirmation="true"
      @close="showConfirm = false"
      @confirm="handleConfirm"
    />

    <button @click="triggerAlert('success')">Mostrar Éxito</button>
    <button @click="triggerAlert('error')">Mostrar Error</button>
    <button @click="triggerAlert('info')">Mostrar Info</button>
    <button @click="triggerAlert('confirm')">Mostrar Confirmación</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Alert from "./Alert.vue";

const showSuccess = ref(false);
const showError = ref(false);
const showInfo = ref(false);
const showConfirm = ref(false);

const successMessage = ref("Operación exitosa");
const errorMessage = ref("Ocurrió un error");
const infoMessage = ref("Información importante");
const confirmMessage = ref("¿Estas seguro de realizar esta accion?");

const triggerAlert = (type) => {
  if (type === "success") {
    showSuccess.value = true;
  } else if (type === "error") {
    showError.value = true;
  } else if (type === "info") {
    showInfo.value = true;
  } else if (type === "confirm") {
    showConfirm.value = true;
  }
};

const handleConfirm = () => {
  showConfirm.value = false;
};
</script>

<style scoped>
.alert-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
