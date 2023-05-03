//▼Agregar productos desde el front
const addToCartBtn = document.getElementById("addProduct__btn");
const pid = addToCartBtn.value;
const cid = document.getElementById("cart_id").innerHTML;

const addToCart = async (cid, pid) => {
  try {
    const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.status === 200) {
      alert("Producto agregado correctamente");
    }
  } catch (error) {
    console.log(error);
  }
};

addToCartBtn.addEventListener("click", () => {
  addToCart(cid, pid);
});