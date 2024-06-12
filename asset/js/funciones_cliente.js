import { clientes } from './usuarios.js';
import { getComics } from './comics.js';
import { handleSearch } from './funcion_busqueda.js';


//Busqueda de comics, con y sin filtro
export const searchCliente = ( ) => {

    let rutSearch = document.getElementById("username").value.trim();
    let pass = document.getElementById("username").value.trim();
    let findClient = clientes;

    if (rutSearch !== '') 
    {
        findClient = clientes.filter(cliente => 
            cliente.rut.includes(rutSearch)
        );

        if (findClient.pass !== pass) {
            loginMessage.textContent = "Contraseña incorrecta";
            loginMessage.classList.add('text-danger');
        } 
    }

    if (findClient.length === 0) {
        loginMessage.textContent = "El usuario no existe";
        loginMessage.classList.add('text-danger');
    } else {
        loginMessage.textContent = "";
        console.log(findClient);
    }
    
    console.log(findClient);

}


//Mensaje de busqueda
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    searchCliente(); // Ejecutar la función `searchCliente`
});