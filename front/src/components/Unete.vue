<template>

    <div class="container-fluid">

        <div class="row custom-row ">

            <div class="col-12 col-md-6 d-flex flex-column align-items-center p-0 m-0">

                <div class="card text-center position-relative">

                    <img src="../assets/images/profesional.png" alt="Profesionales">

                    <div
                        class="overlay flex-column justify-content-center text-white position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">

                        <h5 class="card-title">Eres un profesional en busca de tu primer capital?</h5>

                        <button class="animate__animated animate__fadeInUp animate__slow btn-6">
                            Únete Ahora
                            <span></span>
                        </button>

                    </div>

                </div>

            </div>

            <div class="col-12 col-md-6 d-flex flex-column align-items-center p-0 m-0">

                <div class="card text-center position-relative">

                    <img src="../assets/images/profesional.png" alt="Inversor">

                    <div
                        class="overlay flex-column justify-content-center text-white position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">

                        <h5 class="card-title">Buscas profesionales para invertir?</h5>

                        <button class="animate__animated animate__fadeInUp animate__slow btn-6">
                            Únete Ahora
                            <span></span>
                        </button>

                    </div>

                </div>

            </div>

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

.overlay {
    background-color: rgba(0, 0, 0, 0.5);
}

img {
    width: 100%;
    height: 100%;
}

button {
    color: white;
    font-size: 1.2em;
    padding: 10px 20px;
    border-radius: 25px;
    transition: background-color 0.3s, transform 0.3s;
}



.animate__slow {
    animation-duration: 3s;
}

.btn-6 {
    position: relative;
    display: block;
    overflow: hidden;    
    text-transform: uppercase;
    border: 1px solid currentColor;
    color: var(--gray-color);
    transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
}

.btn-6 span {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: var(--gray-color);
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    transform: translate(-50%, -50%);
    z-index: -1;
}

.btn-6:hover {
    color: var(--white-anti-flash-color);
}

.btn-6:hover span {
    width: 225%;
    height: 562.5px;
}
</style>
