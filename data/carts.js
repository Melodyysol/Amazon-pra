  
  export let carts;

  loadFromStorage()

  export function loadFromStorage() {
    carts = JSON.parse(localStorage.getItem('cart'))
    if(!carts){
     carts = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }]
    }
  }

  function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(carts))
  }

  export function addToCart(productId) {

    let matchingItems;

    carts.forEach(cartItem => {
      if(productId === cartItem.productId){
        matchingItems = cartItem;
      }
    })

    if(matchingItems) {
      matchingItems.quantity += 1;
    }else {
      carts.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      })
    }

    saveToStorage()

  }

  export function removeFromCart(productId) {
    const newCart = [];

    carts.forEach(cartItem => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem)
      }
    })

    carts = newCart

    saveToStorage();
  }


  export function updateCart(productId) {

    // carts.forEach(cartItem => {
    //   if(cartItem.productId === productId) {
    //     cartItem.quantity += 1
    //   }
    // })

    // saveToStorage()
  }

  export function saveCart(productId) {

    carts.forEach(cartItem => {
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

    saveToStorage()
  }

  export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItems;
    carts.forEach(cartItem => {
      if (productId === cartItem.productId) {
        matchingItems = cartItem
      }
    })
    matchingItems.deliveryOptionId = deliveryOptionId;
    saveToStorage()
  }

  export function resetCart() {
    carts = []
    saveToStorage()
  }

  export function loadCarts(fun) {
    const xhr = new XMLHttpRequest()
  
    xhr.addEventListener('load', () => {
      console.log(xhr.response)
      fun()
    })
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send()
  }