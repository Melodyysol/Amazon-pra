  import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
  import {renderOrderSummary} from "./checkout/OrderSummary.js"
  import { renderPaymentSummary } from "./checkout/paymentSummary.js";
  import { loadProducts, loadProductsFetch } from "../data/products.js";
  import { loadCarts } from "../data/carts.js";
  // import '../data/cart-oop.js';
  // import '../data/cart-class.js';
  // import '../data/backend-practice.js';
  // import '../data/car.js';

  async function loadPage() {
    try {
      // throw 'error1'

      await loadProductsFetch()

      const value = await new Promise((resolve, reject) => {
        // throw 'error2'
        loadCarts(() => {
          // reject('error3')
          resolve();
        })
      })

    } catch (error) {
      console.log('Unexpected error. Please try again later.');
    }

    renderOrderSummary()
    renderPaymentSummary()
    renderCheckoutHeader()
  }
  loadPage();
  /*

  Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
      loadCarts(() => {
        resolve();
      })
    })

  ]).then((values) => {
    console.log(values)
    renderOrderSummary()
    renderPaymentSummary()
    renderCheckoutHeader()
  });

  */

  
  /*
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1')
    });

  }).then((value) => {
    console.log(value)
    return new Promise((resolve) => {
      loadCarts(() => {
        resolve();
      })
    });

  }).then(() => {
    renderOrderSummary()
    renderPaymentSummary()
    renderCheckoutHeader()
  });
  */

  /*
  loadProducts(() => {
    loadCarts(() => {
      renderOrderSummary()
      renderPaymentSummary()
      renderCheckoutHeader()
    })
  })
  */