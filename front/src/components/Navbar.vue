<template>

  <nav class="navbar navbar-expand-lg custom-navbar bg-dark-custom">

    <div class="container-fluid mx-3">

      <div class="collapse navbar-collapse" id="navbarNav">


        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="/">Slice Channel</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="/marketplace">Marketplace
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="/view1">Propósito
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="/view2">Cómo funciona
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="/posts">Posts</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="/view3">Contactos
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink exact-active-class="active" class="nav-link underline-dynamic" to="/faq">FAQs</RouterLink>
          </li>
        </ul>




      </div>


      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <a class="navbar-brand" href="/">
        <h2>HI</h2>
      </a>
      <RouterLink class="nav-link" to="sign-login"><i class="fa fa-user-circle fs-3"></i></RouterLink>


    </div>

  </nav>

</template>

<script>

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
}

.nav-link {
  font-size: 1.1rem;
  color: var(--white-anti-flash-color);
}

.nav-link:hover {
  color: var(--yellow-orange) !important;
}

i {
  color: var(--white-anti-flash-color);
}

i:hover {
  color: var(--yellow-orange) !important;
}

.bg-dark-custom {
  background-color: var(--smoky-dark-color) !important;
}

.underline-dynamic {
  display: inline-block;
  position: relative;
  padding-bottom: 2px;
  color: var(--white-anti-flash-color);
  text-decoration: none;
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
  transition: transform 0.6s;
}

.underline-dynamic:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
</style>