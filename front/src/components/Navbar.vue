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
              <RouterLink class="nav-link" to="/">Slice Channel</RouterLink>
            </li>
  
            <li class="nav-item">
              <RouterLink class="nav-link" to="/marketplace">Marketplace</RouterLink>
            </li>
  
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Propósito</RouterLink>
            </li>
  
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Cómo funciona</RouterLink>
            </li>
  
            <li class="nav-item">
              <RouterLink class="nav-link" to="/posts">Noticias</RouterLink>
            </li>
  
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Contactos</RouterLink>
            </li>
  
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">FAQs</RouterLink>
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
    background-color: var(--gray-color);
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

nav{
    height: 10vh;
}

</style>