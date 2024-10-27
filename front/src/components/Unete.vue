<template>
    <div class="unete-container">
        <div class="image-overlay text-center">
            <h2 class="animate__animated animate__fadeInDown animate__slow">¿A qué te Dedicas?</h2>
            <button
                class="btn btn-outline-light mt-3 animate__animated animate__fadeInUp animate__slow animate__bounce"
            >
                Únete Ahora
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Unete",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");

.unete-container {
    position: relative;
    width: 100%;
    height: 300px;
    background-image: url("https://via.placeholder.com/150"); /* Imagen genérica temporal */ 
    background-size: cover;
    background-position: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Cambia por los Colores de la Paleta*/ 
    background-color: rgba(0, 0, 0, 0.3); /* Ajusta la opacidad para que se note más la foto */
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Cambia por los Colores de la Paleta*/ 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

h2 {
    margin: 0;
    font-size: 3em;
    font-weight: 700;
}

button {
    font-size: 1.2em;
    padding: 10px 20px;
    border-radius: 25px;
    transition: background-color 0.3s, transform 0.3s;
}

button:hover {
    background-color: rgba(255, 255, 255, 0.2); /* Cambia por los Colores de la Paleta*/ 
    transform: scale(1.05);
    color: #f8f9fa;
    background-color: #343a40;/* Cambia por los Colores de la Paleta*/ 
}

.animate__slow {
    animation-duration: 2s;
}

/* Media Queries */
@media (max-width: 411px) and (max-height: 731px) {
    .unete-container {
        height: 250px;
    }
    h2 {
        font-size: 2em;
    }
    button {
        font-size: 1em;
        padding: 8px 16px;
    }
}

@media (max-width: 768px) and (max-height: 1204px) {
    .unete-container {
        height: 350px;
    }
    h2 {
        font-size: 2.5em;
    }
    button {
        font-size: 1.1em;
        padding: 9px 18px;
    }
}

@media (max-width: 428px) and (max-height: 926px) {
    .unete-container {
        height: 300px;
    }
    h2 {
        font-size: 2.2em;
    }
    button {
        font-size: 1.1em;
        padding: 9px 18px;
    }
}

@media (max-width: 1440px) and (max-height: 900px) {
    .unete-container {
        height: 400px;
    }
    h2 {
        font-size: 3em;
    }
    button {
        font-size: 1.2em;
        padding: 10px 20px;
    }
}

@media (max-width: 900px) and (max-height: 1400px) {
    .unete-container {
        height: 350px;
    }
    h2 {
        font-size: 2.5em;
    }
    button {
        font-size: 1.1em;
        padding: 9px 18px;
    }
}

@media (max-width: 412px) and (max-height: 915px) {
    .unete-container {
        height: 300px;
    }
    h2 {
        font-size: 2.2em;
    }
    button {
        font-size: 1.1em;
        padding: 9px 18px;
    }
}
</style>
