async function getAndPopulatePokemons() {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((data) => data.json())
    .then((data) => data.results);

  const pokemonsDiv = document.getElementById("pokemons");
  data.forEach((pokemon) => {
    const pokemonButton = document.createElement("button");
    pokemonButton.classList.add("pokemon");
    pokemonButton.innerHTML = pokemon.name;
    pokemonButton.addEventListener("click", async () => {
      const pokemonData = await fetch(pokemon.url).then((data) => data.json());
      console.log(pokemonData);
      const pokedex = document.getElementById("pokedex");
      pokedex.innerHTML = `
      <div>
        <h1>${pokemonData.name}</h1>
        <img src="${pokemonData.sprites.front_default}" height="300px"></img>
        <div>${pokemonData.stats.forEach}</div>
        <div class="pokemonTypes">
            ${pokemonData.types.map((type) => {
              return `<span class="pokemonType">${type.type.name}</span>`;
            })}
        </div>
      </div>
      `;
    });
    pokemonsDiv.appendChild(pokemonButton);
  });
}

getAndPopulatePokemons();
