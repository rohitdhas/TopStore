import "./Styles/App.css";
import Login from "./Pages/login";
import CreateAc from "./Pages/createAc";
import Home from "./Pages/home";
import ProductDetails from "./Pages/productDetails";
import SearchPage from "./Pages/searchPage";
import Cart from "./Pages/cart";
import AdminPanel from "./Pages/adminPanel";
import MobileSearchPage from "./Pages/mobileSearchPage";
import PaymentSuccess from "./Pages/paymentSuccess";
import Recommendations from "./Pages/recommendations";
import PageNotFound from "./Pages/404";
import Navbar from "./Components/nav";
import Footer from "./Components/footer";
import Spinner from "./Components/spinner";
import ResCard from "./Components/responseCard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <ResCard />
      <Spinner />
      <Navbar />
      <Switch>
        {/* Routes Without Nav */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/user/create" component={CreateAc} />
        <Route exact path="/mobile/search" component={MobileSearchPage} />

        {/* Routes With Nav */}
        <Route exact path="/">
          <Home />
          <Footer />
        </Route>
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product/:productID" component={ProductDetails} />
        <Route exact path="/search/:product" component={SearchPage} />
        <Route exact path="/payment-success" component={PaymentSuccess} />
        <Route exact path="/recommended" component={Recommendations} />
        {/* ----------------Not So IMP Routes---------------- */}
        <Route exact path="/admin-panel" component={AdminPanel} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
