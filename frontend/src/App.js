import "./Styles/App.css";
import { useState } from "react";
import Login from "./Components/login";
import Home from "./Components/home";
import CreateAc from "./Components/createAc";
import Navbar from "./Components/nav";
import Footer from "./Components/footer";
import ProductDetails from "./Components/productDetails";
import SearchPage from "./Components/searchPage";
import Cart from "./Components/cart";
import AddProduct from "./Components/addProduct";
import Spinner from "./Components/spinner";
import ResCard from "./Components/responseCard";
import MobileSearchPage from "./Components/mobileSearchPage";
import PaymentSuccess from "./Components/paymentSuccess";
import Recommendations from "./Components/recommendations";
import PageNotFound from "./Components/404";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [resMessage, setResMessage] = useState("");

  return (
    <Router>
      <ResCard message={resMessage} setMessage={setResMessage} />
      <Spinner />
      {/* Routes Without Nav Start */}
      <Switch>
        <Route exact path="/login">
          <Login notify={setResMessage} />
        </Route>
        <Route exact path="/user/create">
          <CreateAc notify={setResMessage} />
        </Route>
        <Route exact path="/mobile/search">
          <MobileSearchPage notify={setResMessage} />
        </Route>
        <Navbar notify={setResMessage} />
      </Switch>

      <Switch>
        {/* Routes Without Nav End */}
        <Route exact path="/">
          <Home notify={setResMessage} />
          <Footer />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/product/:productID">
          <ProductDetails notify={setResMessage} />
        </Route>
        <Route exact path="/search/:product">
          <SearchPage notify={setResMessage} />
        </Route>
        <Route exact path="/payment-success">
          <PaymentSuccess />
        </Route>
        <Route exact path="/recommended">
          <Recommendations />
        </Route>
        {/* ----------------Not So IMP Routes---------------- */}
        <Route exact path="/create-product" component={AddProduct} />
        {
          ['/login', '/user/create', '/mobile/search'].includes(window.location.pathname)
            ? null
            : <Route component={PageNotFound} />
        }
      </Switch>
    </Router>
  );
}

export default App;
