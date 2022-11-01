let allProducts = [];
let inputInnerText = "";
const productsDOM = document.querySelector(".products-block");
const notification = document.querySelector(".notification");
const inputBox = document.getElementById("input-box");
const allProductsBtn = document.getElementById("all-products-btn");
const justCoatsBtn = document.getElementById("just-coats-btn");
const justGoldsBtn = document.getElementById("just-golds-btn");
const justClockBtn = document.getElementById("just-clocks-btn");

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

// UI - Show products
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
// Notification
function notificationShow() {
  notification.classList.toggle("notificationShow");
  setTimeout(() => notification.classList.remove("notificationShow"), 1500);
}
// Show filtered products
function filter(value) {
  allProducts.forEach((item) => {
    if (item.class == value) showProducts([item]);
  });
}

// Buttons Listener
allProductsBtn.addEventListener("click", () => {
  productsDOM.innerHTML = "";
  inputBox.value = "";
  showProducts(allProducts);
});
justClockBtn.addEventListener("click", () => {
  productsDOM.innerHTML = "";
  notificationShow();
  filter("clock");
});
justCoatsBtn.addEventListener("click", () => {
  notificationShow();
  productsDOM.innerHTML = "";
  filter("coat");
});
justGoldsBtn.addEventListener("click", () => {
  notificationShow();
  productsDOM.innerHTML = "";
  filter("gold");
});
