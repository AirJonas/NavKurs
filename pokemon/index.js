let pokemonObj=null
let url = "https://pokeapi.co/api/v2/pokemon"
let spriteField = document.getElementById("sprites");
let myPokemon = [];
let type1Box;
let type2Box;



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
                <span class="type" id="pokemonType1">${myPokemon[index].type1}</span>
                <span class="type" id="pokemonType2">${myPokemon[index].type2}</span>
            </div>
        </div>
        <div class="buttonContainer">    
            <button onclick="mainView()">Finn en pokemon</button>
            <button onclick="showPokemonView()">Vis dine pokemon</button>       
        </div>
    `;

    type1Box = document.getElementById("pokemonType1");
    type2Box = document.getElementById("pokemonType2");
    changeColorToType1Box(myPokemon[index].type1);
    changeColorToType2Box(myPokemon[index].type2);
    
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
        let pokemonName = capitalizeFirstLeter(pokemon.name)
        let pokemonSprite = pokemon.sprites.front_default;
        let pokemonTypes = pokemon.types
        let pokemonType1 = capitalizeFirstLeter(pokemon.types[0].type.name)
        let pokemonType2 = "";
        if(pokemonTypes.length == 1){
            pokemonType2 = "none";
        } else {
            pokemonType2 = capitalizeFirstLeter(pokemon.types[1].type.name);
        }
        pokemonObj = {
            name: pokemonName,
            sprite: pokemonSprite,
            pokemonId: "#"+pokemon.id,
            type1: pokemonType1,
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

function capitalizeFirstLeter(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function changeColorToType1Box(type){
    switch(type){
        case "Normal":
            type1Box.style.backgroundColor = "#A8A77A";
            break;
        case "Fire":
            type1Box.style.backgroundColor = "#EE8130";
            break;
        case "Water":
            type1Box.style.backgroundColor = "#6390F0";
            break;
        case "Electric":
            type1Box.style.backgroundColor = "#F7D02C";
            break;
        case "Grass":
            type1Box.style.backgroundColor = "#7AC74C";
            break;
        case "Ice":
            type1Box.style.backgroundColor = "#96D9D6";
            break;
        case "Fighting":
            type1Box.style.backgroundColor = "#C22E28";
            break;
        case "Poison":
            type1Box.style.backgroundColor = "#A33EA1";
            break;
        case "Ground":
            type1Box.style.backgroundColor = "#E2BF65";
            break;
        case "Flying":
            type1Box.style.backgroundColor = "#A98FF3";
            break;
        case "Psychic":
            type1Box.style.backgroundColor = "#F95587";
            break;
        case "Bug":
            type1Box.style.backgroundColor = "#A6B91A";
            break;
        case "Rock":
            type1Box.style.backgroundColor = "#B6A136";
            break;
        case "Ghost":
            type1Box.style.backgroundColor = "#735797";
            break;
        case "Dragon":
            type1Box.style.backgroundColor = "#6F35FC";
            break;
        case "Dark":
            type1Box.style.backgroundColor = "#705746";
            break;
        case "Steel":
            type1Box.style.backgroundColor = "#B7B7CE";
            break;
        case "Fairy":
            type1Box.style.backgroundColor = "#D685AD";
            break;
    }
}

function changeColorToType2Box(type){
    switch(type){
        case "Normal":
            type2Box.style.backgroundColor = "#A8A77A";
            break;
        case "Fire":
            type2Box.style.backgroundColor = "#EE8130";
            break;
        case "Water":
            type2Box.style.backgroundColor = "#6390F0";
            break;
        case "Electric":
            type2Box.style.backgroundColor = "#F7D02C";
            break;
        case "Grass":
            type2Box.style.backgroundColor = "#7AC74C";
            break;
        case "Ice":
            type2Box.style.backgroundColor = "#96D9D6";
            break;
        case "Fighting":
            type2Box.style.backgroundColor = "#C22E28";
            break;
        case "Poison":
            type2Box.style.backgroundColor = "#A33EA1";
            break;
        case "Ground":
            type2Box.style.backgroundColor = "#E2BF65";
            break;
        case "Flying":
            type2Box.style.backgroundColor = "#A98FF3";
            break;
        case "Psychic":
            type2Box.style.backgroundColor = "#F95587";
            break;
        case "Bug":
            type2Box.style.backgroundColor = "#A6B91A";
            break;
        case "Rock":
            type2Box.style.backgroundColor = "#B6A136";
            break;
        case "Ghost":
            type2Box.style.backgroundColor = "#735797";
            break;
        case "Dragon":
            type2Box.style.backgroundColor = "#6F35FC";
            break;
        case "Dark":
            type2Box.style.backgroundColor = "#705746";
            break;
        case "Steel":
            type2Box.style.backgroundColor = "#B7B7CE";
            break;
        case "Fairy":
            type2Box.style.backgroundColor = "#D685AD";
            break;
        case "none":
            type2Box.style.display = "none";
            break;
    }
}

    