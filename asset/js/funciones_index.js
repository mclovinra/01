import { comics } from './productos.js';
import { handleSearch } from './funcion_busqueda.js';
import { mangas } from './productos.js';



const crearCarruselComicsCard = () => {
    let rowCarrusel1 = document.getElementById("rowCarrusel1");
    let rowCarrusel2 = document.getElementById("rowCarrusel2");
    let rowCarrusel3 = document.getElementById("rowCarrusel3");

    let countCard = 1;

    comics.map((comic) => {
        const { id, titulo, vol, desc, image, price, stock, editorial } = comic;

        const divColCard = document.createElement("div");
        divColCard.classList.add("col-xl-3", "col-lg-3", "col-md-6", "col-sm-12", "col-xs-12", "mt-2", "mb-2");

        const card = document.createElement("div");
        card.classList.add("card", "d-flex", "align-items-stretch");

        const img = document.createElement("img");
        img.classList.add("card-img-top", "image-card");
        img.src = `../asset/img/Productos/${id}.jpg`;
        img.alt = `${titulo}`;

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = `${titulo}`;

        const descrip = document.createElement("p");
        descrip.classList.add("card-text");
        descrip.textContent = `Sinopsis : ${desc}`;

        const precio = document.createElement("p");
        precio.classList.add("card-text");
        precio.textContent = `${price}`;

        const btnVer = document.createElement("button");
        btnVer.classList.add("btn", "btn-success");
        btnVer.textContent = "Ver detalles";
        btnVer.addEventListener("click", () => {
            // Guardar la posición del scroll antes de redireccionar
            sessionStorage.setItem('scrollPosition', window.scrollY);
            enviarDatos(id, titulo, vol, desc, image, price, stock, editorial);
        });

        divBody.appendChild(title);
        divBody.appendChild(descrip);
        divBody.appendChild(precio);
        divBody.appendChild(btnVer);

        card.appendChild(img);
        card.appendChild(divBody);

        divColCard.appendChild(card);

        if (countCard <= 4) {
            rowCarrusel1.appendChild(divColCard);
        } else if (countCard > 4 && countCard <= 8) {
            rowCarrusel2.appendChild(divColCard);
        } else if (countCard > 8 && countCard <= 12) {
            rowCarrusel3.appendChild(divColCard);
        }

        countCard++;
    });
}

const crearCarruselMangasCard = () => {
    let rowCarrusel4 = document.getElementById("rowCarrusel4");
    let rowCarrusel5 = document.getElementById("rowCarrusel5");
    let rowCarrusel6 = document.getElementById("rowCarrusel6");

    let countCard = 1;

    mangas.map((manga) => {
        const { id, titulo, vol, desc, image, price, stock, editorial } = manga;

        const divColCard = document.createElement("div");
        divColCard.classList.add("col-xl-3", "col-lg-3", "col-md-6", "col-sm-12", "col-xs-12", "mt-2", "mb-2");

        const card = document.createElement("div");
        card.classList.add("card", "d-flex", "align-items-stretch");

        const img = document.createElement("img");
        img.classList.add("card-img-top", "image-card");
        img.src = `../asset/img/Mangas/${id}.jpg`;
        img.alt = `${titulo}`;

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = `${titulo}`;

        const descrip = document.createElement("p");
        descrip.classList.add("card-text");
        descrip.textContent = `Sinopsis : ${desc}`;

        const precio = document.createElement("p");
        precio.classList.add("card-text");
        precio.textContent = `${price}`;

        const btnVer = document.createElement("button");
        btnVer.classList.add("btn", "btn-success");
        btnVer.textContent = "Ver detalles";
        btnVer.addEventListener("click", () => {
            // Guardar la posición del scroll antes de redireccionar
            sessionStorage.setItem('scrollPosition', window.scrollY);
            enviarDatos(id, titulo, vol, desc, image, price, stock, editorial);
        });

        divBody.appendChild(title);
        divBody.appendChild(descrip);
        divBody.appendChild(precio);
        divBody.appendChild(btnVer);

        card.appendChild(img);
        card.appendChild(divBody);

        divColCard.appendChild(card);

        if (countCard <= 4) {
            rowCarrusel4.appendChild(divColCard);
        } else if (countCard > 4 && countCard <= 8) {
            rowCarrusel5.appendChild(divColCard);
        } else if (countCard > 8 && countCard <= 12) {
            rowCarrusel6.appendChild(divColCard);
        }

        countCard++;
    });
}

const enviarDatos = (id, titulo, vol, desc, image, price, stock, editorial) => {
    const rutaArchivoHTML = "../Detalles.html";

    fetch(rutaArchivoHTML)
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const imagePage = doc.getElementById("imagePage");
            imagePage.src = image;
            imagePage.alt = `Nombre de imagen : ${titulo}`;

            const tituloPage = doc.getElementById("tituloPage");
            tituloPage.textContent = `${titulo}`;

            const volPage = doc.getElementById("volPage");
            volPage.textContent = `Volumen : ${vol}`;

            const descPage = doc.getElementById("descPage");
            descPage.textContent = `Sinopsis : ${desc}`;

            const pricePage = doc.getElementById("pricePage");
            pricePage.textContent = `Precio : ${price}`;

            const stockPage = doc.getElementById("stockPage");
            stockPage.textContent = `Precio : ${stock}`;

            const editorialPage = doc.getElementById("editorialPage");
            editorialPage.textContent = `Precio : ${editorial}`;

            const botonVolver = $('<a>', {
                href: './index.html',
                class: 'btn btn-warning',
                text: 'Volver'
            });
            $('#cardPage').append(botonVolver);

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML;

            window.scrollTo(0, 0);
        });
}

crearCarruselComicsCard();
crearCarruselMangasCard();


document.getElementById('searchButton').addEventListener('click', handleSearch);
document.getElementById('searchInput').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleSearch(event);
    }
});

document.addEventListener("DOMContentLoaded", function() {

    sessionStorage.setItem('searchText', '');
    
});