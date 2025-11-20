// Variable global donde se guarda el Pokemon actual
let actualPokemon = null;

let publicacion = document.getElementById("publicacion");

// Función para buscar Pokémon
function buscarPokemon() {
    let nombrePokemon = document.getElementById("pokemonInput").value.toLowerCase();

    let url = "https://pokeapi.co/api/v2/pokemon/" + nombrePokemon;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            // Guardar el Pokémon en la variable global
            actualPokemon = {
                name: data.name,
                image: data.sprites.front_default
            };

            // Mostrar en pantalla
            document.getElementById("resultado").innerHTML =
                "<h3>" + actualPokemon.name + "</h3>" +
                "<img src='" + actualPokemon.image + "'>";
        })
        .catch(function(error) {
            alert("Pokémon no encontrado.");
        });
}

// Función para guardar favorito
function guardarFavorito() {

    if (actualPokemon == null) {
        alert("Primero debes buscar un Pokémon.");
        return;
    }

    // Obtener lista actual
    let favoritos = JSON.parse(localStorage.getItem("favoritos"));

    if (!favoritos) {
        favoritos = [];
    }

    // Verificar si ya existe
    let disponible = favoritos.some(function(poke) {
        return poke.name === actualPokemon.name;
    });

    if (disponible) {
        alert("Este Pokémon ya está en favoritos.");
        return;
    }

    // Agregar al array
    favoritos.push(actualPokemon);

    // Guardar en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Actualizar pantalla
    actualizarFavoritos();
}

// Función para listar favoritos
function actualizarFavoritos() {

    let favoritos = JSON.parse(localStorage.getItem("favoritos"));

    let container = document.getElementById("favoritos");
    container.innerHTML = "";

    if (!favoritos) return;

    favoritos.forEach(function(poke) {
        let div = document.createElement("div");
        div.innerHTML =
            "<h4>" + poke.name + "</h4>" +
            "<img src='" + poke.image + "'>";
        container.appendChild(div);
    });
}

// Ejecutar al cargar la página
actualizarFavoritos();
