let pokemonObj=null
let url = "https://pokeapi.co/api/v2/pokemon"
let spriteField = document.getElementById("sprites");

mainView()

function mainView(){
    app.innerHTML= /*HTML*/ `
        <div id="field">
            <div class="pokemonContainer">
            </div>
        </div>
        <div class="buttonContainer">
            <button onclick="catchPokemon()">Fang</button>    
            <button onclick="updateView()">Finn en annen</button>
            <button onclick="showPokemonView()">Vis dine pokemon</button>       
        </div>
    `;
}

async function getOnePokemon(){
    let randomNumber = Math.floor(Math.random() * 1024 + 1);
    let pokemonContainer = document.querySelectorAll("pokemonContainer")
    

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
            pokemonId: pokemon.id
        }

        
    }
    catch(error){
        console.error(error);
    }
}
    