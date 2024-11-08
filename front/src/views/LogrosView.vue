<template>
  <div class="container form-container">
    <h2>Formulario</h2>
    <h3>Ingresa tus logros</h3>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="date" class="label">Fecha</label>
            <input
              type="date"
              id="date"
              v-model="formData.date"
              class="form-control"
              required
              :min="minDate"
              :max="maxDate"
            />
          </div>

          <div class="form-group">
            <label for="description" class="label">Logros</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-control"
              rows="3"
              placeholder="Ingresa tus logros"
              required
            ></textarea>
          </div>
          <br />
          <button type="submit" class="btn btn-submit">Registrar Logros</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        date: "",
        description: "",
      },
      minDate: "1990-01-01",
      maxDate: new Date().toISOString().split("T")[0],
    };
  },
  methods: {
    async submitForm() {
      const clienteId = localStorage.getItem("cliente_id");

      if (!clienteId) {
        alert("Error: No se encontró el 'cliente_id' en localStorage.");
        return;
      }

      try {
        await axios.post("http://localhost:3000/api/logros", {
          cliente_id: clienteId,
          descripcion: this.formData.description,
          fecha: this.formData.date,
        });

        alert("Logro registrado exitosamente.");
        this.resetForm();
      } catch (error) {
        console.error("Error al registrar el logro:", error);
        alert(
          "Ocurrió un error al registrar el logro: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
    resetForm() {
      this.formData.date = "";
      this.formData.description = "";
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--white-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px var(--smoky-dark-color);
}

h2,
h3 {
  color: var(--gray-color);
}

.label {
  color: var(--gray-color);
  font-weight: bold;
}

.form-control {
  border-radius: 5px;
  padding: 10px;
  border: 1px solid var(--gray-color);
  background-color: var(--white-anti-flash-color);
  color: var(--dark-anti-flash-color);
}

.form-control:focus {
  border-color: var(--yellow-orange);
  box-shadow: 0 0 0 0.2rem rgba(243, 121, 38, 0.25);
}

.btn-submit {
  background-color: var(--yellow-orange);
  color: var(--white-anti-flash-color);
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: var(--gray-color);
  color: var(--white-anti-flash-color);
}
</style>
