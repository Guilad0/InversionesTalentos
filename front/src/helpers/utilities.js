export const orderByName = ( clients )=>{
    return clients.sort((a, b) => {
        let nombreA = a.nombre.toLowerCase();
        let nombreB = b.nombre.toLowerCase();
        return nombreA < nombreB ? -1 : nombreA > nombreB ? 1 : 0;
      });
}

export const orderByEdad = (clients)=>{
    return clients.sort( (a,b)=> a.edad - b.edad );
}

export const orderByPrice = (clients)=>{
    return clients.sort( (a,b)=> a.monto_inversion - b.monto_inversion );
}

export const getAge = ( date )=>{
    const fechaNacimiento = new Date(date);
    let edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    const mes = new Date().getMonth() - fechaNacimiento.getMonth();
    if (
      mes < 0 ||
      (mes === 0 && new Date().getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }
  
    return edad;
  }

  export const porcentajeTrue = (verifyRegister) => {
    const totalTrue = verifyRegister.value.filter(item => item.status === true).length;
    return (totalTrue / verifyRegister.value.length) * 100 + '%';
  };