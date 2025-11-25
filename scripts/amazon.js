import { cart } from "../data/cart-class.js";
import { loadProductsFetch, products } from "../data/products.js";

async function loadAmazonPage() {
  await loadProductsFetch();
  renderProductsGrid()
}
loadAmazonPage()

function renderProductsGrid(){
  let productHTML = ''
  let search = new URL(window.location.href).searchParams.get('search')
  let filterProducts = products;
  if(search){
    search = search.toLowerCase()
    filterProducts = products.filter(product => {
      // return product.name.includes(search) || product.keywords.includes(search)

      let matchingKeyWords = false;
      product.keywords.forEach(keyword => {
        if(keyword.toLowerCase().includes(search.toLowerCase())) matchingKeyWords = true;
      })

      return matchingKeyWords || product.name.includes(search.toLowerCase())
    })
  }
  
  filterProducts.forEach((product) => {
    productHTML += `
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
          src=${product.image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select js-product-quantity>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
          Add to Cart
        </button>
      </div>
    `
  })

  document.querySelector('.products-grid').innerHTML = productHTML;


  updateCartQuantity()
  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.cartItems.forEach(cartItem => {
      cartQuantity += cartItem.quantity;
    })

    document.querySelector('.js-cart-quantity').
      innerHTML = cartQuantity;
  }

  document.querySelectorAll('.js-add-to-cart').
    forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        cart.addToCart(productId);
        updateCartQuantity()
      })
    })

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      let search  = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`
    })
}