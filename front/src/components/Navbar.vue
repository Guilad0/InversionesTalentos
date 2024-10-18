<template>

    <nav class="navbar navbar-expand-lg custom-navbar">

        <div class="container-fluid mx-3">

            <a class="navbar-brand" href="/">
                <h2>HAMILO INVERSIONES</h2>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">

                <ul class="navbar-nav mx-auto">

                    <li class="nav-item">
                        <a class="nav-link active" href="/view1" aria-current="page">Slice Channel
                            <span class="visually-hidden">(current)</span></a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/view2">Marketplace</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/view3">Propósito</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/view4">Cómo funciona</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/view5">Noticias</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/view6">Contactos</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/view7">FAQs</a>
                    </li>

                </ul>

                <div class="d-flex align-items-center">

                    <select class="form-select-sm me-2" aria-label="Select Language">
                        <option value="1">Es</option>
                        <option value="2">En</option>
                        <option value="3">De</option>
                        <option value="4">Fr</option>
                    </select>

                    <button class="btn boton me-2">Registrarse</button>
                    <button class="btn boton">Iniciar sesión</button>

                </div>

            </div>

        </div>

    </nav>

</template>

<script>

</script>

<style scoped>

a:hover {
    color: #d9c5b2;
}

.boton {
    background-color: #34312d;
    color: #f3f3f4;
    border: 1px solid #f3f3f4
}

.boton:hover {
    background-color:#d9c5b2;
    color: black;
    border: 1px solid black;
}

.custom-navbar {
    background-color: #000;
    
}

a {
    font-size: 1.2rem;
    color: #f3f3f4;
}

.active {
    background-color: #d9c5b2;
    color: black;
    border-radius: 10px;
}

</style>