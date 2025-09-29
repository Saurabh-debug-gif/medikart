import React, { useContext, useRef } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/Context/StoreContext";
import { medicine_list } from "../../assets/assets";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, clearCart } = useContext(StoreContext);
  const DELIVERY_FEE = 2;

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipRef = useRef(null);
  const countryRef = useRef(null);
  const phoneRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const items = Object.entries(cartItems)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => {
          const m = medicine_list.find((x) => String(x._id) === String(id));
          return { medicineId: null, quantity: qty, price: m ? m.price : 0 };
        });

      const subtotal = getTotalCartAmount();
      const total = subtotal === 0 ? 0 : subtotal + DELIVERY_FEE;

      const customer = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        street: streetRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zip: zipRef.current.value,
        country: countryRef.current.value,
        phone: phoneRef.current.value,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer, deliveryFee: DELIVERY_FEE }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error(data);
        alert("Order failed. Please try again.");
        return;
      }

      clearCart();
      alert("Order placed successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      {/* Left side: Delivery form */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input ref={firstNameRef} type="text" placeholder="First name" required />
          <input ref={lastNameRef} type="text" placeholder="Last name" required />
        </div>

        <input ref={emailRef} type="email" placeholder="Email address" required />
        <input ref={streetRef} type="text" placeholder="Street" required />

        <div className="multi-fields">
          <input ref={cityRef} type="text" placeholder="City" required />
          <input ref={stateRef} type="text" placeholder="State" required />
        </div>

        <div className="multi-fields">
          <input ref={zipRef} type="text" placeholder="Zip code" required />
          <input ref={countryRef} type="text" placeholder="Country" required />
        </div>

        <input ref={phoneRef} type="text" placeholder="Phone number" required />
      </div>

      {/* Right side: Cart summary */}
      <div className="place-order-right">
        <div className="cart-bottom">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-totals-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : DELIVERY_FEE}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + DELIVERY_FEE}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
