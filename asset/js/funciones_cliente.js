import { clientes } from './usuarios.js';
import { getComics } from './comics.js';
import { handleSearch } from './funcion_busqueda.js';

// Función para buscar cliente y manejar inicio de sesión
export const searchCliente = () => {
    const rutSearch = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const loginMessage = document.getElementById("loginMessage");
    let findClient = clientes.find(cliente => cliente.rut === rutSearch);

    if (findClient) {
        if (findClient.pass != pass) {
            loginMessage.textContent = "Contraseña incorrecta";
            loginMessage.classList.add('text-danger');
        } else {
            loginMessage.textContent = "";
            window.location.href = 'index.html'; // Redireccionar al index si el inicio de sesión es correcto
        }
    } else {
        loginMessage.textContent = "El usuario no existe";
        loginMessage.classList.add('text-danger');
    }
};

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    searchCliente();
});

// Función para manejar el registro de nuevos usuarios
const addform = document.getElementById("validacion");

addform.addEventListener("submit", (e) => {
    if (addform.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        addform.classList.add('was-validate');
        return false;
    }
});

document.getElementById('validacion').addEventListener('submit', function(event) {
    event.preventDefault();
    const rut = document.querySelector('input[placeholder="Ej: 12345678-9"]').value.trim();
    const nombre = document.querySelector('input[placeholder="Ingrese el Nombre y Apellido"]').value.trim();
    const email = document.querySelector('input[placeholder="Ej: ejemplo@dominio.cl"]').value.trim();
    const telefono = document.querySelector('input[placeholder="Ej: 987654321"]').value.trim();
    const contrasena = document.querySelector('input[placeholder="Ingrese Contraseña"]').value.trim();
    const confirmarContrasena = document.querySelector('input[placeholder="Confirme Contraseña"]').value.trim();
    const userMessage = document.getElementById("userMessage");

    let isValid = true;

    // Validación de campos (descomentar si es necesario)
    /* if (rut === '') {
        isValid = false;
        showError('Por favor ingrese el Usuario', 'input[placeholder="Ej: 12345678-9"]');
    }
    if (nombre === '') {
        isValid = false;
        showError('Por favor ingrese el Nombre y Apellido', 'input[placeholder="Ingrese el Nombre y Apellido"]');
    }
    if (email === '') {
        isValid = false;
        showError('Por favor ingrese el Email', 'input[placeholder="Ej: ejemplo@dominio.cl"]');
    }
    if (telefono === '') {
        isValid = false;
        showError('Por favor ingrese el Teléfono', 'input[placeholder="Ej: 987654321"]');
    }
    if (contrasena === '') {
        isValid = false;
        showError('Por favor ingrese Contraseña', 'input[placeholder="Ingrese Contraseña"]');
    }
    if (confirmarContrasena === '') {
        isValid = false;
        showError('Por favor confirme Contraseña', 'input[placeholder="Confirme Contraseña"]');
    }
    if (contrasena !== confirmarContrasena) {
        isValid = false;
        showError('Las contraseñas no coinciden', 'input[placeholder="Confirme Contraseña"]');
    } */

    if (isValid) {
        const usuarioExiste = clientes.some(cliente => cliente.rut === rut);
        if (usuarioExiste) {
            showError('El usuario ya existe', 'input[placeholder="Ej: 12345678-9"]');
            userMessage.textContent = "El usuario ya existe";
            userMessage.classList.add('text-danger');
        } else {
            // Agregar el nuevo usuario a la lista de clientes (esto sería en un servidor real)
            clientes.push({ rut, nombre, email, telefono, contrasena });
            alert('Usuario registrado exitosamente');
            window.location.href = 'index.html';
        }
    }
});

function showError(message, selector) {
    const inputElement = document.querySelector(selector);
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}
