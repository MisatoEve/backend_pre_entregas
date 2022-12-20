const socket = io();

const container = document.getElementById("socket__container");

const staticProducts = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    thumbnail: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
    code: "asd123",
    state: true,
    stock: 10,
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