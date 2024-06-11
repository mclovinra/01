export const getComics = async() => {

    try{

        const response = await fetch("https://api-comics-zai7.onrender.com/");
        const data =  await response.json();

        return data.comics;

    }catch(error){
        console.error(`El error es: ${error}`);
    }

}