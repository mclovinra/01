//import { comics } from './productos.js';
import { getMangas } from './mangas.js';
import { handleSearch } from './funcion_busqueda.js';

const containerCartProducts = document.querySelector(
	'.container-cart-products'
);


//Busqueda de mangas, con y sin filtro
export const crearCard = ( results = [] ) => {

    let mangasRow = document.getElementById("mangasRow");
    let searchText = '';
    searchText = localStorage.getItem('searchText') || '';

    console.log(searchText);

    if (!mangasRow) {
        console.error("El elemento mangasRow no fue encontrado.");
        return;
    }
    mangasRow.innerHTML = '';

    let filteredMangas = results;

    if(searchText !== '')
    {
        filteredMangas = results.filter(manga => 
            manga.titulo.toLowerCase().includes(searchText.toLowerCase())
        );
    }
    
    console.log(filteredMangas);

    filteredMangas.map((manga)=> {

        const { id , titulo , vol , desc , image , price , stock , editorial } = manga; 

        const divCol = document.createElement("div");
        divCol.classList.add("col-xl-3");
        divCol.classList.add("col-lg-3");
        divCol.classList.add("col-md-6");
        divCol.classList.add("col-sm-12");
        divCol.classList.add("col-xs-12");
        divCol.classList.add("mt-2");
        divCol.classList.add("mb-2");

        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("d-flex");
        card.classList.add("align-items-stretch");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.classList.add("image-card");
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

        const precio = document.createElement("h4");
        precio.classList.add("card-title");
        precio.textContent = `${price}`;

        /* const btnCarro = document.createElement("button");
        btnCarro.classList.add("btn","btn-info");
        btnCarro.textContent = "Agregar al Carro"

        btnCart.addEventListener('click', () => {
            containerCartProducts.classList.toggle('hidden-cart');
        }); */

        const btnVer = document.createElement("button");
        btnVer.classList.add("btn","btn-success");
        btnVer.textContent = "Ver detalles"

        //btnVer.addEventListener("click", ejemplo);
        btnVer.addEventListener("click", ()=> {
             enviarDatos(id , titulo , vol , desc , image , price , stock , editorial);
             
        });

        divBody.appendChild(title);
        divBody.appendChild(descrip);
        divBody.appendChild(precio);
        divBody.appendChild(btnVer);

        card.appendChild(img);
        card.appendChild(divBody);

        divCol.appendChild(card);

        mangasRow.appendChild(divCol);
    })

}


//Envio de datos al detalle
const enviarDatos = (id , titulo , vol , desc , image , price , stock , editorial) => {
    
    const rutaArchivoHTML = "../Detalles.html";

    fetch(rutaArchivoHTML)
        .then( (response) => {
            localStorage.setItem("scrollPosition", window.scrollY);
            return response.text();
        } )
        .then( ( html )=> {

            const parser = new DOMParser();
            const doc = parser.parseFromString(html , "text/html");

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
            stockPage.textContent = `Stock : ${stock}`;

            const editorialPage = doc.getElementById("editorialPage");
            editorialPage.textContent = `Editorial : ${editorial}`;

            const botonVolver = $('<a>', {
                href: './Mangas.html',
                class: 'btn btn-warning',
                text: 'Volver'
            });
            $('#cardPage').append(botonVolver);

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML;

            window.scrollTo(0, 0);

        })
}

//Evento de enter o click buscar
document.getElementById('searchButton').addEventListener('click', handleSearch);
document.getElementById('searchInput').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleSearch(event);
    }
});


//Mensaje de busqueda
document.addEventListener("DOMContentLoaded", function() {

    getMangas()
    .then( data => crearCard(data))
    .catch( error => console.log(`El error es: ${error}`));

    const searchText = localStorage.getItem('searchText');

    if (searchText != null) {

        const searchRel = document.getElementById('searchRelacion');
        searchRel.innerHTML = `Busqueda relacionada con: <strong>"${searchText}"</strong>`;
        
    }
    
});