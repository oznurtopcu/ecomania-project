import ShopCard from "../components/ShopCard";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";

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
      </div>
      <div className="product-cards m-15 flex flex-col gap-4 items-center ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="slider-content">
        <Slider />
      </div>
      <div className="banner-content">
        <p className="text-center text-[#BDBDBD] mt-15 font-bold">
          SUMMER 2020
        </p>
        <div className="text-center m-15 flex flex-col gap-6 items-center">
          <h2 className="font-bold text-[#252B42] text-4xl leading-12">
            Part of the <br /> Neural <br />
            Universe
          </h2>
          <p className="text-[#737373] text-xl">
            We know how large <br /> objects will act, but <br /> things on a
            small scale.
          </p>
          <button className="bg-sky-500 text-white rounded-sm px-10 py-4 font-bold">
            BUY NOW
          </button>
          <button className="text-sky-500 bg-white rounded-sm px-10 py-4 font-bold border-sky-500 border-1">
            Learn More
          </button>
        </div>
        <img src="https://placehold.co/414x407" alt="banner" />
      </div>
    </div>
  );
}
