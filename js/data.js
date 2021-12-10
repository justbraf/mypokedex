document.addEventListener("DOMContentLoaded", () => {
    grabData("https://pokeapi.co/api/v2/pokemon/3");
});

// function to fetch/read data using a JavaScript promise
let grabData = (url) => {
    fetch(url)
    .then(response => response.json()) // convert promise data to json
    .then(data => appendData(data)) // take returned json data and pass it to a function
    .catch(err => console.log(err));
}

// appendData JSON data to webpage
let appendData = (data) => {
    // console.log(data.sprites);
    let myDiv = document.getElementById("pokedata"); // create reference to element on webpage
    let newDiv = document.createElement("div"); // create new element from scratch
    let unorderedList = document.createElement("ul"); // create an unordered list
    let li;
    newDiv.innerHTML = "<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + data.id + ".png'/><p>Name:&nbsp;" + data.name + "</p><p>Abilities:</p>"; // add html to a div element
    for (eachAbility of data.abilities) {
        li = document.createElement("li");
        li.appendChild(document.createTextNode(eachAbility.ability.name));
        unorderedList.appendChild(li);
    }
    newDiv.appendChild(unorderedList);
    myDiv.appendChild(newDiv);
}