import { useHistory, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductDetailCard from "../components/ProductDetailCard";
import { useEffect } from "react";
import { fetchProductById } from "../store/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetailPage() {
  let history = useHistory();
  let params = useParams();
  const dispatch = useDispatch();
  const { fetchState } = useSelector((state) => state.product);

  const products = [
    {
      id: 1,
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
      images: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 2,
      title: "Web Development",
      department: "Computer Science",
      originalPrice: 24.99,
      salePrice: 12.99,
      images: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 3,
      title: "Digital Marketing",
      department: "Business Department",
      originalPrice: 19.99,
      salePrice: 9.99,
      images: "https://picsum.photos/200/300",
      colors: ["#3B82F6", "#F97316", "#6B7280", "#1F2937"],
    },
    {
      id: 4,
      title: "UI/UX Design",
      department: "Design Department",
      originalPrice: 29.99,
      salePrice: 15.99,
      images: "https://picsum.photos/200/300",
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
  window.scrollTo(0, 0);

  useEffect(() => {
    dispatch(fetchProductById(params.productId));
  }, [dispatch, params.productId]);

  return (
    <div className="container mx-auto my-8">
      <div className="page-breadcrumb flex flex-col sm:flex-row justify-between items-center gap-8 px-6 py-10 lg:mx-35">
        <button
          onClick={() => history.goBack()}
          className="flex items-center gap-2 px-4 py-2 text-[#252B42] hover:text-[#23A6F0] transition-colors duration-200 border border-[#E8E8E8] rounded-md"
        >
          <ChevronLeft size={16} strokeWidth={1} />
          Back
        </button>
        <p className="flex items-center text-[#BDBDBD] ml-auto">
          <span className="text-[#252B42]">Home</span>
          <ChevronRight size={16} strokeWidth={1} /> Shop{" "}
        </p>
      </div>
      <div className="product-detail">
        {fetchState === "PRODUCT_NOT_FETCHED" ? (
          <div className="container mx-auto p-4 flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProductDetailCard />
        )}
      </div>
      <div className="product-description px-4 lg:mx-35 my-20">
        {/* Description Header */}
        <div className="flex justify-center p-4 gap-4 md:gap-8 font-bold text-[#737373] whitespace-nowrap">
          <p className="underline">Description</p>
          <p>Additional Information</p>
          <p>
            Reviews <span className="text-[#23856D]">{"(0)"}</span>
          </p>
        </div>

        {/* Description Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Image Column */}
          <div className="w-full h-full">
            <img
              src="https://picsum.photos/400/400"
              alt="Product Description"
              className="w-full h-full object-cover rounded-md shadow-2xl"
            />
          </div>

          {/* Text Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xl font-bold text-[#252B42]">
              the quick fox jumps over
            </h4>
            <p className="text-[#737373]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>
            <p className="text-[#737373]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>
            <p className="text-[#737373]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>
          </div>

          {/* List Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xl font-bold text-[#252B42]">
              the quick fox jumps over
            </h4>
            <div className="flex flex-col gap-2">
              <p className="text-[#737373] flex items-center gap-2">
                <ChevronRight className="text-[#23A6F0]" size={16} /> The quick
                fox jumps over the lazy dog
              </p>
              <p className="text-[#737373] flex items-center gap-2">
                <ChevronRight className="text-[#23A6F0]" size={16} /> The quick
                fox jumps over the lazy dog
              </p>
              <p className="text-[#737373] flex items-center gap-2">
                <ChevronRight className="text-[#23A6F0]" size={16} /> The quick
                fox jumps over the lazy dog
              </p>
              <p className="text-[#737373] flex items-center gap-2">
                <ChevronRight className="text-[#23A6F0]" size={16} /> The quick
                fox jumps over the lazy dog
              </p>
            </div>

            <h4 className="text-xl font-bold text-[#252B42] mt-4">
              the quick fox jumps over
            </h4>
            <div className="flex flex-col gap-2">
              <p className="text-[#737373] flex items-center gap-2">
                <ChevronRight className="text-[#23A6F0]" size={16} /> The quick
                fox jumps over the lazy dog
              </p>
              <p className="text-[#737373] flex items-center gap-2">
                <ChevronRight className="text-[#23A6F0]" size={16} /> The quick
                fox jumps over the lazy dog
              </p>
              <p className="text-[#737373] flex items-center gap-2">
                <ChevronRight className="text-[#23A6F0]" size={16} /> The quick
                fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bestseller-cards px-4 lg:mx-35">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
          {products.map((product, index) => (
            <div key={index} className="w-full flex justify-center my-8">
              <button
                onClick={() => {
                  const productNameSlug = product.title
                    .toLowerCase()
                    .replace(/ /g, "-");
                  history.push(
                    `/shop/${params.gender}/${params.categoryName}/${params.categoryId}/${productNameSlug}/${product.id}`
                  );
                }}
                className="cursor-pointer"
              >
                <ProductCard key={product.id} product={product} />
              </button>
            </div>
          ))}
        </div>
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
