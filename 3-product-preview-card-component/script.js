// Elements
const productImgElem = document.querySelector("#product-image>img");
const categoryNameElem = document.getElementById("category-name");
const productNameElem = document.getElementById("product-name");
const productDescElem = document.getElementById("product-desc");
const salePriceElem = document.getElementById("sale-price");
const basePriceElem = document.getElementById("base-price");
const addToCartBtn = document.getElementsByTagName("button");

// Data
const categoryName = "perfume";
const productName = "Gabrielle Essence Eau De Parfum";
const productDesc =
  "A floral, solar and voluptuous interpretation" +
  " composed by Olivier Polge, Perfumer-Creator for the House of CHANEL.";
const salePrice = "$149.99";
const basePrice = "$169.99";
const buttonText = "Add to Cart";

// Load data into elements
function loadDataIntoElements() {
  categoryNameElem.textContent = categoryName;
  productNameElem.textContent = productName;
  productDescElem.textContent = productDesc;
  salePriceElem.textContent = salePrice;
  basePriceElem.textContent = basePrice;

  // TODO: this doesn't work
  // addToCartBtn.textContent = buttonText;
}

// Execution
loadDataIntoElements();
