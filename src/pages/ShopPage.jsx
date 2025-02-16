import ShopCard from "../components/ShopCard";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import NewsCard from "../components/NewsCard";
import CategoryCard from "../components/CategoryCard";

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
    {
      id: 5,
      title: "UI/UX Design",
      department: "Design Department",
      originalPrice: 29.99,
      salePrice: 15.99,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 6,
      title: "Data Science",
      department: "Mathematics Department",
      originalPrice: 34.99,
      salePrice: 19.99,
      image: "https://picsum.photos/200/300",
      colors: ["#10B981", "#F43F5E", "#6366F1", "#D97706"],
    },
    {
      id: 7,
      title: "Cyber Security",
      department: "Computer Science",
      originalPrice: 39.99,
      salePrice: 22.99,
      image: "https://picsum.photos/200/300",
      colors: ["#EF4444", "#14B8A6", "#A855F7", "#6D28D9"],
    },
    {
      id: 8,
      title: "Artificial Intelligence",
      department: "Engineering Department",
      originalPrice: 45.99,
      salePrice: 25.99,
      image: "https://picsum.photos/200/300",
      colors: ["#22C55E", "#EAB308", "#3B82F6", "#F87171"],
    },
    {
      id: 9,
      title: "Machine Learning",
      department: "Mathematics Department",
      originalPrice: 42.99,
      salePrice: 23.99,
      image: "https://picsum.photos/200/300",
      colors: ["#F43F5E", "#8B5CF6", "#EC4899", "#16A34A"],
    },
    {
      id: 10,
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 11,
      title: "Web Development",
      department: "Computer Science",
      originalPrice: 24.99,
      salePrice: 12.99,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 12,
      title: "Digital Marketing",
      department: "Business Department",
      originalPrice: 19.99,
      salePrice: 9.99,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 13,
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 14,
      title: "Web Development",
      department: "Computer Science",
      originalPrice: 24.99,
      salePrice: 12.99,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 15,
      title: "Digital Marketing",
      department: "Business Department",
      originalPrice: 19.99,
      salePrice: 9.99,
      image: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
  ];

  const categories = [
    {
      title: "MEN",
      itemCount: 12,
      image: "https://picsum.photos/500/600",
    },
    {
      title: "WOMEN",
      itemCount: 15,
      image: "https://picsum.photos/500/600",
    },
    {
      title: "ACCESSORIES",
      itemCount: 8,
      image: "https://picsum.photos/500/600",
    },
    {
      title: "KIDS",
      itemCount: 10,
      image: "https://picsum.photos/500/600",
    },
    {
      title: "SHOES",
      itemCount: 16,
      image: "https://picsum.photos/500/600",
    },
  ];

  const clients = [
    {
      name: "MEN",
      image: "https://img.logoipsum.com/348.svg",
    },
    {
      name: "WOMEN",
      image: "https://img.logoipsum.com/356.svg",
    },
    {
      name: "ACCESSORIES",
      image: "https://img.logoipsum.com/350.svg",
    },
    {
      name: "KIDS",
      image: "https://img.logoipsum.com/352.svg",
    },
    {
      name: "SHOES",
      image: "https://img.logoipsum.com/354.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="page-breadcrumb flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-8 px-6 py-10 lg:mx-35">
        <h3 className="text-[#252B42] text-2xl font-bold">Shop</h3>
        <p className="flex items-center text-[#BDBDBD]">
          <span className="text-[#252B42]">Home</span>
          <ChevronRight size={16} strokeWidth={1} /> Shop{" "}
        </p>
      </div>
      <div className="shopping-cards px-4 lg:mx-35">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className="max-w-sm aspect-[1/1] lg:aspect-[3/4] my-8"
            >
              <CategoryCard
                image={category.image}
                title={category.title}
                itemCount={category.itemCount}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="product-list px-4 lg:m-35">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-bold">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <p className="text-[#737373] text-sm">Showing all 12 results</p>
            <div className="flex items-center gap-4">
              <p className="text-[#737373] text-sm">Views:</p>
              <button className="text-[#252B42] text-sm font-bold">
                <Grid3x3 />
              </button>
              <button className="text-[#737373] text-sm">
                <List />
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <select className="px-4 py-2 border border-[#DEDEDE] rounded-md text-sm text-[#737373]">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <button className="px-4 py-2 bg-[#23A6F0] text-white rounded-md text-sm">
              Filter
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
          {currentProducts.map((product, index) => (
            <div key={index} className="w-full flex justify-center my-8">
              <ProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>

      <div className="client-cards px-4 lg:mx-35">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
          {clients.map((client, index) => (
            <div key={index} className=" my-8">
              <img
                className="grayscale hover:grayscale-0 w-48"
                src={client.image}
                alt={client.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
