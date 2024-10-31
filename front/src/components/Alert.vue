<!-- Alert.vue -->
<template>
  <div v-if="isVisible" :class="['alert', type]" class="alert">
    <span v-if="type === 'error'"> <i class="fa fa-times-circle"></i> {{ message }}</span>
    <span v-if="type === 'success'"> <i class="fa fa-check"></i> {{ message }} </span>
    <span v-if="type === 'info'"> <i class="fa fa-info-circle"></i> {{ message }} </span>
    <span v-if="type === 'confirm'">
      <i class="fa fa-question-circle"></i>
      <span class="">{{ message }}</span>
    </span>

    <div v-if="showConfirmation" class="alert-buttons px-5">
      <button @click="confirmAlert" class="px-3">Confirmar</button>
      <button @click="closeAlert">Cancelar</button>
    </div>

    <button @click="closeAlert" class=""><strong>x</strong></button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: "info" },
  duration: { type: Number, default: 3000 },
  showConfirmation: { type: Boolean, default: false },
});

const emit = defineEmits(["close", "confirm"]);
const isVisible = ref(true);

let timer;

const startTimer = () => {
  timer = setTimeout(() => {
    isVisible.value = false;
    emit("close");
  }, props.duration);
};

onMounted(startTimer);

const closeAlert = () => {
  isVisible.value = false;
  emit("close");
};

const confirmAlert = () => {
  emit("confirm");
  closeAlert();
};
</script>

<style scoped>
.alert-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}

.alert {
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.295);
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.alert.info {
  background-color: #2286b8;
  color: #fbfdfe;
}
.alert.success {
  background-color: #38be1d;
  color: #f1f9f1;
}
.alert.error {
  background-color: #cb1a1a;
  color: #ffffff;
}
.alert.warning {
  background-color: #bfa41e;
  color: #ffffff;
}
.alert.confirm {
  background-color: #bfa41e;
  color: #ffffff;
}
.alert button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
