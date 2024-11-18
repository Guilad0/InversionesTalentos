<template>
     <div class="progress" role="progressbar" :aria-valuenow="bar" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar text-bg-success" :style="{ width: bar }">
                  <label class="text-secoindary">{{ bar }}</label>
                </div>
              </div>
</template>
<script setup>
    const props = defineProps({
        bar:{
            type:[Number, String],
            required:true
        }
    })
</script>