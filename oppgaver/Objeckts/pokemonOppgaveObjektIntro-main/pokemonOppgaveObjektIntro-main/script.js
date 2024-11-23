let pikachuName = "Pikachu"

let pikachu = {
  name: "Pikachu",
  health: 45,
  image: "Images/pikachu.png",
  level: 8,
};

let bulbasaur = {
  name: "Bulbasaur",
  health: 70,
  image: "Images/bulbasaur.png",
  level: 12,
};

let oranguru = {
  name: "Oranguru",
  health: 170,
  image: "Images/oranguru.png",
  level: 45,
};

let drowzee = {
  name: "Drowzee",
  health: 90,
  image: "Images/drowzee.png",
  level: 33,
};

let player ={
  name: "Bjarne",
  image:"./Images/pokemonTrainerIdle.png",
  pokemon: [],
};

let possiblePokemon = [pikachu, bulbasaur, oranguru, drowzee];
let randomPokemon = null;

let playerName = "Bjarne";
let playerImage = "./Images/pokemonTrainerIdle.png";
let playerPokemon = [];

let app = document.getElementById("app");

updateView();

function updateView() {
  getRandomPokemon()
  app.innerHTML = /*HTML*/ `
  <div class="container">
    <div class="opposingPokemon">
        <div>${randomPokemon.name}</div> 
        <div>lvl: ${randomPokemon.level}</div>
        <img src="${randomPokemon.image}">
    </div>
    
    <div class="bottomScreen">
        <div class="player">
            <img src="${player.image}">
            <div>${player.name}</div>
        </div>

        <div class="buttonContainer">
            <button onclick="catchPokemon()">Fang</button>    
            <button onclick="updateView()">Finn en annen</button>
            <button onclick="showPokemonView()">Vis dine pokemon</button>       
        </div>

    </div>
  </div>
  `;
}

function caughtPokemonView(){
  app.innerHTML = /*HTML*/`
  <div class="caughtContainer">
    <h1>Du fanget ${player.pokemon[player.pokemon.length - 1].name}</h1>
    <div class="buttonContainer">
              <button onclick="updateView()">Finn en annen</button>
              <button onclick="showPokemonView()">Vis dine pokemon</button>
          </div>
  </div>
  `;
}

function showPokemonView(){
  app.innerHTML = /*HTML*/`
    <div id="pokemonGrid">${showPokemon()}</div>
      <button onclick="updateView()">Finn en annen</button>
  `;
}

function catchPokemon(){
  player.pokemon.push(randomPokemon);
  caughtPokemonView();
}

function showPokemon(){
  let html =""
    for(let i = 0; i < player.pokemon.length; i++){
    html += /*HTML*/ `<div class="caughtPokemom">
        <div>${player.pokemon[i].name}</div> 
        <div>lvl: ${player.pokemon[i].level}</div>
        <img class="caughtImagePokemon" src="${player.pokemon[i].image}">
    </div>
    `;
    }

    return html;
  console.log(player.pokemon);
}

function getRandomPokemon(){
  let randomNum = Math.floor(Math.random() * possiblePokemon.length);
  randomPokemon = possiblePokemon[randomNum];
}
