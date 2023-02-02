import React from "react";
import { data } from "../Data/Data";

const Food = () => {
  console.log(data);
  return (
    <div>
      <h1>Top Rated Menu Items</h1>
      {/* filter row */}
      <div>
        {/* filter type */}
        <div>
          <p>Filter Type</p>
          <button>All</button>
          <button>Burgers</button>
          <button>Pizza</button>
          <button>Salads</button>
          <button>Chicken</button>
        </div>
        {/* filter price */}
        <div>
          <p>Filter Type</p>
          <div>
            <button>$</button>
            <button>$$</button>
            <button>$$$</button>
            <button>$$$$</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
