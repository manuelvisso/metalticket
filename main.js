const cardsContainer = document.querySelector(".cards-container");
const generoSelector = document.querySelector("#genero");
const ciudadSelector = document.querySelector("#ciudad");
const recintoSelector = document.querySelector("#recinto");
const listSelector = document.querySelectorAll(".list-selector");

const renderCardShow = (show) => {
  const { artista, fecha, precio, img } = show;

  return `
  <article class="card-show">
    <div class="card-data-img">
        <img src="${img}" alt="" />
    </div>
    <div class="card-data-info">
        <div class="card-data-info-text">
        <p class="card-show-title">${artista}</p>
        <p class="card-show-date">${fecha}</p>
        <p class="card-show-price">$ ${precio}</p>
        </div>
        <div class="card-btn-container">
        <button type="button" class="card-data-info-btn">
            Comprar
        </button>
        </div>
        </div>
    </article>`;
};

const filtrarPorGenero = (genero) => {
  const filtrarShows = catalogoEventos.filter((el) => el.genero === genero);

  if (filtrarShows.length > 0) {
    cardsContainer.innerHTML = filtrarShows.map(renderCardShow).join("");
  } else {
    console.log("error");
  }
};

const optionValue = () => {
  var selecetedOption = generoSelector.options[generoSelector.selectedIndex];
  filtrarPorGenero(selecetedOption.text);
};

const optionSelection = () => {
  generoSelector.addEventListener("change", optionValue);
  //   ciudadSelector.addEventListener("change", optionValue);
  //   recintoSelector.addEventListener("change", optionValue);
};

const init = () => {
  initialRender();
  optionSelection();
};

init();
