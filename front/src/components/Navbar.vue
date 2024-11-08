<template>
  <div class="bg-dark">
    <nav
      class="navbar navbar-expand-lg custom-navbar bg-dark-custom z-3 shadow animate__animated animate__fadeIn"
    >
      <div class="container-fluid mx-3">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <RouterLink class="nav-link" to="/">
            <img
              src="@/assets/images/logo-manos.png"
              alt=""
              width="40"
              class="rounded me-2"
            />
          </RouterLink>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink
                exact-active-class="active"
                class="nav-link underline-dynamic"
                to="/"
                >Inicio</RouterLink
              >
            </li>
            <li class="nav-item" v-if="rol !== 'Cliente'">
              <RouterLink
                exact-active-class="active"
                class="nav-link underline-dynamic"
                to="marketplace"
                >Markeplace</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                exact-active-class="active"
                class="nav-link underline-dynamic"
                to="/proposito"
                >Proposito</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                exact-active-class="active"
                class="nav-link underline-dynamic"
                to="como-funciona"
                >Cómo funciona</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                exact-active-class="active"
                class="nav-link underline-dynamic"
                to="posts"
                >Guias de usuario</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                exact-active-class="active"
                class="nav-link underline-dynamic"
                to="contact"
                >Contactos</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                exact-active-class="active"
                class="nav-link underline-dynamic"
                to="faq"
                >Faqs</RouterLink
              >
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <RouterLink class="nav-link wallet-icon" to="/billetera">
              <i
                v-if="rol == 'Cliente' || rol == 'Inversionista'"
                class="fa fa-wallet fs-3"
              ></i>
            </RouterLink>
            <RouterLink class="nav-link user-icon pb-1" to="/admin">
              <img
                v-if="rol == 'Admin'"
                src="../assets/svg/admin-svgrepo-com.svg"
                width="25"
              />
            </RouterLink>
            <RouterLink
              class="nav-link user-icon pb-1"
              to="perfil"
              v-if="rol == 'Cliente' || rol == 'Inversionista' || rol == 'Null'"
            >
              <img
                :src="`https://ui-avatars.com/api/?name=${nombre}+${apellido}&background=random`"
                class="rounded-circle me-2"
                width="30"
                alt=""
              />
            </RouterLink>
            <RouterLink class="nav-link user-icon" to="sign-login">
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
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const rol = ref("");
const nombre = ref("");
const apellido = ref("");

let storedUser = JSON.parse(localStorage.getItem("usuario"));
const updateRole = async () => {
  storedUser = JSON.parse(localStorage.getItem("usuario"));
  rol.value = storedUser?.rol || "";
  nombre.value = storedUser?.nombre || "";
  apellido.value = storedUser?.apellido || "";
};

onMounted(() => {
  updateRole();
});

watch(
  () => router.currentRoute.value,
  () => {
    updateRole();
  }
);

const logout = () => {
  localStorage.clear();
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
</script>

<style scoped>
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
  height: 7vh;
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
</style>
