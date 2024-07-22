// Get all the "Adaugă în coș" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Iterate over each button and add a click event listener
addToCartButtons.forEach((button) => {
  button.addEventListener('click', addToCartClicked);
});

// Event handler for "Adaugă în coș" button click
function addToCartClicked(event) {
  const button = event.target;
  const productCard = button.closest('.product-card');
  const productName = productCard.querySelector('.product-name').innerText;
  const productPrice = productCard.querySelector('.product-price').innerText;
  const productSizes = productCard.querySelectorAll('.product-sizes input[type="checkbox"]:checked');
  
  // Create an array to store the selected sizes
  const selectedSizes = [];
  
  // Iterate over the selected size checkboxes and add the values to the array
  productSizes.forEach((size) => {
    selectedSizes.push(size.value);
  });
  
  // Create an object to store the product details
  const product = {
    name: productName,
    price: productPrice,
    sizes: selectedSizes
  };
  
  // Dispatch the custom 'addToCart' event with the product details
  const addToCartEvent = new CustomEvent('addToCart', { detail: product });
  document.dispatchEvent(addToCartEvent);
}
