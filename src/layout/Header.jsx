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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/loginActions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchCategories } from "../store/actions/categoryActions";

export default function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isDesktopShopOpen, setIsDesktopShopOpen] = useState(false); // Yeni state
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.client.user);
  const { categories } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const womenCategories = categories.filter((cat) => cat.gender === "k");
  const menCategories = categories.filter((cat) => cat.gender === "e");

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Successfully logged out!");

      history.push("/");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const toggleMenu = () => {
    setIsClicked(!isClicked);
  };

  const toggleShopMenu = () => {
    setIsShopMenuOpen(!isShopMenuOpen);
  };

  const toggleDesktopShop = () => {
    setIsDesktopShopOpen(!isDesktopShopOpen);
  };

  return (
    <header className="relative z-50">
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
          <nav className="hidden lg:flex items-center gap-8 text-base relative">
            <a href="/" className="text-[#737373] hover:text-[#252B42]">
              Home
            </a>
            {/* Shop Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 text-[#737373] hover:text-[#252B42]"
                onClick={toggleDesktopShop}
                onMouseEnter={() => setIsDesktopShopOpen(true)}
                onMouseLeave={() => setIsDesktopShopOpen(false)}
              >
                Shop
                {isDesktopShopOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Desktop Dropdown Menu */}
              <div
                className={`absolute top-full left-0 w-[500px] bg-white shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
                  isDesktopShopOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                onMouseEnter={() => setIsDesktopShopOpen(true)}
                onMouseLeave={() => setIsDesktopShopOpen(false)}
              >
                <div className="flex justify-between p-6">
                  {/* Women's Categories */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-semibold text-[#252B42] text-lg mb-2">
                      Kadın
                    </h3>
                    {womenCategories.map((category) => (
                      <a
                        key={category.id}
                        href={`/shop/kadin/${category.code.split(":")[1]}/${
                          category.id
                        }`}
                        className="text-[#737373] hover:text-[#252B42] transition-colors"
                      >
                        {category.title}
                      </a>
                    ))}
                  </div>

                  {/* Men's Categories */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-semibold text-[#252B42] text-lg mb-2">
                      Erkek
                    </h3>
                    {menCategories.map((category) => (
                      <a
                        key={category.id}
                        href={`/shop/erkek/${category.code.split(":")[1]}/${
                          category.id
                        }`}
                        className="text-[#737373] hover:text-[#252B42] transition-colors"
                      >
                        {category.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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

            {/* Shop menu with dropdown */}
            <div className="w-full">
              <button
                onClick={toggleShopMenu}
                className="flex items-center justify-center w-full text-[#737373] hover:text-[#252B42]"
              >
                Shop {isShopMenuOpen ? <ChevronUp /> : <ChevronDown />}
              </button>

              {/* Categories dropdown */}
              <div
                className={`w-full transition-all duration-300 ease-in-out ${
                  isShopMenuOpen
                    ? "max-h-[500px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex justify-between px-8 py-4 bg-gray-50">
                  {/* Women's Categories */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-[#252B42] mb-2">Kadın</h3>
                    {womenCategories.map((category) => (
                      <a
                        key={category.id}
                        href={`/shop/kadin/${category.code.split(":")[1]}/${
                          category.id
                        }`}
                        className="text-base text-[#737373] hover:text-[#252B42]"
                      >
                        {category.title}
                      </a>
                    ))}
                  </div>

                  {/* Men's Categories */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-[#252B42] mb-2">Erkek</h3>
                    {menCategories.map((category) => (
                      <a
                        key={category.id}
                        href={`/shop/erkek/${category.code.split(":")[1]}/${
                          category.id
                        }`}
                        className="text-base text-[#737373] hover:text-[#252B42]"
                      >
                        {category.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

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
