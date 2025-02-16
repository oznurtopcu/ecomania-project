import ShopCard from "../components/ShopCard";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import NewsCard from "../components/NewsCard";

export default function ShopPage() {
  const products = [
    {
      id: 1,
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 2,
      title: "Web Development",
      department: "Computer Science",
      originalPrice: 24.99,
      salePrice: 12.99,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 3,
      title: "Digital Marketing",
      department: "Business Department",
      originalPrice: 19.99,
      salePrice: 9.99,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 4,
      title: "UI/UX Design",
      department: "Design Department",
      originalPrice: 29.99,
      salePrice: 15.99,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
  ];

  return (
    <div className="">
      {/* Centered content container */}
      <div className="container mx-auto px-4">
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
