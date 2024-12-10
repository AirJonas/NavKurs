let pokemonObj=null
let url = "https://pokeapi.co/api/v2/pokemon"
let spriteField = document.getElementById("sprites");
let myPokemon = [];

mainView()

function mainView(){
    app.innerHTML= /*HTML*/ `
        <div id="field">
            <div id="pokemonContainer"></div>
        </div>
        <div class="buttonContainer">
            <button onclick="catchPokemon()">Fang</button>    
            <button onclick="getOnePokemon()">Finn en pokemon</button>
            <button onclick="showPokemonView()">Vis dine pokemon</button>       
        </div>
    `;
}

function showPokemonView(){
    app.innerHTML = /*HTML*/`
        <div id="boxContainer">
            <div id="playerBox">${showAllMyPokemon()}</div>
        </div>

        <div class="buttonContainer">    
            <button onclick="mainView()">Finn en pokemon</button>       
        </div>
    `;
}

function pokemonView(index){
    app.innerHTML = /*HTML*/`
        <div id="pokemonInfoBox">
            <div id="myPokemonNameInfo">${myPokemon[index].name}</div>
            <div id="myPokemonIDInfo">${myPokemon[index].pokemonId}</div>
            <img id="myPokemonSpriteInfo" src="${myPokemon[index].sprite}">
            <div id="pokemonTypesBox">
                <div id="pokemonType1">${myPokemon[index].type1}</div>
                <div id="pokemonType2">${myPokemon[index].type2}</div>
            </div>
        </div>
        <div class="buttonContainer">    
            <button onclick="mainView()">Finn en pokemon</button>
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
        let pokemonTypes = pokemon.types
        let pokemonType2 = "";
        if(pokemonTypes.length == 1){
            pokemonType2 = "none";
        }
        pokemonObj = {
            name: pokemon.name,
            sprite: pokemonSprite,
            pokemonId: "#"+pokemon.id,
            type1: pokemon.types[0].type.name,
            type2: pokemonType2
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

function showAllMyPokemon(){
    let html = "";
    for(let i = 0; i < myPokemon.length; i++){
        html += /*HTML*/`
            <div data-value=${i} onclick=pokemonView(this.dataset.value) class="pokemonsInBox">
                <div class="myPokemonName">${myPokemon[i].name}</div>
                <div class="myPokemonID">${myPokemon[i].pokemonId}</div>
                <img class="myPokemonSprite" src="${myPokemon[i].sprite}">
            </div>
        `;
    }
    return html;
}

function catchPokemon(){
    if(pokemonObj == null || pokemonObj.name ==""){
        console.log("no pokemon")
    } else {
        myPokemon.push(pokemonObj);
        getOnePokemon()
    }
}


    