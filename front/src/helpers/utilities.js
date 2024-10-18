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