import { getPersonajes } from "./peticiones/getPersonajes.js";


const ejemplo = () => {
    console.warn("Soy un ejemplo");
}

const enviarDatos = (id , name , image , species , status , nameLocation) => {
    

    const rutaArchivoHTML = "../personaje.html";

    fetch(rutaArchivoHTML)
        .then( (response) => {
            return response.text();
        } )
        .then( ( html )=> {

            const parser = new DOMParser();
            const doc = parser.parseFromString(html , "text/html");

            const imagePage = doc.getElementById("imagePage");
            imagePage.src = image;
            imagePage.alt = `Nombre de imagen : ${name}`;

            const namePage = doc.getElementById("namePage");
            namePage.textContent = `Nombre: ${name}`;

            const speciesPage = doc.getElementById("speciesPage");
            speciesPage.textContent = `Especie : ${species}`;

            const statusPage = doc.getElementById("statusPage");
            statusPage.textContent = `Estatus : ${status}`;

            const nLocation = doc.getElementById("nameLocationPage");
            nLocation.textContent = `Estatus : ${nameLocation}`;

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML;

        })

}


const crearCard = ( results = [] ) => {

    let personajesRow = document.getElementById("personajesRow");

    results.map((result)=> {

        const { id , name , image , species , status , location } = result;
        const { name : nameLocation } = location;
        
        const divCol = document.createElement("div");
        divCol.classList.add("col-xl-3");
        divCol.classList.add("col-lg-3");
        divCol.classList.add("col-md-3");
        divCol.classList.add("col-sm-12");
        divCol.classList.add("col-xs-12");
        divCol.classList.add("mt-2");
        divCol.classList.add("mb-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = image;
        img.alt = `Nombre de imagen ${name}`;

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = `Nombre : ${name}`;

        const subTitle = document.createElement("p");
        subTitle.classList.add("card-text");
        subTitle.textContent = `Especie : ${species}`;

        const subTitle2 = document.createElement("p");
        subTitle2.classList.add("card-text");
        subTitle2.textContent = `Estatus : ${status}`;

        const subTitle3 = document.createElement("p");
        subTitle3.classList.add("card-text");
        subTitle3.textContent = `Estatus : ${nameLocation}`;

        const btnVer = document.createElement("button");
        btnVer.classList.add("btn","btn-success");
        btnVer.textContent = "Ver detalles"

        //btnVer.addEventListener("click", ejemplo);
        btnVer.addEventListener("click", ()=> {
             enviarDatos(id , name , image , species , status , nameLocation);
        });

        divBody.appendChild(subTitle);
        divBody.appendChild(subTitle2);
        divBody.appendChild(subTitle3);
        divBody.appendChild(btnVer);

        card.appendChild(img);
        card.appendChild(divBody);

        divCol.appendChild(card);

        personajesRow.appendChild(divCol);
    })

}


getPersonajes()
    .then( data => crearCard(data))
    .catch( error => console.log(`El error es: ${error}`));