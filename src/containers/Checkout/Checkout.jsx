import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
class Checkout extends Component {
  goBackHandler = () => {
    this.props.history.goBack();
  };

  goForwardHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      summary = (
        <div>
          <CheckoutSummary
            goBack={this.goBackHandler}
            goForward={this.goForwardHandler}
            ingredients={this.props.ingredients}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
