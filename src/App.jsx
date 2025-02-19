import "./App.css";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";
import { Route, Switch } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <PageContent>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/shop/product">
          <ProductDetailPage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </PageContent>
  );
}

export default App;
