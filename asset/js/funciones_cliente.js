import { clientes } from './usuarios.js';
import { getComics } from './comics.js';
import { handleSearch } from './funcion_busqueda.js';


//Mensaje de busqueda
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    searchCliente();
});


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

const addform = document.getElementById("validacion");
          addform.addEventListener("submit", (e) => {
              if(addform.checkValidity() === false){
                  e.preventDefault();
                  e.stopPropagation();
                  addform.classList.add('was-validate');
                  return false
              }
          })


