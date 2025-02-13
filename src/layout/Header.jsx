import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const toggleMenu = () => {
    setIsClicked(!isClicked);
  };
  return (
    <header className="container">
      <div className="flex justify-between items-center mx-8 my-4 text-3xl text-[#737373]">
        <img src="https://placehold.co/187x58" alt="logo" />
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
      {isClicked && (
        <nav className="flex flex-col items-center gap-8 mx-8 my-8 text-3xl text-[#737373]">
          <a href="#">Home</a>
          <a href="#">Product</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </nav>
      )}
    </header>
  );
}
