<template>
    <main class="bg-light pt-4 ps-4">
        <div class="d-flex">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li :class="{ 'active px-2': currentNav === 'general' }" @click="setActive('general')"
                        class="nav-link mx-2">
                        <label>General </label>
                    </li>
                    <li :class="{ 'active px-2': currentNav === 'inversiones' }" @click="setActive('inversiones')"
                        class="nav-link mx-2">
                        <label>Inversiones </label>
                    </li>
                </ol>
            </nav>
        </div>

        <div class="d-flex">
            <div class="container" v-if="currentNav == 'general'">
                <Gral />
            </div>
            <div class="container" v-if="currentNav == 'inversiones'">
                <div class="mb-3 col-md-2">
                    <select class="form-select custom-select" v-model="estadoSeleccionado"
                        aria-label="Seleccionar estado">
                        <option value="pendiente">Pendiente</option>
                        <option value="proceso">Proceso</option>
                        <option value="finalizado">Finalizado</option>
                        <option value="reversion">Reversión</option>
                    </select>
                </div>

                <component :is="componenteActual"></component>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, computed } from "vue";
import Gral from "./DashboardReportes.vue";
import Reversion from "./Reversion.vue";
import Pendiente from "./Pendiente.vue";
import Proceso from "./Proceso.vue";
import Finalizado from "./Finalizado.vue";

const rol = ref("");
const currentNav = ref("general");
const estadoSeleccionado = ref("pendiente");

const componenteActual = computed(() => {
    switch (estadoSeleccionado.value) {
        case "pendiente":
            return Pendiente;
        case "proceso":
            return Proceso;
        case "finalizado":
            return Finalizado;
        case "reversion":
            return Reversion;
        default:
            return Pendiente;
    }
});

const setActive = (nav) => {
    currentNav.value = nav;
    rol.value = nav;
};
</script>

<style scoped>
main {
    height: 100%;
}

li {
    cursor: pointer !important;
}

label:hover {
    font-weight: 500;
}

.active {
    font-weight: 500;
    border-bottom: 1px solid var(--gray-color);
    text-decoration: underline !important;
}

.custom-select {
    font-size: 0.85rem;
    padding: 0.4rem 0.75rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background-color: #fff;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
}

.custom-select:focus {
    border-color: #e0e4ff;
    box-shadow: 0 0 0 0.1rem rgba(224, 228, 255, 0.25);
    outline: 0;
}

.custom-select option {
    font-size: 0.85rem;
    padding: 8px;
}
</style>