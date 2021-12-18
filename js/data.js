document.addEventListener("DOMContentLoaded", () => {
    grabData("https://pokeapi.co/api/v2/pokemon/1", "load");
    grabData("https://pokeapi.co/api/v2/pokemon?limit=5", "navi");
    // let pokelist = document.querySelector("#pokelist");
    // pokelist.addEventListener("change", event => grabData(pokelist.options[pokelist.selectedIndex].value, "load"));
});

// function to fetch/read data using a JavaScript promise
let grabData = (url, mode) => {
    fetch(url)
    .then(response => response.json()) // convert promise data to json
    .then(data => {
        if (mode == "load")
            appendData(data);
        else
            appendNavigation(data);
    }) // take returned json data and pass it to a function
    .catch(err => console.log(err));
}

// appendData JSON data to webpage
let appendData = (data) => {
    // console.log(data.sprites);
    let pokeData = document.querySelector("#pokedata"); // create reference to element on webpage
    let pokeImg = document.querySelector("#pokeimg"); // create reference to element on webpage
    
    let unorderedList = document.createElement("ul"); // create an unordered list
    let li;

    pokeImg.innerHTML = "<img id='pokeImg' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + data.id + ".png'/>"; // add html to a div element
    
    const pokeName = data.name;
    pokeData.innerHTML = "<p>Name:&nbsp;" + capitalizeWord(data.name) + "</p><p>Abilities:</p>";
    for (eachAbility of data.abilities) {
        li = document.createElement("li");
        li.appendChild(document.createTextNode(capitalizeWord(eachAbility.ability.name)));
        unorderedList.appendChild(li);
    }

    pokeData.appendChild(unorderedList);
}

// creates navigation pane
let appendNavigation = (data) => {
    let parentPrev = document.querySelector("#prev");
    let parentNext = document.querySelector("#next");
    let pokelist = document.querySelector("#pokelist");

    parentPrev.innerHTML = "";
    parentNext.innerHTML = "";

    while (pokelist.length > 0)
        pokelist.remove(0);
    let opts;
    for (pokemon of data.results) {
        opts = document.createElement("option");
        opts.text = capitalizeWord(pokemon.name);
        opts.value = pokemon.url;
        pokelist.add(opts, null);
    }
    pokelist.addEventListener("change", event => grabData(pokelist.options[pokelist.selectedIndex].value, "load"));
    grabData(pokelist.options[pokelist.selectedIndex].value, "load");

    if (data.previous != null) {
        let prevBtn = document.createElement("a");
        prevBtn.innerHTML = "Previous";
        prevBtn.href = data.previous;
        prevBtn.classList.add("btn");
        prevBtn.classList.add("btn-info");
        parentPrev.appendChild(prevBtn);
    }

    if (data.next != null) {
        let nextBtn = document.createElement("a");
        nextBtn.innerHTML = "Next";
        nextBtn.href = data.next;
        nextBtn.classList.add("btn");
        nextBtn.classList.add("btn-info");
        // nextBtn.setAttribute("id", "nextLink");
        nextBtn.addEventListener("click", event => {
            event.preventDefault(); // prevents normal behaviour
            grabData(event.target.href, "navi");
        });
        parentNext.appendChild(nextBtn);
    }
}

// Capitalize the first letter in a word
let capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);