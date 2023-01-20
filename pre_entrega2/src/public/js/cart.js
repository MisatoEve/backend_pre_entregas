//Eliminando productos desde front
const deleteBtns = document.querySelectorAll("#cart__product--deleteBtn");

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

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const pid = btn.value;

    deleteProduct("63c89c676f3a17ef648d57fe", pid);
    location.reload();
  });
});