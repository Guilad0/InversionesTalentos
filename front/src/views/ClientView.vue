    <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const id = route.params.id;
 console.log(id);
  </script>
<template>
    <div>
      <h1>Detalle del Cliente</h1>
      <p>ID del cliente: {{ id }}</p>
    </div>
  </template>