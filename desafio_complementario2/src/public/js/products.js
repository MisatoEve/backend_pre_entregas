//▼Agregar productos desde el front
const addToCartBtn = document.getElementById("addProduct__btn");
const pid = addToCartBtn.value;

const addToCart = async (cid, pid) => {
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
  addToCart("63bf7c50fda56c9790a3b567", pid);
});