export default function ShopCard({ className }) {
  return (
    <div className={`relative w-full h-full shadow-lg ${className}`}>
      <img
        className="w-full h-full object-cover"
        src="https://picsum.photos/200/300"
        alt="shop-card"
      />
      <div className="absolute bottom-0 left-0 px-6 pb-6">
        <button className="bg-white text-center py-3 px-8 font-bold text-sm">
          WOMEN
        </button>
      </div>
    </div>
  );
}
