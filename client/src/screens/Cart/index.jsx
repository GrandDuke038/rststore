import { addToCart, removeFromCart } from "@slices/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import Alert from "@components/Alert";
import Summary from "./Summary";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const handleAddToCart = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const handCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <div className="mt-8">
            <Alert type="info">
              <Link to="/" className="underline">
                Go back to home
              </Link>
            </Alert>
          </div>
        ) : (
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section className="lg:col-span-7">
              <ul className="divide-y divide-slate-200 border-b border-t border-slate-200">
                {cartItems.map((product, index) => (
                  <CartItem
                    key={product._id}
                    product={product}
                    index={index}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                ))}
              </ul>
            </section>
            {/* Order summary */}
            <Summary
              cartItems={cartItems}
              itemsPrice={cart.itemsPrice}
              shippingPrice={cart.shippingPrice}
              taxPrice={cart.taxPrice}
              totalPrice={cart.totalPrice}
              handleCheckout={handCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
