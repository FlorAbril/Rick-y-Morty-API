
const inputNombre = document.getElementById('inputNombre') 
const input = document.getElementById('inputRandom') 
const btnBuscarRandom = document.getElementById('botonRandom')
const btnBuscarPorNombre = document.getElementById('botonNombre')
const contenedorPersonajes = document.getElementById('personajes') 


btnBuscarRandom.addEventListener('click', buscarRandom)
btnBuscarPorNombre.addEventListener('click', buscarPorNombre)

async function buscarPorNombre() {
  try {
    eliminarPersonajes()
    let nombre = inputNombre.value
    const personajes = await asycnPeticion(`https://rickandmortyapi.com/api/character/?name=${nombre}`)// array con personajes con las ids del array anterior
    personajes.results.map(crearPersonaje) 
    
  } catch (error) {
    console.log(error)
  }
}

async function buscarRandom(){
  try {
    eliminarPersonajes() // elimina los personajes si los hay
    let ids = generarIdsRandoms(inputRandom.value) //array de ids randoms 
    const personajes = await asycnPeticion(`https://rickandmortyapi.com/api/character/${ids}`)// array con personajes con las ids del array anterior
    if(ids.length == 1){
      crearPersonaje(personajes)
    }else{
      personajes.map(crearPersonaje) 
    }
    
  } catch (error) {
    console.log(error)
  }
}

// genera y devuelve un array con la cantidad de ids randoms que se pase por parametro
function generarIdsRandoms(cant) {
  let ids = []
  for (let i = 1; i <= cant; i++) {
   let randomId = Math.ceil(Math.random()*671)
   ids.push(randomId) 
  }
  return ids
}

// hace una peticion a la url y devuelve un json
async function asycnPeticion(url){
  try {
    const data = await fetch(url)
    const json = await data.json()
    return json
    
  } catch (error) {
   console.log(error) 
  }
}

// agrega personajes al contenedor de personajes
function crearPersonaje(personaje){
  const {image, name} = personaje
  let img = document.createElement('img')
  img.src = image
  img.title = name
  contenedorPersonajes.appendChild(img)
}

// elimina los personajes que se hayan creado
function eliminarPersonajes() {
  while (contenedorPersonajes.firstChild) {
    contenedorPersonajes.removeChild(contenedorPersonajes.firstChild);
  }
  
}
