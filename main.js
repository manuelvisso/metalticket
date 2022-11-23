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
const addItemBtn = document.querySelectorAll(".add-ticket-btn");
const comprarBtn = document.querySelector(".cart-comprar-btn");
const cartSubtotal = document.querySelector(".cart-subtotal");
const cartServiceCharge = document.querySelector(".cart-service-charge");
const cartTotal = document.querySelector(".cart-total");

// SETEO LOCAL STORAGE

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

// FILTRADO Y RENDERIZADO DE PRODUCTOS FILTRADOS

const renderCardShow = (show) => {
  const { id, artista, fecha, precio, img, ciudad } = show;

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
        <button type="button" class="card-data-info-btn add-ticket-btn" data-id=${id} data-img=${img} data-artista=${artista} data-ciudad=${ciudad} data-fecha=${fecha} data-precio=${precio}>
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

const cartBtnStatus = () => {
  if (!cart.length) {
    comprarBtn.classList.add("btn-disabled");
    return;
  }
  comprarBtn.classList.remove("btn-disabled");
};

const renderCartItem = (cartItem) => {
  const { id, artista, fecha, precio, img, ciudad, cantidad } = cartItem;

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
                <img class="btn-menos" data-id=${id} src="/assets/boton-menos.png" alt="" srcset=""/>
                <p class="qty-text">${cantidad}</p>
                <img class="btn-mas" data-id=${id} src="/assets/boton-mas.png" alt="" srcset=""/>
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
  if (!cart.length) {
    cartCardContainer.innerHTML = `<p class="error-msg-text"">El carrito de compras está vacío</p>`;
    return;
  }
  cartCardContainer.innerHTML = cart.map(renderCartItem).join("");
};

const checkItem = (item) => {
  return cart.find((element) => element.id === item.id);
};

const sumItem = (item) => {
  cart = cart.map((cartItem) => {
    return cartItem.id === item.id
      ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
      : cartItem;
  });
};

const sumNewItem = (el) => {
  cart = [...cart, { ...el, cantidad: 1 }];
};

const addItemCart = (e) => {
  if (!e.target.classList.contains("add-ticket-btn")) {
  }
  const { id, artista, img, ciudad, precio, fecha } = e.target.dataset;

  const item = itemData(id, artista, img, ciudad, precio, fecha);

  if (checkItem(item)) {
    sumItem(item);
  } else {
    sumNewItem(item);
  }

  saveLocalStorage(cart);
  cartBtnStatus();
  renderCart(cart);
  renderCartValues();
};

const itemData = (id, artista, img, ciudad, precio, fecha) => {
  return { id, artista, img, ciudad, precio, fecha };
};

const cartSubtotalAmount = () => {
  return cart.reduce((a, b) => a + Number(b.precio) * Number(b.cantidad), 0);
};

const cartServiceChargesAmount = () => {
  return cartSubtotalAmount() * Number(0.1);
};

const cartTotalAmount = () => {
  return cartSubtotalAmount() * Number(1.1);
};

const renderCartValues = () => {
  cartSubtotal.innerHTML = `ARS ${cartSubtotalAmount()}`;
  cartServiceCharge.innerHTML = `ARS ${cartServiceChargesAmount()}`;
  cartTotal.innerHTML = `ARS ${cartTotalAmount()}`;
};

const init = () => {
  initialRender();

  generoSelector.addEventListener("change", filterSelection);
  ciudadSelector.addEventListener("change", filterSelection);
  recintoSelector.addEventListener("change", filterSelection);
  deleteFilterBtn.addEventListener("click", deleteFilter);
  iconCart.addEventListener("click", showCart);
  closeCart.addEventListener("click", hiddenCart);
  cardsContainer.addEventListener("click", addItemCart);
  document.addEventListener("DOMContentLoaded", renderCart);
  // document.addEventListener("DOMContentLoaded", getSubtotal);
  // document.addEventListener("DOMContentLoaded", getServiceCharge);
  // document.addEventListener("DOMContentLoaded", getTotal);
  document.addEventListener("DOMContentLoaded", renderCartValues);
  cartBtnStatus();
};

init();
