import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const toggleMenu = () => {
    setIsClicked(!isClicked);
  };
  return (
    <header className="container mx-auto font-montserrat">
      <div className="flex justify-between items-center m-8 text-3xl text-[#737373]">
        <img
          className="w-48"
          src="https://img.logoipsum.com/348.svg"
          alt="logo"
        />
        <nav className="hidden">
          <a href="#">Home</a>
          <a href="#">Product</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </nav>
        <div className="flex gap-3">
          <User />
          <Search />
          <ShoppingCart />
          <button onClick={toggleMenu}>{isClicked ? <X /> : <Menu />}</button>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out transform ${
          isClicked
            ? "translate-y-0 opacity-100 max-h-[500px]"
            : "-translate-y-10 opacity-0 max-h-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 my-12 text-3xl text-[#737373]">
          <a href="#">Home</a>
          <a href="#">Product</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
}
