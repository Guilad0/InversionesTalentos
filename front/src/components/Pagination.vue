<template>
    <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item mx-2" :class="{ disabled: !prev }" @click="prev && $emit('prevAction')">
                    <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                </li>

                <li class="page-item mx-2 active">
                    <button class="page-link number-page color-gray fw-bolder rounded-5 border border-3">
                        <span>{{ page }}</span>
                    </button>
                </li>

                <li class="page-item mx-2" :class="{ disabled: !next }" @click="next && $emit('nextAction')">
                    <button class="page-link color-gray fw-bolder rounded-5 border border-3">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
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

<style scoped>
.pagination {
    margin-top: 1rem;
}

.pagination .page-item {
    display: inline-block;
}

.pagination .page-item.disabled button {
    opacity: 0.5;
    pointer-events: none;
}

.pagination .page-item .number-page {
    color: black;
    /* Color negro */
    text-decoration: none;
    /* Sin subrayado */
    font-weight: bold;
    background-color: transparent;
    border: none;
}

.pagination .page-item.active .page-link {
    color: #080808;
    font-weight: bold;
    border: 1.5px solid #b0b8ff;
    box-shadow: 0px 0px 6px rgb(3, 3, 3);
    transform: scale(1.05);
}

.active-button {
    font-weight: 500;
    border-bottom: 1px solid var(--gray-color);
    text-decoration: underline !important;
}
</style>
