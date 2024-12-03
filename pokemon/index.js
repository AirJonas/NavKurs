updateView()

fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

function updateView(){
    app.innerHTML= /*HTML*/ `
    <div id="field">
        <button onclick="getOnePokemon()">Find Pokemon</button>
        <div id="sprites"></div>
    </div>
    `;
}

async function getOnePokemon(){
    let
    try{
        const response = a
    }
    let randomNumber = Math.floor(Math.random() * 1302)
    let randomPokemon = fetch("https://pokeapi.co/api/v2/pokemon/1");
    let spriteField = document.getElementById("sprites");
    let pokemonSprite = randomPokemon.sprites.front_default;
    console.log(randomPokemon);
    spriteField.innerHTML += /*HTML*/`
       <img src=${pokemonSprite}>
   `;
}