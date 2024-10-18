<template>

    <div class="whatsapp-icon">

        <a href="https://wa.me/+59160397621?text=Prueba%20de%20hamilo%20inversiones%20información😊" target="_blank"
            aria-label="WhatsApp">
            <i class="fab fa-whatsapp fa-3x"></i>
        </a>

    </div>

</template>

<script>

export default {
    name: 'WhatsAppIco',
};

</script>


<style scoped>
.whatsapp-icon {
    position: fixed;
    bottom: 30px;
    /* Distancia desde el fondo */
    right: 40px;
    /* Distancia desde la derecha */
    z-index: 1000;
    /* Asegúrate de que esté por encima de otros elementos */
}

.whatsapp-icon a {
    color: #25D366;
    /* Colofffr del icono de WhatsApp */

}
</style>