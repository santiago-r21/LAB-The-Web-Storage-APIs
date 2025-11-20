
let Pokemonrecibido = null;
function buscarPokemon() {
    let pokemonName = document.getElementById("pokemonInput").value.toLowerCase();

    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            Pokemonrecibido = {
                name: data.name,
                image: data.sprites.front_default
            };
            document.getElementById("resultado").innerHTML =
                "<h3>" + Pokemonrecibido.name + "</h3>" +
                "<img src='" + Pokemonrecibido.image + "'>";
        })
        .catch(function(error) {
            alert("Pokémon no encontrado.");
        });
}


function Guardar() {
    if (Pokemonrecibido == null) {
        alert("Primero debes buscar un Pokémon.");
        return;
    }
    let favorites = JSON.parse(localStorage.getItem("favoritos"));

    if (!favorites) {
        favorites = [];
    }
    let exists = favorites.some(function(poke) {
        return poke.name === Pokemonrecibido.name;
    });
    if (exists) {
        alert("Este Pokémon ya está en favoritos.");
        return;
    }
    // Agregar al array
    favorites.push(Pokemonrecibido);

    localStorage.setItem("favoritos", JSON.stringify(favorites));

    
    updateFavoritesList();
}


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

updateFavoritesList();
