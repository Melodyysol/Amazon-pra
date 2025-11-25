// import { addToCart, cart.cartItems, loadFromStorage, saveCart, updateDeliveryOption } from "../../data/cart.cartItems.js";
import { renderOrderSummary } from "../../scripts/checkout/OrderSummary.js";
import {cart} from '../../data/cart-class.js';

describe('test suite: addToCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

  // beforeEach(() => {
  //   spyOn(localStorage, 'setItem')

  //     loadFromStorage();
  // })
  it('adds an existing product to the cart', () => {
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
    cart.addToCart(productId1);
    expect(cart.cartItems.length).toEqual(1)
    // expect(cart.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(2);
    // expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
    //   productId: productId1,
    //   quantity: 3,
    //   deliveryOptionId: '1'
    // },{
    //   productId: productId2,
    //   quantity: 1,
    //   deliveryOptionId: '2'
    // }]))
  });
  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');
    cart.addToCart(productId1);
    expect(cart.cartItems.length).toEqual(1)
    // expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(3)

    // expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
    //   productId: productId1,
    //   quantity: 1,
    //   deliveryOptionId: '1'
    // }]));
  })
})
/*
describe('test suite: updateDeliveryOption', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

  it('add an existing product to the cart',() => {
    spyOn(localStorage, 'setItem');
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([{
    //     productId: productId1,
    //     quantity: 1,
    //     deliveryOptionId: '1'
    //   }])
    // })

    // cart.loadFromStorage()

    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
    cart.cartItems = [];
    cart.updateDeliveryOption(productId1, '3')

    expect(cart.cartItems[0].deliveryOptionId).toEqual('3')
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
    //   productId: productId1,
    //   quantity: 1,
    //   deliveryOptionId: '3'
    // }]));
  })
});
*/

/*
describe('test suite: saveCart',() => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
  it('save quantity to the cart',() => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"></div>
   `;
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
    renderOrderSummary()
    cart.saveCart(productId1)
    // expect(
    //   document.querySelector(`.js-quantity-input-${productId1}`).value
    // ).toEqual('');

    expect(cart.cartItems[0].quantity).toEqual(0)
    document.querySelector(`.js-quantity-input-${productId1}`).value = 2;
    document.querySelector(`.js-save-link-${productId1}`).click()
    expect(cart.cartItems[0].quantity).toEqual(2)

    document.querySelector(`.js-quantity-input-${productId1}`).value = '';
    document.querySelector(`.js-save-link-${productId1}`).click()
    expect(cart.cartItems[0].quantity).toEqual(0)

    document.querySelector('.js-test-container').innerHTML = ''
  })
})
*/