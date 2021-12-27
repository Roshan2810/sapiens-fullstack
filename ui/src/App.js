import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./container/User/Login";
import Signup from "./container/User/Signup";
import ProductList from "./container/Product/ProductList";
// import history from "./web.history";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/user/login" component={Login} />
        <Route path="/user/signup/" component={Signup} />
        <Route path="/products/getList" component={ProductList} />
      </Switch>
    </Router>
  );
};

export default App;
