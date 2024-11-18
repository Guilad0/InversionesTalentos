<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <button class="btn border-0" :disabled="isLoading">
                <li v-if="prev != null" class="page-item my-auto" @click="$emit('prevAction')" >
                <a class="page-link btn-gray">Anterior</a>
            </li>
            </button>
            <li class="page-item my-auto"><a class="page-link color-gray fw-bolder mx-2 rounded-5 border border-3 ">{{
                page
                    }}</a></li>

            <button class="btn border-0" :disabled="isLoading">
                <li class="page-item my-auto" v-if="next != null"
                :class="{ 'disabled cursor-blocked': next == null || isLoading == true }" @click="$emit('nextAction')">
                <a class="page-link btn-gray">Next</a>
            </li>
            </button>
        </ul>
        <div class="text-end pe-3">
            <strong>Total {{ myRol }}s: </strong>{{ total }}
        </div>
    </nav>
</template>

<script setup>

const props = defineProps({
    page: {
        type: Number,
        required: true
    },
    prev: {
        type: [String, null],
        required: true
    },
    next: {
        type: [String, null],
        required: true
    },
    isLoading: {
        type: Boolean,
        required: true
    },
    total: {
        type: [String, Number],
        required: true
    },
    myRol: {
        type: String,
        required: true
    }
});
</script>

<style scoped></style>