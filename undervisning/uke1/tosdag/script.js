
const output = document.getElementById("outputDiv");

function printText(){
    const input = document.getElementById("textInput").value;
    
    output.innerHTML += /*html*/`
        <li><input type="checkbox">${input}</li>
    `;
}