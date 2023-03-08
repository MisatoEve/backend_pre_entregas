//▼Agregar productos desde el front
const addToCartBtn = document.getElementById("addProduct__btn");
const pid = addToCartBtn.value;
const cart_id = document.getElementById("cart_id").value;

console.log(cart_id); //►Ver que llega desde el front

const addToCart = async (cid, pid) => {
  console.log("cart", cid); //►porque el cart_id llega undefined
  try {
    const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.status === "succes") {
      alert("Producto agregado correctamente");
    }
  } catch (error) {
    console.log(error);
  }
};

addToCartBtn.addEventListener("click", () => {
  addToCart(cart_id, pid);
});