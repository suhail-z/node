import {cart,addToCart} from "./cart.js"
import { products } from "./products.js";
import { formatCurrency } from "../utils/currency.js";

window.onload=cartQuantityUpdate;
//products are stored in seperate js file
let HTML='';
products.forEach((product)=>{
   HTML += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $ ${formatCurrency(product.priceCents)}
    </div>

    <div class="product-quantity-container">
      <select class="product-quantity-${product.id}">
        <option value="1">1</option>
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

    <div class="product-spacer"></div>

    <div class="added-to-cart added-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`
});
document.querySelector('.products-grid').innerHTML=HTML;

//making cart button interactive
  function cartQuantityUpdate(){
     let cartQuantity=0;
    cart.forEach(item=>{
      cartQuantity += item.quantity;
    })
    document.querySelector('.cart-quantity').innerHTML=cartQuantity;
  }

document.querySelectorAll('.add-to-cart-button').forEach((cartButton)=>{
  cartButton.addEventListener('click',()=>{
    let {productId} = cartButton.dataset;
    let cancelTime;

   addToCart(productId);
 console.log(cart);
    document.querySelector(`.added-${productId}`).classList.add('added-product');

    clearTimeout(cancelTime);
    cancelTime=setTimeout(()=>{
      document.querySelector(`.added-${productId}`).classList.remove('added-product');
    },2000)

    cartQuantityUpdate();
  })
})
