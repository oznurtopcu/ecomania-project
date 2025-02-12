import { Menu, Search, ShoppingCart } from "lucide-react";

export default function Header() {
    return(
        <header className="">
            <div className="flex justify-between items-center mx-8 my-4 text-3xl text-[#737373]">
                <img src="https://placehold.co/187x58" alt="logo" />
                <nav className="hidden">
                    <a href="#">Home</a>
                    <a href="#">Product</a>
                    <a href="#">Pricing</a>
                    <a href="#">Contact</a>
                </nav>
                <div className="flex gap-5">
                    <Search />
                    <ShoppingCart size={20} />
                    <Menu size={20} />
                </div>
            </div>
            <nav className="flex flex-col items-center gap-8 mx-8 my-8 text-3xl text-[#737373]">
                <a href="#">Home</a>
                <a href="#">Product</a>
                <a href="#">Pricing</a>
                <a href="#">Contact</a>
            </nav>
        </header>
    );
}