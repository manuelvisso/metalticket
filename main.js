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
// const addItemBtn = document.querySelectorAll(".add-ticket-btn");
const comprarBtn = document.querySelector(".cart-comprar-btn");
const cartSubtotal = document.querySelector(".cart-subtotal");
const cartServiceCharge = document.querySelector(".cart-service-charge");
const cartTotal = document.querySelector(".cart-total");
const cartPoint = document.querySelector(".cart-qty-container");
// const qtyControlContainer = document.querySelector(".qty-container");
const cartBtnRestar = document.querySelector(".btn-menos");
const cartBtnSumar = document.querySelector(".btn-mas");
const cartBtnDelete = document.querySelector(".cart-btn-delete");
const cartItemQty = document.querySelector(".cart-item-qty");
const navbarList = document.querySelector(".navbar-ul");
const navbarIcon = document.querySelector(".menu-icon");
const filterIcon = document.querySelector(".filter-icon");
const filterField = document.querySelector(".filter-selection");
const loader = document.querySelector("loader");

// SWAL FIRE

const successAddMsg = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Se agregó un producto al carrito",
    showConfirmButton: false,
    timer: 1500,
    background: "#000",
    color: "#fff",
  });
};

const successBuyMsg = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Su compra se realizó con éxito",
    showConfirmButton: true,
    confirmButtonColor: "#ffbe5c",
    background: "#000",
    color: "#fff",
    timer: 0,
  });
};

// LOADER

const executeLoader = () => {
  cardsContainer.innerHTML = `<span class="loader"></span>`;
};

// SETEO LOCAL STORAGE

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

// MENU HAMBURGUESA

const toggleMenu = () => {
  navbarList.classList.toggle("open-menu");
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
        <button type="button" class="card-data-info-btn add-ticket-btn" data-id="${id}" data-img=${img} data-artista="${artista}" data-ciudad="${ciudad}" data-fecha="${fecha}" data-precio="${precio}">
            Comprar
        </button>
        </div>
        </div>
    </article>`;
};

const renderErrorMsg = () => {
  setTimeout(() => {
    cardsContainer.innerHTML = `
    <article class="error-msg">
      <h3 class="error-msg-text">No se encuentran resultados para la busqueda realizada.</h3>
      <h4 class="error-msg-text">Por favor, intente una nueva busqueda</h4>
    </article>
      `;
  }, 500);
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
  executeLoader();
  setTimeout(() => {
    filterResults(selectedOption[0], selectedOption[1], selectedOption[2]);
  }, 1000);
};

const deleteFilter = () => {
  generoSelector.value = "";
  ciudadSelector.value = "";
  recintoSelector.value = "";
  initialRender();
};

const toggleFilter = () => {
  filterField.classList.toggle("open-menu");
};

const applyFilter = () => {
  generoSelector.addEventListener("change", filterSelection);
  ciudadSelector.addEventListener("change", filterSelection);
  recintoSelector.addEventListener("change", filterSelection);
};

// MANEJO DEL CARRITO

const updaterCart = () => {
  saveLocalStorage(cart);
  cartBtnStatus();
  renderCart(cart);
  renderCartValues();
  renderCartPoint();
  renderCartValues();
  renderCartItemQty();
};

const showCart = () => {
  if ((cartContainer.style.visibility = "hidden")) {
    cartContainer.style.visibility = "visible";
    overlay.style.visibility = "visible";
    body.style.overflow = "hidden";
  }

  if (navbarList.classList.contains("open-menu")) {
    toggleMenu();
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
        <img class="cart-btn-delete" data-id=${id} src="/assets/icons/bin.png"/>
    <div class="cart-img-container">
        <img src=${img} alt="" srcset="" />
    </div>
    <div class="render-cart-card">
        <div class="card-data-info-text">
            <p class="card-show-title">${artista}</p>
            <p class="card-show-ciudad">${ciudad}</p>
            <p class="card-show-date">${fecha}</p>
            <div class="qty-container">
              <img class="btn-menos" data-id=${id} src="/assets/icons/boton-menos.png"/>
              <p class="qty-text">${cantidad}</p>
              <img class="btn-mas" data-id=${id} src="/assets/icons/boton-mas.png"/>
            </div>
        </div>
    </div>
    <div>
        <p class="card-show-price">ARS ${precio}</p>
    </div>
    </article>
  `;
};

