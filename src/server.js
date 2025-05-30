import Alumno from "./models/alumno.js"
import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"
import express  from "express"; 
import cors     from "cors"; 
const app  = express();
const port = 3000;  //(http://localhost:3000)
// Agrego los Middlewares
app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON
//A:
// Aca pongo todos los EndPoints
app.get('/', (req, res) => {                // EndPoint "/"
    res.status(200).send('Ya estoy respondiendo!(200)');
})

app.get('/saludar/:nombre', (req, res) => {         // EndPoint "/saludar"

    res.status(200).send('Hola ' + req.params.nombre);

})
//localhost:3000/validarfecha/2014/12/12
app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {    
    let anio = req.params.ano;
    let mes = req.params.mes;
    let dia = req.params.dia;
    let fechita = anio + "-" + mes + "-" + dia;
    console.log('fechita ', fechita );
    let fecha = Date.parse(fechita)
    console.log('fecha ', fecha );
    if (isNaN(fecha)){
       res.status(400).send("Fecha Invalida") 
    }
    else{
        res.status(200).send("Fecha Valida")
    }
//B:
//     http://localhost:3000/matematica/sumar?n1={numero}&n2={numero}
app.get('/matematica/sumar', (req, res) => {    
    let resultado = sumar(parseFloat(req.query.n1) + parseFloat(req.query.n2));
    res.status(200).send(resultado);

})    
//      http://localhost:3000/matematica/restar?n1={numero}&n2={numero}
app.get('/matematica/restar', (req, res) => {    
    let resultado = restar(parseFloat(req.query.n1) - parseFloat(req.query.n2));
    res.status(200).send(resultado);

})    
//      http://localhost:3000/matematica/multiplicar?n1={numero}&n2={numero}
app.get('/matematica/multiplicar', (req, res) => {    
    let resultado = multiplicar(parseFloat(req.query.n1) * parseFloat(req.query.n2));
    res.status(200).send(resultado);

})    
//      http://localhost:3000/matematica/dividir?n1={numero}&n2={numero}
app.get('/matematica/dividir', (req, res) => {    
    let resultado = dividir(parseFloat(req.query.n1) / parseFloat(req.query.n2));
    res.status(200).send(resultado);

})    

//C:
//     http://localhost:3000/omdb/searchbypage?search={texto}&p={pagina}
app.get('/omdb/searchbypage', async (req, res) => {
    res.status(200).send(OMDBSearchByPage(req.query.search, req.query.p));
})
//     http://localhost:3000/omdb/searchcomplete?search={texto}
app.get('/omdb/searchcomplete', async (req, res) => {
    res.status(200).send(OMDBSearchcomplete(req.query.search));
})
//     http://localhost:3000/omdb/getbyomdbid?imdbID={imdb}
app.get('/omdb/getbyomdbid', async (req, res) => {
    res.status(200).send(OMDBGetByImdbID(req.query.imdbID));
})
})


//D
const alumnosArray = [];

alumnosArray.push(new Alumno("Esteban Dido"  , "22888444", 20));

alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));

alumnosArray.push(new Alumno("Elba Calao"    , "32623391", 18));

//http://localhost:3000/alumnos
app.get('/alumnos', async (req, res) => {
    res.status(200).send(alumnosArray);
})  

//http://localhost:3000/alumnos/22888444
app.get('/alumnos/:dni', async (req, res) => {
    console.log("hola")
    let idx  = alumnosArray.findIndex(alumno => alumno.dni == req.params.dni);
    console.log(idx)
    if(idx == -1){
        return res.status(404).send("DNI no encontrado") 
    }
    else{

       return res.status(200).send(alumnosArray[idx])
    }
    
})  

//http://localhost:3000/alumnos
app.post('/alumnos', (req, res) => {
    alumnosArray.push(new Alumno(req.body));
    res.json(alumnosArray);
})

app.delete('/alumnos', (req, res) => {
    const posicion = alumnosArray.findIndex(Alumno => Alumno.DNI === req.body);
    if (alumnosArray[posicion] != -1)
    {
        alumnosArray.splice(alumnosArray[posicion], 1);
        res.status(200).send("Alumno eliminado")
    }
    else
    {
        res.status(404).send("DNI no existe el dni")
    }

})

















// Inicio el Server y lo pongo a escuchar.
app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})