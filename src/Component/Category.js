import React from "react";
import { categories } from "../Data/Data";

const Category = () => {
  //   console.log(data);
  return (
    <div>
      <h1>Top Rated Menu Items</h1>
      {/* Category */}
      <div>
        {categories.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item.name}</h2>
              <img src={item.image} alt={item.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
