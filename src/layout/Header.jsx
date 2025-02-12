import { Menu, Search, ShoppingCart } from "lucide-react";

export default function Header() {
    return(
        <header>
            <h1>BrandName</h1>
            <nav>
                <a href="#">Home</a>
                <a href="#">Product</a>
                <a href="#">Pricing</a>
                <a href="#">Contact</a>
            </nav>
            <Search />
            <ShoppingCart size={20} />
            <Menu size={20} />


        </header>
    );
}