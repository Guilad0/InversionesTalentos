<template>
  <main class="  d-flex  justify-content-center align-items-center  animate__animated   animate__fadeInLeft" >
    <div class="col-10  col-xxl-8 col-xl-10  col-lg-10  col-md-11 ">
      <div class="card shadow position-relative  ">

        <div class="card-body  ">
          <h5 class=" text-center  underline custom-color">REGÍSTRATE</h5>
          <div class="d-flex">
            <div class="col">
              <label for="nombre" class="form-label">Nombre <label class="text-danger">*</label> </label>
              <input type="text" class="form-control" id="nombre" v-model="nombre"
                v-bind:class="{ 'valid': nombreVal, 'is-invalid': errors.nombre }" placeholder="Escriba sus nombres"
                @input="validarCampo('nombre')" required />
              <span v-if="errors.nombre" class="position-absolute text-danger">
                <i class="bi bi-x-circle"></i>
              </span>
              <span class="text-danger ">{{ errors.nombre }}</span>
            </div>
            <div class="col">
              <label for="nombre" class="form-label">Apellido<label class="text-danger">*</label> </label>
              <input type="text" class="form-control" id="apellido" v-model="apellido"
                v-bind:class="{ 'is-invalid': errors.apellido }"
                placeholder="Escriba sus nombres" @input="validarCampo('apellido')" required />
              <span v-if="errors.apellido" class="position-absolute text-danger">
                <i class="bi bi-x-circle"></i>
              </span>
              <span class="text-danger ">{{ errors.apellido }}</span>
            </div>
          </div>
          <div class="row ">
            <div class="col">
              <label for="rol" class="form-label ">Rol <label class="text-danger">*</label></label>
              <select v-model="rol" class="form-select" aria-label="Default select example" required>
                <option value="">Seleccione</option>
                <option value="cliente">Cliente</option>
                <option value="inversor">Inversor</option>
              </select>
            </div>

            <div class="col" v-if="rol === 'cliente'">
              <label for="categorias" class="form-label">Categorías</label>
              <select v-model="categoria" id="userSelect" class="form-select ">
                <option value="">Seleccione</option>
                <option v-for="categoria in results" :key="categoria" :value="categoria.categoria_persona_id">
                  {{ categoria.nombre }}
                </option>
              </select>
            </div>
            <div class="col ">
              <label for="fechaCumple" class="form-label">Fecha de nacimiento <label
                  class="text-danger">*</label></label>
              <input type="date" v-model="fechaCumple" name="fechaCumple" id="fechaCumple" @blur="handleFecha"
                :class="{ 'is-invalid': control_fecha === false, 'is-valid': control_fecha === true }"
                class="form-control" required />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label for="correo" class="form-label">Correo <label class="text-danger">*</label> </label>
              <input type="text" class="form-control" id="correo" v-model="correo"
                v-bind:class="{ 'valid': correoVal, 'is-invalid': errors.correo }" placeholder="Escriba sus nombres"
                @input="validarCampo('correo')" required />
              <span v-if="errors.correo" class="position-absolute text-danger">
                <i class="bi bi-x-circle"></i>
              </span>
              <span class="text-danger">{{ errors.correo }}</span>
            </div>
            <div class="col ">
              <label for="numero_telefono" class="form-label">Número de teléfono <label
                  class="text-danger">*</label></label>
              <input type="text" name="numero_telefono" v-model="numero_telefono" id="numero_telefono"
                @change="handleTelefono()" class="form-control" required />
            </div>
          </div>

          <div class="row   align-items-center ">
            <div class="col m-auto">
              <div class="dropdown ">
                <button class="btn btn-light border border custom-focus " type="button" id="dropdownMenuButton"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <img v-if="selectedCountry.flag" :src="selectedCountry.flag" alt="Flag" width="20" height="15"
                    class="me-2" />
                  {{ selectedCountry.name || 'Seleccionar País' }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li v-for="country in countries" :key="country.abbreviation" class="custom-border border-0">
                    <a class="dropdown-item" href="#" @click.prevent="selectCountry(country)">
                      <img :src="country.flag" alt="Flag" width="20" height="15" class="me-2" />
                      (+{{ country.code }}) {{ country.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col ">
              <div class="dropdown ">
                <button class="btn btn-light border border custom-focus " type="button" id="dropdownMenuButton"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <img v-if="selectedCountry.flag" :src="selectedCountry.flag" alt="Flag" width="20" height="15"
                    class="me-2" />
                  {{ selectedCountry.name || 'Pais de residencia' }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li v-for="country in countries" :key="country.abbreviation" class="custom-border border-0">
                    <a class="dropdown-item" href="#" @click.prevent="selectCountry(country)">
                      <img :src="country.flag" alt="Flag" width="20" height="15" class="me-2" />
                      (+{{ country.code }}) {{ country.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>



          <div class="row">
            <div class="col">
              <label for="password" class="form-label">Contraseña <label class="text-danger">*</label></label>
              <input type="password" v-model="password" id="password" class="form-control" required />


            </div>
            <div class="col">
              <label for="confirmPassword" class="form-label">Confirmar contraseña <label
                  class="text-danger">*</label></label>
              <input type="password" @blur="handlePassword" v-model="confirmPassword" id="confirmPassword"
                :class="{ 'is-invalid': password != confirmPassword }" class="form-control" required />
            </div>
          </div>

          <div class="form-check ">
            <input class="form-check-input" v-model="acepta_terminos" type="checkbox" id="flexCheckChecked" />
            <label class="form-check-label" for="flexCheckChecked">
              He leído y acepto los
              <span :style="{ color: 'dark' }">Términos y condiciones</span>
              y la
              <span :style="{ color: 'dark' }">Política de privacidad</span>
            </label>
          </div>

          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-gray rounded-5 w-75" @click.prevent="registrar">
              Registrarse Gratis
            </button>
          </div>
          <div class="text-end cursor">
            <div @click="$emit('changePage')">
              ¿Ya eres un usuario?
              <a to="/login" class="custom-link">Iniciar Sesión</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { notyf } from '@/helpers/NotifyAlerts';
import { ref } from "vue";
import axios from "axios";
import useFetchData from "../helpers/UseFetchData";
import { getAge } from "@/helpers/utilities";
import { countriesData } from '../helpers/dataCountries';

const countries = ref(countriesData)
let baseURL = "http://localhost:3000/users";
const nombre = ref("");
const selectedCountry = ref("");
const Apellido = ref("");
const correo = ref("");
const fechaCumple = ref("");
const rol = ref("");
const codigo_pais = ref("");
const password = ref("");
const edad = ref('')
const confirmPassword = ref("");
const acepta_terminos = ref(false);
const numero_telefono = ref("");
const control_email = ref(false);
const controlPassword = ref(null);
const control_telefono = ref(false);
const nombreVal = ref(false);
const apellidoVal = ref(false);
const correoVal = ref(false);
const control_fecha = ref(null);
const categoria = ref("");
const { results } = useFetchData(ref("/categories"));

const errors = ref({})

const validarCampo = (field) => {
  switch (field) {
    case 'nombre':
      nombreVal.value = !!nombre.value;
      if (!nombreVal.value) {
        errors.value.nombre = 'Este campo es requerido';
      } else if (nombre.value.trim().length < 3) {
        nombreVal.value = false;
        errors.value.nombre = 'El nombre debe tener al menos 3 caracteres';
      } else if (!/^[A-Za-z\s]+$/.test(nombre.value)) {
        nombreVal.value = false;
        errors.value.nombre = 'El nombre solo puede contener letras';
      } else {
        nombreVal.value = true;
        errors.value.nombre = '';
      }
      break;

    case 'apellido':
      apellidoVal.value = !!apellido.value;
      if (!apellidoVal.value) {
        errors.value.apellido = 'Este campo es requerido';
      } else if (apellido.value.trim().length < 2) {
        apellidoVal.value = false;
        console.log(errors.value);
        errors.value.apellido = 'El apellido debe tener al menos 3 caracteres';
      } else if (!/^[A-Za-z\s]+$/.test(apellido.value)) {
        apellidoVal.value = false;
        errors.value.apellido = 'El apellido solo puede contener letras';
      } else {
        apellidoVal.value = true;
        errors.value.apellido = '';
      }
      break;

    case 'correo':
      correoVal.value = !!correo.value;
      if (!correo.value) {
        errors.value.correo = 'Formato no valido';
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(correo.value.trim())) {
        correoVal.value = false;
        errors.value.correo = 'Introduce un correo electrónico válido';
      } else {
        correoVal.value = true;
        errors.value.correo = '';
      }
      break;


  }
}


const selectCountry = (abbreviation) => {
    selectedCountry.value = abbreviation;
    console.log(selectedCountry.value);
};

const handleFecha = () => {
  if (getAge(fechaCumple.value) > 18 && getAge(fechaCumple.value) < 90) {
    control_fecha.value = true;
    edad.value = getAge(fechaCumple.value)
  } else {
    control_fecha.value = false
    notyf.error("Edad no permitida");
  }
};



const handlePassword = () => {
  (password.value == confirmPassword.value ? controlPassword.value = true : controlPassword.value = false)
}


const validarCorreo = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
const handleTelefono = async () => {
  console.log(numero_telefono.value);
  try {
    const response = await axios.get(
      "http://localhost:3000/users/handleTelefono/telefono?telefono=" +
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
/* 
.custom-border{
  border-bottom: 1px solid var(--gray-color) !important;
}


.custom-card {
  background-color: #34312d;
  border: none;
  color: #d9c5b2;
}

.dropdown-menu {
    max-height: 200px;
    overflow-y: auto; 
    scrollbar-width: thin; 
    scrollbar-color: #1b1b1ba6 #f1f1f1; 
}

.dropdown-item:hover{
  background-color: #c2c4c496;
}
.custom-text {
  color: #d9c5b2;
}

.custom-button {
  background-color: #d9c5b2;
  color: #14110f;
  border: none;
}

.valid {
  border-color: green !important;
}

.is-invalid {
  border-color: red;
}

.text-danger {
  font-size: 0.8rem;
}

li:hover {
  background-color: #d9c5b2;
  color: #fff;
}


select {
  background-color: #dcdde063;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.829);
  border: none;
}



.form-check-label span {
  color: #14110f;
  font-size: 0.7rem;
} */

.card {
  background-color: rgba(255, 255, 255, 0.938);
  height: 100%;
  
  padding: 2rem;
  
  margin-top: 2%;
  margin-bottom: 5%;

}

/* .custom-link {
  color: #14110f;
  text-underline-offset: 3px;
}

.custom-link:hover {
  color: #7e7f83;
  text-decoration: underline;
}

label{
  font-size: 0.9rem;
} */
main {
  background-image: url('../assets/images/2.png');
  background-size: cover;
  background-repeat: no-repeat;


}
</style>
