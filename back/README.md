# Rutas de los endpoinst para los usuarios de tipo inversores
### Obtener todos los inversores
- **Método**: `GET`
- **Ruta**: `http://localhost:3000/users/investors`
- **Descripción**: Lista todos los inversores

### Registar inversores
- **Método**: `POST`
- **Ruta**: `http://localhost:3000/users/investors`
- **Descripción**: Registra un inversor
- **BodyEjemplo**:
{
  "nombre": "John",
  "apellido": "Doe",
  "correo": "johndofdef@example.comf",
  "codigo_pais": "+1",
  "numero_telefono": "1234567890",
  "pais_residencia": "USA",
  "password": "securepassword123",
  "acepta_terminos": "1",
  "categoria_persona_id":1,
  "rol": "cliente"
}

### modifica inversores
- **Método**: `PUT`
- **Ruta**: `http://localhost:3000/users/investors/id_usuario`
- **Descripción**: Modifica un inversor
- **BodyEjemplo**:
{
  "nombre": "Johnfdsfdsfdsfds",
  "apellido": "Doefdsfdsfds",
  "numero_telefono": "1234567890fdsfdsa",
  "pais_residencia": "USAfdsafds"
}

### modifica el estado de un inversores
- **Método**: `PUT`
- **Ruta**: `http://localhost:3000/users/Stateinvestors/id_usuario`
- **Descripción**: Modifica el estado de un inversor



### NOTA:
- Agregar el campo "state" de tipo tinyint(1) con valor por defecto de 1 en la tabla usuarios 