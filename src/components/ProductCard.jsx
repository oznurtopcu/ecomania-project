import React from "react";
import { ShoppingCart } from "lucide-react"; // Import ShoppingCart icon
import { useDispatch } from "react-redux";
import { addToCart } from "../store/actions/shoppingCartActions";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
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

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-64 bg-white shadow-sm text-center group">
      {/* Product Image */}
      <div className="relative aspect-[3/4] mb-4 overflow-hidden">
        <img
          src={images[0]?.url}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2 p-4">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>

        {/* Price Section */}
        <div className="flex justify-center items-center space-x-2">
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

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
