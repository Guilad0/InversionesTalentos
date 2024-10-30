<template>
<div>
  <Billetera />
  <InversionesRetiro /> 
</div>

</template>

<script setup>
import Billetera from '@/components/Billetera.vue';
import InversionesRetiro from '@/components/InversionesRetiro.vue';
</script>

<style scoped>
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --card: #ffffff;
  --card-foreground: #1a1a1a;
  --popover: #ffffff;
  --popover-foreground: #1a1a1a;
  --primary: #1a1a1a;
  --primary-foreground: #fafafa;
  --secondary: #f0f0f0;
  --secondary-foreground: #1a1a1a;
  --muted: #f0f0f0;
  --muted-foreground: #767676;
  --accent: #f0f0f0;
  --accent-foreground: #1a1a1a;
  --destructive: #e60000;
  --destructive-foreground: #fafafa;
  --border: #e0e0e0;
  --input: #e0e0e0;
  --ring: #1a1a1a;
  --radius: 0.5rem;
}

/* Estilos personalizados para el modo oscuro */
.dark-mode {
  --background: #1a1a1a;
  --foreground: #fafafa;
  --card: #1a1a1a;
  --card-foreground: #fafafa;
  --popover: #1a1a1a;
  --popover-foreground: #fafafa;
  --primary: #fafafa;
  --primary-foreground: #1a1a1a;
  --secondary: #2a2a2a;
  --secondary-foreground: #fafafa;
  --muted: #2a2a2a;
  --muted-foreground: #a0a0a0;
  --accent: #2a2a2a;
  --accent-foreground: #fafafa;
  --destructive: #993333;
  --destructive-foreground: #fafafa;
  --border: #2a2a2a;
  --input: #2a2a2a;
  --ring: #d1d1d1;
}

/* Aplicar los estilos usando las variables definidas */
body {
  background-color: var(--background);
  color: var(--foreground);
}

.card {
  background-color: var(--card);
  color: var(--card-foreground);
  border-radius: var(--radius);
}

.popover {
  background-color: var(--popover);
  color: var(--popover-foreground);
}

.btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.btn-secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.text-muted {
  color: var(--muted-foreground);
}

.btn-danger {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

input {
  border-color: var(--input);
  background-color: var(--background);
}

/* Bordes personalizados */
.border {
  border-color: var(--border);
}

.btn-6 {
  color: #1a1aff; /* Equivalente a 'tint($btn-color)' en Sass */
  position: relative;
  overflow: hidden;

  /* Default Button color */
  background-color: darkblue;
}

.btn-6 span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: #000033; /* Equivalente a 'shade($btn-color, 40%)' */
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.btn-6:hover {
  color: #b3b3ff; /* Equivalent to 'tint($btn-color, 75%)' */
}

.btn-6:hover span {
  width: 225%;
  height: 225%;
}

.btn-6:active {
  background-color: darkblue;
}

</style>
