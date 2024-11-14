
export let cart = JSON.parse(localStorage.getItem('cart')) || [
    { id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 3 },
    { id: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 2 }
  ];


export function addToCart(productId) {
  const quantity = Number(document.querySelector(`.product-quantity-${productId}`).value);
  let matchItem;


  cart.forEach(cartItem => {
    if (cartItem.id === productId) {
      matchItem = cartItem;
    }

  });

  
  if (matchItem) {
    matchItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity
    });
  }

  
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
  
  const newCart = cart.filter(cartItem => cartItem.id !== productId);


  cart = newCart;
  localStorage.setItem('cart', JSON.stringify(cart));
}
