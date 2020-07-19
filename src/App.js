import React from "react";
import Layout from "./hoc/Layout/Layout";
import { Route } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Orders from "./containers/Orders/Orders";
import Checkout from "./containers/Checkout/Checkout";

function App() {
  return (
    <div>
      <Layout>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
      </Layout>
    </div>
  );
}

export default App;
