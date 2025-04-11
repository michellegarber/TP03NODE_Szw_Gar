import axios from "axios";
const APIKEY = "3aec7103";
const DIEZ = 10;


const OMDBSearchByPage = async (searchText, page = 1) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: []
  };

  try {

    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        s: searchText, 
        page: page,    
        apikey: APIKEY  
      }
    });


    if (response.data.Response === "True") {
      returnObject.respuesta = true;
      returnObject.cantidadTotal = parseInt(response.data.totalResults, 10);  
      returnObject.datos = response.data.Search;  
    } else {
      returnObject.respuesta = false;  
    }
  } catch (error) {
    console.error("Error en la búsqueda por página de OMDB:", error);
  }

  return returnObject;
};


const OMDBSearchComplete = async (searchText) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: []
  };

  try {
  

    resultados = await OMDBSearchByPage(searchText, 1)
    if(resultados.cantidadTotal <= DIEZ)
    {
      resultados;
      
    } else {
      let num = Math.ceil(resultados.cantidadTotal/DIEZ);
      for(i=2; i<num; i++){

        resultadoTemporal = await OMDBSearchByPage(searchText, i)
        resultados.datos.concat(resultadoTemporal.datos);
      }

      
    }
          



    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        s: searchText,  
        apikey: APIKEY  
      }
    });

    if (response.data.Response === "True") {
      returnObject.respuesta = true;
      returnObject.cantidadTotal = parseInt(response.data.totalResults, 10); 
      returnObject.datos = response.data.Search;  
    } else {
      returnObject.respuesta = false;  
    }
  } catch (error) {
    console.error("Error en la búsqueda completa de OMDB:", error);
  }

  return returnObject;
};


const OMDBGetByImdbID = async (imdbID) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: {}
  };

  try {
    
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        i: imdbID,      
        apikey: APIKEY 
      }
    });

  
    if (response.data.Response === "True") {
      returnObject.respuesta = true;
      returnObject.datos = response.data;  
    } else {
      returnObject.respuesta = false; 
    }
  } catch (error) {
    console.error("Error al obtener detalles por IMDb ID de OMDB:", error);
  }

  return returnObject;
};


export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };