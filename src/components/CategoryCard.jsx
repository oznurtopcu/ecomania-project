import { Star } from "lucide-react";

export default function CategoryCard({ image, title, rating }) {
  return (
    <div className="relative w-full h-full group cursor-pointer">
      <div className="w-full h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-7 bg-gradient-to-t from-black/50 to-transparent">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-white/80">{rating}</p>
      </div>
    </div>
  );
}
