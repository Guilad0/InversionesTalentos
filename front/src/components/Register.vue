<template>
  <main class="  d-flex  justify-content-center align-items-center  animate__animated   animate__fadeInLeft">
    <div class="col-10 d-flex justify-content-center  col-xl-10  col-lg-10 col- flex-wrap d-flex  col-md-11 ">
      <form @submit.prevent="registrar">

        <div class="card shadow position-relative p-0 rounded-3">
          <div class="card-body position-relative">
            <p class="card-title underline text-center m-0 pb-3">Registrate</p>

            <div class="col d-flex my-2 px-2">
              <div class="col">
                <div class="form-floating mx-1 ">
                  <input
                        type="text"
                        class="form-control custom-font"
                        id="name"
                        v-model="name"
                        @invalid="handleInvalid"
                        required
                        placeholder=""
                        :class="{ 'is-invalid': nameConfirm === false, 'is-valid': nameConfirm === true }"
                        @input="handleName"
                      />
                  <label for="name">Nombres <label class="text-danger">*</label> </label>
                  <div v-if="nameConfirm == false" class="invalid-feedback">
                    Minimo 5 caracteres
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="form-floating mx-1 ">
                  <input
                    type="text"
                    class="form-control custom-font"
                    id="lastName"
                    @invalid="handleInvalid"
                    required
                    v-model="lastName"
                    :class="{ 'is-invalid': lastNameConfirm === false, 'is-valid': lastNameConfirm === true }"
                    @input="handleLastName"
                    placeholder="" />

                  <label for="lastName">Apellidos <label class="text-danger">*</label> </label>
                  <div v-if="nameConfirm === false" class="invalid-feedback">
                    Minimo 5 caracteres
                  </div>
                </div>
              </div>
            </div>

            <!-- Solo para admin -->
            <div v-if="user.rol == 'Admin'" class="d-flex my-2">
              <div class="col m-2">
                <select v-model="rol" class="form-select custom-font py-2 px-1  " aria-label="Default select example"
                  required>
                  <option  value="">Seleccione rol</option>
                  <option  value="cliente">Cliente</option>
                  <option  value="inversor">Inversor</option>
                </select>
              </div>

              <div class="col m-2" v-if="rol === 'cliente'">

                <select v-model="categoria" id="userSelect" class="form-select py-2 px-1 custom-font" required>
                  <option value="">Sel. categoria</option>
                  <option v-for="categoria in results" :key="categoria" :value="categoria.categoria_persona_id">
                    {{ categoria.nombre }}
                  </option>
                </select>
              </div>
            </div>
            <!-- ---- -->

            <div class=" d-flex justify-content-center px-3 my-auto">
              <div class=" col-3">Fecha de nacimiento<label class="text-danger">*</label> </div>
              <div class="col-4 text-center">
                <input
                  type="date"
                  v-model="fechaCumple"
                  name="fechaCumple"
                  @invalid="handleInvalidDate"
                  id="fechaCumple"
                  @input="handleFecha"
                  :class="{ 'is-invalid': control_fecha === false, 'is-valid': control_fecha === true }"
                  class="form-control custom-font"
                  required />
              </div>

              <div class="col text-center ms-1">
                <select
                  class="form-select form-select-sm "
                  id="countrySelect"
                  @invalid="handleInvalid"
                  v-model="countryName"
                  @input="selectCountryCode(selectedCountryname)"
                  required
                >
                  <option disabled value="">Selecciona un país</option>
                  <option v-for="country in countries" :key="country.abbreviation" :value="country" class="btn-gray ">
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="d-flex  flex-wrap px-3   my-2 align-items-center  ">
              <div class="col-4 ">
                <div class="dropdown  ">
                  <button class="py-2 px-4 btn btn-gray rounded-3 btn-sm " type="button" id="dropdownMenuButton"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img v-if="selectedCountry.flag" :src="selectedCountry.flag" alt="Flag" width="20" height="15"
                      class="" />
                    <label class="custom-font">
                      &nbsp;
                      {{ selectedCountry.code || 'Codigo de Pais' }}
                    </label>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li v-for="country in countries" :key="country.abbreviation">
                      <a class="dropdown-item" href="#" @click="selectCountry(country)">
                        <img :src="country.flag" alt="Flag" width="20" height="15" class="" /> ({{ country.code }}) {{
                        country.name }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col">
                <div class="form-floating ">
                  <div class="form-floating ">
                    <input
                      type="number"
                      class="form-control custom-font"
                      id="telefono"
                      required
                      @invalid="handleInvalidDate"
                      :class="{ 'is-invalid': control_telefono === false, 'is-valid': control_telefono === true }"
                      placeholder="name@example.com"
                      v-model="numero_telefono"
                      @input="handleTelefono">
                    <label for="telefono">Telefono</label>
                    <div v-if="control_telefono === false" class="invalid-feedback">
                      Minimo 5 caracteres
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="d-flex justify-content-center align-items-center">
              <div class="col px-2">
              <div class="form-floating ">
                <input
                  type="email"
                  class="form-control "
                  required
                  @invalid="handleInvalidEmail"
                  id="floatingInput"
                  :class="{ 'is-invalid': control_email === false, 'is-valid': control_email === true }"
                  placeholder=""
                  @input="handleEmail"
                  v-model="email">
                <label for="floatingInput">Correo <label class="text-danger">*</label></label>
                <div v-if="control_email === false" class="invalid-feedback">
                  Formato no permitido
                </div>
              </div>
            </div>
            <div class="col-2 ">
              Genero
            </div>
            <div class="col">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  value="mujer"
                  v-model="gender"
                   @input="handleValidGender"
                  required
                  @invalid="handleInvalid">
                <label class="form-check-label" for="flexRadioDefault1">
                  Mujer
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="gender" value="hombre" v-model="gender" >
                <label class="form-check-label" for="flexRadioDefault2">
                  Hombre
                </label>
              </div>
            </div>
            </div>
            <div class="d-flex justify-content-around my-2">
              <div class="col mx-2 ">
                <div class="form-floating ">
                  <input
                    type="password"
                    @input="handlePassword"
                    v-model="password"
                    @invalid="handleInvalid"
                    id="password"
                    class="form-control"
                    required
                    :class="{ 'is-invalid': controlPassword === false, 'is-valid': controlPassword === true }"
                    placeholder="name@example.com" />
                  <label for="password" >
                    Contraseña
                    </label>
                  <div class="invalid-feedback">
                    <ul>
                      <li v-if="password.length < 8">Debe ser mayor a 7 caracteres</li>
                      <li v-if="!haveLetter(password)">Debe contener al menos una letra minuscula</li>
                      <li v-if="!haveLetterCapital(password)">Debe contener al menos una letra mayuscula</li>
                      <li v-if="!tieneNumero(password)">Debe contener al menos un número</li>
                      <li v-if="!tieneCaracterEspecial(password)">Debe contener al menos un carácter especial</li>
                    </ul>
                  </div>
                </div>
              </div>


              <div class="col mx-2">
                <div class="form-floating">
                  <input
                    type="password"
                    v-model="confirmPassword"
                    id="confirmPassword"
                    :class="{ 'is-invalid': password != confirmPassword && confirmPassword.length > 0, 'is-valid': password == confirmPassword && confirmPassword.length > 0 === true }"
                    class="form-control"
                    @invalid="handleInvalid"
                    @input="handleValid"
                    required
                    placeholder="name@example.com" />
                  <label for="confirmPassword">Confirmar contraseña </label>
                </div>
              </div>
            </div>

            <div class="d-flex m-2">
              <div class="form-check m-2">
                <input
                  class="form-check-input"
                  v-model="acepta_terminos"
                  type="checkbox"
                  @input="handleValid"
                  @invalid="handleInvalid"
                  id="flexCheckChecked"
                  required />
                <label class="form-check-label  custom-font">
                  He leído y acepto los
                  <span :style="{ color: 'dark' }">Términos y condiciones</span>
                  y la
                  <span :style="{ color: 'dark' }">Política de privacidad</span>
                </label>
              </div>
            </div>


            <div class="d-flex justify-content-center mt-3">
              <button :disabled="isLoading" type="submit" class="btn btn-gray rounded-5 w-75">
                <label v-if="!isLoading"> Registrarse</label>
                <div v-if="isLoading" class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </button>
            </div>
            <div class="text-end cursor mt-3">
              <div @click="$emit('changePage')">
                ¿Ya eres un usuario?
                <a class="custom-link">Iniciar Sesión</a>
              </div>
            </div>

          </div>

        </div>

      </form>
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
import { haveLetterCapital,cleanFileds, haveLetter, validateName, validatePassword, validationEmail, validationNotEmptyFields, validationPass, tieneNumero, tieneCaracterEspecial, resetFileds } from '@/helpers/validatorsForm';

const user = JSON.parse(localStorage.getItem('usuario'))
let baseURL = "http://localhost:3000/users";
const isLoading = ref(false);

const name = ref("");
const nameConfirm = ref(null)

const lastName = ref("");
const lastNameConfirm = ref(null)

const fechaCumple = ref("");
const control_fecha = ref(null);

const countries = ref(countriesData)

const selectedCountry = ref("");

const countryName = ref('')
const selectedCountryname = ref("");

const countryConfirm = ref(null)

const email = ref("");
const control_email = ref(null);

const rol = ref("Null");
const categoria = ref(6);

const password = ref("");
const confirmPassword = ref("");
const controlPassword = ref(null)

const edad = ref('')

const acepta_terminos = ref(false);


const numero_telefono = ref("");
const control_telefono = ref(null);

const gender = ref('');

const { results, getData } = useFetchData(ref("/categories"));

const handleInvalid = (event) => {
  event.target.setCustomValidity('Por favor, completa este campo');
};
const handleInvalidEmail = (event) => {
  event.target.setCustomValidity('Por favor, introduce un correo valido');
};
const handleInvalidDate = (event) => {
  event.target.setCustomValidity('Por favor, introduce una fecha valida');
};

const handleValidGender = () =>{
  event.target.setCustomValidity('');

}
const handleName = (event) => {
  event.target.setCustomValidity('');
  nameConfirm.value = validateName(name.value.trim());
};

const handleValid = (event) =>{
  event.target.setCustomValidity('');
}

const handleLastName = (event) => {
  event.target.setCustomValidity('');
  lastNameConfirm.value = (validateName(lastName.value.trim()));
}

const handleFecha = ( event ) => {
  event.target.setCustomValidity('');
  control_fecha.value = getAge(fechaCumple.value) > 18 && getAge(fechaCumple.value) < 90;
  edad.value = getAge(fechaCumple.value);
};

const countryConfirmname = ref(false)

const selectCountry = (abbreviation) => {
  selectedCountry.value = abbreviation;
  countryConfirmname.value = true
};


const selectCountryCode = (abbreviation) => {
  selectedCountryname.value = abbreviation;
  event.target.setCustomValidity('');
  countryConfirm.value = true;
};

const handlePassword = () => {
  event.target.setCustomValidity('');
  controlPassword.value = validatePassword(password.value);
}

const handleEmail = async ( event ) => {
  if (!validationEmail(email.value)) {
    event.target.setCustomValidity('');
    control_email.value = false;
    return;
  }
  try {
    const response = await axios.get(
      "http://localhost:3000/users/handleEmail/correo?correo=" + email.value
    );
    if (response.data.existe == true) {
      control_email.value = false;
      return;
    }
    control_email.value = true;
    event.target.setCustomValidity('');

  } catch (error) {
    console.log(error);
    control_email.value = false;

  }
};

const handleTelefono = async ( event ) => {
  if (String(numero_telefono.value).length < 5) {
    event.target.setCustomValidity('');
    control_telefono.value = false;
    return;

  }
  try {
    const response = await axios.get(
      "http://localhost:3000/users/handleTelefono/telefono?telefono=" +
      numero_telefono.value
    );
    if (response.data.existe == true) {
      notyf.error("El numero ya cuenta con un registro");
      control_telefono.value = false;
      return;
    }
    control_telefono.value = true;
  } catch (error) {
    console.log(error);
    control_telefono.value = false;

  }
};
const emit = defineEmits(['changePage']);

const registrar = async () => {
  // console.log(validationPass([nameConfirm, lastNameConfirm,control_fecha,control_telefono,control_email, controlPassword, countryConfirm]));
  console.log(gender.value);
if(validatorForm()){
  let userName = generateUserName(email.value);
  const datos = {
    nombre: name.value,
    apellido: lastName.value,
    edad: fechaCumple.value,
    pais_residencia: countryName.value.name,
    rol: rol.value,
    codigo_pais: selectedCountry.value.code,
    categoria_persona_id: categoria.value,
    password: password.value,
    numero_telefono: numero_telefono.value,
    acepta_terminos: acepta_terminos.value,
    correo: email.value,
    username:userName,
    gender:gender.value
  };
  console.log('pasa');

  try {
    isLoading.value = true;
    await axios.post(baseURL, datos);    
    isLoading.value = false;
    emit('changePage');
    alert("Usuario registrado exitosamente");
  } catch (error) {
    isLoading.value = false;
    console.log(error);
    alert('Error al regsitrar')
  }finally{
    cleanFileds([name, lastName, fechaCumple,countryName,rol,selectCountry,categoria,password,confirmPassword,numero_telefono,acepta_terminos,email,selectedCountryname,gender]);
    resetFileds([nameConfirm, lastNameConfirm,control_fecha,control_telefono,control_email, controlPassword, countryConfirm,countryConfirmname])
  }
}
};

const generateUserName = ( emailUser ) =>{
    return emailUser.split('@')[0];
}

const validatorForm = () => {

if( !validationPass([nameConfirm, lastNameConfirm,control_fecha,control_telefono,control_email, controlPassword, countryConfirm]) ){
  alert('Todos los  campos son requeridos');
  return false;
}
if(   countryConfirmname.value == false || countryConfirmname.value == null){
  alert('Seleccione un codigo de pais');
  return false;
}
if(   password.value !== confirmPassword.value){
  alert('Las contraseñas no son iguales');
  password.value = ''
  confirmPassword.value = ''
  controlPassword.value = null
  return false;
}

return true

}

</script>
<style scoped>


.custom-font {
  font-size: 0.8rem;
}

.card {
  background-color: rgba(255, 255, 255, 0.938);
  min-height: 70vh;
  width: 30rem;
  padding: 2rem;
  margin-top: 2%;
  margin-bottom: 5%;

}

.custom-link {
  color: #14110f;
  text-underline-offset: 3px;
}

.custom-link:hover {
  color: #7e7f83;
  text-decoration: underline;
}

main {
  background-image: url('../assets/images/2.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>