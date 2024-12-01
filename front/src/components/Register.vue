<template>
  <main class="d-flex justify-content-center bgf py-3 animate__animated animate__fadeIn bg-admin" 
  :class="{ 'bg-admin': user, 'bg-user': user == '' }"
   >
      <form @submit.prevent="registrar" class="mt-3" @keypress.enter="registrar()">
        <div class="card login-card shadow">
      <div class="card-body login-card-body">
        <div class="text-center">
          <h3 class="login-text-color">Registrar Cuenta</h3>
        </div>
        <div class="mb-2 login-text-color d-flex">
          <div class="col me-2">
          <label for="name">Nombres <label class="text-danger">*</label> </label>
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
                  <div v-if="nameConfirm == false" class="invalid-feedback text-orange">
                    Minimo 5 Caracteres
                  </div>
          </div>
          <div class="col ms-2">
            <label for="lastName">Apellidos <label class="text-danger">*</label> </label>
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
                    <div v-if="lastNameConfirm == false" class="invalid-feedback text-orange">
                    Mínimo 5 Caracteres
                  </div>
          </div>
        </div>

        <div class="mb-2 login-text-color d-flex ">
            <div class="col me-2">
            <label for="lastName">Fecha de Nacimiento <label class="text-danger">*</label> </label>
              <input
                  type="date"
                  v-model="fechaCumple"
                  name="fechaCumple"
                  @invalid="handleInvalidDate"
                  id="fechaCumple"
                  @input="handleFecha"
                  :class="{ 'is-invalid': control_fecha === false, 'is-valid': control_fecha === true }"
                  class="form-control custom-font p-1"
                  required />
                  <div v-if="control_fecha == false" class="invalid-feedback text-orange">
                    Fecha No Valida
                  </div>
            </div>
            <div class="col ms-2">
            <label for="lastName">País de Residencia <label class="text-danger">*</label> </label>
              <select
                  class="form-select form-select-sm p-1"
                  id="countrySelect"
                  @invalid="handleInvalid"
                  v-model="countryName"
                  @input="selectCountryCode(selectedCountryname)"
                  required
                >
                  <option disabled value="">Selecciona un País</option>
                  <option v-for="country in countries" :key="country.abbreviation" :value="country" class="btn-gray ">
                    {{ country.name }}
                  </option>
                </select>
            </div>
        </div>

            <div v-if="user.rol == 'Admin'" class="mb-2 login-text-color d-flex ">
              <div class="col me-2">
            <label for="lastName">Rol <label class="text-danger">*</label> </label>
                <select v-model="rol" class="form-select form-select-sm p-1" aria-label="Multiple select example"
                  required>
                  <option  class="btn-gray " value="Inversionista">Inversor</option>
                  <option  class="btn-gray " value="Cliente" >Cliente</option>
                  <option  class="btn-gray " value="Null" >Sin Rol</option>
                </select>
              </div>

             <div class="col ms-2">
            <label for="lastName">Categoria <label class="text-danger">*</label> </label>
                <select v-model="categoria" id="userSelect" class="form-select form-select-sm p-1 " required>
                  <option v-for="categoria in results" :key="categoria" :value="categoria.categoria_persona_id"  class="btn-gray "> 
                    {{ categoria.nombre }}
                  </option>
                </select>
              </div>
            </div> 


        <div class="mb-2 login-text-color d-flex ">
          <div class="col me-2">
            <label for="lastName">Código de País <label class="text-danger">*</label> </label>

            <div class="dropdown">
              <button
                class="py-2 px-4 btn btn-light rounded-3 btn-sm"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  v-if="selectedCountry.flag"
                  :src="selectedCountry.flag"
                  alt="Flag"
                  width="20"
                  height="15"
                />
                <label class="custom-font">
                  &nbsp;
                  {{ selectedCountry.code || 'Codigo de Pais' }}
                </label>
              </button>
              <ul
                class="dropdown-menu custom-code-country overflow-auto rounded"
                aria-labelledby="dropdownMenuButton"
                style="max-height: 200px; border: 1px solid white; scrollbar-width: thin; scrollbar-color: white var(--gray-color); "  
              >
                <li
                  v-for="country in countries"
                  :key="country.abbreviation"
                  class="rounded-0 w-100 text-start custom-code"
                >
                  <a
                    class="dropdown-item cursor custom-country text-white"
                    @click="selectCountry(country)"
                  >
                    <img :src="country.flag" alt="Flag" width="20" height="15" /> 
                    ({{ country.code }}) {{ country.name }}
                  </a>
                </li>
              </ul>
            </div>

          </div>
          <div class="col ms-2">
            <label >Teléfono <label class="text-danger">*</label> </label>

            <input
                      type="tel" 
                      maxlength="8" 
                      class="form-control custom-font"
                      id="telefono"
                      required 
                      @invalid="handleInvalidDate"
                      :class="{ 'is-invalid': control_telefono === false, 'is-valid': control_telefono === true }"
                      placeholder=""
                      v-model="numero_telefono"
                      @input="handleTelefono">
                    <div v-if="control_telefono === false" class="invalid-feedback text-orange">
                      Mínimo 8 Caracteres
                    </div>
          </div>
        </div>

        <div class="mb-2 login-text-color d-flex">
          <div class="col me-2">
            <label for="floatingInput">E-mail <label class="text-danger">*</label></label>
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
                <div v-if="control_email === false" class="invalid-feedback text-orange">
                  E-mail No Permitido
                </div>
          </div>
          <div class="col ms-2">
            <label >Género <label class="text-danger">*</label></label>
            <div class="d-flex align-items-center gap-3 mt-2">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  value="mujer"
                  v-model="gender"
                  @input="handleValidGender"
                  @invalid="handleInvalid"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Mujer
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  value="hombre"
                  @invalid="handleInvalid"
                  v-model="gender"
                  @input="handleValidGender"
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Hombre
                </label>
              </div>
            </div>

          </div>
        </div>

        <div class="mb-2 login-text-color d-flex">          
          <div class="col me-2 position-relative">
            <label for="password">Contraseña <label class="text-danger">*</label></label>
            <input
                    :type="typeInput"
                    @input="handlePassword"
                    v-model="password"
                    @invalid="handleInvalid"
                    id="password"
                    class="form-control p-custom-start"
                    required
                    :class="{ 'is-invalid': controlPassword === false, 'is-valid': controlPassword == true }"
                    placeholder="" />
            <i v-if="typeInput=='text'" class="fa-solid fa-eye-slash cursor custom-abs-icon-eye"  @click="showPass"></i>
            <i v-if="typeInput=='password'" class="fa fa-eye custom-abs-icon-eye cursor "  @click="showPass"></i>
                    <div class="invalid-feedback">
                    <ul class="text-orange">
                      <li v-if="password.length < 8">Debe tener más de 7 caracteres</li>
                      <li v-if="!haveLetter(password)">Debe contener al menos una letra minúscula</li>
                      <li v-if="!haveLetterCapital(password)">Debe contener al menos una letra mayúscula</li>
                      <li v-if="!tieneNumero(password)">Debe contener al menos un número</li>
                      <li v-if="!tieneCaracterEspecial(password)">Debe contener al menos un caracter especial</li>
                    </ul>
                  </div>
          </div>
          <div class="col ms-2 ">
            <label >Confirmar Contraseña <label class="text-danger">*</label></label>
              <input
                    :type="typeInput"
                    v-model="confirmPassword"
                    id="confirmPassword"
                    :class="{ 'is-invalid': password != confirmPassword && confirmPassword.length > 0, 'is-valid': password == confirmPassword && confirmPassword.length > 0 === true }"
                    class="form-control "
                    @invalid="handleInvalid"
                    @input="handleValid"
                    required
                    placeholder="" />
          </div>
        </div>
        
        <div class="form-check text-white custom-terminos py-1">
            <input class="form-check-input" v-model="acepta_terminos" type="checkbox" id="flexCheckChecked" required   @invalid="handleInvalid"  @input="handleValid"/>
            <label class="form-check-label" for="flexCheckChecked">
              He leído y acepto los
              <span :style="{ color: 'dark' }">Términos y Condiciones</span>
              y la
              <span :style="{ color: 'dark' }">Política de Privacidad</span>
            </label>
          </div>
        <div class="row text-center">
          <div class="my-3">
            <button :disabled="isLoading" type="submit" class="btn btn-gray rounded-5 w-75 ">
                <label v-if="!isLoading"> Crear Cuenta</label>
                <div v-if="isLoading" class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Cargando...</span>
                  </div>
                </div>
              </button>
          </div>
        </div>

          <div v-if="user.rol != 'Admin'" class="row text-center w-70">
            <div class="col"><h5 class="login-text-color">¿Ya tienes una cuenta?</h5></div>
            <div @click="$emit('changePage')" class="col cursor">
              <a class="nav-link registrar-link"> Iniciar Sesión </a>
            </div>
          </div>
      </div>
    </div>
      </form>
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
import iziToast from 'izitoast';

