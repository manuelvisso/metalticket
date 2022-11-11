const cardsContainer = document.querySelector(".cards-container");
const generoSelector = document.querySelector("#genero");
const ciudadSelector = document.querySelector("#ciudad");
const recintoSelector = document.querySelector("#recinto");
const listSelector = document.querySelectorAll(".list-selector");

const renderCardShow = (show) => {
  const { artista, fecha, precio, img, ciudad } = show;

  return `
  <article class="card-show">
    <div class="card-data-img">
        <img src="${img}" alt="" />
    </div>
    <div class="card-data-info">
        <div class="card-data-info-text">
        <p class="card-show-title">${artista}</p>
        <p class="card-show-ciudad">${ciudad}</p>
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

const renderErrorMsg = () => {
  cardsContainer.innerHTML = `
  <article class="error-msg">
    <h3>No se encuentran resultados para la busqueda realizada.</h3>
    <h4>Por favor, intente una nueva busqueda</h4>
  </article>
    `;
};

const filterResults = (genero, ciudad, recinto) => {
  const filterSelected = catalogoEventos.filter(
    (el) =>
      el.genero.includes(genero) &&
      el.ciudad.includes(ciudad) &&
      el.recinto.includes(recinto)
  );

  console.log(filterSelected);

  if (filterSelected.length > 0) {
    cardsContainer.innerHTML = filterSelected.map(renderCardShow).join("");
    return;
  } else {
    renderErrorMsg();
  }
};

const filterSelection = () => {
  const selectedOption = [
    generoSelector.options[generoSelector.selectedIndex].value,
    ciudadSelector.options[ciudadSelector.selectedIndex].value,
    recintoSelector.options[recintoSelector.selectedIndex].value,
  ];

  filterResults(selectedOption[0], selectedOption[1], selectedOption[2]);
};

const init = () => {
  initialRender();
  generoSelector.addEventListener("change", filterSelection);
  ciudadSelector.addEventListener("change", filterSelection);
  recintoSelector.addEventListener("change", filterSelection);
};

init();
