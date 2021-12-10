document.addEventListener("DOMContentLoaded", () => {
    grabData("test");
});

let grabData = (url) => {
    fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
    .then(response => response.json())
    .then(data => appendData(data))
    .catch(err => console.log(err));
}

let appendData = (data) => {
    // console.log(data);
    let myDiv = document.getElementById("pokedata"); // create reference to element on webpage
    let newDiv = document.createElement("div"); // create new element from scratch
    newDiv.innerHTML = "<p>Name:&nbsp;" + data.name + "</p>"; // add content to element
    newDiv.innerHTML += "<p>Abilities:</p><ul>";
    for (eachAbility of data.abilities)
        newDiv.innerHTML += "<li>" + eachAbility.ability.name + "</li>";
    newDiv.innerHTML += "</ul>";
    myDiv.appendChild(newDiv);
}