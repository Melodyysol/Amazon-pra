import { cart } from "../../data/cart-class.js";
import { renderOrderSummary } from "../../scripts/checkout/OrderSummary.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";


describe('test suite: renderOderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done()
    })
  })

  beforeEach(() => {
    spyOn(localStorage, 'setItem')
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-checkout-header"></div>
    <div class="js-payment-summary"></div>
  `;
    cart.cartItems = [{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }];

    renderOrderSummary()
  })

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  })

  it('displays the carts', () => {
  
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2)
  })
  it('remove from cart', () => {
   
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1)
    expect(cart.cartItems.length).toEqual(1)
    expect(cart.cartItems[0].productId).toEqual(productId2)
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null)
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null)
  })

  it('update the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click()
    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true)

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1)
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$63.50');
  });

  it('update the delivery option of a product in the cart', () => {
    expect(cart.cartItems.length).toEqual(2)
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })
})