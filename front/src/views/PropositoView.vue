<template>
  <div class="full-background">
    <header class="header">
      <h1>Propósito</h1>
    </header>

    <main class="main-content">
      <h2>
        Impulsar a jugadores y profesionales de todo el mundo a llevar su carrera al
        siguiente nivel, con el respaldo y financiamiento de sus seguidores. Queremos ser
        el puente entre el talento y las oportunidades, brindando apoyo a cualquier
        deportista o profesional para alcanzar sus metas y sueños.
      </h2>
    </main>
  </div>
</template>

<style scoped>
/* Asegurarse de que el html y body tengan altura completa */
html,
body {
  height: 100%;
  margin: 0;
  /* Elimina los márgenes predeterminados del body */
}

/* Contenedor principal que incluirá el header y main-content */
.full-background {
  background-image: url("@/assets/images/7.png");
  background-size: cover;
  /* Asegura que la imagen cubra todo el fondo */
  background-position: center;
  /* Centra la imagen */
  background-attachment: fixed;
  /* Hace que el fondo no se mueva al hacer scroll */
  height: 100vh;
  /* Asegura que ocupe toda la pantalla */
  display: flex;
  flex-direction: column;
  /* Organiza los elementos en columna (header arriba, main abajo) */
}

/* Estilos para el header */
.header {
  background-color: rgba(0, 0, 0, 0.5);
  /* Fondo semitransparente */
  padding: 15px;
  text-align: center;
  width: 100%;
  /* Asegura que el header ocupe todo el ancho */
}

.header h1 {
  font-size: 1.8rem;
  margin: 0;
  letter-spacing: 1px;
  font-style: italic; /* Cursiva para darle elegancia */
  font-weight: bold; /* Negrita para mayor presencia */
  color: #fff;
}

/* Estilos para el main-content */
.main-content {
  color: #333;
  padding: 30px;
  max-width: 600px; /* Ajusta el ancho máximo del contenido */
  width: 100%; /* Asegura que el main-content ocupe todo el ancho posible */
  margin: 40px 100px 100px auto; /* Desplaza el contenido a la derecha */
  background-color: rgba(255, 255, 255, 0.1);
  /* Fondo semitransparente para hacer el texto más legible */
  border-radius: 10px; /* Bordes redondeados */
  display: flex;
  flex-direction: column; /* Organiza los elementos dentro de main en columna */
  justify-content: flex-start; /* Alinea los elementos hacia el principio */
  align-items: flex-end; /* Alinea el contenido a la derecha */
}

.main-content h2 {
  text-align: justify;
  font-size: 1.3rem;
  line-height: 1.6;
  margin: 0;
  font-style: italic; /* Cursiva */
  font-weight: 400; /* Grosor moderado */
  color: #333; /* Contraste oscuro */
}
</style>
