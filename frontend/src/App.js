import "./Styles/App.css";
import { useEffect, useState, useRef } from "react";
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
  let notificationTimeout = useRef();

  useEffect(() => {
    if (resMessage === "") return;

    let card = document.getElementById("card");
    card.classList.add("active");

    notificationTimeout = setTimeout(() => {
      card.classList.remove("active");
      setResMessage("");
    }, 2500);
    
    return clearTimeout(notificationTimeout);
  }, [resMessage]);

  return (
    <Router>
      <ResCard message={resMessage} />
      <Spinner />
      <Switch>
        {/* Routes Without Nav Start */}
        <Route exact path="/login">
          <Login notify={setResMessage} />
        </Route>
        <Route exact path="/user/create">
          <CreateAc notify={setResMessage} />
        </Route>
        <Route exact path="/mobile/search">
          <MobileSearchPage notify={setResMessage} />
        </Route>
        {/* Routes Without Nav End */}
        <Route exact path="/">
          <Navbar notify={setResMessage} />
          <Home notify={setResMessage} />
          <Footer />
        </Route>
        <Route exact path="/cart">
          <Navbar notify={setResMessage} />
          <Cart />
        </Route>
        <Route exact path="/product/:productID">
          <Navbar notify={setResMessage} />
          <ProductDetails notify={setResMessage} />
        </Route>
        <Route exact path="/search/:product">
          <Navbar notify={setResMessage} />
          <SearchPage notify={setResMessage} />
        </Route>
        <Route exact path="/payment-success">
          <Navbar notify={setResMessage} />
          <PaymentSuccess />
        </Route>
        <Route exact path="/recommended">
          <Navbar notify={setResMessage} />
          <Recommendations />
        </Route>
        {/* ----------------Not So IMP Routes---------------- */}
        <Route exact path="/create-product" component={AddProduct} />
        <Route>
          <Navbar notify={setResMessage} />
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
