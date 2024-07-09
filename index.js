const inputSearch = document.getElementById("inputSearch");
const affichage = document.getElementById("affichage");
let tableau = [];

async function fetchPays(search) {
  await fetch(`https://restcountries.com/v3.1/name/${search}`)
    .then((res) => res.json())
    .then((data) => (tableau = data));

  console.log(tableau);
  // return tableau;
}

const countryDisplay = () => {
  if (tableau === null) {
    // Si [] vide car user tape n'imp => on met un msg
    affichage.innerHTML = `<h2>aucun résultat</h2>`;
  }

  affichage.innerHTML = tableau
    // .slice(0, inputRange.value) renvoi un [] entre 0 et valeur du range en nombre d'éléments.
    .slice(0, inputRange.value)
    .map((pays) => {
      return `
        <li class =countries-container>
        <h2>${pays.name.common}</h2>
        <img src =${pays.flags.png}>
        <em>${pays.capital}</em>
        <p> Population : ${pays.population.toLocaleString()} hab </p>
        </li>
    `;
    })
    .join("");
};
// Ne pas oublier return avant début de la ``sinon la callback du map ne retourne pas le nouveau tableau crée avec les éléments demandés (ici à chaque élément : nom, drapeau capitale et nmbr habitants)
// toLocaleString = séparateur de milliers

//APPEL de countryDisplay() quand je tape dans l'input:
inputSearch.addEventListener("input", async (e) => {
  // Si on écrit dans l'input alors wait fetchPays à chaque fois qu'on écrit puis afficher
  await fetchPays(inputSearch.value);
  countryDisplay();
});

//TRI DECROISSANT:
maxToMin.addEventListener("click", () => {
  tableau.sort((a, b) => b.population - a.population); // Tri de la population par ordre décroissant. Pas obligé de dire "b.pays.population"
  //sort() renvoie un new [] sans modifier l'original donc il faut refaire un map pour afficher ce nouveau tableau

  affichage.innerHTML = tableau
    .slice(0, inputRange.value) // Renvoie un [] entre 0 et valeur range nmbr éléments donc limite le nombre de pays affichés
    .map((pays) => {
      return `
        <li class =countries-container>
        <h2>${pays.name.common}</h2>
        <img src =${pays.flags.png}>
        <em>${pays.capital}</em>
        <p> Population : ${pays.population.toLocaleString()} hab </p>
        </li>
    `;
    })
    .join("");
});

//TRI CROISSANT
minToMax.addEventListener("click", () => {
  tableau.sort((a, b) => a.population - b.population);

  affichage.innerHTML = tableau
    .slice(0, inputRange.value)
    .map((pays) => {
      return `
    <li class = countries-container>
    <h2>${pays.name.common}</h2>
    <img src = ${pays.flags.png}>
    <em>${pays.capital}</em>
    <p> Population: ${pays.population.toLocaleString()} hab</p>
    </li>
    `;
    })
    .join("");
});

//TRI ALPHABETIQUE (avec localeCompare:https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
alpha.addEventListener("click", () => {
  tableau.sort((a, b) => a.name.common.localeCompare(b.name.common));

  affichage.innerHTML = tableau
    .slice(0, inputRange.value)
    .map((pays) => {
      return `
  <li class = countries-container>
  <h2>${pays.name.common}</h2>
  <img src = ${pays.flags.png}>
  <em>${pays.capital}</em>
  <p> Population: ${pays.population.toLocaleString()} hab</p>
  </li>
  `;
    })
    .join("");
});

// Déclancher logique d'affichage quand je bouge le range + Relier le span et la valeur du range:
inputRange.addEventListener("input", () => {
  countryDisplay(); //APPEL de countryDisplay() quand je modifie la valeur du range
  rangeValue.textContent = inputRange.value;
});
