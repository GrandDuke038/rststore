export const updateCart = (state) => {
  //calculate items prices
  state.itemsPrice = state.cartItems
    .reduce((acc, currVal) => acc + currVal.price * currVal.qty, 0)
    .toFixed(2);
  //calculate shipping price
  state.shippingPrice = (+state.itemsPrice > 5000 ? 0 : 2000).toFixed(2);

  //calculate tax price
  state.taxPrice = (0.18 * state.itemsPrice).toFixed(2);

  //calculate total price
  state.totalPrice = (
    +state.itemsPrice +
    +state.shippingPrice +
    +state.taxPrice
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