const renderCartPoint = () => {
  if (!cart.length) {
    cartPoint.style.visibility = "hidden";
  } else {
    cartPoint.style.visibility = "visible";
  }
};

const renderCartItemQty = () => {
  const cartQty = cart.length;
  cartItemQty.innerHTML = `${cartQty}`;
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
  if (!e.target.classList.contains("add-ticket-btn")) return;
  const { id, artista, img, ciudad, precio, fecha } = e.target.dataset;

  const item = itemData(id, artista, img, ciudad, precio, fecha);

  if (checkItem(item)) {
    sumItem(item);
  } else {
    sumNewItem(item);
  }
  successAddMsg();
  updaterCart();
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
  cartSubtotal.innerHTML = `ARS ${cartSubtotalAmount().toFixed(2)}`;
  cartServiceCharge.innerHTML = `ARS ${cartServiceChargesAmount().toFixed(2)}`;
  cartTotal.innerHTML = `ARS ${cartTotalAmount().toFixed(2)}`;
};

// MANEJO DE CANTIDADES Y VACIADO DEL CARRITO

const restarQtyEntradas = (id) => {
  const cartItemSelected = cart.find((item) => item.id === id);

  const alertDeleteMsg = () => {
    Swal.fire({
      title: "¿Desea eliminar sus entradas del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffbe5c",
      focusConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
      background: "#000",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCartItem(id);
        updaterCart();
        Swal.fire({
          title: "Eliminada!",
          text: "El carrito se ha actualizado",
          confirmButtonColor: "#ffbe5c",
          background: "#000",
          color: "#fff",
        });
      }
    });
  };

  if (cartItemSelected.cantidad === 1) {
    alertDeleteMsg();
    return;
  } else {
    cartItemSelected.cantidad -= 1;
  }
};

const sumarQtyEntradas = (id) => {
  const cartItemSelected = cart.find((item) => item.id === id);
  cartItemSelected.cantidad += 1;
};

const deleteCartItem = (id) => {
  const cartItemSelected = cart.find((item) => item.id === id);
  cart = cart.filter((item) => item.id !== cartItemSelected.id);
};

const qtyEntradas = (e) => {
  if (e.target.classList.contains("btn-menos")) {
    restarQtyEntradas(e.target.dataset.id);
  } else if (e.target.classList.contains("btn-mas")) {
    sumarQtyEntradas(e.target.dataset.id);
  } else if (e.target.classList.contains("cart-btn-delete")) {
    deleteCartItem(e.target.dataset.id);
  }
  updaterCart();
};

// FINALIZAR COMPRA

const finalizarCompra = () => {
  successBuyMsg();
  setTimeout(1000, (cart = []));
  hiddenCart();
};

const init = () => {
  initialRender();
  cartBtnStatus();
  renderCartItemQty();
  navbarIcon.addEventListener("click", toggleMenu);
  filterIcon.addEventListener("click", toggleFilter);
  applyFilter();
  deleteFilterBtn.addEventListener("click", deleteFilter);
  iconCart.addEventListener("click", showCart);
  closeCart.addEventListener("click", hiddenCart);
  cardsContainer.addEventListener("click", addItemCart);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", renderCartValues);
  document.addEventListener("DOMContentLoaded", renderCartPoint);

  cartContainer.addEventListener("click", qtyEntradas);
  comprarBtn.addEventListener("click", finalizarCompra);
};

init();
