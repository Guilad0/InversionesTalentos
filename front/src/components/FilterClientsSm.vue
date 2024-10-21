<template>
  <div>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-outline-gray btn-sm dropdown-toggle rounded-3 mx-3 px-3 py-2" data-bs-toggle="dropdown"
        aria-expanded="false">
        Filtrar
      </button>
      <ul class="dropdown-menu">
        <li @click="$emit('getAll')" ><a class="dropdown-item">All</a></li>
        <li v-for="cat in props.categories" :key="cat.categoria_persona_id" @click="$emit('findByname', cat.categoria_persona_id)">
          <a class="dropdown-item">{{ cat.nombre }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: [String, Number, null],
    required: true
  }
});
</script>
<style scoped>
.dropdown-item:hover {
  background-color: var(--gray-color);
  color: var(--white-anti-flash-color)
}
</style>