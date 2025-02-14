import ShopCard from "../components/ShopCard";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import NewsCard from "../components/NewsCard";

export default function HomePage() {
  const shopCardsData = [1, 2, 3, 4]; // Dummy data for ShopCard components

  return (
    <div className="">
      <div className="slider-hero">
        <Slider />
      </div>
      <div className="shopping-cards p-4">
        <div className="main-content text-center mb-8 flex flex-col gap-6 items-center">
          <h3 className="font-bold text-[#252B42] text-2xl">EDITOR'S PICK</h3>
          <p className="text-[#737373] text-lg">
            Problems trying to resolve the conflict between{" "}
          </p>
        </div>
        {/* Container - 4:2 aspect ratio container */}
        <div className="w-full aspect-[2/1] flex flex-col md:flex-row gap-4">
          {/* First card - 2x2 square */}
          <div className="w-full md:w-2/4 aspect-square">
            <ShopCard />
          </div>

          {/* Middle and right section container */}
          <div className="w-full md:w-2/4 flex flex-col md:flex-row gap-4">
            {/* Second card - 2x1 rectangle */}
            <div className="w-full md:w-2/4 aspect-[1/2] md:aspect-[1/2]">
              <ShopCard />
            </div>

            {/* Right stack container */}
            <div className="w-full md:w-2/4 flex flex-col gap-4">
              {/* Third card - 1x1 square */}
              <div className="w-full grow-1 relative overflow-hidden">
                <ShopCard className="absolute inset-0" />
              </div>
              {/* Fourth card - 1x1 square */}
              <div className="w-full grow-1 relative overflow-hidden">
                <ShopCard className="absolute inset-0" />
              </div>
            </div>
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
      <div className="fluid-content">
        <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-6">
          <div className="text-center m-15 flex flex-col gap-6 items-center">
            <p className="text-center text-[#BDBDBD] m-12 font-bold">
              SUMMER 2020
            </p>
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
          <img
            className="aspect-[1/1] object-cover w-[700px]"
            src="https://picsum.photos/200/300"
            alt="banner"
          />
        </div>
      </div>
      <div className="news-content">
        <p className="text-center text-sky-500 mt-15 font-bold">
          Practice Advice
        </p>
        <div className="text-center m-15 flex flex-col gap-6 items-center">
          <h2 className="font-bold text-[#252B42] text-4xl leading-12">
            Featured Products
          </h2>
          <p className="text-[#737373] text-xl">
            Problems trying to resolve the conflict between the two major
          </p>
        </div>
        <div className="product-cards m-15 flex flex-col gap-4 items-center ">
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </div>
    </div>
  );
}
