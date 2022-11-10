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
        <p class="card-show-date">${fecha}</p>
        <p class="card-show-price">$ ${precio}</p>
        <p class="card-show-price">$ ${ciudad}</p>
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
    <h3>No se encuentran resultados para la busqueda realizada</h3>
    <h4>Por favor, intente una nueva busqueda</h4>
  </article>
    `;
};

const filtrarTodo = () => {
  cardsContainer.innerHTML = catalogoEventos.map(renderCardShow).join("");
};

// const applyTodo = () => {
//   optionA = generoSelector.options[generoSelector.selectedIndex];

//   if(optionA.text === "T")
// };

const filtrarPorGenero = (valor) => {
  const filtrarGenero = catalogoEventos.filter((el) =>
    el.genero.includes(valor)
  );

  if (filtrarGenero.length > 0) {
    cardsContainer.innerHTML = filtrarGenero.map(renderCardShow).join("");
    return;
  } else {
    renderErrorMsg();
  }
};

const generoSelection = () => {
  var selecetedOptionGenero =
    generoSelector.options[generoSelector.selectedIndex].text;

  if (selecetedOptionGenero !== "Todos") {
    filtrarPorGenero(selecetedOptionGenero);
  } else {
    filtrarTodo();
  }
};

const filtrarPorCiudad = (valor) => {
  const filtrarCiudad = catalogoEventos.filter((el) => el.ciudad === valor);

  if (filtrarCiudad.length > 0) {
    cardsContainer.innerHTML = filtrarCiudad.map(renderCardShow).join("");
    return;
  } else {
    renderErrorMsg();
  }
};

const ciudadSelection = () => {
  var selecetedOptionCiudad =
    ciudadSelector.options[ciudadSelector.selectedIndex];

  filtrarPorCiudad(selecetedOptionCiudad.text);
};

const filtrarPorRecinto = (valor) => {
  const filtrarRecinto = catalogoEventos.filter((el) => el.recinto === valor);

  if (filtrarRecinto.length > 0) {
    cardsContainer.innerHTML = filtrarRecinto.map(renderCardShow).join("");
    return;
  } else {
    renderErrorMsg();
  }
};

const recintoSelection = () => {
  var selecetedOptionRecinto =
    recintoSelector.options[recintoSelector.selectedIndex];

  filtrarPorRecinto(selecetedOptionRecinto.text);
};

const applySelection = () => {
  generoSelector.addEventListener("change", generoSelection);
  ciudadSelector.addEventListener("change", ciudadSelection);
  recintoSelector.addEventListener("change", recintoSelection);
};

const init = () => {
  initialRender();
  applySelection();
};

init();
