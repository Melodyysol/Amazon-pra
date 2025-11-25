  class Cart{
    cartItems;
    #localStorageKey;
    constructor(localStorageKey) {
      this.#localStorageKey = localStorageKey 
      this.#loadFromStorage()
    }

    #loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))
      if(!this.cartItems){
      this.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },{
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }]
      }
    };

    saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    };

    addToCart(productId) {

      let matchingItems;
  
      this.cartItems.forEach(cartItems => {
        if(productId === cartItems.productId){
          matchingItems = cartItems;
        }
      })
  
      if(matchingItems) {
        matchingItems.quantity += 1;
      }else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        })
      }
  
      this.saveToStorage()
    };

    removeFromCart(productId) {
      const newCart = [];
  
      this.cartItems.forEach(cartItems => {
        if(cartItems.productId !== productId){
          newCart.push(cartItems)
        }
      })
  
      this.cartItems = newCart
  
      this.saveToStorage();
    };

    updateCart(productId) {

      // carts.forEach(cartItems => {
      //   if(cartItems.productId === productId) {
      //     cartItems.quantity += 1
      //   }
      // })
  
      // saveToStorage()
    };

    saveCart(productId) {

      this.cartItems.forEach(cartItems => {
        const quantityInput = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
        if(productId === cartItems.productId){
  
          if (quantityInput >= 0) {
            cartItems.quantity = quantityInput;
          }else{
            cartItems.quantity = 0;
          }
          document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItems.quantity
          document.querySelector(`.js-quantity-input-${productId}`).value = ''
        }
      })
  
      this.saveToStorage()
    };


    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItems;
      this.cartItems.forEach(cartItems => {
        if (productId === cartItems.productId) {
          matchingItems = cartItems
        }
      })
      matchingItems.deliveryOptionId = deliveryOptionId;
      this.saveToStorage()
    };
    resetCart() {
      this.cartItems = []
      this.saveToStorage()
    }
  }
export const cart = new Cart('cart-oop')
const businessCart = new Cart('cart-business')
console.log(cart)
console.log(businessCart)

console.log(businessCart instanceof Cart)