import React from "react";
import { Calendar, MessageSquare, ChevronRight } from "lucide-react";

const sampleData = {
  isNew: true,
  image: "https://placehold.co/650x480",
  category: "Google",
  tags: ["Trending", "New"],
  title: "Loudest à la Madison #1 (L'integral)",
  description:
    "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
  date: "22 April 2021",
  comments: 10,
};

const NewsCard = () => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Image Container */}
      <div className="relative">
        <img
          src={sampleData.image}
          alt="Article cover"
          className="w-full h-auto aspect-[1/1] object-cover"
        />
        {sampleData.isNew && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Categories */}
        <div className="flex gap-3 mb-3">
          <span className="text-blue-600 text-sm">{sampleData.category}</span>
          {sampleData.tags.map((tag, index) => (
            <span key={index} className="text-gray-500 text-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl mb-2">{sampleData.title}</h3>

        {/* Description */}
        <p className="text-gray-600 mb-4">{sampleData.description}</p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">{sampleData.date}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span className="text-sm">{sampleData.comments} comments</span>
          </div>
        </div>

        {/* Learn More Button */}
        <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
          Learn More
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
