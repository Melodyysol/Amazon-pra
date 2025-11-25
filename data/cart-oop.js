  function Cart(localStorageKey) {
    
    const cart = { 
      cartItem: undefined,

      loadFromStorage() {
        this.cartItem = JSON.parse(localStorage.getItem(localStorageKey))
        if(!this.cartItem){
        this.cartItem = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
          },{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
          }]
        }
      },

      saveToStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem))
      },

      addToCart(productId) {

        let matchingItems;
    
        this.cartItem.forEach(cartItem => {
          if(productId === cartItem.productId){
            matchingItems = cartItem;
          }
        })
    
        if(matchingItems) {
          matchingItems.quantity += 1;
        }else {
          this.cartItem.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
          })
        }
    
        this.saveToStorage()
      },

      removeFromCart(productId) {
        const newCart = [];
    
        this.cartItem.forEach(cartItem => {
          if(cartItem.productId !== productId){
            newCart.push(cartItem)
          }
        })
    
        this.cartItem = newCart
    
        this.saveToStorage();
      },

      updateCart(productId) {

        // carts.forEach(cartItem => {
        //   if(cartItem.productId === productId) {
        //     cartItem.quantity += 1
        //   }
        // })
    
        // saveToStorage()
      },

      saveCart(productId) {

        this.cartItem.forEach(cartItem => {
          const quantityInput = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
          if(productId === cartItem.productId){
    
            if (quantityInput >= 0) {
              cartItem.quantity = quantityInput;
            }else{
              cartItem.quantity = 0;
            }
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItem.quantity
            document.querySelector(`.js-quantity-input-${productId}`).value = ''
          }
        })
    
        this.saveToStorage()
      },


      updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItems;
        this.cartItem.forEach(cartItem => {
          if (productId === cartItem.productId) {
            matchingItems = cartItem
          }
        })
        matchingItems.deliveryOptionId = deliveryOptionId;
        this.saveToStorage()
      }
    }
    return cart;
  }
  const cart = Cart('cart-oop')
  const businessCart = Cart('cart-business')

  cart.loadFromStorage()
  businessCart.loadFromStorage()

  console.log(cart)
  console.log(businessCart)