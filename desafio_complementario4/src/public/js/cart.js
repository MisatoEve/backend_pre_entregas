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

    if (response.status === 200) {
      alert("Producto eliminado correctamente");
    }
  } catch (error) {
    console.log(error);
  }
};

const cid = document.getElementById("purchase__btn").value;

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const pid = btn.value;

    deleteProduct(cid, pid);
    location.reload();
  });
});

const purchaseBtn = document.getElementById("purchase__btn");

purchaseBtn.addEventListener("click", () => {
  purchaseCart(cid);
});

const purchaseCart = async (cid) => {
  try {
    const response = await fetch(`/carts/${cid}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },      
    });

    const result = await response.json();

    console.log(result);

    if (response.status === 200) {
      alert(`Compra realizada con exito con el ticket ${result.payload.code}`);
    }
  } catch (error) {
    console.log(error);
  }
};
//▲Vaciar el carrito