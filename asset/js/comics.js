export const getComics = async() => {

    try{

        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data =  await response.json();

        return data.results;

    }catch(error){
        console.error(`El error es: ${error}`);
    }

}