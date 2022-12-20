const socket = io();

const container = document.getElementById("socket__container");

const staticProducts = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "clothing",
    thumbnail: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
    code: "CAMP123",
    state: true,
    stock: 10,
  },
  {
    id: 2,
    title: "Call of Duty: Vanguard Standard Edition Activision",
    anio: 2021,
    price: 15499,
    category: "video games",
    format: "fisico",
    thumbnail: ["https://http2.mlstatic.com/D_NQ_NP_896840-MLA48556474374_122021-O.webp"],
    code: "CAMP345",
    state: true,
    stock: 12,
},
{
    id: 3,
    title: "Call of Duty: Vanguard Standard Edition Activision",
    anio: 2021,
    price: 6000,
    category: "video games",
    format: "digital",
    thumbnail: ["https://http2.mlstatic.com/D_NQ_NP_846688-MLA48556496381_122021-O.webp"],
    code: "CAMP567",
    state: true,
    stock: 15,
},
{
    id: 4,
    title: "Rocket League Collector's Edition Psyonix",
    anio: 2022,
    price: 15000,
    category: "video games",
    format: "fisico",
    thumbnail: ["https://http2.mlstatic.com/D_NQ_NP_719800-MLA51061284426_082022-O.webp"],
    code: "CAMP789",
    state: true,
    stock: 20,
},
{
  id: 5,
  title: "Call of Duty®: WWII Gold Edition",
  anio: 2023,
  price: 15000,
  category: "video games",
  format: "fisico",
  thumbnail: ["https://image.api.playstation.com/cdn/UP0002/CUSA08602_00/zu7qYQztIwUYzw2H8iArIzKhwsfdnDs9.png?w=440&thumb=false.jpg"],
  code: "CAMP1112", 
  state: true,
  stock: 20,
}
];

const printProducts = (products) => {
  container.innerHTML = "";

  products.map((product) => {
    const card = document.createElement("div");
    card.innerHTML += `
    <div class="product__container">
      <div class="product__category">
        <span>${product.category}</span>
      </div>
      <div class="product__img--container">
        <img src=${product.thumbnail} alt=${product.title} />
      </div>
      <h4 class="product__price">PRICE: $${product.price}</h4>
      <h3 class="product__title">${product.title}</h3>
      <button>add to cart</button>
    </div>`;
    container.appendChild(card);
  });
};

printProducts(staticProducts);

socket.on("products", (data) => {
  console.log("All products printed on DOM");

  printProducts(data);
});

socket.on("addProduct", (data) => {
  console.log("Product added");

  printProducts(data);
});

socket.on("deletedProduct", (data) => {
  console.log("Product deleted");

  printProducts(data);
});