// Variable global donde guardamos el Pokémon actual
let currentPokemon = null;

// Función para buscar Pokémon
function searchPokemon() {
    let pokemonName = document.getElementById("pokemonInput").value.toLowerCase();

    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            // Guardamos el Pokémon en la variable global
            currentPokemon = {
                name: data.name,
                image: data.sprites.front_default
            };

            // Mostrar en pantalla
            document.getElementById("resultado").innerHTML =
                "<h3>" + currentPokemon.name + "</h3>" +
                "<img src='" + currentPokemon.image + "'>";
        })
        .catch(function(error) {
            alert("Pokémon no encontrado.");
        });
}

// Función para guardar favorito
function saveFavorite() {

    if (currentPokemon == null) {
        alert("Primero debes buscar un Pokémon.");
        return;
    }

    // Obtener lista actual
    let favorites = JSON.parse(localStorage.getItem("favoritos"));

    if (!favorites) {
        favorites = [];
    }

    // Verificar si ya existe
    let exists = favorites.some(function(poke) {
        return poke.name === currentPokemon.name;
    });

    if (exists) {
        alert("Este Pokémon ya está en favoritos.");
        return;
    }

    // Agregar al array
    favorites.push(currentPokemon);

    // Guardar en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favorites));

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
