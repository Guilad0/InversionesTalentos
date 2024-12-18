<template>
    <div class="modal-container">
        <div class="modal-card">
            <div class="modal-header">
                <h5 class="modal-title">Detalles de Inversores</h5>
                <button @click="$emit('cerrar')" class="btn-close">&times;</button>
            </div>
            <div class="modal-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>

                            <th>Monto</th>
                            <th>Fecha de Depósito</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(inversion, index) in inversiones" :key="index">
                            <td>{{ inversion.nombre }} {{ inversion.apellido }}</td>
                            <td>{{ inversion.monto_invertido }}</td>
                            <td>
                                {{ new Date(inversion.fecha_deposito).toLocaleDateString() }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button @click="$emit('cerrar')" class="custom-button">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    cliente: String,
    inversiones: Array,
});
</script>

<style scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.modal-card {
    border-radius: 15px;
    overflow: hidden;
    background-color: #17223b;
    padding: 20px;
    width: 80%;
    max-width: 500px;
    z-index: 1060;
}

.modal-header {
    background-color: var(--dun2-color);
    width: 100%;
    height: 75px;
    border-radius: 15px 15px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.modal-title {
    color: var(--gray-color);
    font-family: var(--font-montserrat);
    font-size: 28px;
    font-weight: 700;
    text-transform: uppercase;
}

.modal-body {
    max-height: 300px;
    overflow-y: auto;
}

.modal-footer {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}

.btn-close {
    color: var(--yellow-orange);
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.btn-close:hover {
    transform: scale(1.1);
}

.custom-button {
    background-color: #17223b;
    color: #f3f3f4;
    font-family: var(--font-montserrat);
    font-size: 16px;
    border: none;
    margin-top: 2px;
    height: 30px;
    width: 180px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.custom-button:hover {
    background-color: #f37926;
    color: #fff;
}
</style>