import { useEffect } from "react";
import "./App.css";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";
import { Route, Switch } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { verifyToken } from "./utils/auth";
import CreateOrderPage from "./pages/CreateOrderPage";

function App() {
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <PageContent>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
          <ProductDetailPage />
        </Route>
        <Route path="/shop/:gender/:categoryName/:categoryId">
          <ShopPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/cart">
          <ShoppingCartPage />
        </Route>
        <Route path="/create-order">
          <CreateOrderPage />
        </Route>
      </Switch>
    </PageContent>
  );
}

export default App;
