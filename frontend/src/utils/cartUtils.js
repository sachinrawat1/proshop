export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //   Calculate Items Price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //   Calculate Shipping Price(If order is over $100 free , else $10 shipping)
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

  //   Calculate Tax Price(18%)
  state.taxPrice = addDecimal(Number(0.18 * state.itemsPrice).toFixed(2));

  //   Calculate Total Price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
