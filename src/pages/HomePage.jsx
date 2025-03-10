import ShopCard from "../components/ShopCard";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import NewsCard from "../components/NewsCard";
import { useDispatch } from "react-redux";
import { fetchProductById } from "../store/actions/productActions";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const shopCardsData = [1, 2, 3, 4]; // Dummy data for ShopCard components
  const products = [
    {
      id: 1,
      name: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      price: 6.48,
      images: { url: "https://picsum.photos/200/300" },
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 2,
      name: "Web Development",
      department: "Computer Science",
      originalPrice: 24.99,
      price: 12.99,
      images: { url: "https://picsum.photos/200/300" },
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 3,
      name: "Digital Marketing",
      department: "Business Department",
      originalPrice: 19.99,
      price: 9.99,
      images: { url: "https://picsum.photos/200/300" },
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 4,
      name: "UI/UX Design",
      department: "Design Department",
      originalPrice: 29.99,
      price: 15.99,
      images: { url: "https://picsum.photos/200/300" },
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
  ];
  const news = [
    {
      isNew: true,
      image: "https://picsum.photos/200/200",
      category: "Google",
      tags: ["Trending", "New"],
      title: "Loudest à la Madison #1 (L'integral)",
      description:
        "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
    },
    {
      isNew: false,
      image: "https://picsum.photos/200/300",
      category: "Apple",
      tags: ["Technology", "Innovation"],
      title: "Apple Unveils New M1 Chip",
      description:
        "Apple's new M1 chip promises significant performance improvements and energy efficiency.",
      date: "15 March 2022",
      comments: 25,
    },
    {
      isNew: true,
      image: "https://picsum.photos/200/300",
      category: "Microsoft",
      tags: ["Cloud", "AI"],
      title: "Microsoft Azure Updates",
      description:
        "Microsoft announces new features and updates for its Azure cloud platform.",
      date: "01 June 2023",
      comments: 15,
    },
  ];

  return (
    <div className="">
      {/* Full width slider */}
      <div className="max-w-[1920px] mx-auto">
        <Slider />
      </div>

      {/* Centered content container */}
      <div className="container mx-auto px-4">
        <div className="shopping-cards my-20 mx-12 md:mx-35">
          <div className="text-center mb-12 flex flex-col gap-6 items-center">
            <h3 className="font-bold text-[#252B42] text-4xl leading-12">
              EDITOR'S PICK
            </h3>
            <p className="text-[#737373] text-xl">
              Problems trying to resolve the conflict between the two major
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

        <div className="product-cards my-20">
          <div className="text-center mb-12 flex flex-col gap-6 items-center">
            <p className="text-center text-sky-500 font-bold">
              Practice Advice
            </p>
            <h2 className="font-bold text-[#252B42] text-4xl leading-12">
              Featured Products
            </h2>
            <p className="text-[#737373] text-xl">
              Problems trying to resolve the conflict between the two major
            </p>
          </div>
          <div className="flex md:flex-row flex-col items-center justify-center gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  dispatch(fetchProductById(product.id));
                  const productNameSlug = product.name
                    .toLowerCase()
                    .replace(/ /g, "-");
                  history.push(
                    `/shop/all/featured/0/${productNameSlug}/${product.id}`
                  );
                }}
              >
                <ProductCard key={product.id} product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full width slider */}
      <div className="max-w-[1920px] mx-auto">
        <Slider />
      </div>

      {/* Centered content container */}
      <div className="container mx-auto px-4">
        <div className="fluid-content my-20 md:mx-35">
          <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-6">
            <div className="text-center md:text-left m-15 flex flex-col gap-6 items-center md:items-start">
              <p className="text-center md:text-left text-[#BDBDBD] m-12 font-bold">
                SUMMER 2020
              </p>
              <h2 className="font-bold text-[#252B42] text-4xl leading-12">
                Part of the <br className="md:hidden" /> Neural{" "}
                <br className="md:hidden" />
                Universe
              </h2>
              <p className="text-center md:text-left text-[#737373] text-xl">
                We know how large <br className="md:hidden" /> objects will act,
                but <br className="md:hidden" /> things on a small scale.
              </p>
              <div className="flex flex-col justify-center md:flex-row md:justify-start gap-4">
                <button className="bg-sky-500 text-white rounded-sm px-10 py-4 font-bold">
                  BUY NOW
                </button>
                <button className="text-sky-500 bg-white rounded-sm px-10 py-4 font-bold border-sky-500 border-1">
                  Learn More
                </button>
              </div>
            </div>
            <img
              className="aspect-[1/1] object-cover md:w-[45%] my-20"
              src="https://picsum.photos/800/300"
              alt="banner"
            />
          </div>
        </div>

        <div className="news-content my-20 mx-12 md:mx-35">
          <div className="text-center mb-12 flex flex-col gap-6 items-center">
            <p className="text-center text-sky-500 font-bold">
              Practice Advice
            </p>
            <h2 className="font-bold text-[#252B42] text-4xl leading-12">
              Featured Products
            </h2>
            <p className="text-[#737373] text-xl">
              Problems trying to resolve the conflict between the two major
            </p>
          </div>
          <div className="product-cards flex md:flex-row flex-col items-stretch justify-between gap-4">
            {news.map((newsItem) => (
              <NewsCard
                key={newsItem.title}
                news={newsItem}
                className="md:w-1/3"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