const user = JSON.parse(localStorage.getItem('usuario')) || '';
// let baseURL = "https://apitalentos.pruebasdeploy.online/users";
let baseURL = import.meta.env.VITE_BASE_URL+"/users";
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
const existsEmail = ref(null)

const rol = ref("Null");
const categoria = ref(16);

const password = ref("");
const confirmPassword = ref("");
const controlPassword = ref(null)

const edad = ref('')

const acepta_terminos = ref(false);

const typeInput = ref('password')

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

const handleValidGender = (event)=>{
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

const showPass = () =>{
  typeInput.value = (typeInput.value == 'password')? 'text':'password';
}

const handleEmail = async ( event ) => {
  if (!validationEmail(email.value)) {
    event.target.setCustomValidity('');
    control_email.value = false;
    return;
  }
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL+"/users/handleEmail/correo?correo=" + email.value
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
  if (String(numero_telefono.value).length < 8) {
    event.target.setCustomValidity('');
    control_telefono.value = false;
    return;

  }
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL+"/users/handleTelefono/telefono?telefono=" +
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
    edad: edad.value,
    pais_residencia: countryName.value.name,
    rol: rol.value,
    codigo_pais: selectedCountry.value.code,
    categoria_persona_id: categoria.value,
    password: password.value,
    numero_telefono: numero_telefono.value,
    acepta_terminos: acepta_terminos.value,
    correo: email.value,
    username:name.value + ' - ' + lastName.value,
    gender:gender.value,
    registrado_por:user.correo || ''
  };
  console.log(datos);
  let msg = ref(( datos.registrado_por == '' )? 'Usuario registrado exitosamente, revisa tu correo electronico':'Usuario registrado exitosamente')
  try {
    isLoading.value = true;
    await axios.post(baseURL, datos);    
    isLoading.value = false;
    emit('changePage');

    iziToast.success({
      title: 'Exito',
      message: msg.value
    })
    // alert(msg.value);
  } catch (error) {
    isLoading.value = false;
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Error al registrar'
    })
    // alert('Error al regsitrar')
  }finally{
    cleanFileds([name, lastName, fechaCumple,countryName,selectCountry,password,confirmPassword,numero_telefono,acepta_terminos,email,gender]);
    resetFileds([nameConfirm, lastNameConfirm,control_fecha,control_telefono,control_email, controlPassword])
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

ustom-abs-icon-eye:hover{
  color:#526379
}

.bg-admin{
  background-color: var(--yellow-orange) !important;
  
}
.bg-user{
  background-image: url("../assets/images/iniciar_sesion.png");

}
.custom-terminos{
  font-size: 0.8rem;
}
.custom-abs-icon-eye {
    position: absolute; 
    left: 10px; 
    top: 35px; 
    color: var(--gray-color);
    
}
.p-custom-start{
  padding-left:  2rem ;
}

.custom-code-country{
  background-color: var(--gray-color);
  color: red;

}

.custom-country:hover{
  background-color:  #0d6efd !important;
  color: wheat ;
}
.custom-code:hover{
  background-color: #0d6efd !important ;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    display: none; 
}
.bgf {
  background-color: #f9f9fa;
}
.login-card {
  width: 30rem;
  padding: 2rem;
  min-height: 40rem;
  margin-top: 5%;
  margin-bottom: 5%;
  background-color: #17223be8;
}
.login-text-color {
  color: var(--white-anti-flash-color);
}

.btn-ingresar {
  background-color: var(--dun-color) !important;
  color: var(--jet-color) !important;
  font-weight: 600 !important;
}
.btn-ingresar:hover {
  background-color: var(--gray-color) !important;
  color: var(--dun-color) !important;
  font-weight: 800 !important;
}
.registrar-link {
  color: var(--dun-color) !important;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.registrar-link:hover {
  color: var(--white-anti-flash-color) !important;
  font-weight: 600 !important;
}

main {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.swal-button-confirm {
  background-color: #4caf50;
  color: white;
}
.swal-button-cancel {
  background-color: #f44336;
  color: white;
}
</style>