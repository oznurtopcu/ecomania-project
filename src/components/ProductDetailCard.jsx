import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Eye,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/actions/shoppingCartActions";

export default function ProductDetailCard() {
  const { productDetail, fetchState } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  // ...existing code

  const handleAddToCart = () => {
    dispatch(addToCart(productDetail));
  };

  // Error state
  if (fetchState === "PRODUCT_ERROR") {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[400px]">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">
            Ürün yüklenirken bir hata oluştu
          </h2>
          <p>Lütfen daha sonra tekrar deneyin</p>
        </div>
      </div>
    );
  }

  // Safely destructure product data with default values
  const {
    name = "",
    price = "",
    stock = 0,
    description = "",
    images = [],
    rating = 0,
  } = productDetail || {};

  const colors = [
    { id: 1, name: "Blue", code: "#32AADB" },
    { id: 2, name: "Green", code: "#4CD163" },
    { id: 3, name: "Orange", code: "#EF8E48" },
    { id: 4, name: "Navy", code: "#2D3047" },
  ];
  const reviewCount = 10;

  // State variables
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Handle color selection
  const handleColorSelect = (colorId) => {
    setSelectedColor(colorId);
  };

  // Generate stars for rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-yellow-400">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:mx-35">
        {/* Product Images Section */}
        <div className="relative">
          {/* Main Image */}
          <div className="mb-4 overflow-hidden shadow-md">
            <img
              src={images[currentImage]?.url}
              alt={name}
              className="w-full aspect-[6/5] object-contain"
            />
            {/* Navigation arrows */}
            <button
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition-colors"
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
            >
              <ChevronLeft />
            </button>
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition-colors"
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
            >
              <ChevronRight />
            </button>
          </div>

          {/* Thumbnail Preview */}
          <div className="flex space-x-2">
            {images.map((img, index) => (
              <div
                key={index}
                className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                  currentImage === index
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200"
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <img
                  src={img.url}
                  alt={`thumbnail-${index}`}
                  className="w-24 h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col space-y-6 justify-start p-6">
          {/* Product Name */}
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>

          {/* Ratings */}
          <div className="flex items-center">
            <div className="flex mr-2">{renderStars()}</div>
            <span className="text-gray-600">{reviewCount} Reviews</span>
          </div>

          {/* Price */}
          <h2 className="text-3xl font-bold text-gray-900">${price}</h2>

          {/* Availability */}
          <div className="flex items-center">
            <span className="font-medium mr-2">Availability:</span>
            {stock ? (
              <span className="text-blue-500 font-medium">In Stock</span>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{description}</p>

          <div className="border-t py-4 my-2 text-gray-500"></div>

          {/* Color Options */}
          <div>
            <div className="flex space-x-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  style={{ backgroundColor: color.code }}
                  className={`w-8 h-8 rounded-full focus:outline-none transition-transform ${
                    selectedColor === color.id
                      ? "ring-2 ring-offset-2 ring-gray-800 transform scale-110"
                      : ""
                  }`}
                  onClick={() => handleColorSelect(color.id)}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 ">
              Select Options
            </button>

            <button
              className="p-2 border rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700"
              aria-label="Add to favorites"
            >
              <Heart className="w-5 h-5" />
            </button>

            <button
              className="p-2 border rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700"
              aria-label="Add to cart"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              className="p-2 border rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700"
              aria-label="Preview product"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
