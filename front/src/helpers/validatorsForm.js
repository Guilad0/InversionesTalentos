
export const validateName = (name) => {
  const regex = /^[A-Za-z]{3,}(?: [A-Za-z]{3,})?$/; 
  return regex.test(name); 
}
  
  export const validationNotEmptyFields = ( fileds )=>{
      return fileds.some( e => e.value =='')? true: false;
  }
  export  const validationPass = (fields)=> {
    for (let i = 0; i < fields.length; i++) {
      if( fields[i].value == null || fields[i].value == false ){
        return false;
      }
    }
    return true
}
  
  export const cleanFileds = ( flieds ) =>{
    flieds.forEach( e  => {
          e.value = '';
          console.log(e.value);
      });
  }
  export const resetFileds = ( flieds ) =>{
    flieds.forEach( e  => {
          e.value = null;
      });
  }
  export const validationEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  export const validatePassword = (password) => {
    const hasNumber = /\d/;
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const minLength = password.length > 7;
  
    return (
      hasNumber.test(password) &&
      hasLowercase.test(password) &&
      hasUppercase.test(password) &&
      hasSpecialChar.test(password) &&
      minLength
    );
  };

  export const haveLetter = ( word )=>{
    const regex = /[a-z]/;
    return regex.test(word);
  }
  export const haveLetterCapital = ( word )=>{
    const regex = /[A-Z]/;
    return regex.test(word);
  }

  export const tieneNumero = (word)=> {
    const regex = /[0-9]/;
    return regex.test(word);
  }
  

  export const tieneCaracterEspecial = (word) => {
    const regex = /[^a-zA-Z0-9]/;
    return regex.test(word);
  }