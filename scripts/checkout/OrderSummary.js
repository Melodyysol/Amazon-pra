import {cart} from '../../data/cart-class.js';
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary(){

  let cartSummaryHtml = '';

  cart.cartItems.forEach(cartItem => {

    const productId = cartItem.productId
    const matchingProduct = getProduct(productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

    const dateString =  calculateDeliveryDate(deliveryOption)

    cartSummaryHtml += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
                Update
              </span>
              <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link
                js-save-link-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link
                js-delete-link-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>

            ${deliveryOptionHTML(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
    `
  });

  function deliveryOptionHTML(matchingProduct,cartItem) {

    let html = ''
    deliveryOptions.forEach(deliveryOption => {

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId
      
      const dateString =  calculateDeliveryDate(deliveryOption)
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `
        html += `
          <div class="delivery-option js-delivery-options
            js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
            data-product-id= "${matchingProduct.id}"
            data-delivery-option-id= "${deliveryOption.id}"
          >
            <input type="radio" class="delivery-option-input
              js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
              ${isChecked ? "checked" : ''}
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
      `
  })

  return html;
  }

  document.querySelector('.js-order-summary').
    innerHTML = cartSummaryHtml;

  updateCartQuantity()
  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.cartItems.forEach(cartItem => {
      cartQuantity += cartItem.quantity;
    })
    renderCheckoutHeader()
  }

  document.querySelectorAll('.js-delete-link').
    forEach(link => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId
        cart.removeFromCart(productId)
        const container =  document.querySelector(`
          .js-cart-item-container-${productId}`)
        container.remove();
        renderOrderSummary()
        renderPaymentSummary()
      })
    });

  document.querySelectorAll('.js-update-link').
    forEach(link => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        cart.updateCart(productId);
        const container =  document.querySelector(`
          .js-cart-item-container-${productId}`)

        container.classList.add('is-editing-quantity')

        updateCartQuantity();
      })
    });

  document.querySelectorAll('.js-save-link').
    forEach(link => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        cart.saveCart(productId)
        const container =  document.querySelector(`
          .js-cart-item-container-${productId}`)

        container.classList.remove('is-editing-quantity');
        updateCartQuantity();
        renderPaymentSummary()
      })
    });

    document.querySelectorAll('.js-delivery-options').forEach(element => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;

        cart.updateDeliveryOption(productId, deliveryOptionId)
        
        renderOrderSummary()
        renderPaymentSummary()
      })
    })

    
    // document.body.addEventListener('keydown', (event) => {
    //   if(event.key = 'Enter') {
        
    //   }
    // })
    

}