export default function ShopCard() {
  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg">
      <img
        className="w-full"
        src="https://placehold.co/324x500"
        alt="shop-card"
      />
      <div className="px-6 py-4 relative">
        <div className="absolute bottom-0 left-0 px-6 pb-4">
          <div className="bg-white text-center py-2 px-4 rounded-full font-bold text-sm">
            WOMEN
          </div>
        </div>
      </div>
    </div>
  );
}
