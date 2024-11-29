<template>
    <div class="p-1">
        <img src="../../assets/svg/edit-3-svgrepo-com black.svg" class="edit-icon">
    </div>
</template>

<style scoped>
.edit-icon {
    width: 50px; 
    transition: all 0.3s ease;
}

.edit-icon:hover {
    cursor: pointer; 
    transform: scale(1.1);
    border-radius: 50%; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}

@media (max-width: 1200px) {
    .edit-icon {
        width: 50px; 
    }
}
@media (max-width: 768px) {
    .edit-icon {
        width: 50px; 
    }
}

@media (max-width: 480px) {
    .edit-icon {
        width: 25px; 
    }
}
</style>
