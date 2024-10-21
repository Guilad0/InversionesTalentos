<template>
    <div class="col-md-4 my-5">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Nombre Perfil</h5>
                <span :style="{ fontSize: '1rem', }" class="text-secondary" >Bienvenido!!!</span>
                <br>
                <br>
                <h5>Datos Personales</h5>
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" name="nombre" v-model="nombre" id="nombre" class="form-control" />
                <label for="apellido" class="form-label">Apellido</label>
                <input type="text" name="apellido" v-model="apellido" id="apellido" class="form-control" />
                <label for="email" class="form-label">Email</label>
                <input type="email" name="email" v-model="email" id="email" class="form-control" />
                <div class="row">
                    <div class="col-md-6">
                    <label for="codigopais" class="form-label">Codigo del pais</label>
                        <select name="codigopais" class="form-select" id="">
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="telefono" class="form-label">Numero de telefono</label>
                        <input type="text" name="telefono" v-model="telefono" id="telefono" class="form-control" />
                    </div>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input"  type="checkbox" role="switch" id="flexSwitchCheckDefault">
                    <label class="form-check-label" for="flexSwitchCheckDefault">KYC - Se necesita validar</label>
                </div>
                <label for="tag" class="form-label">Tag</label>
                <input type="text" name="tag" id="tag" class="form-control" />
                <div class="row">
                    <div class="col-md-6">
                        <label for="idioma" class="form-label">Idioma</label>
                        <select name="idioma" class="form-select" id="">
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="pais" class="form-label">Pais de Residencia</label>
                        <select name="pais" class="form-select" id="">
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input"  type="checkbox" role="switch" id="comprasanonimas">
                    <label class="form-check-label" for="comprasanonimas">Compras Anonimas</label>
                </div>
                <div class="col-md-12">
                    <button type="button" class="btn col-md-12  perfilbutton" >Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .perfilbutton{
        color: white;
        background-color: var(--jet-color);
    }
</style>