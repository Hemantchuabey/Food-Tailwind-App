import React, { useState } from "react";
import { data } from "../Data/Data";

const Food = () => {
  // console.log(data);
  const [foods, setFoods] = useState(data);

  // filter type burger/pizza,etc.
  const filterType = (category) => {
    setFoods(
      data.filter((food) => {
        return food.category === category;
      })
    );
  };
  // filter by price
  const filterPrice = (price) => {
    setFoods(
      data.filter((food) => {
        return food.price === price;
      })
    );
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12 ">
      <h1 className="text-orange-600 font-bold text-4xl text-center">
        Top Rated Menu Items
      </h1>
      {/* filter row */}
      <div className="flex flex-col md:flex-row justify-between">
        {/* filter type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justify-between flex-wrap">
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 m-1">
              All
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 m-1">
              Burgers
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 m-1">
              Pizza
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 m-1">
              Salads
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 m-1">
              Chicken
            </button>
          </div>
        </div>
        {/* filter price */}
        <div>
          <p className="font-bold text-gray-700">Filter Price</p>
          <div className="flex justify-between max-w-[390px] ">
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 m-1">
              $
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 m-1">
              $$
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 m-1">
              $$$
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 m-1">
              $$$$
            </button>
          </div>
        </div>
      </div>
      {/* Display Foods */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {foods.map((food, index) => {
          return (
            <div
              key={index}
              className="border shadow-lg rounded-lg hover:scale-105 duration-300 ease-in-out"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-[200px] object-cover rounded-t-lg "
              />
              <div className="flex justify-between px-2 py-4">
                <p className="font-bold"> {food.name}</p>
                <p>
                  <span className="bg-orange-500 text-white rounded-full p-1">
                    {food.price}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Food;
