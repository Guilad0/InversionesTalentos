<template>
    <div class="container d-flex justify-content-center align-items-center bg-dark">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body py-5">
                    <h1>Titulo</h1>
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" name="nombre" v-model="nombre" id="nombre" class="form-control" />

                    <label for="Apellido" class="form-label">Apellido</label>
                    <input type="text" name="Apellido" v-model="Apellido" id="Apellido" class="form-control" />

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" v-model="email" name="email" id="email" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label for="fechaCumple" class="form-label">Fecha de nacimiento</label>
                            <input type="date" v v-model="fechaCumple" name="fechaCumple" id="fechaCumple"
                                class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-12">
                        <label for="rol" class="form-label">Rol</label>
                        <select v-model="rol" class="form-select" aria-label="Default select example">
                            <option selected value="">Selecciona una opción</option>
                            <option value="cliente">Cliente</option>
                            <option value="inversor">Inversor</option>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="codigopais" class="form-label">Codigo del pais</label>
                            <select class="form-select" v-model="codigopais" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="telefono" class="form-label">Numero de telefono"</label>
                            <input type="text" name="telefono" v-model="telefono" id="telefono" class="form-control" />
                        </div>
                    </div>

                    <label for="paisresidencia">Pais de residencia</label>
                    <input type="text" name="paisresidencia" id="paisresidencia" class="form-control" />

                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" v-model="password" id="password" class="form-control" />

                    <label for="confirmPassword" class="form-label">Confirmar contraseña</label>
                    <input type="confirmPassword" v-model="confirmPassword" id="confirmPassword" class="form-control" />

                    <div class="form-check">
                        <input class="form-check-input" v-model="terminos" type="checkbox" value=""
                            id="flexCheckChecked" checked />
                        <label class="form-check-label" for="flexCheckChecked">
                            He leido y acepto los
                            <span :style="{ color: 'darkviolet' }">Terminos y condiciones</span>
                            y la
                            <span :style="{ color: 'darkviolet' }">Politica de privacidad</span>
                        </label>
                    </div>

                    <button type="submit" class="btn btn-primary col-md-12" @click="registrar()">
                        Registrarse Gratis
                    </button>
                    ¿Ya eres un usuario?
                    <RouterLink to="/login">Iniciar Sesion</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

let baseURL = "http://localhost:3000/users";
const usuarios = ref([]);
const nombre = ref("");
const Apellido = ref("");
const email = ref("");
const fechaCumple = ref("");
const rol = ref("");
const codigopais = ref("");
const password = ref("");
const confirmPassword = ref("");
const terminos = ref(false);
const telefono = ref("");
const registrar = async () => {
    if (nombre.value == "" || Apellido.value == "" || email.value == "" || fechaCumple.value == "" ||
        rol.value == "" || password.value == "" || confirmPassword.value == "" || terminos.value == false || telefono.value == ""
    ) {
        alert("Todos los campos son obligatorios");
        return;
    }
    const datos = {
        nombre: nombre.value,
        Apellido: Apellido.value,
        email: email.value,
        fechaCumple: fechaCumple.value,
        rol: rol.value,
        codigopais: codigopais.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        terminos: terminos.value,
        telefono: telefono.value
    };
    if (password.value != confirmPassword.value) {
        alert("Las contraseñas no coinciden");
        return;
    }
    try {
        const {data} = await axios.post(baseURL, datos);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

</script> 
