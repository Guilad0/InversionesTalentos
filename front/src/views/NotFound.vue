<template>
  <main>
    <figure>
      <img src="../assets/images/404_not-found.png" />
    </figure>
    <section id="content d-flex ">
      <h1 id="section-header">Error 404:</h1>
      <p id="section-content">
        404: Pingüino ocupado pescando, página no encontrada. <br /><br />
        Deslízate hacia la página de inicio para continuar
      </p>
      <RouterLink class="text-decoration-none" to="/">
        <button class="submit">Volver al Iglú principal</button>
      </RouterLink>
    </section>
  </main>
</template>

<script setup></script>

<style scoped>
html,
body {
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
  font-size: 16px;
}
body * {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  margin: 0;
}

h1,
p,
h1 {
  font-family: var(--text-font);
  line-height: 150%;
  font-size: clamp(2.6rem, 4rem, 5.2rem);
}

main {
  grid-area: main;
  place-self: center center;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

figure {
  flex: 1 0 50%;
  position: relative;
  padding: 3rem;
  margin: auto;
}

img {
  width: 100%;

  display: inline-block;
}

#content {
  flex: 1 0 50%;
}

#section-header {
  margin: 1.5rem auto;
}

#section-content {
  font-size: 1.5rem;
  margin: 1.5rem auto;
}
.submit {
  background-color: #17223b;
  border-radius: 7px;
  border: none;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  height: auto;
  margin-top: 38px;
  text-align: center;
}
.submit:hover {
  background-color: #f37926;
}

@media (max-width: 768px) {
  main {
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  #content {
    width: 100%;
    text-align: center;
  }

  #section-header {
    font-size: clamp(2.5rem, 4vw, 4rem);
  }

  #section-content {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
  }

  .submit {
    font-size: 16px;
    text-align: center;
    height: auto;
  }
}

@media (max-width: 480px) {
  figure {
    padding: 0.5rem;
  }

  #section-header {
    font-size: clamp(2rem, 5vw, 3rem);
  }

  #section-content {
    font-size: clamp(1.1rem, 4vw, 1.3rem);
  }

  .submit {
    font-size: 16px;
    text-align: center;
    height: auto;
  }
}
</style>
