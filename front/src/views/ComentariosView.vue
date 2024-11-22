<template>
    <div class="comentario-container">
        <div class="comentario-card">
            <div class="comentario-header">
                <h2>¡Felicidades, su retiro fue aprobado!</h2>
                <p>{{ inversorNombre }}, muchas gracias por participar.</p>
            </div>
            <div class="comentario-body">
                <p>Si desea, puede dejar una reseña y calificar a nuestro talento, {{ clienteNombre }}.</p>
                <textarea v-model="nuevoComentario" placeholder="Escriba su comentario aquí..."></textarea>
                <div class="estrellas">
                    <span v-for="(estrella, index) in 5" :key="index" class="estrella"
                        :class="{ activa: index < calificacion }" @click="calificar(index + 1)">
                        ★
                    </span>
                </div>
                <button class="cerrar" @click="cerrarPagina">Cerrar</button>
                <button @click="enviarComentario">Enviar Comentario</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { Filter } from 'bad-words';

const badWords = [
    "idiota", "imbécil", "estúpido", "tonto", "gilipollas", "pendejo", 
    "tarado", "cabrón", "joder", "mierda", "maldito", "asqueroso", 
    "carajo", "coño", "puta", "puto", "zorro", "bastardo", "malnacido", 
    "desgraciado", "huevón", "boludo", "petardo", "lameculos", "baboso", 
    "mamón", "perra", "maricón", "soplapollas", "pajero", "pelotudo", 
    "cornudo", "guarra"
];

// const baseURL = "https://apitalentos.pruebasdeploy.online/";
const baseURL = import.meta.env.VITE_BASE_URL;
const inversorNombre = 'Nombre del Inversor'; 
const clienteNombre = 'Nombre del Cliente'; 
const nuevoComentario = ref('');
const calificacion = ref(0);

const filtro = new Filter();
filtro.addWords(...badWords);

function calificar(puntaje) {
    calificacion.value = puntaje;
}

function cerrarPagina() {
    window.location.href = 'http://localhost:5173/';
}

const enviarComentario = async () => {
  if (!nuevoComentario.value.trim() || calificacion.value === 0) {
    alert('Por favor, complete el campo de comentario y seleccione una calificación antes de enviar.');
    return;
  }

  if (filtro.isProfane(nuevoComentario.value)) {
    alert('Su comentario contiene lenguaje inapropiado y no puede ser enviado.');
    return;
  }

  try {
    await axios.post(`${baseURL}/comentarios`, {
      cliente_id: 90,
      inversor_id: 85,
      comentario: nuevoComentario.value,
      calificacion: calificacion.value,
    });
    console.log('Comentario enviado con calificación:', calificacion.value);
    window.location.href = 'http://localhost:5173/'; 
  } catch (error) {
    console.error('Error al enviar el comentario:', error);
  }
};

</script>

<style scoped>
.comentario-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--gray-color);
}

.comentario-card {
    background-color: var(--white-color);
    border: 1px solid var(--smoky-dark-color);
    border-radius: 8px;
    padding: 10px 15px;
    margin: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
}

.comentario-header h2 {
    color: var(--yellow-orange);
    font-size: 1.2rem;
    margin-bottom: 5px;
}

.comentario-body p {
    color: var(--dark-anti-flash-color);
    font-size: 0.9rem;
    margin-bottom: 10px;
}

textarea {
    width: 100%;
    height: 80px;
    margin-top: 10px;
    padding: 8px;
    border: 1px solid var(--jet-color);
    border-radius: 4px;
    background-color: var(--white-anti-flash-color);
    color: var(--jet-color);
}

.estrellas {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.estrella {
    font-size: 24px;
    color: var(--jet-color);
    cursor: pointer;
    transition: color 0.3s;
}

.estrella.activa {
    color: var(--yellow-orange);
}

button {
    background-color: var(--yellow-orange);
    color: var(--white-color);
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;
    float: right;
}

button:hover {
    background-color: var(--dun-color);
}

.cerrar {
    float: left;
}
</style>