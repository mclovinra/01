import { comics } from '../js/productos.js';
import { getComics } from './comics.js';


const crearCard = ( results = [] ) => {

    let comicsRow = document.getElementById("comicsRow");

    results.map((result)=> {

        const { id , name , image , species , status , location } = result;
        const { name : nameLocation } = location;
        
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

        comicsRow.appendChild(divCol);
    })

}


getComics()
    .then( data => crearCard(data))
    .catch( error => console.log(`El error es: ${error}`));