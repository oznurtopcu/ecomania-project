import ProductCard from "../components/ProductCard";
import { ChevronRight, Grid3x3, List } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilter,
  setSort,
  setOffset,
} from "../store/actions/productActions";

const clients = [
  {
    name: "LOGOIPSUM",
    image: "https://img.logoipsum.com/348.svg",
  },
  {
    name: "LOGOIPSUM",
    image: "https://img.logoipsum.com/356.svg",
  },
  {
    name: "LOGOIPSUM",
    image: "https://img.logoipsum.com/350.svg",
  },
  {
    name: "LOGOIPSUM",
    image: "https://img.logoipsum.com/352.svg",
  },
  {
    name: "LOGOIPSUM",
    image: "https://img.logoipsum.com/354.svg",
  },
];

export default function ShopPage() {
  let history = useHistory();
  let params = useParams();

  const dispatch = useDispatch();
  const {
    categories,
    productList,
    total,
    fetchState,
    filter,
    sort,
    offset,
    limit,
  } = useSelector((state) => state.product);
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const [searchInput, setSearchInput] = useState("");
  const currentPage = Math.floor(offset / limit) + 1;

  useEffect(() => {
    dispatch(fetchProducts(params.categoryId));
  }, [dispatch, params.categoryId, filter, sort, offset, limit]);

  const handlePageChange = (page) => {
    const newOffset = (page - 1) * limit;
    dispatch(setOffset(newOffset));
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
              {/* TODO: Filtreleme işleminde her seferinde sayfa yenileniyor. Bunu engellemek gerekiyor. */}
              <button
                className="px-4 py-2 bg-[#23A6F0] text-white rounded-r-md text-sm"
                onClick={() => {
                  dispatch(setOffset(0));
                  dispatch(setFilter(searchInput));
                }}
              >
                Filter
              </button>
            </div>
            <select
              className="px-4 py-2 border border-[#DEDEDE] rounded-md text-sm text-[#737373]"
              value={sort}
              onChange={(e) => {
                dispatch(setOffset(0));
                dispatch(setSort(e.target.value));
              }}
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
              {productList?.map((product, index) => (
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
            <Pagination
              totalItems={total}
              itemsPerPage={limit}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
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
