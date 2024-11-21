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

                            <h6 class="text-uppercase color-text">Información General</h6>


                            <div class="d-flex flex-column">


                                <RouterLink exact-active-class="active" class="nav-link underline-dynamic"
                                    to="marketplace">Marketplace</RouterLink>


                                <RouterLink exact-active-class="active" class="nav-link underline-dynamic"
                                    to="/proposito">Propósito</RouterLink>


                                <RouterLink exact-active-class="active" class="nav-link underline-dynamic"
                                    to="como-funciona">Cómo Funciona</RouterLink>


                                <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="posts">
                                    Guías de Usuario</RouterLink>


                                <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="contact">
                                    Contactos</RouterLink>


                                <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="faq">
                                    FAQs</RouterLink>


                            </div>

                        </div>

                        <div>

                            <h6 class="text-uppercase color-text">Legales</h6>

                            <div class="d-flex flex-column ">


                                <RouterLink exact-active-class="active" class="nav-link underline-dynamic"
                                    to="/compra-token">Compra Token</RouterLink>

                                <RouterLink exact-active-class="active" class="nav-link underline-dynamic"
                                    to="/terminos-condiciones">Términos y Condiciones</RouterLink>


                                <RouterLink exact-active-class="active" class="nav-link underline-dynamic"
                                    to="/politica-privacidad">Política de Privacidad</RouterLink>


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

.nav-link {
    margin-bottom: 0.5rem;
}

.nav-link:hover {
    color: #F37926;
}

.nav-link.active {
    color: #F37926 !important;
}

.pie {
    font-size: 0.8rem;
}
</style>
