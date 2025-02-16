import "./App.css";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";
import { Route, Switch } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";

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
      </Switch>
    </PageContent>
  );
}

export default App;
