import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./layout/Header";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";
import { Route, Switch } from "react-router-dom";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <PageContent>
      <Switch>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </PageContent>
  );
}

export default App;
