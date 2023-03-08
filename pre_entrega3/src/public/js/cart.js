//▼Eliminar productos desde el front
const deleteBtns = Array.from(
  document.querySelectorAll("#cart__product--deleteBtn")
);

const deleteProduct = async (cid, pid) => {
  try {
    const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.status === "succes") {
      alert("Producto eliminado correctamente");
    }
  } catch (error) {
    console.log(error);
  }
};

const cartId = document.getElementById("purchase__btn").value;

console.log(cartId);

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const pid = btn.value;

    deleteProduct(cid, pid);
    location.reload();
  });
});

const purchaseBtn = document.getElementById("purchase__btn");

purchaseBtn.addEventListener("click", () => purchaseCart);

const purchaseCart = async (cid) => {
  try {
    const response = await fetch(`carts/${cid}/purchase`, {
      method: "POST",
    });

    const result = await response.json();

    if (result.status === "success") {
      alert(`Compra realizada con exito con el ticket n`);
    }
  } catch (error) {
    console.log(error);
  }
};