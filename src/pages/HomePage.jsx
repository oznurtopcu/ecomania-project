import ShopCard from "../components/ShopCard";
import Slider from "../components/Slider";

export default function HomePage() {
  return (
    <div className="@container">
      <div className="slider-hero">
        <Slider />
        {/* <img src="https://placehold.co/414x753" alt="slider" /> */}
      </div>
      <div className="shopping-cards my-15">
        <div className="main-content text-center m-15">
          <h3 className="font-bold text-[#252B42]">EDITOR'S PICK</h3>
          <p>Problems trying to resolve the conflict between </p>
        </div>
        <div className="">
          <div className="main-content flex flex-col items-center gap-6 mb-6">
            <ShopCard />
            <ShopCard />
          </div>
          <div className="main-content flex flex-col items-center gap-6">
            <ShopCard />
            <ShopCard />
          </div>
        </div>
        <div className="main-content">
          <img src="https://placehold.co/324x242" alt="image-3" />
          <img src="https://placehold.co/324x242" alt="image-4" />
        </div>
      </div>
    </div>
  );
}
