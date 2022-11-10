const catalogoEventos = [
  {
    id: 1,
    artista: "Arch Enemy",
    fecha: "21/11/2022",
    genero: "Death Metal",
    ciudad: "Buenos Aires",
    recinto: "Teatro Flores",
    precio: 5000,
    destacado: true,
    img: "./assets/event-img/arch-enemy.jpg",
  },
  {
    id: 2,
    artista: "Opeth",
    fecha: "13/02/2023",
    genero: "Otros",
    ciudad: "Buenos Aires",
    recinto: "Teatro Flores",
    precio: 6000,
    destacado: true,
    img: "./assets/event-img/Opeth2016d.jpg",
  },
  {
    id: 3,
    artista: "Epica",
    fecha: "22/11/2022",
    genero: "Symphonic Metal",
    ciudad: "Buenos Aires",
    recinto: "Teatro Flores",
    precio: 4000,
    destacado: true,
    img: "./assets/event-img/epica.jpg",
  },
  {
    id: 4,
    artista: "Slipknot",
    fecha: "08/12/2022",
    genero: "Alternativo",
    ciudad: "Buenos Aires",
    recinto: "River Plate",
    precio: 7000,
    destacado: true,
    img: "./assets/event-img/slipknot.jpg",
  },
  {
    id: 5,
    artista: "Judas Priest",
    fecha: "09/12/2022",
    genero: "Heavy Metal",
    ciudad: "Buenos Aires",
    recinto: "River Plate",
    precio: 6500,
    destacado: true,
    img: "./assets/event-img/judas.jpg",
  },
  {
    id: 6,
    artista: "Behemoth",
    fecha: "21/11/2022",
    genero: "Black Metal",
    ciudad: "Buenos Aires",
    recinto: "Unickub",
    precio: 3000,
    destacado: false,
    img: "./assets/event-img/behemoth.jpg",
  },
  {
    id: 7,
    artista: "Carcass",
    fecha: "06/06/2023",
    genero: "Grindcore, Death Metal",
    ciudad: "Buenos Aires",
    recinto: "Uniclub",
    precio: 3500,
    destacado: false,
    img: "./assets/event-img/carcass.jpeg",
  },
  {
    id: 8,
    artista: "Rammstein",
    fecha: "08/12/2022",
    genero: "Industrial",
    ciudad: "Córdoba",
    recinto: "Fernet Club",
    precio: 8000,
    destacado: true,
    img: "./assets/event-img/rammstein.jpg",
  },
  {
    id: 9,
    artista: "AC / DC",
    fecha: "11/02/2023",
    genero: "Heavy Metal",
    ciudad: "Buenos Aires",
    recinto: "River Plate",
    precio: 10000,
    destacado: true,
    img: "./assets/event-img/acdc.jpg",
  },
  {
    id: 10,
    artista: "Kreator",
    fecha: "26/04/2023",
    genero: "Thrash Metal",
    ciudad: "Buenos Aires",
    recinto: "Luna Park",
    precio: 6000,
    destacado: false,
    img: "./assets/event-img/kreator.jpg",
  },
  {
    id: 11,
    artista: "Testament",
    fecha: "26/04/2023",
    genero: "Thrash Metal",
    ciudad: "Buenos Aires",
    recinto: "Luna Park",
    precio: 6000,
    destacado: false,
    img: "./assets/event-img/testament.jpg",
  },
  {
    id: 12,
    artista: "Kreator",
    fecha: "26/04/2023",
    genero: "Thrash Metal",
    ciudad: "Córdoba",
    recinto: "Fernet Club",
    precio: 6000,
    destacado: false,
    img: "./assets/event-img/kreator.jpg",
  },
  {
    id: 13,
    artista: "Testament",
    fecha: "26/04/2023",
    genero: "Thrash Metal",
    ciudad: "Córdoba",
    recinto: "Fernet Club",
    precio: 6000,
    destacado: false,
    img: "./assets/event-img/testament.jpg",
  },
  {
    id: 14,
    artista: "Rammstein",
    fecha: "10/12/2022",
    genero: "Industrial",
    ciudad: "Buenos Aires",
    recinto: "Luna Park",
    precio: 8000,
    destacado: true,
    img: "./assets/event-img/rammstein.jpg",
  },
  {
    id: 15,
    artista: "AC / DC",
    fecha: "12/02/2023",
    genero: "Heavy Metal",
    ciudad: "Córdoba",
    recinto: "Fernet Club",
    precio: 10000,
    destacado: true,
    img: "./assets/event-img/acdc.jpg",
  },

  {
    id: 16,
    artista: "Carcass",
    fecha: "07/06/2023",
    genero: "Grindcore, Death Metal",
    ciudad: "Córdoba",
    recinto: "Fernet Club",
    precio: 3500,
    destacado: false,
    img: "./assets/event-img/carcass.jpeg",
  },
  {
    id: 17,
    artista: "Ironmaiden",
    fecha: "12/02/2023",
    genero: "Heavy Metal",
    ciudad: "Buenos Aires",
    recinto: "Luna Park",
    precio: 6000,
    destacado: false,
    img: "./assets/event-img/ironmaiden.jpg",
  },
  {
    id: 18,
    artista: "Disturbed",
    fecha: "04/06/2023",
    genero: "Nu Metal",
    ciudad: "Buenos Aires",
    recinto: "Uniclub",
    precio: 4000,
    destacado: false,
    img: "./assets/event-img/disturbed.jpeg",
  },
  {
    id: 19,
    artista: "System of a Down",
    fecha: "25/03/2023",
    genero: "Alternativo, Nu Metal",
    ciudad: "Buenos Aires",
    recinto: "Teatro Flores",
    precio: 7000,
    destacado: false,
    img: "./assets/event-img/soad.jpg",
  },
  {
    id: 20,
    artista: "System of a Down",
    fecha: "23/03/2023",
    genero: "Alternativo, Nu Metal",
    ciudad: "Córdoba",
    recinto: "Fernet Club",
    precio: 6000,
    destacado: false,
    img: "./assets/event-img/soad.jpg",
  },
];

//renderiza los eventos destacados al cargar la página
const initialRender = () => {
  const eventosDestacados = catalogoEventos.filter(
    (el) => el.destacado === true
  );
  cardsContainer.innerHTML = eventosDestacados.map(renderCardShow).join("");
};
