import "./App.css";
import { useEffect, useState } from "react";
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
import Spinner from "./Components/spinner";
import ResCard from "./Components/responseCard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [resMessage, setResMessage] = useState("");
  let notificationTimeout;

  useEffect(() => {
    clearTimeout(notificationTimeout);
    if (resMessage === "") return;

    let card = document.getElementById("card");
    card.classList.add("active");

    notificationTimeout = setTimeout(() => {
      card.classList.remove("active");
      setResMessage("");
    }, 2500);
  }, [resMessage]);

  return (
    <Router>
      <ResCard message={resMessage} />
      <Spinner />
      <Switch>
        <Route exact path="/login">
          <Login notify={setResMessage} />
        </Route>
        <Route exact path="/user/create">
          <CreateAc notify={setResMessage} />
        </Route>
        <div className="App">
          <Navbar notify={setResMessage} />
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/cart">
            <Cart notify={setResMessage} />
          </Route>
          <Route path="/product/:productID">
            <ProductDetails notify={setResMessage} />
          </Route>
          <Route path="/search/:product">
            <SearchPage notify={setResMessage} />
          </Route>
          {/* ----------------Not So IMP Routes---------------- */}
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
