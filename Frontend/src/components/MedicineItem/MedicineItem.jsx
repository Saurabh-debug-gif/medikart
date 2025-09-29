import React, { useContext } from "react";
import "./MedicineItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../components/Context/StoreContext";

const MedicineItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="medicine-item-card">
      <div className="medicine-item-img-container">
        <img className="medicine-item-img" src={image} alt={name} />

        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="medicine-item-counter">
            <button onClick={() => removeFromCart(id)}>-</button>
            <span>{cartItems[id]}</span>
            <button onClick={() => addToCart(id)}>+</button>
          </div>
        )}
      </div>

      <div className="medicine-item-details">
        <div className="medicine-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="medicine-item-desc">{description}</p>
        <p className="medicine-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default MedicineItem;
