<template>

    <footer class="bg-dark text-light text-center text-lg-start p-3">

        <div class="container-fluid p-4">

            <div class="whatsapp-icon">

                <a href="https://wa.me/+59160397621?text=Prueba%20de%20hamilo%20inversiones%20información😊" target="_blank" aria-label="WhatsApp">
                    <i class="fab fa-whatsapp fa-3x"></i>                    
                </a>

            </div>

            <div class="row">

                <div class="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">

                    <h5 class="text-center">Forma parte de la comunidad de tu profesional favorito</h5>

                </div>

                <div class="col-lg-6 col-md-12 mb-4">

                    <div class="d-flex justify-content-end">

                        <div class="me-4 ">

                            <h6 class="text-uppercase">Informacion General</h6>


                            <div class="d-flex flex-column">

                                <a href="/link1">Marketplace</a>
                                <a href="/link1">Propósito</a>
                                <a href="/link1">Cómo funciona</a>
                                <a href="/link1">Noticias</a>
                                <a href="/link1">Contacto</a>
                                <a href="/link1">FAQs</a>

                            </div>

                        </div>

                        <div>

                            <h6 class="text-uppercase">Legales</h6>

                            <div class="d-flex flex-column ">

                                <a href="/link1">Acuerdo de compra de token</a>
                                <a href="/link1">Términos y Condiciones</a>
                                <a href="/link1">Política de Privacidad</a>

                            </div>

                            <h6 class="text-uppercase mt-2">Comunidad</h6>

                            <div class="d-flex justify-content-between">

                                <a href="https://www.instagram.com" class="me-3" target="_blank" aria-label="Instagram">
                                    <i class="fab fa-instagram fa-lg"></i>
                                </a>
                                <a href="https://www.twitter.com" class="me-3" target="_blank" aria-label="Twitter">
                                    <i class="fab fa-twitter fa-lg"></i>
                                </a>
                                <a href="https://www.youtube.com" class="me-3" target="_blank" aria-label="YouTube">
                                    <i class="fab fa-youtube fa-lg"></i>
                                </a>
                                <a href="https://www.linkedin.com" class="me-3" target="_blank" aria-label="LinkedIn">
                                    <i class="fab fa-linkedin fa-lg"></i>
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <hr>

        <div class="text-center p-3 pie">

            © 2024 HAMILO INVERSIONES | Todos los derechos reservados.

        </div>

    </footer>

</template>

<script>
export default {
    name: 'Footer',
};
</script>

<style scoped>

.whatsapp-icon {
    position: fixed;
    bottom: 30px; /* Distancia desde el fondo */
    right: 40px; /* Distancia desde la derecha */
    z-index: 1000; /* Asegúrate de que esté por encima de otros elementos */
}

.whatsapp-icon a {
    color: #25D366; /* Colofffr del icono de WhatsApp */
    
}

a {
    text-decoration: none;
    color: #fff;
}

.pie {
    font-size: 0.8rem;
}
</style>
