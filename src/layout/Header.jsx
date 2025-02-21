import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Heart,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import UserMenu from "../components/UserMenu";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/loginActions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.client.user);
  console.log(user);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Successfully logged out!");

      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  const toggleMenu = () => {
    setIsClicked(!isClicked);
  };
  return (
    <header>
      {/* Top navy blue header */}
      <div className="bg-[#252B42] text-white">
        <div className="container mx-auto px-6 py-3 hidden lg:flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">(225) 555-0118</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">michelle.rivera@example.com</span>
            </div>
          </div>
          <p className="text-sm">Follow Us and get a chance to win 80% off</p>
          <div className="flex items-center gap-2">
            <span className="text-sm">Follow Us :</span>
            <div className="flex items-center gap-3">
              {/* Sosyal medya ikonları buraya eklenebilir */}
              <Youtube />
              <Facebook />
              <Instagram />
              <Twitter />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto font-montserrat">
        <div className="flex justify-between items-center p-6 text-3xl text-[#737373]">
          <img
            className="w-36"
            src="https://img.logoipsum.com/348.svg"
            alt="logo"
          />
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-base">
            <a href="/" className="text-[#737373] hover:text-[#252B42]">
              Home
            </a>
            <a href="/shop" className="text-[#737373] hover:text-[#252B42]">
              Shop
            </a>
            <a href="#" className="text-[#737373] hover:text-[#252B42]">
              About
            </a>
            <a href="#" className="text-[#737373] hover:text-[#252B42]">
              Blog
            </a>
            <a href="#" className="text-[#737373] hover:text-[#252B42]">
              Contact
            </a>
            <a href="#" className="text-[#23A6F0]">
              Pages
            </a>
          </nav>
          <div className="flex items-center">
            <UserMenu />
          </div>
          {/* Icons */}
          <div className="flex gap-3">
            <div className="hidden lg:flex items-center gap-2 text-[#23A6F0]">
              <User />
              {user?.name ? (
                <button
                  onClick={handleLogout}
                  className="text-base hover:text-[#252B42] transition-colors"
                >
                  Logout
                </button>
              ) : (
                <a
                  href="/login"
                  className="text-base hover:text-[#252B42] transition-colors"
                >
                  Login / Register
                </a>
              )}
            </div>
            <div className="hidden lg:flex items-center gap-4 text-[#23A6F0]">
              <Search />
              <div className="flex items-center gap-2">
                <ShoppingCart />
                <span className="text-base">1</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart />
                <span className="text-base">1</span>
              </div>
            </div>
            {/* Mobile Menu Button - Only visible on mobile */}
            <button className="lg:hidden" onClick={toggleMenu}>
              {isClicked ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu - Only visible on mobile */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out transform ${
            isClicked
              ? "translate-y-0 opacity-100 max-h-[500px]"
              : "-translate-y-10 opacity-0 max-h-0"
          }`}
        >
          <nav className="flex flex-col items-center gap-8 my-12 text-xl text-[#737373]">
            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Pages</a>
            <a className="flex text-sky-500" href="/login">
              {" "}
              <User /> Login / Register
            </a>
            <a className="text-sky-500" href="#">
              {" "}
              <Search />{" "}
            </a>
            <a className="text-sky-500" href="#">
              {" "}
              <ShoppingCart />{" "}
            </a>
            <a className="text-sky-500" href="#">
              {" "}
              <Heart />{" "}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
