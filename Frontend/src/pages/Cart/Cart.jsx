import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../components/Context/StoreContext";
import { medicine_list } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const DELIVERY_FEE = 2;

  // ✅ Function to calculate total cart amount
  const getTotalCartAmount = () => {
    return medicine_list.reduce((total, item) => {
      if (cartItems[item._id]) {
        return total + item.price * cartItems[item._id];
      }
      return total;
    }, 0);
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {/* ✅ Show empty cart message */}
        {Object.keys(cartItems).length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Your cart is empty 🛒
          </p>
        ) : (
          medicine_list.map((item) =>
            cartItems[item._id] ? (
              <div key={item._id} className="cart-items-title cart-items-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price * cartItems[item._id]}</p>
                <p>
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </p>
              </div>
            ) : null
          )
        )}
      </div>

      <div className="cart-bottom">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-totals-item">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{grandTotal}</b>
          </div>
        </div>

        {/* ✅ Only allow checkout if cart not empty */}
        <button
          onClick={() => navigate("/placeorder")}
          disabled={subtotal === 0}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>

      <div className="cart-promocode">
        <p>If you have a promo code, enter it here</p>
        <div className="cart-promocode-input">
          <input type="text" placeholder="Promo code" />
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
