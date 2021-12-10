document.addEventListener("DOMContentLoaded", () => {
    grabData("test");
});

let grabData = (url) => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}