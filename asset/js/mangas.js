export const getMangas = async() => {

    try{

        const response = await fetch("https://api-mangas-ful1.onrender.com/");
        const data =  await response.json();

        return data.mangas;

    }catch(error){
        console.error(`El error es: ${error}`);
    }

}