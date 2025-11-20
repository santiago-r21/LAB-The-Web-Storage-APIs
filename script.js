// === Conectar botones con funciones ===
document.getElementById("buscarBtn").addEventListener("click", searchPokemon);
document.getElementById("guardarBtn").addEventListener("click", saveFavorite);
document.getElementById("borrarTodosBtn").addEventListener("click", borrarTodos);

// Variable donde guardamos el Pokémon actual
let currentPokemon = null;

// Función para buscar Pokémon
function searchPokemon() {
    let pokemonName = document.getElementById("pokemonInput").value.toLowerCase();//obtiene lo que escribio el ususario y convierte a minusculas

    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName; //construimos la URL

    fetch(url) //Hace la petición a la API
        .then(function(response) { //Convierte la respuesta en JSON usable
            return response.json();//Convierte la respuesta en JSON usable
        })
        .then(function(data) { //tenemos los datos reales del pokemon, desde la API

            // Guardamos el Pokémon en la variable global
            currentPokemon = {
                name: data.name, //se crea un objeto con nombre e imagen frontal y se guarda en variable global
                image: data.sprites.front_default
            };

            // Mostrar en pantalla
            document.getElementById("resultado").innerHTML = //se busca el div y cambia su contenido por nombre e iamgen del pokemon 
                "<h3>" + currentPokemon.name + "</h3>" +
                "<img src='" + currentPokemon.image + "'>";
        })
        .catch(function(error) { // si el pokemon no existe activamos alert 
            alert("Pokémon no encontrado.");
        });
}

// Función para guardar favorito
function saveFavorite() {

    if (currentPokemon == null) {  //verificamos que haya un poquemon guardado, sino alert
        alert("Primero debes buscar un Pokémon.");
        return;
    }

    // Obtener lista actual
    let favorites = JSON.parse(localStorage.getItem("favoritos")); // lee localStorage lo convierte de string  a array

    if (!favorites) {  // si aún no hay favoritos crea la lista desde cero
        favorites = [];
    }

    // Verificar si ya existe, para evitar duplicados
    let exists = favorites.some(function(poke) { // some revisa si ya existe el pokemon en la lista
        return poke.name === currentPokemon.name; 
    });

    if (exists) {
        alert("Este Pokémon ya está en favoritos."); // si existe tira alerta
        return;
    }

    // Agregar al array, agregar el favorito
    favorites.push(currentPokemon);

    // Guardar en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favorites)); //convierte el array a texto, lo guarda en el navegador

    // Actualizar pantalla
    updateFavoritesList();
}

// Función para listar favoritos
function updateFavoritesList() {

    let favorites = JSON.parse(localStorage.getItem("favoritos"));

    let container = document.getElementById("favoritos");
    container.innerHTML = "";

    if (!favorites) return;

    favorites.forEach(function(poke) {
        let div = document.createElement("div");
        div.innerHTML =
            "<h4>" + poke.name + "</h4>" +
            "<img src='" + poke.image + "'>";
        container.appendChild(div);
    });
}

// Ejecutar al cargar la página
updateFavoritesList();

function borrarTodos() {
    localStorage.removeItem("favoritos");
    updateFavoritesList();
}
