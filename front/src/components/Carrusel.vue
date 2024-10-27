<template>
  <div id="carouselExampleCaptions" class="carousel slide">
    <div class="carousel-indicators">
      <button class="rounded-circle ancho active" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" 
        aria-current="true" aria-label="Slide 1"></button>
      <button class="rounded-circle ancho" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
        aria-label="Slide 2"></button>
      <button class="rounded-circle ancho" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
        aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/images/uno.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <!-- <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p> -->
        </div>
      </div>
      <div class="carousel-item">
        <img src="../assets/images/dos.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <!-- <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p> -->
        </div>
      </div>
      <div class="carousel-item">
        <img src="../assets/images/tres.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <!-- <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p> -->
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
</script>

<style scoped>
.carousel-item {
  height: 93vh;
  transition: transform 0.5s ease-in-out;
}

.carousel-item img {
  filter: brightness(0.7);
  object-fit: cover;
  height: 100%;
  width: 100%;
  max-width: 100%;
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  border-radius: 10px;
  animation: fadeIn 1s ease-in-out;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #000;
  border-radius: 50%;
  padding: 10px;
  transition: background-color 0.3s ease;
}

.carousel-control-prev-icon:hover,
.carousel-control-next-icon:hover {
  background-color: #555;
}

.ancho {
  width: 12px !important;
  height: 12px !important;
  background-color: #fff;
  border: 2px solid #000;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.carousel-indicators .active {
  background-color: #000;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .carousel-item {
    height: 40vh;
  }

  .carousel-item img {
    height: 40vh;
  }

  .carousel-caption {
    font-size: 0.8rem;
    padding: 0.5rem;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    padding: 5px;
  }
}

@media (max-width: 411px) and (max-height: 731px) {
  .carousel-item {
    height: 50vh;
  }

  .carousel-item img {
    height: 50vh;
  }
}

@media (max-width: 428px) and (max-height: 926px) {
  .carousel-item {
    height: 55vh;
  }

  .carousel-item img {
    height: 55vh;
  }
}

@media (max-width: 900px) and (max-height: 1440px) {
  .carousel-item {
    height: 70vh;
  }

  .carousel-item img {
    height: 70vh;
  }
}

@media (max-width: 412px) and (max-height: 915px) {
  .carousel-item {
    height: 55vh;
  }

  .carousel-item img {
    height: 55vh;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>