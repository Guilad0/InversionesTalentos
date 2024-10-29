

  export const validateName = ( name )=>{
    const regex = /^[A-Za-z]{3,}(?: [A-Za-z]{3,})?$/;
    console.log(regex.test(name));
    return regex.test(name);
  }

  

  const validarCampo = (field) => {
    switch (field) {
      case 'nombre':
        nombreVal.value = !!nombre.value;
        if (!nombreVal.value) {
          errors.value.nombre = 'Este campo es requerido';
        } else if (nombre.value.trim().length < 3) {
          nombreVal.value = false;
          errors.value.nombre = 'El nombre debe tener al menos 3 caracteres';
        } else if (!/^[A-Za-z\s]+$/.test(nombre.value)) {
          nombreVal.value = false;
          errors.value.nombre = 'El nombre solo puede contener letras';
        } else {
          nombreVal.value = true;
          errors.value.nombre = '';
        }
        break;
  
      case 'apellido':
        apellidoVal.value = !!apellido.value;
        if (!apellidoVal.value) {
          errors.value.apellido = 'Este campo es requerido';
        } else if (apellido.value.trim().length < 2) {
          apellidoVal.value = false;
          console.log(errors.value);
          errors.value.apellido = 'El apellido debe tener al menos 3 caracteres';
        } else if (!/^[A-Za-z\s]+$/.test(apellido.value)) {
          apellidoVal.value = false;
          errors.value.apellido = 'El apellido solo puede contener letras';
        } else {
          apellidoVal.value = true;
          errors.value.apellido = '';
        }
        break;
  
      case 'correo':
        correoVal.value = !!correo.value;
        if (!correo.value) {
          errors.value.correo = 'Formato no valido';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(correo.value.trim())) {
          correoVal.value = false;
          errors.value.correo = 'Introduce un correo electrónico válido';
        } else {
          correoVal.value = true;
          errors.value.correo = '';
        }
        break;
  
  
    }
  }
  