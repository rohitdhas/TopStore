import "./App.css";
import { useEffect } from "react";
import Login from "./Components/login";
import Home from "./Components/home";
import CreateAc from "./Components/createAc";
import Navbar from "./Components/nav";
// import Footer from "./Components/footer";
import ProductDetails from "./Components/productDetails";
import SearchPage from "./Components/searchPage";
import Cart from "./Components/cart";
import Explore from "./Components/explore";
import AddProduct from "./Components/addProduct";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    console.log("reloaded");
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/user/create" component={CreateAc} />
        <div className="App">
          <Navbar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/product/detail">
            <ProductDetails />
          </Route>
          <Route path="/search/:product">
            <SearchPage />
          </Route>
          <Route path="/product/create">
            <AddProduct />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
