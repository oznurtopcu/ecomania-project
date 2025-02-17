import { useHistory } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ChevronRight } from "lucide-react";
import ProductDetailCard from "../components/ProductDetailCard";

export default function ProductDetailPage() {
  return <p>Product Detail Page!</p>;
  let history = useHistory();
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
    <div className="container mx-auto my-8">
    </div>
  );
}
