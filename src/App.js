import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Redirect } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Orders from "./containers/Orders/Orders";
import Checkout from "./containers/Checkout/Checkout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.onReloadCheckAuthStatus();
  }
  render() {
    let routes = (
      <React.Fragment>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </React.Fragment>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <React.Fragment>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
        </React.Fragment>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReloadCheckAuthStatus: () => dispatch(actions.authCheckStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
