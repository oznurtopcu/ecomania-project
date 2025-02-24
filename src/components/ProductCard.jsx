import React from "react";

export default function ProductCard({ product }) {
  // const { title, department, originalPrice, salePrice, image, colors } =
  //   product;
  const {
    category_id,
    description,
    id,
    images,
    name,
    price,
    rating,
    sell_count,
    stock,
    store_id,
  } = product;

  const colors = ["#3B82F6", "#F97316", "#6B7280", "#1F2937"];

  return (
    <div className="w-64 bg-white shadow-sm text-center">
      {/* Product Image */}
      <div className="relative aspect-[3/4] mb-4">
        <img
          src={images[0].url}
          alt={name}
          className="w-full h-full object-cover "
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2 ">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        {/* <p className="text-sm text-gray-600">{description}</p> */}

        {/* Price Section */}
        <div className="flex justify-center items-center space-x-2 ">
          <span className="text-lg font-bold text-green-600">${price}</span>
          <span className="text-sm text-gray-400 line-through">${price}</span>
        </div>

        {/* Color Options */}
        <div className="flex justify-center space-x-2 my-3">
          {colors.map((color, index) => (
            <button
              key={index}
              className="w-4 h-4 rounded-full border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              aria-label={`Color option ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
