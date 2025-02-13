import React from "react";
import {
  Clock,
  BookOpen,
  BarChart2,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";

// Sample data
const sampleProduct = {
  image: "/api/placeholder/400/320",
  isOnSale: true,
  category: "English Departement",
  rating: 4.9,
  title: "Graphic Design",
  description:
    "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
  sales: "15",
  originalPrice: "16.48",
  salePrice: "6.48",
  duration: "22hr 30min",
  lessons: "64",
  progress: "Progress",
};

export default function ProductCard() {
  const {
    image,
    isOnSale,
    category,
    rating,
    title,
    description,
    sales,
    originalPrice,
    salePrice,
    duration,
    lessons,
    progress,
  } = sampleProduct;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Image Container */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover bg-yellow-400"
        />
        {isOnSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-sm rounded">
            Sale
          </span>
        )}
        {/* Action Buttons */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          <button className="p-2 bg-white rounded-full hover:bg-gray-100">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white rounded-full hover:bg-gray-100">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white rounded-full hover:bg-gray-100">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-500 text-sm">{category}</span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm">{rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="font-bold text-sm text-gray-500 mb-3">{sales} Sales</p>

        {/* Price */}
        <div className="mb-4">
          <span className="line-through text-gray-400 mr-2">
            ${originalPrice}
          </span>
          <span className="text-green-500 font-bold">${salePrice}</span>
        </div>

        {/* Course Details */}
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{lessons} Lessons</span>
          </div>
          <div className="flex items-center">
            <BarChart2 className="w-4 h-4 mr-1" />
            <span>Progress</span>
          </div>
        </div>

        {/* Learn More Button */}
        <button className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}
