<template>
    <div class="contact-container">
      <p class="contact-title">¿Necesitas Ayuda? <span>Contactanos!</span></p>
      <div class="contact-icons">
        <a href="#" class="contact-item">
          <i class="fab fa-whatsapp"></i>
          <span>WhatsApp</span>
        </a>
        <a href="mailto:proyecto.inver24@gmail.com" class="contact-item">
          <i class="fas fa-envelope"></i>
          <span>Email</span>
        </a>
        <a href="/" class="contact-item">
          <i class="fas fa-list"></i>
          <span>Form</span>
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
.contact-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--white-anti-flash-color);
  margin-top: 20px;
  color: var(--smoky-dark-color);
}

.contact-container p {
  margin: 0;
  font-size: 18px;
  color: var(--smoky-dark-color);
  text-align: center;
}
.contact-title span{
    color: var(--gray-color); 
}

.contact-icons {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 15px;
}

.contact-item {
  text-align: center;
  text-decoration: none;
  color:var(--smoky-dark-color);
  font-size: 14px;
  transition: transform 0.3s ease;
}

.contact-item i {
  font-size: 24px;
  display: block;
  margin-bottom: 5px;
}

.contact-item span {
  display: block;
}

.contact-item:hover {
  color: var(--smoky-dark-color);
  transform: scale(1.1); 
}

@media (max-width: 768px) {
  .contact-container p {
    font-size: 16px;
  }

  .contact-icons {
    gap: 20px;
  }

  .contact-item i {
    font-size: 22px;
  }

  .contact-item span {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .contact-container {
    padding: 15px;
  }

  .contact-container p {
    font-size: 14px;
  }

  .contact-icons {
    gap: 15px;
  }

  .contact-item {
    font-size: 12px;
  }

  .contact-item i {
    font-size: 20px;
  }

  .contact-item span {
    font-size: 10px;
  }
}
</style>
  