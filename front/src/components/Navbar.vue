<template>

  <div class="bg-dark">

    <nav class="navbar navbar-expand-lg custom-navbar bg-dark-custom z-3 shadow animate__animated animate__fadeIn">

      <div class="container-fluid mx-3">

        <button class="navbar-toggler" type="button" @click="toggleMenu" aria-controls="navbarNav"
          aria-expanded="isMenuOpen" aria-label="Toggle navigation">

          <span class="text-white"> <i class="fa fa-bars"></i> </span>

        </button>

        <div class="collapse navbar-collapse burger-menu " :class="{ show: isMenuOpen }" id="navbarNav">

          <RouterLink class="nav-link" to="/">
            <img :src="logo" alt="" width="40" class="rounded me-2" />
          </RouterLink>

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <li class="nav-item">
              <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="/">Inicio</RouterLink>
            </li>

            <li class="nav-item" v-if="rol !== 'Cliente'">
              <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="marketplace">Marketplace
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="/proposito">Propósito
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="como-funciona">Cómo
                Funciona</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="posts">Guías de Usuario
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="contact">Contactos
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="faq">Preguntas Frecuentes
              </RouterLink>
            </li>

            <li class="nav-item" v-if="isMenuOpen & (rol == 'Cliente' || rol == 'Inversionista' || rol == 'Null')">
              <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="perfil">Ir a Perfil
              </RouterLink>
            </li>
            <li class="nav-item" v-if="isMenuOpen & (rol == 'Cliente' || rol == 'Inversionista' || rol == 'Null')">
              <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="/billetera">Ir a Billetera
              </RouterLink>
            </li>
            <li class="nav-item" v-if="isMenuOpen & (rol == 'Cliente' || rol == 'Inversionista' || rol == 'Null')">
              <RouterLink exact-active-class="active" @click="logout" class="nav-link underline-dynamic"
                to="sign-login">Cerrar Sesión</RouterLink>
            </li>

          </ul>

          <div class="d-flex align-items-center flex-wrap">

            <RouterLink class="nav-link wallet-icon" to="/billetera" :class="{ hidden: isMenuOpen }">
              <i v-if="rol == 'Cliente' || rol == 'Inversionista'" class="fa fa-wallet fs-3"></i>
            </RouterLink>

            <RouterLink class="nav-link user-icon pb-1" to="/admin">
              <img v-if="rol == 'Admin'" src="../assets/svg/admin-svgrepo-com.svg" width="25" />
            </RouterLink>

            <RouterLink class="nav-link user-icon pb-1" to="perfil" :class="{ hidden: isMenuOpen }"
              v-if="rol == 'Cliente' || rol == 'Inversionista' || rol == 'Null'">
              <img :src="`https://ui-avatars.com/api/?name=${nombre}+${apellido}&background=random`"
                class="rounded-circle me-2" width="30" alt="" />
            </RouterLink>

            <RouterLink class="nav-link user-icon" to="sign-login" :class="{ hidden: isMenuOpen }">
              <i v-if="!isAuthenticated()" class="fa fa-user-circle fs-3"></i>
              <i v-else class="fa-solid fa-right-to-bracket fs-3" @click="logout"></i>
            </RouterLink>

          </div>

        </div>

      </div>

    </nav>

  </div>

</template>

<script setup>
import { isAuthenticated } from "@/helpers/Authenticator";
import { getUser } from "@/helpers/utilities";
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import {errorAlert, infoAlert} from "@/helpers/iziToast"
import iziToast from "izitoast";

const router = useRouter();
const rol = ref("");
const nombre = ref("");
const apellido = ref("");

let storedUser = JSON.parse(localStorage.getItem("usuario")) || {};
const updateRole = async () => {
  await getLogoSstem()
  storedUser = await getUser();
  rol.value = storedUser?.rol || "";
  nombre.value = storedUser?.nombre || "";
  apellido.value = storedUser?.apellido || "";
};

onMounted(() => {
  updateRole();
  if (!localStorage.getItem("usuario")
    || !localStorage.getItem("token")) {
      
      infoAlert("No estas logueado, inicia sesión para acceder a todas las funciones de la plataforma.", "Por favor inicia sesión", "bottomRight")
  }

});
const logo = ref('')
const getLogoSstem = async() =>{
    const {data} = await axios.get(import.meta.env.VITE_BASE_URL+'/utilities/getLogoSystem')
    console.log(data);
    logo.value = data.logo
    
}

watch(
  () => router.currentRoute.value,
  () => {
    updateRole();
  }
);

const logout = () => {
  localStorage.clear();
  localStorage.removeItem("usuario")
  rol.value = "";
  nombre.value = "";
  apellido.value = "";
  router.push("/sign-login");
};

const navLinks = ref([
  { name: "Home", path: "/" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Propósito", path: "/view1" },
  { name: "Cómo funciona", path: "/como-funciona" },
  { name: "Guias de usuario", path: "/posts" },
  { name: "Contactos", path: "/contact" },
  { name: "FAQs", path: "/faq" },
]);

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* hacer query para que se vea bien en mobile
 tewmbnien sacar el icono al centro para inicio de sesion y sacar los iconos */
.burger-menu {
  background-color: var(--gray-color);
  text-align: center;
  border-radius: 10px;
}

.active {
  color: var(--yellow-orange) !important;
  border-radius: 10px !important;
  padding-bottom: 2px !important;
  z-index: 1 !important;
}

.active::after {
  transform: scaleX(1) !important;
  transform-origin: left !important;
}

nav {
  height: 8.5vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-link {
  font-size: 1.1rem;
  color: var(--white-anti-flash-color);
  margin-right: 15px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--yellow-orange) !important;
}

i {
  color: var(--white-anti-flash-color);
  transition: color 0.3s ease;
}

i:hover {
  color: var(--yellow-orange) !important;
}

.bg-dark-custom {
  background-color: var(--gray-color) !important;
  border-bottom: 1px solid var(--yellow-orange);
}

.underline-dynamic {
  display: inline-block;
  position: relative;
  padding-bottom: 2px;
  color: var(--white-anti-flash-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.underline-dynamic::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--yellow-orange);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s, background-color 0.3s ease;
}

.underline-dynamic:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.user-icon {
  margin-left: auto;
  transition: color 0.3s ease;
}

.wallet-icon {
  margin-right: 15px;
  transition: color 0.3s ease;
}

.greeting {
  margin-right: 15px;
  color: var(--white-anti-flash-color);
  font-weight: bold;
  transition: color 0.3s ease;
}

.greeting:hover {
  color: var(--yellow-orange);
}

.menu-open-layout {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.centered-wallet {
  margin-top: 10px;
  margin-bottom: 15px;
}

.hidden {
  display: none !important;
}

/* Responsividad */
@media (max-width: 768px) {
  .nav-link {
    font-size: 0.9rem;
    margin-right: 8px;
  }

  nav {
    height: 10vh;
  }


  .navbar-toggler {
    margin-left: auto;
  }

  img {
    width: 30px;
  }
}

@media (max-width: 576px) {
  .nav-link {
    font-size: 0.8rem;
    margin-right: 5px;
  }


  .burger-menu {
    padding: 10px;
  }

  nav {
    height: 12vh;
    flex-wrap: wrap;
  }

  .navbar-toggler {
    margin-left: auto;
    font-size: 1rem;
  }

  img {
    width: 25px;
  }
}
</style>
