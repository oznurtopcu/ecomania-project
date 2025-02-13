export default function ShopCard() {
  return (
    <div className="max-w-sm overflow-hidden shadow-lg">
      <img
        className="w-full "
        src="https://placehold.co/324x500/orange/png"
        alt="shop-card"
      />
      <div className="relative">
        <div className="absolute bottom-0 left-0 px-6 pb-6">
          <button className="bg-white text-center py-3 px-8 font-bold text-sm">
            WOMEN
          </button>
        </div>
      </div>
    </div>
  );
}
