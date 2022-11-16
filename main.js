const cardsContainer = document.querySelector(".cards-container");
const generoSelector = document.querySelector("#genero");
const ciudadSelector = document.querySelector("#ciudad");
const recintoSelector = document.querySelector("#recinto");
const listSelector = document.querySelectorAll(".list-selector");
const deleteFilterBtn = document.querySelector(".btn-filter-bin");
const iconCart = document.querySelector(".icon-cart");
const closeCart = document.querySelector(".cart-close");
const overlay = document.querySelector(".overlay");
const cartContainer = document.querySelector(".cart-container");
const body = document.body;
const cartCardContainer = document.querySelector(".render-cart-container");

// SETEO LOCAL STORAGE

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

// FILTRADO Y RENDERIZADO DE PRODUCTOS FILTRADOS

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
        <button type="button" class="card-data-info-btn add-ticket-btn">
            Comprar
        </button>
        </div>
        </div>
    </article>`;
};

const renderErrorMsg = () => {
  cardsContainer.innerHTML = `
  <article class="error-msg">
    <h3 class="error-msg-text">No se encuentran resultados para la busqueda realizada.</h3>
    <h4 class="error-msg-text">Por favor, intente una nueva busqueda</h4>
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

const deleteFilter = () => {
  generoSelector.value = "";
  ciudadSelector.value = "";
  recintoSelector.value = "";
  initialRender();
};

// MANEJO DEL CARRITO

const showCart = () => {
  if ((cartContainer.style.visibility = "hidden")) {
    cartContainer.style.visibility = "visible";
    overlay.style.visibility = "visible";
    body.style.overflow = "hidden";
  }
};

const hiddenCart = () => {
  if ((cartContainer.style.visibility = "visible")) {
    cartContainer.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
    body.style.overflow = "visible";
  }
};

const renderCartItem = (show) => {
  const { artista, fecha, precio, img, ciudad } = show;

  return `
    <article class="cart-card">
        <img class="cart-btn-delete" src="/assets/bin.png" alt="" srcset=""/>
    <div class="cart-img-container">
        <img src="${img}" alt="" srcset="" />
    </div>
    <div class="render-cart-card">
        <div class="card-data-info-text">
            <p class="card-show-title">${artista}</p>
            <p class="card-show-ciudad">${ciudad}</p>
            <p class="card-show-date">${fecha}</p>
            <div class="qty-container">
                <img class="btn-menos" src="/assets/boton-menos.png" alt="" srcset=""/>
                <p class="qty-text">0</p>
                <img class="btn-mas" src="/assets/boton-mas.png" alt="" srcset=""/>
            </div>
        </div>
    </div>
    <div>
        <p class="card-show-price">$ ${precio}</p>
    </div>
    </article>
  `;
};

const renderCart = () => {
  if (cart.length > 0) {
    cartCardContainer.innerHTML = cart.map(renderCardShow).join("");
    return;
  } else {
    cartCardContainer.innerHTML = `<p class="error-msg-text"">El carrito de compras está vacío</p>`;
  }
};

const addItemCart = (e) => {
  if (e.target.classList.contains("add-ticket-btn")) {
    console.log("click");
  }
};

const init = () => {
  initialRender();
  generoSelector.addEventListener("change", filterSelection);
  ciudadSelector.addEventListener("change", filterSelection);
  recintoSelector.addEventListener("change", filterSelection);
  deleteFilterBtn.addEventListener("click", deleteFilter);
  iconCart.addEventListener("click", showCart);
  closeCart.addEventListener("click", hiddenCart);

  saveLocalStorage(cart);
  renderCart();
};

init();
