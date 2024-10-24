<template>

    <footer class="text-center text-lg-start p-3 custom-footer">

        <div class="container-fluid p-4">            

            <div class="row">

                <div class="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">

                    <h5 class="text-center color-text">Forma parte de la comunidad de tu profesional favorito</h5>

                </div>

                <div class="col-lg-6 col-md-12 mb-4">

                    <div class="d-flex justify-content-end">

                        <div class="me-4 ">

                            <h6 class="text-uppercase color-text">Informacion General</h6>


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

                            <h6 class="text-uppercase color-text">Legales</h6>

                            <div class="d-flex flex-column ">

                                <a href="/link1">Acuerdo de compra de token</a>
                                <a href="/link1">Términos y Condiciones</a>
                                <a href="/link1">Política de Privacidad</a>

                            </div>

                            <h6 class="text-uppercase mt-2 color-text">Comunidad</h6>

                            <div class="d-flex justify-content-between">

                                <a href="https://www.instagram.com" class="me-3" target="_blank" aria-label="Instagram">
                                    <i class="fab fa-instagram fa-lg"></i>
                                </a>
                                <a href="https://x.com/" class="me-3" target="_blank" aria-label="X">
                                    <i class="fa-brands fa-x-twitter"></i>
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

        <div class="text-center p-3 pie color-text">

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

.custom-footer {
    background-color: var(--smoky-dark-color);
}

.color-text {
    color: var(--white-anti-flash-color);
}

a {
    text-decoration: none;
    color: var(--white-anti-flash-color);
}

.pie {
    font-size: 0.8rem;
}
</style>
