import React from "react";
import { categories } from "../Data/Data";

const Category = () => {
  //   console.log(data);
  return (
    <div className="max-w-[1640px] px-4 py-12 m-auto ">
      <h1 className="text-orange-600 font-bold text-4xl text-center">
        Top Rated Menu Items
      </h1>
      {/* Category */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
        {categories.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:scale-105 duration-300 ease-in-out"
            >
              <h2 className="font-bold sm:text-xl">{item.name}</h2>
              <img
                src={item.image}
                alt={item.name}
                className="w-20 object-cover    "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
