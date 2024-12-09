let pokemonObj=null
let url = "https://pokeapi.co/api/v2/pokemon"
let spriteField = document.getElementById("sprites");

mainView()

function mainView(){
    app.innerHTML= /*HTML*/ `
        <div id="field">
            <div id="pokemonContainer">
            </div>
        </div>
        <div class="buttonContainer">
            <button onclick="catchPokemon()">Fang</button>    
            <button onclick="getOnePokemon()">Finn en pokemon</button>
            <button onclick="showPokemonView()">Vis dine pokemon</button>       
        </div>
    `;
}

async function getOnePokemon(){
    let randomNumber = Math.floor(Math.random() * 1024 + 1);
    let pokemonContainer = document.getElementById("pokemonContainer")
    

    url = "https://pokeapi.co/api/v2/pokemon/" + randomNumber; 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const pokemon = await response.json();
        let pokemonSprite = pokemon.sprites.front_default;
        pokemonObj = {
            name: pokemon.name,
            sprite: pokemonSprite,
            pokemonId: "#"+pokemon.id
        }
        pokemonContainer.innerHTML = /*HTML*/`
            <div id="pokemonName">${pokemonObj.name}</div>
            <div id="pokemonID">${pokemonObj.pokemonId}</div>
            <img id="pokemonSprite" src="${pokemonSprite}">
        `;


    }
    catch(error){
        console.error(error);
    }
}
    