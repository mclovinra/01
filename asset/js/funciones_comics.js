import { comics } from './productos.js';
import { getComics } from './comics.js';


const crearCard = ( results = [] ) => {

    let comicsRow = document.getElementById("comicsRow");

    comics.map((comic)=> {

        const { id , titulo , vol , desc , image , price , stock , editorial } = comic; 

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
        img.src = image;
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

        comicsRow.appendChild(divCol);
    })

}

export const crearCardFiltro = ( searchText = '' ) => {

    let comicsRow = document.getElementById("comicsRow");

    const filteredComics = comics.filter(comic => 
        comic.titulo.toLowerCase().includes(searchText.toLowerCase())
    );

    filteredComics.map((comic)=> {

        const { id , titulo , vol , desc , image , price , stock , editorial } = comic; 

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
        img.src = image;
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

        comicsRow.appendChild(divCol);
    })

}

getComics()
    .then( data => crearCard(data))
    .catch( error => console.log(`El error es: ${error}`));

const enviarDatos = (id , titulo , vol , desc , image , price , stock , editorial) => {
    
    const rutaArchivoHTML = "../Detalles.html";

    fetch(rutaArchivoHTML)
        .then( (response) => {
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
            stockPage.textContent = `Precio : ${stock}`;

            const editorialPage = doc.getElementById("editorialPage");
            editorialPage.textContent = `Precio : ${editorial}`;

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML;

            window.scrollTo(0, 0);

        })

}
