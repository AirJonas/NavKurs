let pokemonObj=null
let spriteField = document.getElementById("sprites");
let abilityButtons;
let myPokemon = [];
let type1Box;
let type2Box;
let hpBar;
let attackBar;
let defenceBar;
let spAtckBar;
let spDefBar;
let speed;
let pokemonMove = [];
let abilityDescription;
let abilityText;




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
            <div id="statsContainer">
                <table id="statsTable">
                    <tbody>
                        <tr>
                            <th class="statName">HP</th>
                            <td class="cell-num">${myPokemon[index].hp}</td>
                            <td class="cell-bar"><div class="insideBars" id="hpBar"></div></td>
                        </tr>
                        <tr>
                            <th class="statName">Attack</th>
                            <td class="cell-num">${myPokemon[index].attack}</td>
                            <td class="cell-bar"><div class="insideBars" id="attackBar"></div></td>
                        </tr>
                        <tr>
                            <th class="statName">Defence</th>
                            <td class="cell-num">${myPokemon[index].defense}</td>
                            <td class="cell-bar"><div class="insideBars" id="defenceBar"></div></td>
                        </tr>
                        <tr>
                            <th class="statName">Sp.Atk</th>
                            <td class="cell-num">${myPokemon[index].specialAttack}</td>
                            <td class="cell-bar"><div class="insideBars" id="spAttackkBar"></div></td>
                        </tr>
                        <tr>
                            <th class="statName">Sp.Def</th>
                            <td class="cell-num">${myPokemon[index].specialDefense}</td>
                            <td class="cell-bar"><div class="insideBars" id="spDefenceBar"></div></td>
                        </tr>
                        <tr>
                            <th class="statName">Speed</th>
                            <td class="cell-num">${myPokemon[index].speed}</td>
                            <td class="cell-bar"><div class="insideBars" id="speedBar"></div></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <th class="statName">Total</th>
                        <td class="cell-num">${myPokemon[index].totalStat}</td>
                        <td class="cell-barTotal"></td>
                    </tfoot>
                </table>
            </div>
            <h3>Pokedex entry</h3>
            <div id="pokedexContainer"></div>
            <h3>Abilities</h3>
            <div id="abilitysButtons"></div>
            <div id="abilityText"></div>
        </div>

        <div id="buttonContainer">    
            <button onclick="mainView()">Finn en pokemon</button>
            <button onclick="showPokemonView()">Vis dine pokemon</button>       
        </div>
        `;

    type1Box = document.getElementById("pokemonType1");
    type2Box = document.getElementById("pokemonType2");
    changeColorToType(myPokemon[index].type1, type1Box);
    changeColorToType(myPokemon[index].type2, type2Box);
    setBarStats(index);
    abilityButtons = document.getElementById("abilitysButtons");
    abilityText = document.getElementById("abilityText");
    getPokedexentry(myPokemon[index].species.url);
    for (let i = 0; i < myPokemon[index].abilities.length; i++) {
        showAbilityInfo(index, i)
    }
    


}

async function getOnePokemon(){
    let randomNumber = Math.floor(Math.random() * 1024 + 1);
    let pokemonContainer = document.getElementById("pokemonContainer")
    
    let url = "https://pokeapi.co/api/v2/pokemon/" + randomNumber; 
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
        let pokeHp = pokemon.stats[0].base_stat;
        let pokAtck = pokemon.stats[1].base_stat;
        let pokDef = pokemon.stats[2].base_stat;
        let pokSpAt = pokemon.stats[3].base_stat;
        let pokSpDef = pokemon.stats[4].base_stat;
        let pokSpeed = pokemon.stats[5].base_stat;
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
            type2: pokemonType2,
            hp: pokeHp,
            attack: pokAtck,
            defense: pokDef,
            specialAttack: pokSpAt,
            specialDefense: pokSpDef,
            speed: pokSpeed,
            totalStat: pokeHp + pokAtck + pokDef + pokSpAt + pokSpDef + pokSpeed,
            abilities: pokemon.abilities,
            species: pokemon.species

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

async function getPokedexentry(url) {
    let english = false;
    let i = 0;
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        while (english == false) {
            if (data.flavor_text_entries[i].language.name == "en"){
                let pokedexEntry = data.flavor_text_entries[i].flavor_text;
                document.getElementById("pokedexContainer").innerHTML += /*html*/`
                    <div id="pokedexBox">${pokedexEntry}</div>
                `; 
                english = true;
                i = 0;
            }
            else{
                i++
            }
        }
        
    

    } catch(error){
        console.error(error);
    }
}

async function getPokemonAbilitys(url) {
    console.log(url);
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        let abilityEffect = data.effect_entries.find(
        (entry) => entry.language.name === "en").effect;
        return abilityEffect;

    } catch(error){
        console.error(error);
        return "Kunne ikke hente evnen.";
    }

}

async function showAbilityInfo(index, abilityIndex) {
    const abilityUrl = myPokemon[index].abilities[abilityIndex].ability.url; // 
    const abilityDescription = await getPokemonAbilitys(abilityUrl);
    let abilityTextInsideAButton = abilityDescription.replace(/'/g,"´").replace(/\n/g, "<br>")
    abilityButtons.innerHTML += /*HTML*/`
    <button id="abilityBtn${abilityIndex}" onclick="showAbilityText('${abilityTextInsideAButton}')">${capitalizeFirstLeter(myPokemon[index].abilities[abilityIndex].ability.name)}</button>
    `;
    console.log("Egenskap:", abilityDescription);
}

function showAbilityText(text){
    abilityText.innerHTML = text;
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

function setBarStats(id){
    hpBar = document.getElementById("hpBar"); 
    attackBar = document.getElementById("attackBar");
    defenceBar = document.getElementById("defenceBar");
    spAtckBar = document.getElementById("spAttackkBar");
    spDefBar = document.getElementById("spDefenceBar");
    speed = document.getElementById("speedBar");

    hpBar.style.width = percentage(myPokemon[id].hp) + "%";
    attackBar.style.width = percentage(myPokemon[id].attack) + "%";
    defenceBar.style.width = percentage(myPokemon[id].defense) + "%";
    spAtckBar.style.width = percentage(myPokemon[id].specialAttack) + "%";
    spDefBar.style.width = percentage(myPokemon[id].specialDefense) + "%";
    speed.style.width = percentage(myPokemon[id].speed) + "%";

    setColorBars(myPokemon[id].hp, "Hp");
    setColorBars(myPokemon[id].attack, "attack");
    setColorBars(myPokemon[id].defense, "defence");
    setColorBars(myPokemon[id].specialAttack, "spAtc");
    setColorBars(myPokemon[id].specialDefense, "spDef");
    setColorBars(myPokemon[id].speed, "speed");

    
    
}

function percentage(partialValue) {
    return (100 * partialValue) / 255;
}

function setColorBars(statsValue, stat){
    switch(stat){
        case "Hp":
            if(statsValue < 50){
                hpBar.style.backgroundColor = "red";
            } else if(statsValue < 100) {
                hpBar.style.backgroundColor = "orange";
            } else if (statsValue < 125){
                hpBar.style.backgroundColor = "lightgreen";
            } else {
                hpBar.style.backgroundColor = "green";
            }
            break;
        case "attack":
            if(statsValue < 50){
                attackBar.style.backgroundColor = "red";
            } else if(statsValue < 100) {
                attackBar.style.backgroundColor = "orange";
            } else if (statsValue < 125){
                attackBar.style.backgroundColor = "lightgreen";
            } else {
                attackBar.style.backgroundColor = "green";
            }
            break; 
        case "defence":
            if(statsValue < 50){
                defenceBar.style.backgroundColor = "red";
            } else if(statsValue < 100) {
                defenceBar.style.backgroundColor = "orange";
            } else if (statsValue < 125){
                defenceBar.style.backgroundColor = "lightgreen";
            } else {
                defenceBar.style.backgroundColor = "green";
            }
            break;
        case "spAtc":
            if(statsValue < 50){
                spAtckBar.style.backgroundColor = "red";
            } else if(statsValue < 100) {
                spAtckBar.style.backgroundColor = "orange";
            } else if (statsValue < 125){
                spAtckBar.style.backgroundColor = "lightgreen";
            } else {
                spAtckBar.style.backgroundColor = "green";
            }
            break;
        case "spDef":
            if(statsValue < 50){
                spDefBar.style.backgroundColor = "red";
            } else if(statsValue < 100) {
                spDefBar.style.backgroundColor = "orange";
            } else if (statsValue < 125){
                spDefBar.style.backgroundColor = "lightgreen";
            } else {
                spDefBar.style.backgroundColor = "green";
            }
            break;
        case "speed":
            if(statsValue < 50){
                speed.style.backgroundColor = "red";
            } else if(statsValue < 100) {
                speed.style.backgroundColor = "orange";
            } else if (statsValue < 125){
                speed.style.backgroundColor = "lightgreen";
            } else {
                speed.style.backgroundColor = "green";
            }
            break;
    }
}

function changeColorToType(type, place){
    switch(type){
        case "Normal":
            place.style.backgroundColor = "#A8A77A";
            break;
        case "Fire":
            place.style.backgroundColor = "#EE8130";
            break;
        case "Water":
            place.style.backgroundColor = "#6390F0";
            break;
        case "Electric":
            place.style.backgroundColor = "#F7D02C";
            break;
        case "Grass":
            place.style.backgroundColor = "#7AC74C";
            break;
        case "Ice":
            place.style.backgroundColor = "#96D9D6";
            break;
        case "Fighting":
            place.style.backgroundColor = "#C22E28";
            break;
        case "Poison":
            place.style.backgroundColor = "#A33EA1";
            break;
        case "Ground":
            place.style.backgroundColor = "#E2BF65";
            break;
        case "Flying":
            place.style.backgroundColor = "#A98FF3";
            break;
        case "Psychic":
            place.style.backgroundColor = "#F95587";
            break;
        case "Bug":
            place.style.backgroundColor = "#A6B91A";
            break;
        case "Rock":
            place.style.backgroundColor = "#B6A136";
            break;
        case "Ghost":
            place.style.backgroundColor = "#735797";
            break;
        case "Dragon":
            place.style.backgroundColor = "#6F35FC";
            break;
        case "Dark":
            place.style.backgroundColor = "#705746";
            break;
        case "Steel":
            place.style.backgroundColor = "#B7B7CE";
            break;
        case "Fairy":
            place.style.backgroundColor = "#D685AD";
            break;
        case "none":
            type2Box.style.display = "none";
            break;
    }
}
    