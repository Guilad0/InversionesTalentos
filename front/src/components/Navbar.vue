import { watch } from 'vue';
<template>
  <div class="bg-dark">
    <nav class="navbar navbar-expand-lg custom-navbar bg-dark-custom z-3  shadow">
    <div class="container-fluid mx-3">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="(link, index) in navLinks" :key="index">
            <RouterLink exact-active-class="active" class="nav-link underline-dynamic" :to="link.path">{{ link.name }}</RouterLink>
          </li>
        </ul>
        <div class="d-flex align-items-center ">
          <RouterLink class="nav-link" to="/">
            <h2 class="greeting">HI</h2>
          </RouterLink>
          <RouterLink class="nav-link wallet-icon" to="/">
            <i class="fa fa-wallet fs-3"></i>
          </RouterLink>
          <RouterLink class="nav-link user-icon pb-1" to="admin"><img src="../assets/svg/admin-svgrepo-com.svg" width="25"></RouterLink>
          <RouterLink class="nav-link user-icon" to="sign-login"><i class="fa fa-user-circle fs-3"></i></RouterLink>
        </div>
      </div>
    </div>
  </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      navLinks: [
        { name: 'Home', path: '/' },
        { name: 'Marketplace', path: '/marketplace' },
        { name: 'Propósito', path: '/view1' },
        { name: 'Cómo funciona', path: '/view2' },
        { name: 'Billetera', path: '/billetera' },
        { name: 'Posts', path: '/posts' },
        { name: 'Contactos', path: '/contact' },
        { name: 'FAQs', path: '/faq' }
      ]
    };
  }
}
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
  background-color: var(--smoky-dark-color) !important;
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
