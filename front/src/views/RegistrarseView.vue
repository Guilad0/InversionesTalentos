<template>
  <div class="d-flex justify-content-center align-items-center  container">
    <div class="container col-md-6 mt-5 mb-5">
      <div class="card shadow">
        <div class="card-body py-5 align-items-center">
          <h5 class="fw-bold text-center mb-3 underline custom-color">REGÍSTRATE</h5>
          <div class="row">
              <div class="col">
                <label for="nombre" class="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            v-model="nombre"
            id="nombre"
            class="form-control"
            required
          />
              </div>
              <div class="col">
                <label for="Apellido" class="form-label">Apellido</label>
          <input
            type="text"
            name="Apellido"
            v-model="Apellido"
            id="Apellido"
            class="form-control"
            required
          />
              </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label for="rol" class="form-label">Rol</label>
              <select
                v-model="rol"
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option value="cliente">Cliente</option>
                <option value="inversor">Inversor</option>
              </select>
            </div>

            <div class="col" v-if="rol === 'cliente'">
              <label for="categorias" class="form-label">Categorías</label>
              <select v-model="categoria" id="userSelect" class="form-select">
                <option
                  v-for="categoria in results"
                  :key="categoria"
                  :value="categoria.categoria_persona_id"
                >
                  {{ categoria.nombre }}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="fechaCumple" class="form-label"
                >Fecha de Nacimiento</label
              >
              <input
                type="date"
                v-model="fechaCumple"
                name="fechaCumple"
                id="fechaCumple"
                @change="handleFecha()"
                class="form-control"
                required
              />
            </div>
          </div>
         
          <div class="row">
            <div class="col">
              <label for="email" class="form-label m-0">Email</label>
              <input
                type="email"
                v-model="correo"
                name="correo"
                @change="handleEmail()"
                id="correo"
                class="form-control"
                required
              />
            </div>
            <div class="col">
              <label for="pais_residencia">País de Residencia</label>
          <input
            type="text"
            name="pais_residencia"
            id="pais_residencia"
            class="form-control"
            required
          />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="codigo_pais" class="form-label"
                >Código del País</label
              >
              <select
                v-model="codigo_pais"
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option value="591">Bolivia</option>
                <option value="57">Colombia</option>
                <option value="54">Uruguay</option>
                <option value="51">Perú</option>
                <option value="593">Ecuador</option>
              </select>
            </div>

            <div class="col-md-6">
              <label for="numero_telefono" class="form-label"
                >Número de Teléfono</label
              >
              <input
                type="text"
                name="numero_telefono"
                v-model="numero_telefono"
                id="numero_telefono"
                @change="handleTelefono()"
                class="form-control"
                required
              />
            </div>
          </div>

          

         <div class="row">
          <div class="col">
            <label for="password" class="form-label">Contraseña</label>
          <input
            type="password"
            v-model="password"
            id="password"
            class="form-control"
            required
          />

      
          </div>
          <div class="col">
            <label for="confirmPassword" class="form-label"
            >Confirmar Contraseña</label
          >
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmPassword"
            class="form-control"
            required
          />
          </div>
         </div>

          <div class="form-check p-2 px-5">
            <input
              class="form-check-input"
              v-model="acepta_terminos"
              type="checkbox"
              id="flexCheckChecked"
            />
            <label class="form-check-label" for="flexCheckChecked">
              He leído y acepto los
              <span :style="{ color: 'dark' }">Términos y Condiciones</span>
              y la
              <span :style="{ color: 'dark' }">Política de Privacidad</span>
            </label>
          </div>

          <div class="row px-5 ">
            <button
            type="submit"
            class="btn custom-button rounded-3 "
            @click.prevent="registrar"
          >
            Registrarse Gratis
          </button>
          </div>
          <div class="mt-3 text-end me-3">
           <div>
            ¿Ya eres un usuario?
          <RouterLink to="/login" class="custom-link"
            >Iniciar Sesión</RouterLink
          >
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import useFetchData from "../helpers/UseFetchData";
// let baseURL = "https://apitalentos.pruebasdeploy.online/users";
let baseURL = import.meta.env.VITE_BASE_URL+"/users";
const usuarios = ref([]);
const nombre = ref("");
const Apellido = ref("");
const correo = ref("");
const fechaCumple = ref("");
const rol = ref("");
const codigo_pais = ref("");
const password = ref("");
const confirmPassword = ref("");
const acepta_terminos = ref(false);
const numero_telefono = ref("");
const control_email = ref(false);
const control_telefono = ref(false);
const control_fecha = ref(false);
const categoria = ref("");
const handleFecha = () => {
  console.log(fechaCumple.value);
  const fechaNacimiento = new Date(fechaCumple.value);
  let edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
  const mes = new Date().getMonth() - fechaNacimiento.getMonth();
  if (
    mes < 0 ||
    (mes === 0 && new Date().getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }

  if (edad < 18) {
    alert("Debes ser mayor de edad para registrarte");
    return;
  }
  control_fecha.value = true;
};
const { results } = useFetchData(ref("/categories"));

// Elimina 'categoria_personas' si no es necesario
const handleEmail = async () => {
  console.log(correo.value);
  // if (validarCorreo(correo.value)===false) {
  //   alert("El correo no es valido");
  //   return;
  // }
  try {
    const response = await axios.get(
      // "https://apitalentos.pruebasdeploy.online/users/handleEmail/correo?correo=" + correo.value
      import.meta.env.VITE_BASE_URL+"/users/handleEmail/correo?correo=" + correo.value
    );
    console.log(response.data);
    if (response.data.existe == true) {
      alert("El correo ya existe");
    return;}
  } catch (error) {
    console.log(error);
  }
  control_email.value = true;
};
const validarCorreo = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
const handleTelefono = async () => {
  console.log(numero_telefono.value);
  try {
    const response = await axios.get(
      // "https://apitalentos.pruebasdeploy.online/users/handleTelefono/telefono?telefono=" +
      import.meta.env.VITE_BASE_URL+"/users/handleTelefono/telefono?telefono=" +
        numero_telefono.value
    );
    console.log(response.data);
    if (response.data.existe == true) {
      alert("El número ya existe");
      return;
    }
    control_telefono.value = true;
  } catch (error) {
    console.log(error);
  }
};
const registrar = async () => {
  console.log(validarCorreo(correo.value));
  if (!acepta_terminos.value) {
    alert("Debes aceptar los términos");
    return;
  }
console.log(control_email.value, control_telefono.value, control_fecha.value);
  if (control_email.value == false || control_telefono.value == false || control_fecha.value == false) {
    alert("Campos no válidos");
    return;
  }

  // Validación de campos vacíos
  if (
    nombre.value == "" ||
    Apellido.value == "" ||
    correo.value == "" ||
    fechaCumple.value == "" ||
    rol.value == "" ||
    password.value == "" ||
    confirmPassword.value == "" ||
    numero_telefono.value == "" // Corregido de 'telefono' a 'numero_telefono'
  ) {
    alert("Todos los campos son obligatorios");
    return;
  }

  // Validación de mayor de edad
  const fechaNacimiento = new Date(fechaCumple.value);
  let edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
  const mes = new Date().getMonth() - fechaNacimiento.getMonth();
  if (
    mes < 0 ||
    (mes === 0 && new Date().getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }

  if (edad < 18) {
    alert("Debes ser mayor de edad para registrarte");
    return;
  }

  // Validación contraseñas
  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const datos = {
    nombre: nombre.value,
    apellido: Apellido.value,
    correo: correo.value,
    edad: edad,
    rol: rol.value,
    codigo_pais: codigo_pais.value, // Corregido 'codigopais'
    password: password.value,
    numero_telefono: numero_telefono.value, // Corregido de 'telefono' a 'numero_telefono'
    pais_residencia: "1", // Puedes ajustar este valor según tu lógica
    acepta_terminos: acepta_terminos.value ? 1 : 0, // Guardar como 1 si acepta
    categoria_persona_id: categoria.value,
  };
  console.log(datos);

  try {
    const response = await axios.post(baseURL, datos);
    alert("Usuario registrado exitosamente");
    console.log(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("El correo ya existe");
    } else {
      alert("Error al registrar el usuario");
    }
    console.log(error);
  }
};
</script>
<style scoped>
/* Estilo del fondo */
.custom-background {
  background-color: var(--violet-2-color);
  height: 100vh;
}

/* Estilo de la tarjeta */
.custom-card {
  background-color: #34312d;
  border: none;
  color: #d9c5b2;
}

/* Estilo del texto principal */
.custom-text {
  color: #d9c5b2;
}

/* Estilo del botón */
.custom-button {
  background-color: #d9c5b2;
  color: #14110f;
  border: none;
}

.custom-button:hover {
  background-color: #d9c5b2;
  color: #fff;
}

/* Input fields y bordes */
input,
select {
  background-color: #7e7f8352;
  color: #ffffff;
  border: none;
}

input::placeholder {
  color: #d9c5b2;
}

/* Checkbox y links */
.form-check-label span {
  color: #14110f;
}

/* Estilo para el enlace */
.custom-link {
  color: #14110f;
}

/* Cambiar color en el enlace */
.custom-link:hover {
  color: #7e7f83;
  text-decoration: underline;
}

.custom-color{
  color: rgba(44, 43, 43, 0.753) !important;
}
</style>
