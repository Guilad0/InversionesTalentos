<template>
    <div class="card">
        <div class="card-body">
            <h1>Titulo</h1>
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" name="nombre" id="nombre" class="form-control">

            <label for="Apellido" class="form-label">Apellido</label>
            <input type="text" name="Apellido" id="Apellido" class="form-control">

            <label for="email" class="form-label">Email</label>
            <input type="email" name="email" id="email" class="form-control">

            <div class="row">
                <div class="col-md-6">
                    <label for="codigopais" class="form-label">Codigo del pais</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="numerotelefono" class="form-label">Numero de telefono"</label>
                    <input type="text" name="numerotelefono" id="numerotelefono" class="form-control">
                </div>
            </div>

            <label for="paisresidencia">Pais de residencia</label>
            <input type="text" name="paisresidencia" id="paisresidencia" class="form-control">

            <label for="password" class="form-label">Contraseña</label>
            <input type="password" name="password" id="password" class="form-control">

            <label for="confirmpassword" class="form-label">Confirmar contraseña</label>
            <input type="password" name="confirmpassword" id="confirmpassword" class="form-control">

            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                <label class="form-check-label" for="flexCheckChecked">
                    He leido y acepto los <span :style="{color: 'darkviolet'}">Terminos y condiciones</span> y la <span :style="{color: 'darkviolet'}">Politica de privacidad</span>
                </label>
            </div>

            <button type="submit" class="btn btn-primary col-md-12 disabled">Registrarse Gratis</button>
            ¿Ya eres un usuario? <RouterLink to="/login">Iniciar Sesion</RouterLink>
        </div>
    </div>
</template>

<script setup>
</script>