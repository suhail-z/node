import {products} from './products.js';
import {cart,removeFromCart} from './cart.js';
import {formatCurrency} from '../utils/currency.js';
window.onload=checkoutQuantity;
let checkoutSummaryHTML='';
cart.forEach((cartItem,index)=>{

    let match;

    products.forEach((product)=>{
        if(product.id===cartItem.id)
            match=product;
    })

    checkoutSummaryHTML += `<div class="cart-item-container js-checkout-product${match.id}">
        <div class="delivery-date">
            Delivery date: Wednesday, June 15
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${match.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${match.name}
            </div>
            <div class="product-price">
                $${formatCurrency(match.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                
                <span class="link-primary update-link js-update-${match.id}" data-product-id="${match.id}">
                Update
                </span>
                <input class=" update-input update-input-${match.id}" type="number" data-product-id="${match.id}">
                <span class="link-primary save-link js-save-${match.id}" data-product-id="${match.id}">save</span>
                
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${match.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>

            <div class="delivery-option">
                <input type="radio" class="delivery-option-input"
                name="delivery-option-${index}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input"
                name="delivery-option-${index}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input"
                name="delivery-option-${index}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `

})
document.querySelector('.order-summary').innerHTML=checkoutSummaryHTML;

document.querySelectorAll('.js-delete-link')
.forEach((deleteLink)=>{
    deleteLink.addEventListener('click',()=>{
        console.log(deleteLink.dataset.productId);

        removeFromCart(deleteLink.dataset.productId);
        deleteFromCart(deleteLink.dataset.productId);
        checkoutQuantity();

    })
})
function deleteFromCart(productId){
document.querySelector(`.js-checkout-product${productId}`).remove();
}


function checkoutQuantity(){
    let cartQuantity=0;
   cart.forEach(item=>{
     cartQuantity += item.quantity;
   })
   document.querySelector('.return-to-home-link').innerHTML=cartQuantity;
 }

 document.querySelectorAll('.update-link')
.forEach( updateLink =>{
    updateLink.addEventListener('click',()=>{
        document.querySelector(`.js-update-${updateLink.dataset.productId}`)
        .style.display='none';

        document.querySelector(`.update-input-${updateLink.dataset.productId}`)
        .style.display='inline-block';

        document.querySelector(`.js-save-${updateLink.dataset.productId}`)
        .style.display='inline-block';
    })
});

document.querySelectorAll('.save-link').
forEach(saveLink => {
    saveLink.addEventListener('click',()=>{
        document.querySelector(`.js-update-${saveLink.dataset.productId}`).style.display='inline-block';

        document.querySelector(`.update-input-${saveLink.dataset.productId}`).style.display='none';

        document.querySelector(`.js-save-${saveLink.dataset.productId}`).style.display='none';

        let quantity = Number(document.querySelector(`.update-input-${saveLink.dataset.productId}`).value);

         cart.forEach(cartItem=>{
            if(cartItem.id === saveLink.dataset.productId)
                {cartItem.quantity = quantity;
                 return;}
                
                });
        localStorage.setItem('cart',JSON.stringify(cart));
        console.log(cart);
        location.reload();
    })
})