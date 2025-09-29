import React from "react";
import "./ExploreType.css";
import { type_list } from "../../assets/assets";

const ExploreType = ({ category, setCategory }) => {
  return (
    <div className="explore-type" id="explore-type">
      <h1>Explore our types</h1>
      <p className="explore-type-text">
        Choose from a diverse menu featuring a diverse array of medicines.
        Our mission is to provide trusted and reliable options for your healthcare needs.
      </p>

      <div className="explore-menu">
        {type_list.map((item, index) => (
          <div
            key={index}
            className={`explore-type-card ${category === item.type_name ? "active" : ""}`}
            onClick={() =>
              setCategory(prev => prev === item.type_name ? "All" : item.type_name)
            }
          >
            <img
              src={item.type_image}
              alt={item.type_name}
            />
            <p>{item.type_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreType;
