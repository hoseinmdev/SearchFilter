const productsDOM = document.querySelector(".products-block");
const inputBox = document.getElementById("input-box");
const allProductsBtn = document.getElementById("all-products-btn");
const justCoatsBtn = document.getElementById("just-coats-btn");
const justGoldsBtn = document.getElementById("just-golds-btn");
const justClockBtn = document.getElementById("just-clocks-btn");
let allProducts = [];
let inputInnerText = "";

// npm install -g json-server
// json-server --watch db.json

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((response) => {
      allProducts = response.data;
      showProducts(allProducts);
    })
    .catch((error) => console.log(error));
});
inputBox.addEventListener("input", (e) => {
  productsDOM.innerHTML = "";
  inputInnerText = e.target.value;
  const searchItems = allProducts.filter((item) =>
    item.title.includes(inputInnerText)
  );
  if (searchItems.length != 0) {
    showProducts(searchItems);
  } else {
    productsDOM.innerHTML = "محصولی یافت نشد";
  }
});

function filterProducts() {
  allProductsBtn.addEventListener("click", () => {
    productsDOM.innerHTML = "";
    inputBox.value = "";
    showProducts(allProducts);
  });
  justClockBtn.addEventListener("click", () => {
    productsDOM.innerHTML = "";
    allProducts.forEach((item) => {
      if (item.class == "clock") {
        showProducts([item]);
      }
    });
  });
  justCoatsBtn.addEventListener("click", () => {
    productsDOM.innerHTML = "";
    allProducts.forEach((item) => {
      if (item.class == "coat") {
        showProducts([item]);
      }
    });
  });
  justGoldsBtn.addEventListener("click", () => {
    productsDOM.innerHTML = "";
    allProducts.forEach((item) => {
      if (item.class == "gold") {
        showProducts([item]);
      }
    });
  });
}
function showProducts(products) {
  let result = "";
  products.forEach((item) => {
    const productBlock = document.createElement("div");
    let result = `
        <div class="product-block">
            <img src="${item.imageUrl}" alt="clock">
            <h4>${item.title}</h4>
            <h5>قیمت : ${item.price.toLocaleString("en")} تومان</h5>
        </div>`;
    productBlock.innerHTML = result;
    productsDOM.appendChild(productBlock);
  });
}

filterProducts();
