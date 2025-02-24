import ProductCard from "../components/ProductCard";
import { ChevronRight, Grid3x3, List } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/productActions";

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

export default function ShopPage() {
  let history = useHistory();
  let params = useParams();
  console.log("gender::::::" + params.gender);
  console.log("categoryName::::::" + params.categoryName);
  console.log("categoryId::::::" + params.categoryId);
  const dispatch = useDispatch();
  const { categories, productList, total, fetchState } = useSelector(
    (state) => state.product
  );
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchProductsWithParams = () => {
    let queryParams = {};

    if (params.categoryId) {
      queryParams.category = params.categoryId;
    }

    if (filter) {
      queryParams.filter = filter;
    }

    if (sort) {
      queryParams.sort = sort;
    }

    dispatch(fetchProducts(queryParams));
  };

  useEffect(() => {
    fetchProductsWithParams();
  }, [dispatch, params.categoryId, filter, sort]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate current products
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (fetchState === "NOT_FETCHED") {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

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
          {topCategories.map((category, index) => (
            <div
              key={index}
              className="max-w-sm aspect-[1/1] lg:aspect-[3/4] my-8"
            >
              <CategoryCard
                image={category.img}
                title={category.title}
                rating={category.rating}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="product-list px-4 lg:m-35">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-bold">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <p className="text-[#737373] text-sm">
              Showing all {productList.length} results out of {total}
            </p>
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
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="flex flex-row">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 border border-[#DEDEDE] rounded-l-md text-sm text-[#737373]"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-[#23A6F0] text-white rounded-r-md text-sm"
                onClick={() => setFilter(searchInput)}
              >
                Filter
              </button>
            </div>
            {/* TODO: Filtreleme işleminde her seferinde sayfa yenileniyor. Bunu engellemek gerekiyor. */}
            <select
              className="px-4 py-2 border border-[#DEDEDE] rounded-md text-sm text-[#737373]"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {productList.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">
              No products found in the relevant category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
            {productList.map((product, index) => (
              <div key={index} className="w-full flex justify-center my-8">
                <button
                  onClick={() => history.push("/shop/product")}
                  className="w-full cursor-pointer"
                >
                  <ProductCard key={product.id} product={product} />
                </button>
              </div>
            ))}
          </div>
        )}

        <Pagination
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
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
