<template>
    <div>
        <button class=" btn fs-6" :class="typeButton " >
            {{ message }}
        </button>    
    </div>    
</template>
<script setup>
const props = defineProps({
    message:{
        type:String,
        required:true
    },
    typeButton:{
        type:String,
        required:true
    },
    
})
</script>