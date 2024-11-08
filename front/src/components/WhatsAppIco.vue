<template>
  <div class="whatsapp-icon">
    <a
      href="https://wa.me/+59160397621?text=Prueba%20de%20hamilo%20inversiones%20información😊"
      target="_blank"
      aria-label="WhatsApp"
    >
      <i class="fab fa-whatsapp fa-3x"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "WhatsAppIco",
};
</script>

<style scoped>
.whatsapp-icon {
  position: fixed;
  bottom: 30px;
  right: -1800px;
  z-index: 1000;
}

.whatsapp-icon a {
  color: #25d366;
}

@media (max-width: 1440px) {
  .whatsapp-icon {
    right: -1350px;
    bottom: 30px;
  }
}

@media (max-width: 900px) {
  .whatsapp-icon {
    right: -820px;
    bottom: 60px;
  }
}

@media (max-width: 768px) {
  .whatsapp-icon {
    right: -700px;
    bottom: 50px;
  }
}

@media (max-width: 480px) {
  .whatsapp-icon {
    right: -360px;
    bottom: 50px;
  }
}
</style>
