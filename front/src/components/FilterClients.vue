<template>
    <main>
        <small class="ms-3 ">Filtrar por</small>
        <button 
            @click="$emit('getAll')" 
            type="button" 
            class="btn btn-sm mx-1 badge"
            :class="{ 'btn-orange': props.activeCategory === null, 'btn-ligth active': props.activeCategory !== null }">
            All
        </button>
        <div
            class="btn-group"
            role="group"
            v-for="cat in props.categories"
            :key="cat.categoria_persona_id">
            <button 
              v-if="cat.nombre != 'Sin categoria '"
                type="button" 
                class="btn btn-sm mx-1 rounded badge "
                :class="{ 'btn-orange': props.activeCategory === cat.categoria_persona_id, 'btn-ligth active': props.activeCategory !== cat.categoria_persona_id }"
                @click="$emit('findByname', cat.categoria_persona_id)">
                {{ cat.nombre }}
            </button>
        </div>
    </main>
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
   .badge{
     font-weight: normal;
   }
   button:hover{
    background-color: var(--yellow-orange) !important;
    color: var(--white-anti-flash-color) !important;
   }
</style>
